var mongoose = require('mongoose');
var Subject = mongoose.model('Subject');

var DataBaseError = require('../errors/DataBaseError');

module.exports = {
    getAllSubjects: function (req, res, next) {
        Subject.find({})
            .exec(function (err, subjects) {
                if (err)
                    return next(new DataBaseError());

                res.status(200).send(subjects);
            });
    },
    createNewSubject: function (req, res, next) {
        var data = req.body;

        var subject = new Subject(data);
        subject.save(function (err, subject) {
            if (err)
                return next(new DataBaseError());

            res.status(200).send(subject);
        });
    },
    deleteSubject: function (req, res, next) {
        var _id = req.params.id;

        Subject.findByIdAndRemove(_id)
            .exec(function (err, subject) {
                if (err)
                    return next(new DataBaseError());

                res.status(200).send(subject);
            });
    },
    updateSubject: function (req, res, next) {
        var _id = req.params.id;
        var update = req.body;
        var options = {new: true};

        Subject.findByIdAndUpdate(_id, update, options)
            .exec(function (err, subject) {
                if (err)
                    return next(new DataBaseError());

                res.status(200).send(subject);
            });
    },
    addToGroup: function (req, res, next) {
        var _id = req.body.subject;
        var student = req.body.student;
        var update = {$addToSet: {studentList: student}};

        Subject.findByIdAndUpdate(_id, update, {new: true})
            .exec(function (err, subject) {
                if (err)
                    return next(new DataBaseError());

                req.body.subject = subject.name;
                next();
            });
    },
    deleteStudent: function (req, res, next) {
        var _id = req.params.id;

        var query = {};
        var update = {$pull: {studentList: _id}};
        var options = {multi: true};

        Subject.update(query, update, options)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError());

                next();
            });
    }
};