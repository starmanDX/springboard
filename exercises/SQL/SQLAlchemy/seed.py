"""Seed file to make sample data for blogly_db"""

from models import User, Post, Tag, PostTag, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If tables aren't empty, empty them
User.query.delete()
Post.query.delete()
Tag.query.delete()
PostTag.query.delete()

# Add users, posts
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

# Repeat for posts
post1 = Post(title='SeedPost1', content='Lorem ipsum', user_id=1)
post2 = Post(title='SeedPost2', content='More lorem ipsum', user_id=1)
post3 = Post(title='SeedPost1', content='Lorem ipsum', user_id=2)
post4 = Post(title='SeedPost2', content='More lorem ipsum', user_id=2)
post5 = Post(title='SeedPost1', content='Lorem ipsum', user_id=3)
post6 = Post(title='SeedPost2', content='More lorem ipsum', user_id=3)

db.session.add(post1)
db.session.add(post2)
db.session.add(post3)
db.session.add(post4)
db.session.add(post5)
db.session.add(post6)

# Repeat for Tags
tag1 = Tag(name='#winning')
tag2 = Tag(name='#livingmybestlife')
tag3 = Tag(name='#hatersgonhate')

db.session.add(tag1)
db.session.add(tag2)
db.session.add(tag3)

db.session.commit()

# Repeat for PostTags
posttag1 = PostTag(post_id=1, tag_id=1)
posttag2 = PostTag(post_id=1, tag_id=2)
posttag3 = PostTag(post_id=1, tag_id=3)

db.session.add(posttag1)
db.session.add(posttag2)
db.session.add(posttag3)

db.session.commit()
