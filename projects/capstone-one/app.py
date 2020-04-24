import os
import requests
import requests_cache
from flask import Flask, render_template, request, flash, redirect, session, g
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy.exc import IntegrityError

from forms.forms import UserAddForm, UserDeleteForm, UserLocationForm, UserLoginForm, ArticleAddForm
from models.models import db, connect_db, User, Article

CURR_USER_KEY = "curr_user"

app = Flask(__name__)

# Get DB_URI from environ variable (useful for production/testing) or,
# if not set there, use development local db.
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ.get('DATABASE_URL', 'postgres:///covid_news'))

# app configs
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', "it's a secret")
toolbar = DebugToolbarExtension(app)

connect_db(app)

##############################################################################
# User signup/login/logout

@app.before_request
def add_user_to_g():
    """If we're logged in, add current user to Flask global."""

    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])

    else:
        g.user = None

def do_login(user):
    """Log in user."""

    session[CURR_USER_KEY] = user.id

def do_logout():
    """Logout user."""

    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]

##############################################################################
# Homepage and error pages

# Caches
requests_cache.install_cache(cache_name="covid_cache", backend='sqlite', expire_after=3600)

@app.route('/')
def homepage():
    """Handle homepage route.

    Render default homepage template.
    """
    form = ArticleAddForm()

    stats_response = requests.get('https://api.smartable.ai/coronavirus/stats/US', params={"Subscription-Key": "ce460928bcb14a85a359364b1fa315f3", "cache-control": "public, max-age=3600, max-stale=3600"})
    stats_data = stats_response.json()['stats']['breakdowns']

    if ('location' in request.args):
        try:
            news_response = requests.get(f'https://api.smartable.ai/coronavirus/news/{request.args["location"]}', params={"Subscription-Key": "ce460928bcb14a85a359364b1fa315f3", "cache-control": "public, max-age=3600, max-stale=3600"})
            news_data = news_response.json()

            return render_template('index.html', form=form, stats_data=stats_data, news_data=news_data)
        except:
            flash(f'No data found for that region.', 'warning')

    if not g.user:
        news_response = requests.get('https://api.smartable.ai/coronavirus/news/US', params={"Subscription-Key": "ce460928bcb14a85a359364b1fa315f3", "cache-control": "public, max-age=3600, max-stale=3600"})
        news_data = news_response.json()

        return render_template('index.html', form=form, stats_data=stats_data, news_data=news_data)

    else:
        try:
            news_response = requests.get(f'https://api.smartable.ai/coronavirus/news/{g.user.location}', params={"Subscription-Key": "ce460928bcb14a85a359364b1fa315f3", "cache-control": "public, max-age=3600, max-stale=3600"})
            news_data = news_response.json()

            return render_template('index.html', form=form, stats_data=stats_data, news_data=news_data)
        except:
            flash(f'No data found for your region. Showing US news.', 'warning')
            news_response = requests.get(f'https://api.smartable.ai/coronavirus/news/US', params={
                                        "Subscription-Key": "ce460928bcb14a85a359364b1fa315f3", "cache-control": "public, max-age=3600, max-stale=3600"})
            news_data = news_response.json()

            return render_template('index.html', form=form, stats_data=stats_data, news_data=news_data)

@app.errorhandler(404)
def show_404(error):
    """Handle 404 errors.

    Render default template for 404 errors.
    """
    return render_template('404.html')

# ##############################################################################
# # General user routes:

# # Signup Route
@app.route('/signup', methods=["GET", "POST"])
def signup():
    """Handle user signup.

    Create new user and add to DB. Redirect to home page.

    If the there already is a user with that username: flash message
    and re-present form.

    If no valid form, present form.
    """

    form = UserAddForm()

    if form.validate_on_submit():
        try:
            user = User.signup(
                username=form.username.data,
                password=form.password.data,
                location=form.location.data
            )
            db.session.commit()

        except IntegrityError:
            flash("Username already taken. Please choose another.", 'danger')
            return render_template('users/signup.html', form=form)

        do_login(user)

        flash(f"Signup successful. Welcome {user.username}.", 'success')
        return redirect("/")

    return render_template('users/signup.html', form=form)


# # Login Route
@app.route('/login', methods=["GET", "POST"])
def login():
    """Handle user login.

    Log user in and redirect to home page.

    If invalid credentials, flash user.

    If no valid form, present form.
    """

    form = UserLoginForm()

    if form.validate_on_submit():
        user = User.authenticate(form.username.data, form.password.data)

        if user:
            do_login(user)
            flash(f"Login successful. Welcome back, {user.username}.", "success")
            return redirect("/")

        flash("Invalid credentials. Please try again.", 'danger')

    return render_template('users/login.html', form=form)


