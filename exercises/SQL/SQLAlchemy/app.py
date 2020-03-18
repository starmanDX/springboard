from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post, Tag, PostTag

app = Flask(__name__)

# set SQLALCHEMY_DATABASE_URI before running connect_db(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.errorhandler(404)
def not_found(e):
    return render_template('404.html'), 404

@app.route('/')
def show_home():
    """Shows list of all users in db"""
    posts = Post.query.order_by(Post.created_at.desc()).limit(5).all()

    return render_template('home.html', posts=posts)


@app.route('/users')
def list_users():
    """Shows list of all users in db"""
    users = User.query.order_by(User.last_name,User.first_name).all()
    return render_template('list.html', users=users)

@app.route('/users/new')
def new_user_form():
    """Show form to create a new user"""
    return render_template('user-form.html')


@app.route('/users/new', methods=["POST"])
def create_user():
    first_name = request.form["first-name"]
    last_name = request.form["last-name"]
    image_url = request.form["image-url"]

    new_user = User(first_name=first_name,
                    last_name=last_name, image_url=image_url)
    db.session.add(new_user)
    db.session.commit()

    flash(f'New user {new_user.get_full_name} created!')

    return redirect('/users')


@app.route('/users/<int:user_id>')
def show_user_details(user_id):
    """Show details about a single user"""
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(user_id=user_id).all()
    return render_template('user-details.html', user=user, posts=posts)


@app.route('/users/<int:user_id>/edit')
def show_edit_user(user_id):
    """Show form to edit a user"""
    user = User.query.get_or_404(user_id)

    return render_template('edit-user.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def edit_user(user_id):
    first_name = request.form["first-name"]
    last_name = request.form["last-name"]
    image_url = request.form["image-url"]
    user = User.query.get(user_id)

    user.first_name = first_name
    user.last_name = last_name
    user.image_url = image_url

    db.session.add(user)
    db.session.commit()

    flash(f'User updated!')

    return redirect(f'/users/{user.id}')


@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    flash(f'User deleted!')

    return redirect('/users')

@app.route('/users/<int:user_id>/posts/new')
def new_post_form(user_id):
    """Show form to create a new post"""

    user = User.query.get_or_404(user_id)

    return render_template('post-form.html', user=user)


@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def create_post(user_id):
    title = request.form["title"]
    content = request.form["content"]

    new_post = Post(title=title,
                    content=content,
                    user_id=user_id)
    db.session.add(new_post)
    db.session.commit()


    flash(f'Post added!')

    return redirect(f'/users/{user_id}')

@app.route('/posts/<int:post_id>')
def show_post_details(post_id):
    """Show details about a single single"""
    post = Post.query.get(post_id)
    user = User.query.get_or_404(post.user_id)
    return render_template('post-details.html', user=user, post=post)

@app.route('/posts/<int:post_id>/edit')
def show_edit_post(post_id):
    """Show form to edit a post"""
    post = Post.query.get_or_404(post_id)
    tags = Tag.query.all()
    return render_template('edit-post.html', post=post, tags=tags)


@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def edit_post(post_id):
    title = request.form["title"]
    content = request.form["content"]
    tag_name = request.form["tag_name"]
    post = Post.query.get_or_404(post_id)

    post.title = title
    post.content = content
    post.tags

    db.session.add(post)
    db.session.commit()

    flash(f'Post updated!')

    return redirect(f'/posts/{post.id}')


@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)

    db.session.delete(post)
    db.session.commit()

    flash(f'Post deleted!')

    return redirect(f'/users/{post.user_id}')


@app.route('/tags')
def list_tags():
    """Shows list of all tags in db"""
    tags = Tag.query.order_by(Tag.name).all()
    return render_template('tags.html', tags=tags)

@app.route('/tags/<int:tag_id>')
def show_tag_details(tag_id):
    """Show details about a single tag"""

    tag = Tag.query.get_or_404(tag_id)

    return render_template('tag-details.html', tag=tag)

@app.route('/tags/new')
def new_tag_form():
    """Show form to create a new tag"""
    return render_template('tag-form.html')


@app.route('/tags/new', methods=["POST"])
def create_tag():
    name = request.form["name"]

    new_tag = Tag(name=name)

    db.session.add(new_tag)
    db.session.commit()

    flash(f'New tag {new_tag.name} created!')

    return redirect('/tags')

@app.route('/tags/<int:tag_id>/edit')
def show_edit_tag(tag_id):
    """Show form to edit a tag"""
    tag = Tag.query.get_or_404(tag_id)

    return render_template('edit-tag.html', tag=tag)


@app.route('/tags/<int:tag_id>/edit', methods=["POST"])
def edit_tag(tag_id):
    name = request.form["name"]

    tag = Tag.query.get_or_404(tag_id)

    tag.name = name

    db.session.add(tag)
    db.session.commit()

    flash(f'Tag updated!')

    return redirect(f'/tags/{tag.id}')


@app.route('/tags/<int:tag_id>/delete', methods=["POST"])
def delete_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)

    db.session.delete(tag)
    db.session.commit()

    flash(f'Tag deleted!')

    return redirect('/tags')
