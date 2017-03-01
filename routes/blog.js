var route = require('express').Router();
var handler = require('../handlers/blog');

var access = require('../middleware/access');

var addTeacherBlog = require('../handlers/user').addTeacherBlog;
var deleteTeacherBlog = require('../handlers/user').deleteTeacherBlog;

route.route('/')
    .get(access.user, handler.getBlogs)
    .post(access.teacher, handler.createBlog, addTeacherBlog);

route.route('/:id')
    .get(access.user, handler.getBlog)
    .patch(handler.updateBlog)
    .delete(access.admin, deleteTeacherBlog, handler.deleteBlog);

module.exports = route;