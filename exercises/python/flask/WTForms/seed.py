"""Seed file to make sample data for db."""

from models import db, Pet
from app import app

# Create all tables
db.drop_all()
db.create_all()

# Empty table
Pet.query.delete()

# Add sample pets
p1 = Pet(name="Hammy", species="hamster", age=3)
p2 = Pet(name="Hammy Jr.", species="hamster", age=2,
         photo_url="/static/images/HammyJr.jpg")
p3 = Pet(name="Hammy II", species="hamster", age=1,
         photo_url="/static/images/HammyII.jpg", notes="He's just a baby!")
p4 = Pet(name="Woofer", species="dog", age=3, available=False,
         photo_url="/static/images/Woofer.jpg", notes="He's a smarty-pants!")
p5 = Pet(name="Woofer Jr", species="dog", age=2, available=True,
         photo_url="/static/images/WooferJr.jpg", notes="She has a tail. On her face.")
p6 = Pet(name="Woofer II", species="dog", age=1, available=False,
         photo_url="/static/images/WooferII.jpg")
p7 = Pet(name="Meowth", species="cat", age=3, available=True,
         notes="She's real ugly. Believe us.")
p8 = Pet(name="Meowth Jr", species="cat", age=2, available=False,
         notes="He's even uglier than his mother!")
p9 = Pet(name="Meowth II", species="cat", age=1, available=True,
         photo_url="/static/images/MeowthII.jpg")

db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9])
db.session.commit()
