module.exports = function (handler) {
    var route = require('express').Router();
    var addToGroup = require('../handlers/group').addToGroup;
    var sendMail = require('../handlers/user').sendGroup;

    route.get('/', handler.verification);
    route.patch('/admin', handler.verificationAdmin);
    route.patch('/teacher', handler.verificationTeacher);
    route.patch('/student', handler.verificationStudent, addToGroup, sendMail);

    return route;
};