var accessCode = require('../config/access');
var person = require('../config/person');

var AccessError = require('../errors/AccessError');

var log = require('../helpers/log');
var flag = require('../config/flag');

module.exports = {
    admin: function (req, res, next) {
        var userAccess = req.session.account.access;
        var access = userAccess & accessCode.admin;

        var logData = {
            person: person.a,
            access: access
        };
        log(flag.ACS, logData);

        if (access) return next();
        next(new AccessError());
    },
    moderator: function (req, res, next) {
        var userAccess = req.session.account.access;
        var access = userAccess & accessCode.moderator;

        var logData = {
            person: person.a,
            access: access
        };
        log(flag.ACS, logData);

        if (access) return next();
        next(new AccessError());
    },
    teacher: function (req, res, next) {
        var userAccess = req.session.account.access;
        var access = userAccess & accessCode.teacher;

        var logData = {
            person: person.t,
            access: access
        };
        log(flag.ACS, logData);

        if (access) return next();

        next(new AccessError());
    },
    student: function (req, res, next) {
        var userAccess = req.session.account.access;
        var access = userAccess & accessCode.student;

        var logData = {
            person: person.s,
            access: access
        };
        log(flag.ACS, logData);

        if (access) return next();

        next(new AccessError());
    },
    user: function (req, res, next) {
        var userAccess = req.session.account.access;
        var access = userAccess & accessCode.user;

        var logData = {
            person: person.u,
            access: access
        };
        log(flag.ACS, logData);

        if (access) return next();

        next(new AccessError());
    }
};