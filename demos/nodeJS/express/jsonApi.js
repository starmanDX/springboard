const express = require('express');
const app = express();

app.use(express.json());

const CANDIES = [
    { name: "Snickers", qty: 43, price: 1.50 },
    { name: "Skittles", qty: 12, price: 0.99 },
]

// returns the CANDIES array as JSON
app.get('/candies', (req, res) => {
    res.json(CANDIES);
})

// pulls the json from the post request body and
// adds it to the CANDIES array then displays
// the array as JSON with a status code of 201
app.post('/candies', (req, res) => {
    if (req.body.name.toLowerCase() === "circus peanuts") {
        res.status(403).json({msg:"HORRIBLE CHOICE. CIRCUS PEANUTS FORBIDDEN!"})
    }
    CANDIES.push(req.body)
    res.status(201).json(CANDIES);
})

app.listen(3000, () => {
    console.log('Server running on port 3000!')
})