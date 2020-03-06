from unittest import TestCase
from app import app
from flask import session


class AppTestCase(TestCase):
    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_show_form(self):
        with self.client:
            response = self.client.get('/')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'<button>Convert</button>', response.data)

    def test_show_results(self):
        with self.client as client:
            sent = {'convert_from': 'usd', 'convert_to': 'usd', 'amount': '1'}
            response = client.post('/results', data=sent)

            self.assertEqual(response.status_code, 200)
            self.assertIn(b'The conversion rate is: US$1.00', response.data)
            self.assertIn(b'<a href="/">Home</a>', response.data)

    def test_show_results_redirect(self):
        with self.client as client:
            sent = {'convert_from': 'xxx', 'convert_to': 'xxx', 'amount': '1'}
            response = client.post('/results', data=sent)

            self.assertEqual(response.status_code, 302)

    def test_show_results_redirect_2(self):
        with self.client as client:
            sent = {'convert_from': 'xxx', 'convert_to': 'xxx', 'amount': '1'}
            response = client.post('/results', data=sent,
                                   follow_redirects=True)

            self.assertEqual(response.status_code, 200)
            self.assertIn(b'<p class="error">', response.data)
