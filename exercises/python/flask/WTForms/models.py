from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class Pet(db.Model):
    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    available = db.Column(db.Boolean, nullable=False, default=True)
    photo_url = db.Column(db.Text)
    notes = db.Column(db.Text)

    def __repr__(self):
        return f'<Pet name={self.name} species={self.species} age={self.age} available={self.available}>'
