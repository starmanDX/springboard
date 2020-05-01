const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

app.use(express.static(__dirname + '/public'));

let counter = 0

app.get('/', function (req, res, next) {
    res.render('index.html');
});

// increment counter on receipt of message from client, and 
// send updated counter to all connected clients
app.ws('/counter', function (ws, req) {
    ws.send(counter)
    ws.on('message', function (data) {
        counter++
        expressWs.getWss().clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(counter);
            }
        })
        console.log("CLIENT TO SERVER:", data);
    })
});

app.listen(3000);