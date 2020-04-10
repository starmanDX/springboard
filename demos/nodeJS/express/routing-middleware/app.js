const express = require('express');
const ExpressError = require('./expressError');
const middleware = require('./middleware');
const morgan = require('morgan');

const userRoutes = require('./userRoutes');

const app = express();

// tells the app to use on every following route
app.use(express.json());
//app.use(middleware.logger)
app.use(morgan('dev'))
app.use('/api/users', userRoutes);

// avoids throwing an error when requesting favicon
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.get('/secret', middleware.checkForPassword, (req, res, next) => {
    return res.send('YOU KNOW THE PASSWORD!');
})

app.get('/private', middleware.checkForPassword, (req, res, next) => {
    return res.send('YOU HAVE REACHED THE PRIVATE PAGE!');
})

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

app.listen(3000, () => {
    console.log('Server running on port 3000!');
})