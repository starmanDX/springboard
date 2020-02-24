"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
    """Machine that finds random words from a dictionary."""

    def __init__(self, path):
        """Read dictionary and prints the number items read."""

        dictionary = open(path)
        self.words = self.parse(dictionary)
        print(f"{len(self.words)} words read")

    def parse(self, dictionary):
        """Parses dictionary into a list of words."""

        return [w.strip() for w in dictionary]

    def random(self):
        """Returns a random word."""

        return random.choice(self.words)

class SpecialWordFinder(WordFinder):
    """Special WordFinder that excludes blank lines and comments."""

    def parse(self, dictionary):
        """Parses dictionary into a list of words, excluding blanks and comments."""

        return [w.strip() for w in dict_file
                if w.strip() and not w.startswith("#")]
