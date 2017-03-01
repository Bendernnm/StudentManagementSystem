var route = require('express').Router();
var handler = require('../handlers/job');

var access = require('../middleware/access').teacher;

var addJobToStudent = require('../handlers/user').addJob;
var addStudentToSubject = require('../handlers/subject').addToGroup;

route.post('/', access, handler.createJob, addJobToStudent,
    addStudentToSubject, handler.sendMail);

module.exports = route;