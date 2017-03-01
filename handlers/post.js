var mongoose = require('mongoose');
var Post = mongoose.model('Post');

var DataBaseError = require('../errors/DataBaseError');

module.exports = {
    createPost: function (req, res, next) {
        var data = JSON.parse(req.body.data);
        req.file && req.file.filename && (data.file = req.file.filename);

        var post = new Post(data);

        post.save(function (err, post) {
            if (err)
                return next(new DataBaseError(400));

            req.body.post = post;
            req.body.blog = data.blog;
            next();
        });
    },
    updatePost: function (req, res, next) {
        var _id = req.params.id;
        var update = req.body;

        Post.findByIdAndUpdate(_id, update, {new: true})
            .exec(function (err, post) {
                if (err)
                    return next(new DataBaseError(400));

                res.status(200).send(post);
            });
    },
    deletePost: function (req, res, next) {
        var _id = req.params.id;

        Post.findByIdAndRemove(_id)
            .exec(function (err, remove) {
                if (err)
                    return next(new DataBaseError(400));

                res.status(200).send(true);
            });
    },
    addComment: function (req, res, next) {
        var data = req.body;
        var session = req.session.account;

        var _id = data.post;
        var comment = data.comment._id;
        var update = {$addToSet: {comments: comment}};

        Post.findByIdAndUpdate(_id, update)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError());

                comment = {
                    _id: data.comment._id,
                    date: data.comment.date,
                    text: data.comment.text,
                    author: {
                        _id: session._id,
                        name: session.name,
                        avatar: session.avatar
                    }
                };

                res.status(200).send(comment);
            });
    },
    deleteComment: function (req, res, next) {
        var data = req.body;

        var _id = data.post;
        var comment = req.params.id;
        var update = {$pull: {comments: comment}};

        Post.findByIdAndUpdate(_id, update)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError());

                res.status(200).send(true);
            });
    },
    deleteUserComments: function (req, res, next) {
        var comments = req.body.comments;

        var query = {};
        var update = {
            $pull: {
                comments: {$in: comments}
            }
        };
        var options = {multi: true};

        Post.update(query, update, options)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError());

                next();
            });
    }
};