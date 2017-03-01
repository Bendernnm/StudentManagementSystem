var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var db = mongoose.connection;

var aggregateQuery = require('../config/query');
var parseToObjectID = require('mongodb').ObjectID;

var DataBaseError = require('../errors/DataBaseError')

module.exports = {
    createComment: function (req, res, next) {
        var data = req.body;
        data.author = req.session.account._id;

        var comment = new Comment(data);
        comment.save(function (err, comment) {
            if (err)
                return next(new DataBaseError(400));

            data.comment = comment;
            next();
        });
    },
    getComments: function (req, res, next) {
        var _id = parseToObjectID(req.body.post);
        var collection = db.collection('posts');

        collection.aggregate(aggregateQuery.getComments(_id))
            .toArray(function (err, doc) {
                if (err)
                    return next(new DataBaseError());

                res.send(doc[0].comments);
            });
    },
    deleteComment: function (req, res, next) {
        var _id = req.params.id;

        Comment.findByIdAndRemove(_id, function (err, remove) {
            if (err)
                return next(new DataBaseError());

            next();
        });
    },
    deleteUserComments: function (req, res, next) {
        var _id = req.params.id;
        var query = {author: _id};

        Comment.find(query)
            .exec(function (err, comments) {
                if (err)
                    return next(new DataBaseError(400));

                Comment.remove(query)
                    .exec(function (err, remove) {
                        if (err)
                            return next(new DataBaseError(400));

                        var array = [];
                        for (var i = 0; i < comments.length; i++) {
                            array.push(comments[i]._id);
                        }
                        req.body.comments = array;

                        next();
                    });
            });

        // var options = {
        //     query: query,
        //     remove: true,
        //     new: false
        // };

        // collection.findAndModify(query, [], {remove: true}, function (err, comments) {
        //     console.log(err);
        //     if (err)
        //         return next(new DataBaseError(400));
        //
        //     console.log(comments);
        //     req.body.comments = comments;
        //
        //     next();
        // });
    }
};