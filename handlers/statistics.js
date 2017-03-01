var mongoose = require('mongoose');
var db = mongoose.connection;

var User = mongoose.model('User');

var query = require('../config/query');

var DataBaseError = require('../errors/DataBaseError');
module.exports = {
    getStatisticsGroups: function (req, res, next) {
        var collection = db.collection('groups');

        collection.aggregate(query.getStatisticsGroups)
            .toArray(function (err, statistics) {
                if (err)
                    return next(new DataBaseError());

                res.send(statistics);
            });
    },
    getStatisticsCourse: function (req, res, next) {
        var collection = db.collection('groups');

        collection.aggregate(query.getStatisticsCourse)
            .toArray(function (err, statistics) {
                if (err)
                    return next(new DataBaseError(400));

                res.send(statistics);
            });
    },
    getStatisticsSubjects: function (req, res, next) {
        var collection = db.collection('subjects');

        collection.aggregate(query.getStatisticsSubjects)
            .toArray(function (err, statistics) {
                if (err)
                    return next(new DataBaseError(400));

                res.send(statistics);
            });
    }
};