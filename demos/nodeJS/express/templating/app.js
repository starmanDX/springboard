const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

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


app.listen(3000, () => {
    console.log("Server running on port 3000.")
});