from unittest import TestCase
from algorithms import reverse_str, is_palindrome, factorial

class AlgorithmsTestCase(TestCase):
    def test_reverse(self):
        self.assertEqual(reverse_str('hello'), 'olleh')
        self.assertEqual(reverse_str('Apple'), 'elppA')
    
    def test_is_palindrome(self):
        self.assertTrue(is_palindrome('racecar'))
        self.assertTrue(is_palindrome('kayak'))
        # Should ignore casing
        self.assertTrue(is_palindrome('Kayak'))
        self.assertFalse(is_palindrome('taco'))

    def test_factorial(self):
        self.assertEqual(factorial(5), 120)
        self.assertEqual(factorial(3), 6)
        self.assertRaises(ValueError, factorial, -1)
        self.assertRaises(ValueError, factorial, 1.5)