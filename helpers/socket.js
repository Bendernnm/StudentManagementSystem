module.exports = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (client) {
        client.on('signIn', function (data) {
            console.log('server socket ' + data);
            client.broadcast.emit('signIn', data);
        });
    });
};