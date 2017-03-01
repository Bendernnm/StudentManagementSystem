var multer = require('multer');
var upload = multer({dest: 'public/uploads/'});

var route = require('express').Router();
var handler = require('../handlers/auth');

var auth = require('../middleware/auth');
var access = require('../middleware/access');

var verification = require('./verification')(handler);

route.route('/')
    .get(handler.checkAuth);

route.route('/registration')
    .post(upload.single('avatar'), handler.registration);

route.route('/sign')
    .post(handler.signIn)
    .delete(handler.signOut);

route.route('/forgotPassword')
    .patch(handler.forgotPassword);

route.use('/verification', auth, access.admin, verification);

module.exports = route;