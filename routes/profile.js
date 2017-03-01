var route = require('express').Router();
var getProfile = require('../handlers/profile').getProfile;

route.get('/:id', getProfile);

module.exports = route;