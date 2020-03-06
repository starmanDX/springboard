from app import app
from flask import Flask, flash
from unittest import TestCase
from currency import check_valid_code, calc_conversion
from forex_python.converter import CurrencyCodes, CurrencyRates, Decimal


class CurrencyTestCase(TestCase):
    def setUp(self):
        app.config['TESTING'] = True

    def test_check_valid_code(self):
        with app.test_request_context():
            self.assertTrue(check_valid_code('USD', 'EUR'))
            self.assertFalse(check_valid_code('USDD', 'EURR'))
            self.assertFalse(check_valid_code('USD', 'EURR'))
            self.assertFalse(check_valid_code('USDD', 'EUR'))
    
    def test_calc_conversion(self):
        self.assertEqual(calc_conversion('USD', 'USD', '0'), 'US$0.00')
        self.assertEqual(calc_conversion('USD', 'USD', '.75'), 'US$0.75')
        self.assertEqual(calc_conversion('USD', 'USD', '1'), 'US$1.00')
        self.assertEqual(calc_conversion('USD', 'USD', '1.00'), 'US$1.00')
        self.assertEqual(calc_conversion('USD', 'USD', '1.01'), 'US$1.01')
        self.assertIn('€', calc_conversion('USD', 'EUR', '1.00'))
