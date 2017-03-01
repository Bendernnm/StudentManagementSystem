var route = require('express').Router();
var handler = require('../handlers/comment');

var access = require('../middleware/access');

var addComment = require('../handlers/post').addComment;
var deleteComment = require('../handlers/post').deleteComment;

route.route('/')
    .get(handler.getComments)
    .post(access.user, handler.createComment, addComment);

route.delete('/:id', access.admin, handler.deleteComment, deleteComment);

module.exports = route;