# # Logout Route
@app.route('/logout')
def logout():
    """Handle logout of user.

    Log user out and redirect to home page.
    """

    do_logout()

    flash("You have been successfully logged out.", 'warning')
    return redirect("/")


# # Change User Location Route
@app.route('/users/<username>/location', methods=["GET", "POST"])
def user_location(username):
    """Handle user location change.

    Update user location in DB and pass new location to homepage redirect.

    If no valid form, present form.

    If invalid credentials, flash user.
    """

    form = UserLocationForm()

    if not g.user:
        flash('Unauthorized. Redirected to home page.', 'danger')
        return redirect('/')

    if form.validate_on_submit():
        user = User.query.filter_by(username=username).one()
        user.location = form.location.data
        db.session.commit()

        flash('Location successfully updated.', 'warning')
        return redirect('/')

    if (g.user.username == username):
        form.location.data = g.user.location
        return render_template('users/location.html', user=g.user, form=form)

    flash('Unauthorized. Redirected to home page.', 'danger')
    return redirect('/')

# # Add Saved Article Route
@app.route('/users/<username>/saved-articles', methods=["GET", "POST"])
def user_saved_articles(username):
    """Handle add user saved articles.

    """

    form = ArticleAddForm()

    if not g.user:
        flash('Unauthorized. Redirected to home page.', 'danger')
        return redirect('/')

    if form.validate_on_submit():
        Article.save_article(
            path=form.path.data,
            location=form.location.data,
            title=form.title.data,
            excerpt=form.excerpt.data,
            image=form.image.data,
            published_date=form.published_date.data,
            saved_by=form.saved_by.data,
        )
        db.session.commit()

        return "success", 200

    if (g.user.username == username):
        return render_template('users/location.html', user=g.user)

    flash('Unauthorized. Redirected to home page.', 'danger')
    return redirect('/')

# # Remove Saved Article Route
@app.route('/users/<username>/saved-articles', methods=["DELETE"])
def remove_saved_article(username):
    """Handle remove user saved articles.

    """
    if not g.user:
        flash('Unauthorized. Redirected to home page.', 'danger')
        return redirect('/')

    if (g.user.username == username):
        try:
            path = str(request.data, 'utf-8')[5:].replace(f"%2F", "/")
            article = Article.query.filter_by(path=path).one()
            db.session.delete(article)
            db.session.commit()
            
            return "success", 200
        except:
            flash('Something went wrong.', 'danger')
            return redirect('/')
    else:
        flash('Unauthorized. Redirected to home page.', 'danger')
        return redirect('/')

# # Delete User Route
@app.route('/users/<username>/delete', methods=["GET", "POST"])
def user_delete(username):
    """Delete a user."""

    form = UserDeleteForm()

    if not g.user:
        flash('Unauthorized. Redirected to home page.', 'danger')
        return redirect('/')

    if form.validate_on_submit():
        user = User.authenticate(g.user.username, form.password.data)

        if user:
            do_logout()

            db.session.delete(g.user)
            db.session.commit()

            flash('User account successfully deleted.', 'warning')
            return redirect("/")

        flash("Invalid credentials. Please try again.", 'danger')

    if (g.user.username == username):
        user = User.query.filter_by(username=username).one()
        return render_template('users/delete.html', user=user, form=form)

    flash("Unauthorized. Redirected to home page.", "danger")
    return redirect("/")

# @app.route('/users/<int:user_id>/likes')
# def show_likes(user_id):
#     """Show list of liked messages for this user."""

#     if not g.user:
#         flash("Access unauthorized.", "danger")
#         return redirect("/")

#     user = User.query.get_or_404(user_id)
#     all_messages = Message.query.order_by(Message.timestamp.desc()).all()

#     return render_template('users/likes.html', Likes=Likes, messages=all_messages, user=user)


# @app.route('/users/<int:user_id>/following')
# def show_following(user_id):
#     """Show list of people this user is following."""

#     if not g.user:
#         flash("Access unauthorized.", "danger")
#         return redirect("/")

#     user = User.query.get_or_404(user_id)
#     return render_template('users/following.html', user=user)


# @app.route('/users/<int:user_id>/followers')
# def users_followers(user_id):
#     """Show list of followers of this user."""

#     if not g.user:
#         flash("Access unauthorized.", "danger")
#         return redirect("/")

#     user = User.query.get_or_404(user_id)
#     return render_template('users/followers.html', user=user)


# @app.route('/users/follow/<int:follow_id>', methods=['POST'])
# def add_follow(follow_id):
#     """Add a follow for the currently-logged-in user."""

#     if not g.user:
#         flash("Access unauthorized.", "danger")
#         return redirect("/")

#     if g.user.id == follow_id:
#         return redirect("/")

