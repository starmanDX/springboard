# GroupChat

GroupChat is an Express-based app that uses websocks for a live, multi-room chat system.

In this exercise, you’ll explore good OO design for more sophisticated applications, as well as get some hands-on practice with websockets.

We provide working code to you; the exercise is both to explore this code and add some new features, listed at the end.

## Trying Out The App

```bash
\$ node server.js
```

Then go to http://localhost:3000/room-name. You can use any room name you want — so you can go to “/random” or “/humor” or “/library” or such — each of these will be a different room with different possible users.

Open a second tab on the same computer and visit the same room, and you should be able to chat with each other.

## Client-Side Code

The HTML is straightforward; it shows a list of messages and has a form for a new message:

chat.html
    <!doctype html>
    <html>
    <head>
    <title>GroupChat</title>
    <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>

    <ul id="messages"></ul>

    <form id="msg-form">
    <input id="m" autocomplete="off"/>
    <button>Send</button>
    </form>

    <script src="https://unpkg.com/jquery"></script>
    <script src="/js/chat.js"></script>

    </body>
    </html>

The client-side JS makes a websocket connection to the server (injecting the roomName into the ws URL), and handles websocket events:

static/js/chat.js

    /\*_ Client-side of groupchat. _/

    const urlParts = document.URL.split("/");
    const roomName = urlParts[urlParts.length - 1];
    const ws = new WebSocket(`ws://localhost:3000/chat/${roomName}`);

    const name = prompt("Username?");

    /\*_ called when connection opens, sends join info to server. _/

    ws.onopen = function(evt) {
    console.log("open", evt);

    let data = {type: "join", name: name};
    ws.send(JSON.stringify(data));
    };

    /\*_ called when msg received from server; displays it. _/

    ws.onmessage = function(evt) {
    console.log("message", evt);

    let msg = JSON.parse(evt.data);
    let item;

    if (msg.type === "note") {
    item = \$(`<li><i>${msg.text}</i></li>`);
    }

    else if (msg.type === "chat") {
    item = \$(`<li><b>${msg.name}: </b>${msg.text}</li>`);
    }

    else {
    return console.error(`bad message: ${msg}`);
    }

    \$('#messages').append(item);
    };

    /\*_ called on error; logs it. _/

    ws.onerror = function (evt) {
    console.error(`err ${evt}`);
    };

    /\*_ called on connection-closed; logs it. _/

    ws.onclose = function (evt) {
    console.log("close", evt);
    };

    /\*_ send message when button pushed. _/

    \$('form').submit(function (evt) {
    evt.preventDefault();

    let data = {type: "chat", text: \$("#m").val()};
    ws.send(JSON.stringify(data));

    \$('#m').val('');
    });

## Server-Side Code

Warning: STOP and try to not read all the code!

    This app is designed with two classes that encapsulate functionality around chat rooms and chat users. Read through the express app.js and see if you can get a sense of what the ChatUser class does before you look at the code for it.

    Similarly, don’t read the Room class until you’ve gotten a sense of what is should do.

    In real life, you’ll often read code like this, “top-down” — looking at the overall application, and only digging into particular parts when you need to really understand how they work.

### Express App

We use an npm package, ws-express, which makes it easy to have Express routes which use websockets. We define one route, which handles connections to /chat/[roomName].

Otherwise, it’s a fairly straightforward Express app:

- it serves static CSS/JS
- it serves a static HTML page

app.js

    /\*_ app for groupchat _/

    const express = require('express');
    const app = express();

    // serve stuff in static/ folder

    app.use(express.static('static/'));

    /\*_ Handle websocket chat _/

    // allow for app.ws routes for websocket routes
    const wsExpress = require('express-ws')(app);

    const ChatUser = require('./ChatUser');

    /\*_ Handle a persistent connection to /chat/[roomName]
    _

    - Note that this is only called _once_ per client --- not every time
    - a particular websocket chat is sent.
    -
    - `ws` becomes the socket for the client; it is specific to that visitor.
    - The `ws.send` method is how we'll send messages back to that socket.
    \*/

    app.ws('/chat/:roomName', function(ws, req, next) {
    try {
    const user = new ChatUser(
    ws.send.bind(ws), // fn to call to message this user
    req.params.roomName // name of room for user
    );

        // register handlers for message-received, connection-closed

        ws.on('message', function(data) {
        try {
            user.handleMessage(data);
        } catch (err) {
            console.error(err);
        }
        });

        ws.on('close', function() {
        try {
            user.handleClose();
        } catch (err) {
            console.error(err);
        }
        });

    } catch (err) {
    console.error(err);
    }
    });

    /\*_ serve homepage --- just static HTML
    _

    - Allow any roomName to come after homepage --- client JS will find the
    - roomname in the URL.
    -
    - \*/

    app.get('/:roomName', function(req, res, next) {
    res.sendFile(`${__dirname}/chat.html`);
    });

    module.exports = app;

