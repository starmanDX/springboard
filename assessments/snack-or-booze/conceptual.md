### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
  React Router is used to create dynamic, client-side routes on a single page web app using normal React component structure.
- What is a single page application?
  A single page application is one in which routes dynamically recreate the current page rather than sending a request for a new page load.
- What are some differences between client side and server side routing?
  The major differences between client side and server side routing is that with server side routing, a new request must be made to the server with every route which causes a new page to render. With client-side routing, such as React Router, a single page can be dynamically recreated without having to send a request for a new page.
- What are two ways of handling redirects with React Router? When would you use each?
  You can use either the Redirect component, which is useful for instances like where a user is on a page they shouldn't have gotten to and is automatically redirected, or you can push to the history object which allows the user to then use the forward/backward button to reach the page again, such as after a form submission.
- What are two different ways to handle page-not-found user experiences using React Router?
  The first way would be to use redirect to send the user to a 404 page, or you can use Switch to have a catchall that displays a 404 component for any route that isn't matched.
- How do you grab URL parameters from within a component using React Router?
  URL paramaters can be caught within a component using the useParams hook.
- What is context in React? When would you use it?
  Context is a React API which allows a parent component to pass down data to children without the use of props. This is useful in situations like when you need to pass down information to deeply nested components but don't need to access that information at every level.
- Describe some differences between class-based components and function
  components in React.
  The main differences between class based and functional components are the syntax and class-based component's use of lifecycle methods. Functional components instead use the new hooks features.
- What are some of the problems that hooks were designed to solve?
  Some of the problems solved by hooks include reusability of logic between components, and the cleaning up of complex hard to understand code.
