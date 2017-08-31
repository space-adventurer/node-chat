var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', function (){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});