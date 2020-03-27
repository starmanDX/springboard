from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres:///feedback_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'abc123'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
db.create_all()

toolbar = DebugToolbarExtension(app)


@app.route('/')
def show_index():
    """Redirect to login page"""
    all_feedback = Feedback.query.all()

    return render_template('index.html', all_feedback=all_feedback)


@app.route('/register', methods=['GET', 'POST'])
def register_user():
    """Register a new user"""

    form = RegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        new_user = User.register(
            username, password, email, first_name, last_name)
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError as e:
            if 'username' in e.orig.pgerror:
                form.username.errors.append(
                    'Username is already taken. Please choose another')
                return render_template('register.html', form=form)
            if 'email' in e.orig.pgerror:
                form.email.errors.append('Email is already in use.')
                return render_template('register.html', form=form)

        session['user_id'] = new_user.id
        session['username'] = new_user.username

        flash('Welcome! You have successfully registered!', 'success')

        return redirect('/')
    
    if 'username' in session:
        return redirect("/")

    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login_user():
    """Log a user in"""

    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)

        if user:
            flash(f"Welcome back, {user.username}!", 'info')
            session['user_id'] = user.id
            session['username'] = user.username
            return redirect('/')
        else:
            form.username.errors = ['Invalid username or password.']

    if 'username' in session:
        return redirect('/')

    return render_template('login.html', form=form)


@app.route('/users/<username>')
def show_user_details(username):
    """Show the current user's details page"""

    if "user_id" not in session:
        flash('Please log in first.', 'danger')
        return redirect('/login')

    try:
        user = User.query.filter_by(username=username).one()

        if session and user.username == session['username']:
            all_feedback = Feedback.query.filter_by(
                username=user.username).all()
            return render_template('user_details.html', user=user, all_feedback=all_feedback)
        else:
            flash("You dont have permission to access that!", 'danger')
            return redirect("/")
    except:
        flash("Page not found. Redirecting!", 'info')
        return redirect('/')


@app.route('/users/<username>/delete', methods=["POST"])
def delete_user(username):
    """Delete the current user"""

    if session and username == session['username']:
        user = User.query.filter_by(username=username).one()
        session.pop('user_id')
        session.pop('username')

        db.session.delete(user)
        db.session.commit()

        flash("User successfully deleted.", 'info')
        return redirect('/')

    flash("You don't have permission to access that!", 'danger')
    return redirect('/')


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    """Show the page to add feedback for the current user
        or add feedback for the current user"""

    form = FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        new_feedback = Feedback(
            title=title, content=content, username=username)
        db.session.add(new_feedback)
        db.session.commit()

        flash('Successfully added feedback!', 'success')
        return redirect('/')

    try:
        user = User.query.filter_by(username=username).one()

        if "user_id" not in session:
            flash('Please log in first.', 'danger')
            return redirect('/login')

        if user.username == session['username']:
            return render_template('add_feedback.html', form=form)

        else:
            flash("You don't have permission to access that!", 'danger')
            return redirect('/')

    except:
        flash("Page not found. Redirecting!", 'info')
        return redirect('/')


@app.route('/feedback/<int:id>/update', methods=['GET', 'POST'])
def update_feedback(id):
    """Show the page to update the selected feedback or update the selected feedback"""

    form = FeedbackForm()

    if form.validate_on_submit():
        feedback = Feedback.query.get_or_404(id)
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.add(feedback)
        db.session.commit()

        flash('Successfully updated feedback!', 'success')
        return redirect('/')

    try:
        feedback = Feedback.query.get(id)
        username = feedback.username

        if "user_id" not in session:
            flash('Please log in first.', 'danger')
            return redirect('/login')

        if username == session['username']:
            return render_template('update_feedback.html', form=form, feedback=feedback)

        else:
            flash("You don't have permission to access that!", 'danger')
            return redirect('/')

    except:
        flash("Page not found. Redirecting!", 'info')
        return redirect('/')


@app.route('/logout', methods=['POST'])
def logout_user():
    session.pop('user_id')
    session.pop('username')

    flash("You have been successfully logged out!", 'info')
    return redirect('/')


@app.route('/feedback/<int:id>/delete', methods=['POST'])
def delete_feedback(id):
    """Delete feedback"""

    if 'user_id' not in session:
        flash('Please log in first.', 'danger')
        return redirect('/login')

    feedback = Feedback.query.get_or_404(id)

    if feedback.username == session['username']:
        db.session.delete(feedback)
        db.session.commit()

        flash("Successfully deleted feedback!", 'info')
        return redirect('/')

    flash("You don't have permission do to that!", 'danger')
    return redirect('/')
