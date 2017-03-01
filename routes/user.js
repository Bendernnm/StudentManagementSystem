var route = require('express').Router();
var handler = require('../handlers/user');

var auth = require('../middleware/auth');

var teacher = require('./teacher')(handler);
var student = require('./student')(handler);

route.use('/teachers', auth, teacher);
route.use('/students', auth, student);

route.route('/:id')
    .get(handler.getUser)
    .patch(handler.updateUser)
    .delete(handler.deleteUser);

module.exports = route;