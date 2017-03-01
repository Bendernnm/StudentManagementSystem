var route = require('express').Router();
var handler = require('../handlers/post');

var access = require('../middleware/access');

var multer = require('multer');
var upload = multer({dest: 'public/files/'});

var addPost = require('../handlers/blog').addPost;
var deletePost = require('../handlers/blog').deletePost;
var pushNotification = require('../handlers/notification').push;
var save = require('../helpers/saveID');

route.post('/', access.teacher, upload.single('file'), handler.createPost, addPost, pushNotification);

route.route('/:id')
    .patch(handler.updatePost)
    .delete(access.admin, deletePost, handler.deletePost);

route.use('/:id/comments', save, require('./comment'));

module.exports = route;