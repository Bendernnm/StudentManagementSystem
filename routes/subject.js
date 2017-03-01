var route = require('express').Router();
var handler = require('../handlers/subject');

var deleteTeacherSubject = require('../handlers/user').deleteSubject;
var deleteJobsOnSubjects = require('../handlers/job').deleteJobsOnSubjects;
var deleteStudentJobs = require('../handlers/user').deleteStudentJobs;

route.route('/')
    .get(handler.getAllSubjects)
    .post(handler.createNewSubject);

route.route('/:id')
    .delete(deleteTeacherSubject, deleteJobsOnSubjects,
        deleteStudentJobs, handler.deleteSubject)
    .patch(handler.updateSubject);

module.exports = route;