const express = require('express');
const ExpressError = require('./custom-error')

const app = express();

app.use(express.json());

function attemptToSafeToDb() {
    throw "CONNECTION ERROR!"
}

const USERS = [{
        username: "StacysMom",
        city: "Reno"
    },
    {
        username: "Rosalina",
        city: "Rosarito"
    },
]

// if username in the url doesnt match a user in the
// array, returns error with status code 404
app.get('/users/:username', (req, res, next) => {
    try {
        const user = USERS.find(u => u.username === req.params.username);
        if (!user) throw new ExpressError('Invalid Username!', 404)
        // if (!user) return res.status(404).send("NOT FOUND!");
        // if (!user) throw "Invalid username!"
        return res.send({
            user
        });
    } catch (e) {
        next(e);
    }
})

// if correct pw isn't passed in the query string,
// returns error with status code 403
app.get('/secret', (req, res, next) => {
    // running the file with nodemon --inspect will
    // cause the chrome dev tools debugger to show
    // at the debugger point
    debugger;
    try {
        if (req.query.password != 'popcorn') {
            throw new ExpressError('INVALID PASSWORD!', 403)
            //  res.status(403).send("INVALID PASSWORD!")
        }
        return res.send('CONGRATS YOU KNOW THE PASSWORD!')
    }
    catch (e) {
        next(e);
    }
})

// runs the function, which then throws a status
// code 500 internal server error
app.get('/savetodb', (req, res, next) => {
    try {
        attemptToSafeToDb();
        return res.send('SAVED TO DB!')
    }
    catch (e) {
        return next(new ExpressError('DATABASE ERROR!'));
    }
})

app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    return next(e);
})

app.use((error, req, res, next) => {
    //sets the default status to 500
    let status = error.status || 500;
    let message = error.msg;

    return res.status(status).json({error: {message, status}})
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})