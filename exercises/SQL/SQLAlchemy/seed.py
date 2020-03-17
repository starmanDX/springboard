"""Seed file to make sample data for blogly_db"""

from models import User, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()

# Add users
user1 = User(first_name='Alan', last_name='Alda',
             image_url="https://i.kym-cdn.com/entries/icons/original/000/003/619/ForeverAlone.jpg")
user2 = User(first_name='Jane', last_name='Smith',
             image_url="https://blog.beeminder.com/wp-content/uploads/2018/03/all-the-things.png")
user3 = User(first_name='Joel', last_name='Burton',
             image_url="https://i.pinimg.com/236x/4f/b5/ac/4fb5ac805baed5314452389c9572c51c.jpg")

# Add new objects to session, so they'll persist
db.session.add(user1)
db.session.add(user2)
db.session.add(user3)

# Commit--otherwise, this never gets saved!
db.session.commit()
