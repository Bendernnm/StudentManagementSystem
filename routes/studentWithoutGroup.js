module.exports = function (handler) {
    var route = require('express').Router();

    route.get('/', handler.getStudentWithoutGroup);
    route.patch('/:id', handler.setGroup);

    return route;
};