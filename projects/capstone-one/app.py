import os
from tkinter import *
from tkinter import messagebox
from flask import Flask, render_template, request, flash, redirect, session, g
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy.exc import IntegrityError

from forms.forms import UserAddForm, UserDeleteForm, UserLocationForm, UserLoginForm
from models.models import db, connect_db, User, Favorite

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


@app.route('/')
def homepage():
    """Handle homepage route.
    
    Render default homepage template.
    """

    # if g.user:
    #     msg_list = []
    #     all_messages = Message.query.order_by(Message.timestamp.desc()).all()

    #     for message in all_messages:
    #         if message.user.id == g.user.id:
    #             msg_list.append(message)
    #         else:
    #             msg_followers = message.user.followers
    #             for follower in msg_followers:
    #                 if follower.id == g.user.id or message.user.id == g.user.id:
    #                     msg_list.append(message)

    #     return render_template('home.html', Likes=Likes, messages=msg_list[:100])

    # else:
    return render_template('index.html')


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
        user = User.authenticate(form.username.data,
                                 form.password.data)

        if user:
            do_login(user)
            flash(f"Login successful. Welcome back, {user.username}!", "info")
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

    flash("You have been successfully logged out!", 'info')
    return redirect("/")


# # Change User Location Route
@app.route('/users/<username>/location', methods=["GET", "POST"])
def user_location(username):
    """Handle user location change.
    
    Update user location in DB and 
    """

    form = UserLocationForm()

    if form.validate_on_submit():
        user = User.query.filter_by(username=username).one()
        user.location = form.location.data
        db.session.commit()
        
        flash('Location successfully updated.', 'info')
        return redirect('/')

    if (g.user.username == username):
        user = User.query.filter_by(username=username).one()
        form.location.data = user.location
        return render_template('users/location.html', user=user, form=form)

    flash('Unauthorized. Redirected to home page.', 'danger')
    return redirect('/')

# # Delete User Route
@app.route('/users/<username>/delete', methods=["GET", "POST"])
def user_delete(username):
    """Delete a user."""

    form = UserDeleteForm()

    if form.validate_on_submit():
        user = User.authenticate(g.user.username, form.password.data)

        if user:
            do_logout()

            db.session.delete(g.user)
            db.session.commit()

            flash('User account successfully deleted.', 'info')
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
