"""SQLAlchemy models for Covid News."""

from datetime import datetime

from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
db = SQLAlchemy()

class User(db.Model):
    """User in the system."""

    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    username = db.Column(
        db.Text,
        nullable=False,
        unique=True,
    )

    password = db.Column(
        db.Text,
        nullable=False,
    )

    location = db.Column(
        db.String,
        nullable=False,
        default='US'
    )

    favorites = db.relationship('Favorite')

    def __repr__(self):
        return f"<User #{self.id}: {self.username}>"

    def has_favorite(self, article):
        """Does this user have 'article' favorited?"""

        found_favorites_list = [article for article in self.favorites if article == article]
        return len(found_favorites_list) == 1

    @classmethod
    def signup(cls, username, password):
        """Sign up user.

        Hashes password and adds user to system.
        """

        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        user = User(
            username=username,
            password=hashed_pwd,
        )

        db.session.add(user)
        return user

    @classmethod
    def authenticate(cls, username, password):
        """Find user with `username` and `password`.

        This is a class method (call it on the class, not an individual user.)
        It searches for a user whose password hash matches this password
        and, if it finds such a user, returns that user object.

        If can't find matching user (or if password is wrong), returns False.
        """

        user = cls.query.filter_by(username=username).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False

class Favorite(db.Model):
    """A favorited article."""

    __tablename__ = 'favorites'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    path = db.Column(
        db.String,
        nullable=False,
    )

    location = db.Column(
        db.String,
        nullable=False,
    )

    title = db.Column(
        db.String,
        nullable=False,
    )

    excerpt = db.Column(
        db.String,
        nullable=False,
    )

    image = db.Column(
        db.String,
        nullable=False,
    )

    published_date = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow(),
    )

    favorited_by = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
    )

    user = db.relationship('User')


def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)
