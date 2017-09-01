var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('HH:mm:ss - DD.MM.YYYY');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageBox.val(),
    }, function () {
        messageBox.val('');
    });
});