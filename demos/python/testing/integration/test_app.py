from app import app
from flask import session
from unittest import TestCase

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class ColorViewsTestCase(TestCase):
    # @classmethod
    # def setUpClass(cls):
        # print("INSIDE SETUP CLASS")

    # @classmethod
    # def tearDownClass(cls):
        # print("INSIDE TEARDOWN CLASS")

    # def setUp(self):
        # print("INSIDE SETUP")

    # def tearDown(self):
        # print("INSIDE TEARDOWN")

    def test_color_form(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>Color Form</h1>', html)
    
    def test_color_submit(self):
        with app.test_client() as client:
            res = client.post('/fav-color', data={'color': 'orange'})
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h3>Woah! I like orange, too</h3>', html)

    def test_redirect_me(self):
        with app.test_client() as client:
            res = client.get('/redirect-me')

            self.assertEqual(res.status_code, 302)
            self.assertEqual(res.location, 'http://localhost/')

    def test_redirect_me_followed(self):
        with app.test_client() as client:
            res = client.get('/redirect-me', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>Color Form</h1>', html)
    
    def test_session_count(self):
        with app.test_client() as client:
            res = client.get('/')

            self.assertEqual(res.status_code, 200)
            self.assertEqual(session['count'], 1)
    
    def test_session_count_set(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['count'] = 999
            res = client.get('/')
            
            self.assertEqual(res.status_code, 200)
            self.assertEqual(session['count'], 1000)