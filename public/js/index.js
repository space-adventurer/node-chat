var socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'serega',
        text: 'privet, eto serega'
    });
});

socket.on('disconnect', function (){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});