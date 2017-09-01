var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    /*
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);*/

    var formattedTime = moment(message.createdAt).format('HH:mm:ss - DD.MM.YYYY');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
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