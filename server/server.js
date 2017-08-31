const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
// Create websockets server.
const io = socketIO(server);

// Register an event listener.
// Listen for a new connection from client.
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the Chat App',
        createdAt: new Date().getTime()
    });

    // Broadcasting event to everyone but current user.
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

    socket.on('createMessage', (message) => {
        console.log('Create message', message);
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
