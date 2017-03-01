define(['socketio',
        'alertify'],
    function (socket,
              alertify) {
        var socket = socket.connect({});

        socket.on('signIn', function (data) {
            alertify.success(data + ' logged.');
        });

        function send(name) {
            console.log('send ' + name);
            socket.emit('signIn', name);
        }

        return {send: send};
    });