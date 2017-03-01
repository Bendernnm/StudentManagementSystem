module.exports = function (handler) {
    var route = require('express').Router();

    var access = require('../middleware/access');

    var studentWithoutGroup = require('./studentWithoutGroup')(handler);

    var deleteStudentFromGroup = require('../handlers/group').deleteStudentFromGroup;
    var deleteAllStudentJobs = require('../handlers/job').deleteAllStudentJobs;
    var deleteStudentFromSubject = require('../handlers/subject').deleteStudent;
    var deleteFollower = require('../handlers/blog').deleteFollower;
    var deleteUserComments = require('../handlers/post').deleteUserComments;
    var deleteComments = require('../handlers/comment').deleteUserComments;

    route.use('/studentWithoutGroup', access.admin, studentWithoutGroup);

    route.route('/:id')
        .patch(access.moderator, deleteStudentFromGroup, handler.deleteGroup)
        .delete(access.admin, deleteStudentFromGroup, deleteAllStudentJobs,
            deleteStudentFromSubject, deleteFollower,
            deleteComments, deleteUserComments, handler.deleteUser);

    return route;
};