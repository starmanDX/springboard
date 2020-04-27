import os
import requests
import requests_cache
from flask import Flask, jsonify, render_template, request, flash, redirect, session, g
from sqlalchemy.exc import IntegrityError
from sqlalchemy import asc, desc
from models import db, connect_db, User, Article
from forms.user_forms import UserAddForm, UserDeleteForm, UserLocationForm, UserLoginForm
from forms.article_forms import ArticleAddForm


##############################################################################
# Configs

CURR_USER_KEY = "curr_user"

app = Flask(__name__)

# Get DB_URI from environ variable (useful for production/testing) or,
# if not set there, use development local db.
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ.get('DATABASE_URL', 'postgres:///covid_news'))

# app configs
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev')

# Caches incoming API calls
requests_cache.install_cache(
    cache_name="covid_cache", backend='sqlite', expire_after=3600)

connect_db(app)

##############################################################################
# User Signup/Login/Logout Middleware


@app.before_request
def add_user_to_g():
    """Add current user to Flask global."""

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
# Homepage and Error Routes

# Homepage route
@app.route('/')
def homepage():
    """Handle homepage route."""

    form = ArticleAddForm()

    # Call stats API and store results.
    stats_response = requests.get('https://api.smartable.ai/coronavirus/stats/US', params={
        "Subscription-Key": "ce460928bcb14a85a359364b1fa315f3", "cache-control": "public, max-age=3600, max-stale=3600"})
    stats_data = stats_response.json()['stats']['breakdowns']

    # If state clicked, make appropriate API all and re-render homepage
    # with appropriate content.
    if ('location' in request.args):
        try:
            news_response = requests.get(f'https://api.smartable.ai/coronavirus/news/{request.args["location"]}', params={
                                         "Subscription-Key": "ce460928bcb14a85a359364b1fa315f3", "cache-control": "public, max-age=3600, max-stale=3600"})
            news_data = news_response.json()
            return render_template('index.html', form=form, stats_data=stats_data, news_data=news_data)

        except:
            flash(f'No data found for that region.', 'warning')

    # Make appropriate API call depending on if there is a logged in
    # user and render homepage with appropriate content.
    if not g.user:
        news_response = requests.get('https://api.smartable.ai/coronavirus/news/US', params={
            "Subscription-Key": "ce460928bcb14a85a359364b1fa315f3", "cache-control": "public, max-age=3600, max-stale=3600"})
        news_data = news_response.json()
        return render_template('index.html', form=form, stats_data=stats_data, news_data=news_data)

    else:
        try:
            news_response = requests.get(f'https://api.smartable.ai/coronavirus/news/{g.user.location}', params={
                                         "Subscription-Key": "ce460928bcb14a85a359364b1fa315f3", "cache-control": "public, max-age=3600, max-stale=3600"})
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
    """Handle 404 errors."""

    return render_template('404.html'), 404

##############################################################################
# General User Routes:

# User Signup Route
@app.route('/signup', methods=["GET", "POST"])
def signup():
    """Handle user signup."""

    form = UserAddForm()

    ### POST ROUTE ###
    # Create new user, add to database, login, then redirect to homepage. Flash
    # user if username is already taken and re-present form. If no valid form,
    # present form.
    if form.validate_on_submit():
        try:
            user = User.signup(
                username=form.username.data, password=form.password.data, location=form.location.data)
            db.session.commit()

        except IntegrityError:
            flash("Username already taken. Please choose another.", 'danger')
            return render_template('users/signup.html', form=form)

        do_login(user)
        flash(f"Signup successful. Welcome {user.username}.", 'success')
        return redirect("/")

    ### GET ROUTE ###
    # Render signup form
    return render_template('users/signup.html', form=form)


# Login User Route
@app.route('/login', methods=["GET", "POST"])
def login():
    """Handle user login."""

    form = UserLoginForm()

    ### POST ROUTE ###
    # Log user in and redirect to homepage. If invalid credentials,
    # flash user. Otherwise if no valid form, present form.
    if form.validate_on_submit():
        user = User.authenticate(form.username.data, form.password.data)
        if user:
            do_login(user)
            flash(
                f"Login successful. Welcome back, {user.username}.", "success")
            return redirect("/")

        else:
            flash("Invalid credentials. Please try again.", 'danger')

    ### GET ROUTE ###
    # Render login form
    return render_template('users/login.html', form=form)


# Logout User Route
@app.route('/logout')
def logout():
    """Handle logout of user."""

    # Log user out and redirect to homepage
    do_logout()
    flash("You have been successfully logged out.", 'warning')
    return redirect("/")


