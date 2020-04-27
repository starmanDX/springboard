"""Route tests."""

# run these tests like:
# python -m unittest test_app.py

from app import app
from forms.user_forms import UserAddForm, UserDeleteForm, UserLocationForm, UserLoginForm
from forms.article_forms import ArticleAddForm
from models import db, User, Article
from flask import session, g
from app import add_user_to_g, do_login, do_logout
from unittest import TestCase
from app import CURR_USER_KEY
from datetime import datetime
import os

# Use test database
os.environ['DATABASE_URL'] = "postgresql:///covid_news_test"
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL', 'postgres:///covid_news')

# Create tables
db.create_all()

class FlaskTests(TestCase):
    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Article.query.delete()
        db.session.commit()

        u = User(
            username="testuser",
            password="HASHED_PASSWORD",
            location="US-VA"
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
        app.config['WTF_CSRF_ENABLED'] = False

    def tearDown(self):
        """Delete all database data."""

        User.query.delete()
        Article.query.delete()

        db.session.commit()

    def test_do_login(self):
        """Test do_login() adds user to session."""

        with app.test_request_context():
            u1 = User.query.filter_by(username='testuser').one()

            self.assertNotIn(CURR_USER_KEY, session)
            do_login(u1)
            self.assertEqual(session[CURR_USER_KEY], u1.id)

    def test_add_user_to_g(self):
        """Test add_user_to_g() adds session user to Flask global."""

        with app.test_request_context():
            u1 = User.query.filter_by(username='testuser').one()

            add_user_to_g()
            self.assertIsNone(g.user)
            do_login(u1)
            add_user_to_g()
            self.assertEqual(g.user, u1)

    def test_do_logout(self):
        """Test do_logout() removes user from session."""
        with app.test_request_context():
            u1 = User.query.filter_by(username='testuser').one()

            do_login(u1)
            self.assertIn(CURR_USER_KEY, session)
            do_logout()
            self.assertNotIn(CURR_USER_KEY, session)

    def test_homepage_anon(self):
        """Test homepage w/ anon user route."""

        with self.client:
            response = self.client.get('/')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'United States News', response.data)

    def test_homepage_logged_in(self):
        """Test homepage w/ logged in user route."""
        u1 = User.query.filter_by(username='testuser').one()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = c.get('/')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Virginia News', response.data)

    def test_homepage_logged_in_except(self):
        """Test homepage w/ logged in user and 
        bad API call route."""

        u1 = User.query.filter_by(username='testuser').one()
        u1.location = 'US-FAKE'
        db.session.add(u1)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = c.get('/')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'No data found for your region.', response.data)

    def test_homepage_with_location(self):
        """Test homepage route with location params."""

        with self.client:
            response = self.client.get('/?location=US-CA')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'California News', response.data)

            response = self.client.get('/?location=US-FAKE')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'No data found for that region.', response.data)

    def test_show_404(self):
        """Test 404 error route."""

        with self.client:
            response = self.client.get('/fake-route')
            self.assertEqual(response.status_code, 404)
            self.assertIn(b'Page Not Found!', response.data)

    def test_signup_GET(self):
        """Test signup GET route."""

        with self.client:
            response = self.client.get('/signup')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Create a free account', response.data)

    def test_signup_POST(self):
        """Test signup POST route."""
        with app.app_context():
            form = UserAddForm(username='testUser3',
                               password='testPassword123!',
                               confirm='testPassword123!',
                               location="US-CA")
        with self.client:
            response = self.client.post(
                '/signup', data=form.data, follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Signup successful.', response.data)
            self.assertIsNotNone(User.query.filter_by(
                username='testUser3').one())

    def test_signup_POST_2(self):
        """Test signup POST route w/ taken username."""

        with app.app_context():
            User.signup(
                username='testUser3', password='testPassword123!', location='US-CA')
            db.session.commit()
            form = UserAddForm(username='testUser3',
                               password='testPassword123!',
                               confirm='testPassword123!',
                               location="US-CA")
        with self.client:
            response = self.client.post('/signup', data=form.data)
            self.assertIn(b'Username already taken.', response.data)

    def test_login_GET(self):
        """Test login GET route."""

        with self.client:
            response = self.client.get('/login')
            self.assertEqual(response.status_code, 200)
            self.assertIn(
                b'Please enter your credentials to continue.', response.data)

    def test_login_POST(self):
        """Test login POST route."""

        User.signup(username='testuser2',
                    password="PASSWORD", location="US-FL")
        db.session.commit()
        with app.app_context():
            form = UserLoginForm(username='testuser2', password='PASSWORD')
        with self.client:
            response = self.client.post(
                '/login', data=form.data, follow_redirects=True)
            self.assertIn(b'Login successful.', response.data)

    def test_login_POST_2(self):
        """Test login POST route w/ invalid credentials."""

        User.signup(username='testuser2',
                    password="PASSWORD", location="US-FL")
        db.session.commit()
        with app.app_context():
            form = UserLoginForm(username='testuser2',
                                 password='WRONG_PASSWORD')
        with self.client:
            response = self.client.post(
                '/login', data=form.data, follow_redirects=True)
            self.assertIn(b'Invalid credentials.', response.data)

    def test_logout(self):
        """Test logout route."""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = 1
            response = c.get('/logout', follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(
                b'You have been successfully logged out.', response.data)

    def test_user_location_GET(self):
        """Test user location GET route w/o logged in user."""

        with self.client:
            u = User.query.first()
            response = self.client.get(
                f'/users/${u.username}/location', follow_redirects=True)
            self.assertIn(b'Unauthorized.', response.data)

    def test_user_location_GET_2(self):
        """Test user location GET route w/ logged in user."""

        u1 = User.query.filter_by(username='testuser').one()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = c.get(
                f'/users/{u1.username}/location', follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Change Location', response.data)

            response = c.get('/users/anotherUser/location',
                             follow_redirects=True)
            self.assertIn(b'Unauthorized.', response.data)

    def test_user_location_GET_3(self):
        """Test wrong user location GET route w/ logged in user."""

        u1 = User.query.filter_by(username='testuser').one()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = c.get('/users/anotherUser/location',
                             follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Unauthorized.', response.data)

    def test_user_location_POST(self):
        """Test user location POST route."""

        u1 = User.query.filter_by(username='testuser').one()
        self.assertNotEqual(u1.location, "US-NM")

        with app.app_context():
            form = UserLocationForm(location="US-NM")
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = self.client.post(
                f'/users/{u1.username}/location', data=form.data, follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Location successfully updated.', response.data)
            u1 = User.query.filter_by(username='testuser').one()
            self.assertEqual(u1.location, "US-NM")

    def test_user_location_POST_2(self):
        """Test wrong user location POST route."""

        u1 = User.query.filter_by(username='testuser').one()
        self.assertNotEqual(u1.location, "US-NM")

        db.session.expunge_all()
        User.signup(username='testuser4',
                    password="PASSWORD", location="US-FL")
        db.session.commit()

        with app.app_context():
            form = UserLocationForm(location="US-NM")
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = self.client.post(
                f'/users/testuser4/location', data=form.data, follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Unauthorized.', response.data)

    def test_user_delete_GET(self):
        """Test user delete GET route w/o logged in user."""

        with self.client:
            u = User.query.first()
            response = self.client.get(
                f'/users/${u.username}/delete', follow_redirects=True)
            self.assertIn(b'Unauthorized.', response.data)

    def test_user_delete_GET_2(self):
        """Test user delete GET route w/ logged in user."""

        u1 = User.query.filter_by(username='testuser').one()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = c.get(
                f'/users/{u1.username}/delete', follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Delete User', response.data)

            response = c.get('/users/anotherUser/location',
                             follow_redirects=True)
            self.assertIn(b'Unauthorized.', response.data)

    def test_user_delete_GET_3(self):
        """Test wrong user delete GET route w/ logged in user."""

        u1 = User.query.filter_by(username='testuser').one()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = c.get('/users/anotherUser/location',
                             follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Unauthorized.', response.data)

    def test_user_delete_POST(self):
        """Test user delete POST route."""

        User.signup(username='testuser5',
                    password="PASSWORD", location="US-FL")
        db.session.commit()

        u = User.query.filter_by(username='testuser5').one()

        with app.app_context():
            form = UserDeleteForm(password="PASSWORD", confirm="PASSWORD")

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u.id
            response = self.client.post(
                f'/users/{u.username}/delete', data=form.data, follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'User account successfully deleted.', response.data)
            u = User.query.filter_by(username='testuser5').all()
            self.assertEqual(len(u), 0)

    def test_user_delete_POST_2(self):
        """Test user delete POST route w/ invalid credentials."""

        User.signup(username='testuser5',
                    password="PASSWORD", location="US-FL")
        db.session.commit()

        u = User.query.filter_by(username='testuser5').one()

        with app.app_context():
            form = UserDeleteForm(password="WRONG_PASSWORD",
                                  confirm="WRONG_PASSWORD")

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u.id
            response = self.client.post(
                f'/users/{u.username}/delete', data=form.data, follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Invalid credentials.', response.data)
            u = User.query.filter_by(username='testuser5').all()
            self.assertEqual(len(u), 1)

    def test_user_delete_POST_3(self):
        """Test wrong user delete POST route."""

        User.signup(username='testuser2',
                    password="PASSWORD", location="US-FL")
        User.signup(username='testuser3',
                    password="PASSWORD", location="US-FL")
        db.session.commit()

        u2 = User.query.filter_by(username='testuser2').one()
        u3 = User.query.filter_by(username='testuser3').one()

        with app.app_context():
            form = UserDeleteForm(password="PASSWORD", confirm="PASSWORD")

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u2.id
            response = self.client.post(
                f'/users/{u3.username}/delete', data=form.data, follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Unauthorized.', response.data)

    def test_saved_articles_GET(self):
        """Test user saved articles GET route w/o logged in user."""

        with self.client:
            u = User.query.first()
            response = self.client.get(
                f'/users/${u.username}/saved-articles', follow_redirects=True)
            self.assertIn(b'Unauthorized.', response.data)

    def test_saved_articles_GET_2(self):
        """Test user saved articles GET route w/ logged in user."""

        u1 = User.query.filter_by(username='testuser').one()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = c.get(
                f'/users/{u1.username}/saved-articles', follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Saved Articles for testuser', response.data)

            response = c.get('/users/anotherUser/location',
                             follow_redirects=True)
            self.assertIn(b'Unauthorized.', response.data)

    def test_saved_articles_GET_3(self):
        """Test wrong user saved articles GET route w/ logged in user."""

        u1 = User.query.filter_by(username='testuser').one()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = c.get('/users/anotherUser/location',
                             follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Unauthorized.', response.data)

    def test_user_saved_articles_POST(self):
        """Test user saved article POST route w/ logged in user."""

        u1 = User.query.filter_by(username='testuser').one()
        a = Article.query.filter_by(saved_by=u1.id).all()

        with app.app_context():
            form = ArticleAddForm(path=a[0].path, url=a[0].url, location=a[0].location,
                                  title=a[0].title, excerpt=a[0].excerpt, image=a[0].image,
                                  source=a[0].source, published_date=datetime.utcnow(), saved_by=u1.id)
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            u1 = User.query.filter_by(username='testuser').one()
            self.assertEqual(len(u1.articles), 1)

            response = c.post(
                f'/users/{u1.username}/saved-articles', data=form.data, follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(u1.articles), 2)

    def test_user_saved_articles_POST_2(self):
        """Test wrong user saved article POST route w/ logged in user."""

        u1 = User.query.filter_by(username='testuser').one()
        a = Article.query.filter_by(saved_by=u1.id).all()
        User.signup(username='testuser2',
                    password="PASSWORD", location="US-FL")
        db.session.commit()
        u2 = User.query.filter_by(username='testuser2').one()

        with app.app_context():
            form = ArticleAddForm(path=a[0].path, url=a[0].url, location=a[0].location,
                                  title=a[0].title, excerpt=a[0].excerpt, image=a[0].image,
                                  source=a[0].source, published_date=datetime.utcnow(), saved_by=u2.id)
        with self.client as c:
            with c.session_transaction() as sess:
                u1 = User.query.filter_by(username='testuser').one()
                u2 = User.query.filter_by(username='testuser2').one()
                a = Article.query.filter_by(saved_by=u2.id).all()
                sess[CURR_USER_KEY] = u1.id
        self.assertEqual(len(a), 0)
        response = c.post(
            f'/users/{u2.username}/saved-articles', data=form.data, follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Unauthorized.', response.data)
        self.assertEqual(len(a), 0)

    def test_user_saved_articles_POST_3(self):
        """Test user saved article POST route w/o logged in user."""

        u1 = User.query.filter_by(username='testuser').one()
        a = Article.query.filter_by(saved_by=u1.id).all()
        User.signup(username='testuser2',
                    password="PASSWORD", location="US-FL")
        db.session.commit()
        u2 = User.query.filter_by(username='testuser2').one()

        with app.app_context():
            form = ArticleAddForm(path=a[0].path, url=a[0].url, location=a[0].location,
                                  title=a[0].title, excerpt=a[0].excerpt, image=a[0].image,
                                  source=a[0].source, published_date=datetime.utcnow(), saved_by=u2.id)
        with self.client:
            response = self.client.post(
                f'/users/{u2.username}/saved-articles', data=form.data, follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Unauthorized.', response.data)

    def test_sort_saved_articles_PATCH(self):
        """Test user sort saved articles PATCH route w/o logged in user."""

        with self.client:
            u = User.query.first()
            response = self.client.patch(
                f'/users/${u.username}/saved-articles', follow_redirects=True)
            self.assertIn(b'Unauthorized.', response.data)
            self.assertEqual(response.status_code, 200)

    def test_sort_saved_articles_PATCH_2(self):
        """Test user sort saved article PATCH route w/ logged in user."""

        u1 = User.query.filter_by(username='testuser').one()
        a = Article.query.filter_by(saved_by=u1.id).all()

        with app.app_context():
            form = ArticleAddForm(path=a[0].path, url=a[0].url, location=a[0].location,
                                  title=a[0].title, excerpt=a[0].excerpt, image=a[0].image,
                                  source=a[0].source, published_date=datetime.utcnow(), saved_by=u1.id)
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            c.post(
                f'/users/{u1.username}/saved-articles', data=form.data, follow_redirects=True)
            response = c.patch(f'/users/{u1.username}/saved-articles',
                               data='sort=location-desc', follow_redirects=True)
            self.assertIn(b'"data":', response.data)
            self.assertEqual(response.status_code, 200)

    def test_sort_saved_articles_PATCH_3(self):
        """Test wrong user sort saved article PATCH route w/ logged in user."""

        u1 = User.query.filter_by(username='testuser').one()
        User.signup(username='testuser2',
                    password="PASSWORD", location="US-FL")
        db.session.commit()
        u2 = User.query.filter_by(username='testuser2').one()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = c.patch(
                f'/users/{u2.username}/saved-articles', follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Unauthorized.', response.data)

    def test_sort_saved_articles_DELETE(self):
        """Test user sort saved articles DELETE route w/o logged in user."""

        with self.client:
            u = User.query.first()
            response = self.client.delete(
                f'/users/${u.username}/saved-articles', follow_redirects=True)
            self.assertIn(b'Unauthorized.', response.data)
            self.assertEqual(response.status_code, 200)

    def test_sort_saved_articles_DELETE_2(self):
        """Test user sort saved article DELETE route w/ logged in user."""

        u1 = User.query.filter_by(username='testuser').one()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = c.delete(f'/users/{u1.username}/saved-articles',
                                data=f'path=_news%2F2020-04-26-test-article.md', follow_redirects=True)
            self.assertEqual(response.status_code, 200)

    def test_sort_saved_articles_DELETE_3(self):
        """Test wrong user sort saved article DELETE route w/ logged in user."""

        u1 = User.query.filter_by(username='testuser').one()
        User.signup(username='testuser2',
                    password="PASSWORD", location="US-FL")
        db.session.commit()
        u2 = User.query.filter_by(username='testuser2').one()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u1.id
            response = c.delete(
                f'/users/{u2.username}/saved-articles', follow_redirects=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Unauthorized.', response.data)
