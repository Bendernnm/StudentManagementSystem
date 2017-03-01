var User = require('mongoose').model('User');

var access = require('../config/access');
var message = require('../config/message');

var sendMail = require('../helpers/sendMessage');
var passwordGenerator = require('../helpers/generatePassword');
var passwordEncryption = require('../helpers/passwordEncryption');

var DataBaseError = require('../errors/DataBaseError');
var AuthError = require('../errors/AuthError');

var log = require('../helpers/log');
var flag = require('../config/flag');

module.exports = {
    checkAuth: function (req, res, next) {
        var loggedIn = req.session && req.session.loggedIn;
        log(flag.CHATH, loggedIn);

        var status = loggedIn ? 200 : 404;
        var data = loggedIn && req.session.account;

        res.status(status).send(data);
    },
    registration: function (req, res, next) {
        var data = JSON.parse(req.body.data);

        data.avatar = req.file && req.file.filename;
        data.access = 0;
        data.password = passwordEncryption(data.password);

        var user = new User(data);

        user.save(function (err, user) {
            if (err)
                return next(new DataBaseError());

            log(flag.REG, user.name);
            res.status(200).send(user);
        });
    },
    signIn: function (req, res, next) {
        var data = req.body;
        data.password = passwordEncryption(data.password);

        var query = {
            mail: data.mail,
            password: data.password
        };

        User.findOne(query)
            .exec(function (err, user) {
                if (err || !user)
                    return next(new AuthError());

                var session = req.session;
                session.account = user;
                session.loggedIn = true;

                log(flag.SIN, user.name);
                res.status(200).send(user);
            });
    },
    signOut: function (req, res, next) {
        var user = req.session.account;
        log(flag.SOT, user.name);

        req.session.destroy();
        res.status(200).send(user);
    },
    forgotPassword: function (req, res, next) {
        var data = req.body;

        var query = {
            mail: data.mail,
            secretQuestion: data.secretQuestion
        };

        var passwordConfig = {
            length: 10,
            numbers: true
        };
        var newPassword = passwordGenerator(passwordConfig);

        var update = {
            password: passwordEncryption(newPassword)
        };

        User.findOneAndUpdate(query, update, function (err, user) {
            if (err || !user)
                return next(new DataBaseError());

            sendMail(data.mail, message.subjectChangePassword, newPassword);

            log(flag.FP, user.name);
            res.status(200).send(true);
        });
    },
    verification: function (req, res, next) {
        User.find({access: access.notVerification})
            .exec(function (err, users) {
                if (err || !users)
                    return next(new DataBaseError());

                log(flag.VF, message.getUser);
                res.status(200).send(users);
            })
    },
    verificationAdmin: function (req, res, next) {
        var query = req.body;
        var update = {access: access.verificationAdmin};

        User.findOneAndUpdate(query, update)
            .exec(function (err, user) {
                if (err || !user)
                    return next(new DataBaseError());

                log(flag.VF, 'verification admin');
                res.status(200).send(user);
            });
    },
    verificationTeacher: function (req, res, next) {
        var data = req.body;

        var query = {_id: data.teacherID};
        var update = {
            access: access.verificationTeacher,
            $addToSet: {subjects: {$each: data.subjects}}
        };

        User.findOneAndUpdate(query, update)
            .exec(function (err, user) {
                if (err || !user)
                    return next(new DataBaseError());

                log(flag.VF, 'verification teacher');
                res.status(200).send(user);
            });

    },
    verificationStudent: function (req, res, next) {
        var data = req.body;

        var query = {_id: data.studentID};
        var update = {
            access: 3,
            group: data.groupID
        };
        var options = {new: true};

        User.findOneAndUpdate(query, update, options)
            .exec(function (err, user) {
                if (err)
                    return next(new DataBaseError());

                data.mail = user.mail;

                log(flag.VF, 'verification student');
                next();
            });
    }
};