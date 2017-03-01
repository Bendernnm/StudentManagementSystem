var route = require('express').Router();
var handler = require('../handlers/group');

var auth = require('../middleware/auth');
var access = require('../middleware/access');

route.route('/')
    .get(auth, access.user, handler.getAllGroups)
    .post(auth, access.admin, handler.createNewGroup);

route.route('/:id')
    .get(auth, access.user, handler.getGroup)
    .patch(auth, access.admin, handler.updateGroup)
    .delete(auth, access.admin, handler.deleteGroup);


module.exports = route;