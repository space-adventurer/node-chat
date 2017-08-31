var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', function (){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

/*socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hello'
}, function (data) {
    console.log(' **** Got it - ', data);
});*/

jQuery('#message-form').on('submit', function (e) {
   e.preventDefault();

   socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
   }, function () {
       
   });
});