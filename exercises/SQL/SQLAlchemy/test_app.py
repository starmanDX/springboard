from unittest import TestCase
from app import app
from flask import session
from models import db, User, Post, Tag, PostTag

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class UserTests(TestCase):
    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def tearDown(self):
        db.session.rollback()

    def test_not_found(self):
        with self.client:
            response = self.client.get('/404')
            self.assertIn(b'<a href="/">Go to the Homepage', response.data)

    def test_show_home(self):
        with self.client:
            response = self.client.get('/')
            self.assertIn(
                b'<h1 class="centered">Blogly Recent Posts', response.data)

    def test_show_users(self):
        with self.client:
            response = self.client.get('/users')
            self.assertIn(b'<h1>Blogly Users', response.data)

    def test_show_new_user_form(self):
        with self.client:
            response = self.client.get('/users/new')
            self.assertIn(b'<h1>Create A User', response.data)

    def test_redirect(self):
        with self.client as client:
            res = client.post('/users/new', data={'first-name': 'test_first1',
                                                  'last-name': 'test_last1', 'image-url': 'www.google.com'})

            self.assertEqual(res.status_code, 302)
            self.assertEqual(res.location, 'http://localhost/users')

    def test_create_user(self):
        with self.client as client:
            res = client.post('/users/new', data={'first-name': 'test_first2',
                                                  'last-name': 'test_last2', 'image-url': 'www.google.com'}, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn(
                '<p class="flash">New user test_first2 test_last2 created!</p>', html)

    def test_show_user_details(self):
        with self.client as client:
            user = User.query.filter_by(first_name='test_first1').one()
            res = client.get(f'/users/{user.id}')

            self.assertEqual(res.status_code, 200)
            self.assertIn(b'<h1>test_first1 test_last1', res.data)

    def test_show_edit_user_form(self):
        with self.client:
            user = User.query.filter_by(first_name='test_first1').one()
            response = self.client.get(f'/users/{user.id}/edit')
            self.assertIn(
                b'<h1>Edit Details for test_first1 test_last1', response.data)

    def test_redirect_2(self):
        with self.client as client:
            user = User.query.filter_by(first_name='test_first1').one()
            res = client.post(f'/users/{user.id}/edit', data={'first-name': 'test_first1',
                                                              'last-name': 'test_last1', 'image-url': 'www.google.com'})

            self.assertEqual(res.status_code, 302)
            self.assertEqual(res.location, f'http://localhost/users/{user.id}')

    def test_edit_user(self):
        with self.client as client:
            res = client.post('/users/1/edit', data={'first-name': 'test_first_1',
                                                     'last-name': 'test_last_1', 'image-url': 'www.google.com'}, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn(
                '<p class="flash">User updated!</p>', html)
            self.assertIn(
                b'<h1>test_first_1 test_last_1', res.data)

class DeleteUserTests(TestCase):
    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def tearDown(self):
        db.session.rollback()

    def test_redirect_3(self):
        with self.client as client:
            user = User.query.filter_by(first_name='test_first1').one()
            res = client.post(f'/users/{user.id}/delete')

            self.assertEqual(res.status_code, 302)
            self.assertEqual(res.location, f'http://localhost/users')

    def test_delete_user(self):
        with self.client as client:
            res = client.post('/users/1/delete', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn(
                '<p class="flash">User deleted!</p>', html)