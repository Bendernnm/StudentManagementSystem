var mongoose = require('mongoose');
var Group = mongoose.model('Group');
var User = mongoose.model('User');

var db = mongoose.connection;
var collection = db.collection('groups');

var aggregateQuery = require('../config/query');
var parseToObjectID = require('mongodb').ObjectID;

var DataBaseError = require('../errors/DataBaseError');

module.exports = {
    getAllGroups: function (req, res, next) {
        Group.find({})
            .exec(function (err, groups) {
                if (err || !groups)
                    return next(new DataBaseError());

                res.status(200).send(groups);
            });
    },
    getGroup: function (req, res, next) {
        var _id = parseToObjectID(req.params.id);

        collection.aggregate(aggregateQuery.getGroup(_id))
            .toArray(function (err, group) {
                if (err)
                    return next(new DataBaseError());

                res.send(group[0]);
            });
    },
    createNewGroup: function (req, res, next) {
        var data = req.body;
        var group = new Group(data);

        group.save(function (err, group) {
            if (err)
                return next(new DataBaseError());

            res.status(200).send(group);
        });
    },
    addToGroup: function (req, res, next) {
        var data = req.body;

        var query = {_id: data.groupID};
        var update = {$addToSet: {studentList: data.studentID}};
        var options = {new: true};

        Group.findOneAndUpdate(query, update, options)
            .exec(function (err, group) {
                if (err)
                    return next(new DataBaseError());

                data.group = group.name;
                next();
            });
    },
    updateGroup: function (req, res, next) {
        var _id = req.params.id;
        var update = req.body;
        var options = {new: true};

        Group.findByIdAndUpdate(_id, update, options)
            .exec(function (err, group) {
                if (err)
                    return next(new DataBaseError(400));

                res.status(200).send(group);
            });
    },
    deleteGroup: function (req, res, next) {
        var _id = req.params.id;

        Group.findByIdAndRemove(_id)
            .exec(function (err, group) {
                if (err || !group)
                    return next(new DataBaseError());

                var studentList = group.studentList;
                var query = {_id: {$in: studentList}};
                var update = {group: null};
                var multi = {multi: true};

                User.update(query, update, multi, function (err, update) {
                    if (err)
                        return next(new DataBaseError());

                    res.status(200).send(group);
                });
            });
    },
    deleteStudentFromGroup: function (req, res, next) {
        var data = req.body;

        var _id = data.groupID;
        var studentID = req.params.id;
        var update = {$pull: {studentList: studentID}};

        Group.findByIdAndUpdate(_id, update)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError());

                return next();
            });
    }
};