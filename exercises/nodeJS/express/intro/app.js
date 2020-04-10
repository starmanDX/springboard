const express = require('express');
const path = require('path');
const ExpressError = require('./customError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname + "/views/index.html"));
    } catch (e) {
        next(e);
    }
})

app.get('/mean', (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname + '/views/mean.html'))
    } catch (e) {
        next(e);
    }
})

app.post('/mean', (req, res, next) => {
    try {
        res.send(`<h1>Mean Calculator Results</h1 <p>The mean of ${req.body.num1}, ${req.body.num2}, and ${req.body.num3} is: ${(parseInt(req.body.num1) + parseInt(req.body.num2) + parseInt(req.body.num3)) / 3}</p>`)
    } catch (e) {
        next(e);
    }
})

app.get('/median', (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname + '/views/median.html'))
    } catch (e) {
        next(e);
    }
})

app.post('/median', (req, res, next) => {
    try {
        let nums = []
        nums.push(req.body.num1, req.body.num2, req.body.num3)
        nums.sort()
        res.send(`<h1>Median Calculator Results</h1 <p>The median of ${req.body.num1}, ${req.body.num2}, and ${req.body.num3} is: ${nums[1]}</p>`)
    } catch (e) {
        next(e);
    }
})

app.get('/mode', (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname + '/views/mode.html'))
    } catch (e) {
        next(e);
    }
})

app.post('/mode', (req, res, next) => {
    try {
        let nums = []
        let mode = 0;
        let count = 0;
        nums.push(req.body.num1, req.body.num2, req.body.num3)
        nums.sort()

        for (let i = 0; i < nums.length; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[j] === nums[i]) {
                    mode = nums[j];
                    count++;
                }
            }
        }
        if (mode === 0) {
            res.send(`<h1>Mode Calculator Results</h1 <p>This set of numbers has no mode!`)
        } else {
            res.send(`<h1>Mode Calculator Results</h1 <p>The mode of ${req.body.num1}, ${req.body.num2}, and ${req.body.num3} is: ${mode}</p>`)
        }
    } catch (e) {
        next(e);
    }
})

app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    return next(e);
})

app.use((error, req, res, next) => {
    let status = error.status || 500;
    let message = error.msg;

    return res.status(status).json({
        error: {
            message,
            status
        }
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000!')
})