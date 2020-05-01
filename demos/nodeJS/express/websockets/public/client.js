const ws = new WebSocket(`ws://localhost:3000/counter`);
const h1 = document.querySelector("h1");
const btn = document.querySelector('#clicker');

ws.onopen = function (evt) {
    // called when browser connects to server
    console.log('SERVER TO CLIENT: CONNECTED!')
};

ws.onmessage = function (evt) {
    // called when server receives a message from the client
    console.log('SERVER TO CLIENT:', evt.data);
    h1.innerHTML = evt.data
};

ws.onclose = function (evt) {
    // called when server closes connection
    console.log('SERVER TO CLIENT: CONNECTION CLOSED!')
};

btn.addEventListener("click", (e) => {
    // sends a message to the server saying the button was clicked
    ws.send('BUTTON WAS CLICKED!')
})