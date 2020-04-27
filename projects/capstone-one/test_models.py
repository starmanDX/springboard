"""Model tests."""

# run these tests like:
# python -m unittest test_models.py

from app import app
import os
from unittest import TestCase
from psycopg2.errors import NotNullViolation
from models import db, User, Article
from sqlalchemy.exc import IntegrityError
from datetime import datetime

# Use test database
os.environ['DATABASE_URL'] = "postgresql:///covid_news_test"

# import app

# Create tables
db.create_all()


class UserModelTestCase(TestCase):
    """Test User Model."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Article.query.delete()
        db.session.commit()

        u = User(
            username="testuser",
            password="HASHED_PASSWORD",
            location="US"
        )

        db.session.add(u)
        db.session.commit()

        a = Article(
            path='testPath',
            url='https://wwww.testurl.com',
            location="US",
            title="testTitle",
            excerpt="testExcerpt",
            image="https://www.testurl.com/testimg.jpg",
            source="testSource",
            published_date="2020-04-25 05:06:00",
            saved_by=u.id
        )

        db.session.add(a)
        db.session.commit()

        self.client = app.test_client()
        app.config['TESTING'] = True

    def tearDown(self):
        """Delete all database data"""

        User.query.delete()
        Article.query.delete()

        db.session.commit()

    def test_user_model(self):
        """Test basic user model."""

        u = User.query.filter_by(username='testuser').one()

        # User should have one article
        self.assertEqual(len(u.articles), 1)

    def test_user_repr(self):
        """Test the user repr."""

        u = User.query.filter_by(username='testuser').one()

        self.assertEqual(repr(u), f'<User #{u.id}: {u.username}>')

    def test_user_has_saved_article(self):
        """Test if user1 has article1 saved."""

        u1 = User.query.filter_by(username='testuser').one()
        a1 = Article.query.filter_by(saved_by=u1.id).one()

        self.assertTrue(u1.has_saved_article(a1.path), True)

    def test_user_signup(self):
        """Test if User.signup() creates a new user"""

        self.assertTrue(User.signup('testuser2', 'testpassword', "US-WY"))
        db.session.rollback()

    def test_user_authenticate(self):
        """Test if User.authenticate() authenticates a user"""

        User.signup('testuser2', 'HASHED_PASSWORD', 'US')

        self.assertFalse(User.authenticate('fakeuser', 'HASHED_PASSWORD'))
        self.assertTrue(User.authenticate('testuser2', 'HASHED_PASSWORD'))
        self.assertFalse(User.authenticate('testuser2', 'fakepassword'))


class ArticleModelTestCase(TestCase):
    """Test Article Model."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Article.query.delete()
        db.session.commit()

        u = User(
            username="testuser",
            password="HASHED_PASSWORD",
            location="US"
        )

        db.session.add(u)
        db.session.commit()

        a = Article(
            path='testPath',
            url='https://wwww.testurl.com',
            location="US",
            title="testTitle",
            excerpt="testExcerpt",
            image="https://www.testurl.com/testimg.jpg",
            source="testSource",
            published_date="2020-04-25 05:06:00",
            saved_by=u.id
        )

        db.session.add(a)
        db.session.commit()

        self.client = app.test_client()

    def tearDown(self):
        """Delete all database data"""

        User.query.delete()
        Article.query.delete()

        db.session.commit()

    def test_article_model(self):
        """Test basic article model."""

        u1 = User.query.filter_by(username='testuser').one()
        a = Article.query.filter_by(saved_by=u1.id).one()

        # Article should be associated with user
        self.assertEqual(a.user.id, u1.id)

    def test_article_serialize(self):
        """Test if article object is serialized to a dict."""

        u1 = User.query.filter_by(username='testuser').one()
        a1 = Article.query.filter_by(saved_by=u1.id).one()

        self.assertEqual(a1.serialize(), {'id': a1.id,
                                          'path': a1.path,
                                          'url': a1.url,
                                          'location': a1.location,
                                          'title': a1.title,
                                          'excerpt': a1.excerpt,
                                          'image': a1.image,
                                          'source': a1.source,
                                          'published_date': a1.published_date,
                                          'saved_by': u1.id})

    def test_article_save_article(self):
        """Test if Article.save_article() saves article to the database"""

        u1 = User.query.filter_by(username='testuser').one()

        self.assertTrue(len(u1.articles) == 1)
        self.assertTrue(Article.save_article(
            'testPath', 'testUrl', "US-WY", 'testTitle', 'testExcerpt', 'testImage', 'testSource', datetime.utcnow(), u1.id))
        db.session.commit()
        self.assertTrue(len(u1.articles) == 2)