# Change User Location Route
@app.route('/users/<username>/location', methods=["GET", "POST"])
def user_location(username):
    """Handle user location change."""

    form = UserLocationForm()

    # If no logged in user, redirect.
    if not g.user:
        flash('Unauthorized. Redirected to home page.', 'danger')
        return redirect('/')

    ### POST ROUTE ###
    # Update user location in database and pass new location to homepage redirect.
    if form.validate_on_submit():
        try:
            user = User.query.filter_by(username=username).one()
            user.location = form.location.data
            db.session.commit()
            flash('Location successfully updated.', 'warning')

        except:
            flash('Something went wrong.', 'danger')

        return redirect('/')

    ### GET ROUTE ###
    # If logged in user matches passed username, render form. Otherwise, flash user.
    if (g.user.username == username):
        form.location.data = g.user.location
        return render_template('users/location.html', user=g.user, form=form)

    flash('Unauthorized. Redirected to home page.', 'danger')
    return redirect('/')

# Delete User Route
@app.route('/users/<username>/delete', methods=["GET", "POST"])
def user_delete(username):
    """Delete a user."""

    form = UserDeleteForm()

    # If no logged in user, redirect.
    if not g.user:
        flash('Unauthorized. Redirected to home page.', 'danger')
        return redirect('/')

    ### POST ROUTE ###
    # Find passed user in database and check against logged in user. If
    #  authenticated, logout and delete user. Otherwise, flash user.
    if form.validate_on_submit():
        user = User.authenticate(g.user.username, form.password.data)
        if user:
            try:
                do_logout()
                db.session.delete(g.user)
                db.session.commit()
                flash('User account successfully deleted.', 'warning')

            except:
                flash('Something went wrong.', 'danger')

            return redirect("/")

        else:
            flash("Invalid credentials. Please try again.", 'danger')

    ### GET ROUTE ###
    # If logged in user matches passed username, find passed user in
    # the database and pass it to the form. Otherwise, flash user.
    if (g.user.username == username):
        try:
            user = User.query.filter_by(username=username).one()

        except:
            flash('Something went wrong.', 'danger')
            return redirect('/')

        return render_template('users/delete.html', user=user, form=form)

    flash("Unauthorized. Redirected to home page.", "danger")
    return redirect("/")


##############################################################################
# Saved Article Routes:

# Add Saved Article Route
@app.route('/users/<username>/saved-articles', methods=["GET", "POST"])
def user_saved_articles(username):
    """Handle add user saved articles."""

    form = ArticleAddForm()

    # If no logged in user, redirect.
    if not g.user:
        flash('Unauthorized. Redirected to home page.', 'danger')
        return redirect('/')

    ### POST ROUTE ###
    # If valid form, add saved article to database.
    if form.validate_on_submit():
        try:
            Article.save_article(
                path=form.path.data, url=form.url.data, location=form.location.data,
                title=form.title.data, excerpt=form.excerpt.data, image=form.image.data,
                source=form.source.data, published_date=form.published_date.data, saved_by=form.saved_by.data,)
            db.session.commit()
            return "success", 200
        except:
            flash('Something went wrong.', 'danger')
            return render_template('users/saved-articles.html', user=g.user)

    ### GET ROUTE ###
    # If signed in user matches passed username, render page. Otherwise,
    # flash user and redirect.
    if (g.user.username == username):
        return render_template('users/saved-articles.html', user=g.user)

    flash('Unauthorized. Redirected to home page.', 'danger')
    return redirect('/')

# Sort Saved Article Route
@app.route('/users/<username>/saved-articles', methods=["PATCH"])
def sort_saved_article(username):
    """Handle sort user saved articles."""

    # If no logged in user, redirect.
    if not g.user:
        flash('Unauthorized. Redirected to home page.', 'danger')
        return redirect('/')

    # If signed in user matches passed username, sort and return results.
    # Otherwise, flash user and redirect.
    if (g.user.username == username):
        sort_type = str(request.data[5:-4], 'utf-8').replace("-", "")
        sort_dir = str(request.data, 'utf-8')[-4:].replace("-", "")
        if (sort_dir == 'asc'):
            data = Article.query.filter_by(saved_by=g.user.id).order_by(
                asc(getattr(Article, sort_type))).all()

        if (sort_dir == 'desc'):
            data = Article.query.filter_by(saved_by=g.user.id).order_by(
                desc(getattr(Article, sort_type))).all()

        data = [i.serialize() for i in data]
        return jsonify(data=data)

    else:
        flash('Unauthorized. Redirected to home page.', 'danger')
        return redirect('/')

# Remove Saved Article Route
@app.route('/users/<username>/saved-articles', methods=["DELETE"])
def remove_saved_article(username):
    """Handle remove user's saved articles."""

    # If no logged in user, redirect.
    if not g.user:
        flash('Unauthorized. Redirected to home page.', 'danger')
        return redirect('/')

    # If signed in user matches passed username, remove passed article
    # from database. Otherwise, flash user and redirect.
    if (g.user.username == username):
        try:
            path = str(request.data, 'utf-8')[5:].replace(f"%2F", "/")
            article = Article.query.filter_by(path=path).one()
            db.session.delete(article)
            db.session.commit()
            return "success", 200

        except:
            flash('Something went wrong.', 'danger')
            return render_template('users/saved-articles.html', user=g.user)

    else:
        flash('Unauthorized. Redirected to home page.', 'danger')
        return redirect('/')
