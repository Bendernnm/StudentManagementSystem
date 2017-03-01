var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var config = require('./config');
require('./models')();
var routeLog = require('./middleware/routeLog');

var app = express();
app.use(express.static(__dirname + config.public));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(routeLog);

require('./routes')(app);

module.exports = app;