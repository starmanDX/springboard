import arithmetic
from unittest import TestCase


class AdderTestCase(TestCase):
    """Examples of unit tests"""

    # def test_adder(self):
        # assert arithmetic.adder(2, 3) == 5

    def test_adder_2(self):
        # use this instead of assert above
        self.assertEqual(arithmetic.adder(2, 2), 4)
        self.assertEqual(arithmetic.adder(40, 50), 90)
        self.assertEqual(arithmetic.adder(-4, -2), -6)
