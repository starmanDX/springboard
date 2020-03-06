### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?

  1. Python is an object oriented programming language while Javascript is not.
  2. Javascript has implicit conversion between data types while Python does not.
  3. Javascript can be used to run on the front end while Python is backend.
  4. Javascript runs in the browser.
  5. Python uses "self" while Javascript uses "this"

- Given a dictionary like `{"a": 1, "b": 2}`: , list two ways you
  can try to get a missing key (like "c") _without_ your programming
  crashing.

  1. dict.get('c', default_value)
  2. for i in dict: if 'c' in i: print(i['c'])

- What is a unit test?

  - A unit test tests the functionality of a single function or piece of functionality.

- What is an integration test?

  - An integration test tests whether multiple functions and pieces of functionality work correctly together in an application.

- What is the role of web application framework, like Flask?

  - Their role is to provide a standardized way to build a web application using libraries, APIs, and other resources.

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?

  - You might choose to use a URL route if there are a small number of parameters, like a series of questions similar to a survey. A URL query would be useful if there are many parameters or lots of unrelated data being passed from a form, for example.

- How do you collect data from a URL placeholder parameter using Flask?

  - Pass the placeholder parameter in the URL route as an argument to the route function.

- How do you collect data from the query string using Flask?
  
  - parameter = request.args['parameter']

- How do you collect data from the body of the request using Flask?

  - data = request.data

- What is a cookie and what kinds of things are they commonly used for?
  
  - A cookie is information stored in a browser for a particular website, often containing data pertaining to a user's use of that website such as shopping cart info or number of visits.

- What is the session object in Flask?

  - The session object in Flask is a dictionary-like object used to get and set session data on a web application.

- What does Flask's `jsonify()` do?

  - Jsonify() takes a given set of arguments and converts them into a JSON-formatted response.

- What was the hardest part of this past week for you?
  What was the most interesting?

    - The hardest part of this week, not counting this assessment, was the flask-boggle exercise while the most interesting was learning about testing in Python and how different it is compared to Javascript testing.
