"""Seed file to make sample data for db."""

from models import db, User
from app import app

# Create all tables
db.drop_all()
db.create_all()

# Empty table
User.query.delete()

# Add sample pets
u1 = User(name="testuser1", email="testuser1@test.com",
          birth_year="1900", color="blue", lucky_num=23)
u2 = User(name="testuser2", email="testuser2@test.com",
          birth_year="1987", color="green", lucky_num=11)
u3 = User(name="testuser3", email="testuser3@test.com",
          birth_year="2020", color="red", lucky_num=7)


db.session.add_all([u1, u2, u3])
db.session.commit()
