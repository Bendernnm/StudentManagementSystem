var route = require('express').Router();
var handler = require('../handlers/notification');

var auth = require('../middleware/auth');

route.get('/', auth, handler.get);
route.delete('/', auth, handler.delete);

module.exports = route;