var mongoose = require('mongoose');
var db = mongoose.connection;

var User = mongoose.model('User');
var Group = mongoose.model('Group');

var access = require('../config/access');
var aggregateQuery = require('../config/query');
var message = require('../config/message');

var parseToObjectID = require('mongodb').ObjectID;
var send = require('../helpers/sendMessage');

var DataBaseError = require('../errors/DataBaseError');

module.exports = {
    getTeachers: function (req, res, next) {
        var collection = db.collection('users');

        collection.aggregate(aggregateQuery.getTeachers)
            .toArray(function (err, teachers) {
                if (err || !teachers)
                    return next(new DataBaseError());


                res.status(200).send(teachers);
            });
    },
    getTeacher: function (req, res, next) {
        var collection = db.collection('users');

        var _id = parseToObjectID(req.params.id);
        var query = {
            _id: _id,
            access: access.verificationTeacher
        };

        collection.aggregate(aggregateQuery.getTeacher(query))
            .toArray(function (err, teacher) {
                if (err || !teacher)
                    return next(new DataBaseError(400));

                res.status(200).send(teacher[0]);
            });
    },
    getUser: function (req, res, next) {
        var _id = req.params.id;

        User.findById(_id)
            .populate('profile')
            .exec(function (err, user) {
                if (err || !user)
                    return next(new DataBaseError(400, message.userNotFound));

                res.status(200).send(user);
            });
    },
    getStudentWithoutGroup: function (req, res, next) {
        var query = {
            access: access.verificationStudent,
            group: null
        };

        User.find(query)
            .exec(function (err, users) {
                if (err)
                    return next(new DataBaseError());

                res.status(200).send(users);
            });
    },
    addJob: function (req, res, next) {
        var data = req.body;

        var _id = data.student;
        var job = data.job;

        var update = {$addToSet: {jobs: job}};

        User.findByIdAndUpdate(_id, update, {new: true})
            .exec(function (err, student) {
                if (err)
                    return next(new DataBaseError());

                req.body.mail = student.mail;
                next();
            });
    },
    addTeacherBlog: function (req, res, next) {
        var data = req.body;

        var _id = data.author;
        var blog = data.blog._id;
        var update = {$addToSet: {blogs: blog}};

        User.findByIdAndUpdate(_id, update, {new: true})
            .exec(function (err, user) {
                if (err)
                    return next(new DataBaseError());

                var sendData = {
                    _id: blog,
                    name: data.blog.name,
                    author: user.name,
                    follower: false
                };

                res.send(sendData);
            });
    },
    addTeacherSubject: function (req, res, next) {
        var data = req.body.subjects;

        var _id = req.params.id;
        var update = {subjects: data};
        var options = {new: true};

        User.findByIdAndUpdate(_id, update, options)
            .populate('subjects')
            .exec(function (err, teacher) {
                if (err)
                    return next(new DataBaseError());

                res.status(200).send(teacher);
            });
    },
    setGroup: function (req, res, next) {
        var _id = req.params.id;
        var update = req.body;
        var options = {new: true};

        User.findByIdAndUpdate(_id, update, options)
            .exec(function (err, user) {
                if (err)
                    return next(new DataBaseError());

                var group = update.group;
                update = {
                    $addToSet: {studentList: _id}
                };

                Group.findByIdAndUpdate(group, update)
                    .exec(function (err, update) {
                        if (err)
                            return next(new DataBaseError());

                        res.status(200).send(user);
                    });
            });
    },
    updateUser: function (req, res, next) {
        var data = req.body;

        var query = {_id: data._id};
        var update = {
            name: data.name,
            date: data.date,
            phone: data.phone
        };

        User.findOneAndUpdate(query, update)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError());

                res.status(200).send(true);
            });
    },
    deleteGroup: function (req, res, next) {
        var data = req.body;

        var _id = req.params.id;
        var update = {group: null};
        var options = {new: true};

        User.findByIdAndUpdate(_id, update, options)
            .exec(function (err, user) {
                if (err || !user)
                    return next(new DataBaseError(400, message.userNotFound));

                res.status(200).send(user);
            });
    },
    deleteUser: function (req, res, next) {
        var _id = req.params.id;

        User.findByIdAndRemove(_id)
            .exec(function (err, user) {
                if (err || !user)
                    return next(new DataBaseError());

                res.status(200).send(user);
            });
    },
    deleteTeacher: function (req, res, next) {
        var _id = req.params.id;
        var update = {access: access.user};

        User.findByIdAndUpdate(_id, update)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError(400));

                res.status(200).send(true);
            });
    },
    deleteSubject: function (req, res, next) {
        var query = {};
        var _id = req.params.id;
        var update = {$pull: {subjects: _id}};

        User.update(query, update)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError());

                next();
            });
    },
    deleteStudentJobs: function (req, res, next) {
        var jobs = req.body.jobs;

        var query = {};
        var update = {
            $pull: {
                jobs: {$in: jobs}
            }
        };
        var options = {multi: true};

        User.update(query, update, options)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError());

                next();
            });
    },
    deleteTeacherBlog: function (req, res, next) {
        var blog = req.params.id;
        var query = {};
        var update = {$pull: {blogs: blog}};
        var options = {multi: true};

        User.update(query, update, options)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError());

                next();
            });

    },
    sendGroup: function (req, res, next) {
        var data = req.body;

        var mail = data.mail;
        var subject = 'Group';
        var message = 'You accepted in the ' + data.group + ' group.';

        send(mail, subject, message);

        res.send(req.body.group);
    }
};