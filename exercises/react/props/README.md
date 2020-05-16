# JSX Exercises

## Part 1

For this assignment you will be creating three components:

### FirstComponent

    renders an h1 with the text “My very first component”.

### NamedComponent

    renders a p that should accept a property of “name” and display text “My name is name”.

### App

    renders a div with instances of the other two components.

## Part 2

Define a Tweet component which takes as props the username of the user who wrote the tweet, the name of the user who wrote the tweet, the date of the tweet, and the message being tweeted.

Create an App component that renders at least three tweets.

## Part 3

Create a component called Person. Inside of this component, render a p tag which displays “Learn some information about this person”. Each person should have name and age properties.

If the person is over 18 years old, display an additional h3 that says “please go vote!”. Otherwise, display an h3 that says “you must be 18”. If the person’s name is longer than 8 characters, only display the first six characters of their name.

Add a property called hobbies to your Person component that accepts an array of hobbies (an array of strings). Your Person component should list each one of these hobbies as an li.

Add an App component that renders at least three copies of the Person component on the page.

## Further Study

### Componentizing Components

You may recall that bootstrap’s UI elements are referred to in the documentation as “components.” Using your knowledge of React so far, build a couple bootstrap components as React components. Good candidates include the Alert, Button, and Card components.

Don’t worry about building Bootstrap components that use JavaScript (e.g. Carousels, Popovers, Modals, etc). You’ll need to learn a bit more about React in order to implement these components.
