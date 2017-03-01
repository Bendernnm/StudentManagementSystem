var AuthError = require('../errors/AuthError');

var log = require('../helpers/log');
var flag = require('../config/flag');

module.exports = function (req, res, next) {
    log(flag.CHA);
    if (req.session && req.session.account)
        return next();

    next(new AuthError());
};