As always, there’s a small server.js to start up the server.

### Chat User and Chat Room Classes

We’ve code to encapsulate functionality of a chat user:

chatuser.js

    /\*_ Functionality related to chatting. _/

    // Room is an abstraction of a chat channel
    const Room = require('./Room');

    /\*_ ChatUser is a individual connection from client -> server to chat. _/

    class ChatUser {
    /\*_ make chat: store connection-device, rooom _/

    constructor(send, roomName) {
    this.\_send = send; // "send" function for this user
    this.room = Room.get(roomName); // room user will be in
    this.name = null; // becomes the username of the visitor

        console.log(`created chat in ${this.room.name}`);

    }

    /\*_ send msgs to this client using underlying connection-send-function _/

    send(data) {
    try {
    this.\_send(data);
    } catch {
    // If trying to send to a user fails, ignore it
    }
    }

    /\*_ handle joining: add to room members, announce join _/

    handleJoin(name) {
    this.name = name;
    this.room.join(this);
    this.room.broadcast({
    type: 'note',
    text: `${this.name} joined "${this.room.name}".`
    });
    }

    /\*_ handle a chat: broadcast to room. _/

    handleChat(text) {
    this.room.broadcast({
    name: this.name,
    type: 'chat',
    text: text
    });
    }

    /\*_ Handle messages from client:
    _

    - - {type: "join", name: username} : join
    - - {type: "chat", text: msg } : chat
        \*/

    handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);

        if (msg.type === 'join') this.handleJoin(msg.name);
        else if (msg.type === 'chat') this.handleChat(msg.text);
        else throw new Error(`bad message: ${msg.type}`);

    }

    /\*_ Connection was closed: leave room, announce exit to others _/

    handleClose() {
    this.room.leave(this);
    this.room.broadcast({
    type: 'note',
    text: `${this.name} left ${this.room.name}.`
    });
    }
    }

    module.exports = ChatUser;

We have code to encapsulate functionality of a chat room:

room.js

    /\*_ Chat rooms that can be joined/left/broadcast to. _/

    // in-memory storage of roomNames -> room

    const ROOMS = new Map();

    /\*\* Room is a collection of listening members; this becomes a "chat room"

    - where individual users can join/leave/broadcast to.
    \*/

    class Room {
    /\*_ get room by that name, creating if nonexistent
    _

    - This uses a programming pattern often called a "registry" ---
    - users of this class only need to .get to find a room; they don't
    - need to know about the ROOMS variable that holds the rooms. To
    - them, the Room class manages all of this stuff for them.
    \*\*/

    static get(roomName) {
    if (!ROOMS.has(roomName)) {
    ROOMS.set(roomName, new Room(roomName));
    }

        return ROOMS.get(roomName);

    }

    /\*_ make a new room, starting with empty set of listeners _/

    constructor(roomName) {
    this.name = roomName;
    this.members = new Set();
    }

    /\*_ member joining a room. _/

    join(member) {
    this.members.add(member);
    }

    /\*_ member leaving a room. _/

    leave(member) {
    this.members.delete(member);
    }

    /\*_ send message to all members in a room. _/

    broadcast(data) {
    for (let member of this.members) {
    member.send(JSON.stringify(data));
    }
    }
    }

    module.exports = Room;

Note: Design Note

    (It may be worthwhile to notice the design here: neither of these is particularly hard-coded to websockets. As long as ChatUser is given a send function it can call to send a response, they’re pretty agnostic. You could re-use these in a plain-HTTP chat system or even a very different domain, like a chat-by-email system.)

## Tasks

There are different features you can add to this, depending on how much time you have. They’re ordered by estimated difficulty.

### Get a Joke!

Add a feature where users can get a joke from the server.

If the user types /joke into the new message field, this should not be broadcast to all users — instead, it should return a joke to just that user. (You can always return the same joke, pick a random one from a list, or, if you’re feeling ambitious, use the icanhazdadjokes.com API).

### Listing Members

Add a feature where users can see a list of all the members in a room.

If the user types /members into the new message field, this should not be broadcast to all users — instead, it should return a list the usernames of the users in the current room, like: “In room: juanita, jenny, jeff”.

### Send Private Message

Add a command like /priv user message that sends a private message that only that other user sees.

### Change Your Username

Add a command like /name myNewName that change your username. You’ll need to figure out how to communicate this to server. It should announce this change to the room you’re in.
