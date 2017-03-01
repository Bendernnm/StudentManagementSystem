var app = require('./app');
var httpServer = require('http').createServer(app);

var config = require('./config');
var error = require('./helpers/errorConnection');
require('./helpers/socket')(httpServer);

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db.url);

var db = mongoose.connection;
db.on('error', error);
db.once('open', function () {
    console.log('@open connection');
    
    require('dns').lookup(require('os').hostname(), function (err, ip) {
        if (err) return error();

        httpServer.listen(config.server.port, ip, function () {
            console.log('Start server:  ' + ip + ':' + config.server.port);
        });

    });
});
