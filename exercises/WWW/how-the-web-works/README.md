# How Web Works Exercise

## Part One: Solidify Terminology

In your own terms, define the following terms:

1. What is HTTP? HTTP, or Hyper Text Transfer Protocol, is the system that determines how data is sent to and recieved from a sever.
2. What is a URL? A URL, or Uniform Resource Locator, is the address of some content on the internet.
3. What is DNS? DNS, or Domain Name Systems, are databases which store and convert URLs to and from their IP address counterparts.
4. What is a query string? A query string is the part of a URL where request info can be passed via a key and value pair.
5. What are two HTTP verbs and how are they different? GET is an HTTP request which "gets" some data to display to the client; POST is an HTTP request which "posts" some data to the server to be used by it.
6. What is an HTTP request? A request made by a client to a server via HTTP.
7. What is an HTTP response? The response received by the client from a server via HTTP.
8. What is an HTTP header? Give a couple examples of request and response headers you have seen. An HTTP header provides additional information for an HTTP request or response. Examples include host, accept-language, last-modified, and content-type.
9. What are the processes that happen when you type “http://somesite.com/some/page.html” into a browser? The browser looks up the IP address of the URL using DNS then makes an HTTP request to the IP address. The server then sends a response and the browser uses that response to create an HTML DOM including resources like images and javascript which each require their own additional browser requests.

## Part Two: Practice Tools

- Using curl, make a GET request to the icanhazdadjoke.com API to find all jokes involving the word “pirate”
- Use dig to find what the IP address is for icanhazdadjoke.com
- Make a simple web page and serve it using python3 -m http.server. Visit the page in a browser.

## Part Three: Explore Dev Tools

Build a very simple HTML form that uses the GET method (it can use the same page URL for the action) when the form is submitted.

Add a field or two to the form and, after submitting it, explore in Chrome Developer tools how you can view the request and response headers.

Edit the page to change the form type to POST, refresh in the browser and re-submit. Do you still see the field in the query string? Explore in Chrome how you can view the request and response headers, as well as the form data.

## Part Four: Explore the URL API

At times, it’s useful for your JavaScript to look at the URL of the browser window and change how the script works depending on parts of that (particularly the query string).

Read about the URL API

Try some of the code examples in the Chrome Console so that you can get comfortable with the basic methods and properties for instances of the URL class.
