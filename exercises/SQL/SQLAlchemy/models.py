from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    first_name = db.Column(db.String(50),
                           nullable=False)

    last_name = db.Column(db.String(50),
                          nullable=False)

    image_url = db.Column(db.Text)

    posts = db.relationship("Post", backref="user",
                            cascade="all, delete-orphan")

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __repr__(self):
        u = self
        return f"<User id={u.id} full name={u.get_full_name}>"


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    title = db.Column(db.Text,
                      nullable=False)

    content = db.Column(db.Text,
                        nullable=False)

    created_at = db.Column(db.DateTime,
                           default=datetime.datetime.now,
                           nullable=False)

    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id'),
                        nullable=False)

    @property
    def formatted_date(self):
        return self.created_at.strftime("%a %b %d, %Y, %I:%M %p")

    def __repr__(self):
        p = self
        return f"<Post id={p.id} title={p.title} created_at={p.created_at} user_id={p.user_id}>"


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    name = db.Column(db.Text,
                     nullable=False,
                     unique=True)

    posts = db.relationship("Post",
                            secondary="posts_tags",
                            backref="tags")

    def __repr__(self):
        t = self
        return f"<Tag id={t.id} name={t.name}>"


class PostTag(db.Model):
    __tablename__ = 'posts_tags'

    post_id = db.Column(db.Integer,
                   db.ForeignKey('posts.id'), primary_key=True)

    tag_id = db.Column(db.Integer,
                   db.ForeignKey('tags.id'), primary_key=True)
