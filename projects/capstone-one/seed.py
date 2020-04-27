"""Seed database"""

from models import User, Article, db
from app import app

# Create all tables
db.drop_all()
db.create_all()