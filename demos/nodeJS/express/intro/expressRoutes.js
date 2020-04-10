const express = require('express');

const app = express();

// tells express to use both JSON and form data
// when parsing  the req.body data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('HOMEPAGE!')
})

// this route to /dogs runs since it appears first
app.get('/dogs', (req, res) => {
    console.log('YOU ASKED FOR /DOGS!')
    res.send("<h1>WOOF WOOF!</h1>")
})

// this route to /dogs is never hit
app.get('/dogs', (req, res) => {
    console.log('YOU ASKED FOR /DOGS AGAIN!')
    res.send("<h1>WOOF WOOF AGAIN!</h1>")
})

app.get('/chickens', (req, res) => {
    res.send('BOCK BOCK BOCK (GET Request)')
})

// write out the full function to give the route an
// indentifier
app.post('/chickens', function createChicken(req, res) {
    res.send('YOU CREATED A NEW CHICKEN (not really) (POST Request)')
})

const greetings = {
    en: 'hello',
    fr: 'bonjour',
    sp: 'hola',
    js: 'konnichiwa'
}

// variables in the route are stored in req.params
app.get('/greet/:language/', (req, res) => {
    lang = req.params.language;
    const greeting = greetings[lang];
    return res.send(greeting);
})

// terms in the query string (such as '/search?sort=latest')
// are stored in req.query
app.get('/search', (req, res) => {
    const { term = 'piggies', sort = 'top' } = req.query
    return res.send(`SEARCH PAGE! Term is ${term}. Sort is ${sort}.`)
})

// headers are stored in req.rawHeaders (as an array)
// or req.headers (as an object with key/value pairs)
app.get('/show-me-headers', (req, res) => {
    console.log(req.rawHeaders)
    console.log(req.headers)
    return res.send(req.headers);
})

app.get('/show-language', (req, res) => {
    const lang = req.headers['accept-language'];
    res.send(`Your lanuage preference is ${lang}.`);
})

app.post('/register', (req, res) => {
    res.send(`Welcome, ${req.body.username}!`);
})

app.listen(3000, () => {
    console.log('Server running on port 3000!')
})