module.exports = function (handler) {
    var route = require('express').Router();

    var access = require('../middleware/access');

    route.get('/', access.user, handler.getTeachers);
    route.route('/:id')
        .get(handler.getTeacher)
        .patch(access.admin, handler.addTeacherSubject)
        .delete(access.admin, handler.deleteTeacher);

    return route;
};