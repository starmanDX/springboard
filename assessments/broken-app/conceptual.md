### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  By using callbacks, promises, and async/await functions.

- What is a Promise?
  A Promise is a javascript guarantee for a future value for a request.

- What are the differences between an async function and a regular function?
  Async functions utilize promises to allow functions to "await" a process before continuing on to the rest of the function's code.

- What is the difference between Node.js and Express.js?
  NodeJS is the back-end engine which runs all the server-side code, while Express provides a framework which is used on top of nodeJS which adds additional functionality.

- What is the error-first callback pattern?
  The error-first callback pattern has the error as the first parameter, and checks for errors in the function first before moving on to the rest of the function.

- What is middleware?
  Middleware is code that runs in the middle of the request/response cycle.

- What does the `next` function do?
  The next function tells the route to move on to the next route.

- What does `RETURNING` do in SQL? When would you use it?
  RETURNING is used to immediately terminate a SQL procedure by returning control to the user.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

  ```js
  async function getUsers() {
    const elie = await $.getJSON('https://api.github.com/users/elie');
    const joel = await $.getJSON('https://api.github.com/users/joelburton');
    const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

    return [elie, matt, joel];
  }
  ```
  1) Poor const naming, as there could be multiple users with the given names.
  2) Code could be DRYed out by looping through the API calls and pushing them to an Promises array.
  3) Promises.all should then be utilized since the array is only being returned if all API calls are successful.
  4) Errors are not being handled, in the case of one or more of the API calls being rejected.