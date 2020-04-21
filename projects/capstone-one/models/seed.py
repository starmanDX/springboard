"""Seed file to make sample data for blogly_db"""

from models import User, db
from app import app

# Create all tables
db.drop_all()
db.create_all()
