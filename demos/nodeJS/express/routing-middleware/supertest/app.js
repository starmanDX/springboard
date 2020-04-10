const express = require('express');
const ExpressError = require('../expressError');
const catRoutes = require('./catRoutes');

const app = express();

// tells the app to use on every following route
app.use(express.json());
app.use('/cats', catRoutes);


// 404 handler
app.use((req, res) => {
    return new ExpressError('Not Found!', 404);
});

// generic error handler
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

module.exports = app;