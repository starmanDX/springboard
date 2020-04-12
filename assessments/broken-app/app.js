const express = require('express');
const axios = require('axios');
const app = express();

// tell all routes to recognize any
// incoming request as a JSON object
app.use(express.json());

// route for retreiving developer data, given
// a JSON list of developer names
app.post('/', async function(req, res, next) {
  try {
    // create an array of promises from the
    // developer names in the request body
    let devPromises = req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });

    // await the promise requests and map the
    // resulting data as JSON to devData variable
    let devData = await Promise.all(devPromises)
      .then(res => res.map(r => ({ name: r.data.name, bio: r.data.bio })));

    // return devData JSON object to user
    return res.send(devData);
  } catch (err) {
    // if error, catch and forward to
    // error handling route
    next(err);
  }
});

// route for handling errors
app.use((err, req, res, next) => {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

// start up the server on port 3000
app.listen(3000, () => {
  console.log('***Server running on port 3000***');
})
