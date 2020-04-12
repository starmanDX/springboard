# Broken App Issues

1. Changed 'axios' let variable to a const.
2. Changed 'app' var to a const.
3. Changed app.listen to be a proper server startup function.
4. Ran NPM init and npm installed express and axios
5. Added err arg to route's try/catch
6. Changed app routes to return json
7. Changed '/' post route to be an async function
8. Changed 'out' variable to be a map of the results of await Promise.all(results), including a catch for errors.
9. Changed 'results' and 'out' variable names to 'devPromises' and 'devData' respectively.
10. Added error handling route.
11. Added comments.