const express = require('express');
const ExpressError = require('./expressError');
const app = express();

// Parse request bodies for JSON
app.use(express.json());

const uRoutes = require('./routes/users');
app.use('/users', uRoutes);

// 404 handler
app.use((req, res, next) => {
    const err = new ExpressError('Not Found', 404);

    // pass err to the next middleware
    return next(err);
})

// general error handler
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