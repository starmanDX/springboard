const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');

// serve files in the 'public' directory as '/filename.ext'
app.use(express.static("public"));
// serve files in 'public/css' directory as '/css/filename.ext'
app.use('/css', express.static("public/css"));
app.use(cookieParser())

// configure this to leave off .html from render files.
app.set('view engine', 'html')

// configure nunjucks to the views directory
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/dogs/:name', (req, res, next) => {
    res.render('dog', {name: req.params.name});
});

// parses any cookies in the browser as JSON
app.get('/showmecookies', (req, res, next) => {
    // sets a cookie in the browser
    res.cookie('isLoggedIn', 'true')
    res.send(req.cookies);
})


app.listen(3000, () => {
    console.log("Server running on port 3000.")
});