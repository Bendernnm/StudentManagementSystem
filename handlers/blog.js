var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var db = mongoose.connection;

var aggregateQuery = require('../config/query');
var parseToObjectID = require('mongodb').ObjectID;

var DataBaseError = require('../errors/DataBaseError');

module.exports = {
    createBlog: function (req, res, next) {
        var data = req.body;

        var blog = new Blog(data);

        blog.save(function (err, blog) {
            if (err)
                return next(new DataBaseError());

            data.blog = blog;
            next();
        });
    },
    getBlogs: function (req, res, next) {
        var _id = parseToObjectID(req.session.account._id);

        var collection = db.collection('blogs');
        collection.aggregate(aggregateQuery.getBlogs(_id))
            .toArray(function (err, blogs) {
                if (err)
                    return next(new DataBaseError());

                res.send(blogs);
            });
    },
    getBlog: function (req, res, next) {
        var _id = require('mongodb').ObjectID(req.params.id);

        var collection = db.collection('blogs');
        collection.aggregate(aggregateQuery.getBlog(_id))
            .toArray(function (err, blogs) {
                if (err)
                    return next(new DataBaseError(400));

                res.send(blogs[0]);
            });
    },
    deleteBlog: function (req, res, next) {
        var _id = req.params.id;

        Blog.findByIdAndRemove(_id)
            .exec(function (err, blog) {
                if (err)
                    return next(new DataBaseError());

                res.send(blog);
            });
    },
    addPost: function (req, res, next) {
        var data = req.body;

        var _id = data.blog;
        var post = data.post._id;
        var update = {$addToSet: {posts: post}};
        var options = {new: true};

        Blog.findByIdAndUpdate(_id, update, options)
            .exec(function (err, blog) {
                if (err)
                    return next(new DataBaseError());

                data.blog = blog;
                next();
            });
    },
    deletePost: function (req, res, next) {
        var data = req.body;

        var blog = data.blog;
        var post = req.params.id;
        var update = {$pull: {posts: post}};

        Blog.findByIdAndUpdate(blog, update)
            .exec(function (err, update) {
                if (err || !update)
                    return next(new DataBaseError());

                return next();
            });
    },
    updateBlog: function (req, res, next) {
        var _id = req.params.id;
        var user = req.session.account._id;
        var update = {$addToSet: {followers: user}};

        Blog.findByIdAndUpdate(_id, update)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError());

                res.status(200).send(true);
            });
    },
    deleteFollower: function (req, res, next) {
        var _id = req.params.id;
        var query = {};
        var update = {$pull: {followers: _id}};
        var options = {multi: true};

        Blog.update(query, update, options)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError());

                next();
            });
    }
};