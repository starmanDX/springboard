def print_upper_words(words):
    """Prints out each word in uppercase"""

    for word in words:
        print(word.upper())


print(print_upper_words(["HELLO", "GOODBYE"]), "should print 'hello', 'goodbye'")

def print_upper_words2(words):
    """Prints out each word that starts with "e" in uppercase"""

    for word in words:
        if word.startswith("e") or word.startswith("E"):
            print(word.upper())

print(print_upper_words2(["alpha", "beta", "echo", "Echelon"]), "should print 'ECHO', 'ECHELON'")

def print_upper_words3(words, must_start_with):
    """Prints out each word that starts with the passed params"""

    for word in words:
        for letter in must_start_with:
            if word.startswith(letter):
                print(word.upper())
                break

print(print_upper_words3(["hello", "hey", "goodbye", "yo", "yes"], must_start_with={"h", "y"}), "should print 'HELLO', 'HEY', 'YO', 'YES'")