#     followed_user = User.query.get_or_404(follow_id)
#     g.user.following.append(followed_user)
#     db.session.commit()

#     return redirect(f"/users/{g.user.id}/following")


# @app.route('/users/stop-following/<int:follow_id>', methods=['POST'])
# def stop_following(follow_id):
#     """Have currently-logged-in-user stop following this user."""

#     if not g.user:
#         flash("Access unauthorized.", "danger")
#         return redirect("/")

#     followed_user = User.query.get_or_404(follow_id)

#     try:
#         g.user.following.remove(followed_user)
#         db.session.commit()
#     except ValueError:
#         return redirect('/')

#     return redirect(f"/users/{g.user.id}/following")


# @app.route('/users/add_like/<int:msg_id>', methods=['POST'])
# def add_like(msg_id):
#     """Add a message like for the currently-logged-in user."""

#     if not g.user:
#         flash("Access unauthorized.", "danger")
#         return redirect("/")

#     liked_msg = Message.query.get_or_404(msg_id)

#     if g.user.id == liked_msg.user_id:
#         return redirect("/")

#     for like in g.user.likes:
#         if msg_id == like.id:

#             g.user.likes.remove(liked_msg)
#             db.session.commit()

#             print('**************************')
#             print(request.form['url'])
#             return redirect(f"{request.form['url']}")

#     g.user.likes.append(liked_msg)
#     db.session.commit()

#     return redirect("/")

# @app.route('/users/profile', methods=["GET", "POST"])
# def profile():
#     """Update profile for current user."""

#     form = UserEditForm()

#     if not g.user:
#         flash("Access unauthorized.", "danger")
#         return redirect("/")

#     if form.validate_on_submit():
#         user = User.authenticate(g.user.username,
#                                  form.password.data)

#         if user:
#             g.user.username = form.username.data
#             g.user.email = form.email.data
#             g.user.bio = form.bio.data
#             g.user.location = form.location.data
#             if form.image_url.data:
#                 g.user.image_url = form.image_url.data
#             else:
#                 g.user.image_url = '/static/images/default-pic.png'
#             if form.header_image_url.data:
#                 g.user.header_image_url = form.header_image_url.data
#             else:
#                 g.user.header_image_url = '/static/images/warbler-hero.jpg'

#             try:
#                 db.session.commit()
#             except IntegrityError as e:
#                 db.session.rollback()
#                 if 'username' in e.orig.pgerror:
#                     form.username.errors.append('Username is already in use.')
#                     return render_template('users/edit.html', form=form, user=g.user)
#                 if 'email' in e.orig.pgerror:
#                     form.email.errors.append('Email is already in use.')
#                     return render_template('users/edit.html', form=form, user=g.user)

#             flash("User updated!", "success")
#             return redirect(f"/users/{g.user.id}")

#         flash("Invalid credentials.", 'danger')

#     return render_template('users/edit.html', form=form, user=g.user)

# ##############################################################################
# # Messages routes:

# @app.route('/messages/new', methods=["GET", "POST"])
# def messages_add():
#     """Add a message:

#     Show form if GET. If valid, update message and redirect to user page.
#     """

#     if not g.user:
#         flash("Access unauthorized.", "danger")
#         return redirect("/")

#     form = MessageForm()

#     if form.validate_on_submit():
#         msg = Message(text=form.text.data)
#         g.user.messages.append(msg)
#         db.session.commit()

#         flash('New Warble successfully added!', 'success')
#         return redirect(f"/users/{g.user.id}")

#     return render_template('messages/new.html', form=form)


# @app.route('/messages/<int:message_id>', methods=["GET"])
# def messages_show(message_id):
#     """Show a message."""

#     msg = Message.query.get_or_404(message_id)
#     return render_template('messages/show.html', message=msg)


# @app.route('/messages/<int:message_id>/delete', methods=["POST"])
# def messages_destroy(message_id):
#     """Delete a message."""

#     if not g.user:
#         flash("Access unauthorized.", "danger")
#         return redirect("/")

#     msg = Message.query.get_or_404(message_id)
#     db.session.delete(msg)
#     db.session.commit()

#     flash('Warble successfully deleted.', 'info')
#     return redirect(f"/users/{g.user.id}")

##############################################################################
# Turn off all caching in Flask
#   (useful for dev; in production, this kind of stuff is typically
#   handled elsewhere)
#
# https://stackoverflow.com/questions/34066804/disabling-caching-in-flask


@app.after_request
def add_header(req):
    """Add non-caching headers on every request."""

    req.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    req.headers["Pragma"] = "no-cache"
    req.headers["Expires"] = "0"
    req.headers['Cache-Control'] = 'public, max-age=0'
    return req
