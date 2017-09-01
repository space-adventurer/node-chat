const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

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

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

    // Broadcasting event to everyone but current user.
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

    socket.on('createMessage', (message, callback) => {
        console.log('Create message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));

        // Send event back to client.
        callback();
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

