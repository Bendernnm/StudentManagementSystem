var User = require('mongoose').model('User');
var DataBaseError = require('../errors/DataBaseError');

module.exports = {
    get: function (req, res, next) {
        var _id = req.session.account._id;

        User.findById(_id)
            .exec(function (err, user) {
                if (err)
                    return next(new DataBaseError());

                res.status(200).send(user.notifications);
            });
    },
    push: function (req, res, next) {
        var data = req.body;

        var blog = data.blog.name;
        var post = data.post.name;
        var notification = 'New post (' + post + ') in the ' + blog + ' blog.';

        var followers = data.blog.followers;

        var query = {_id: {$in: followers}};
        var update = {$addToSet: {notifications: {text: notification}}};
        var options = {multi: true};

        User.update(query, update, options)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError());

                res.status(200).send(data.post);
            });
    },
    delete: function (req, res, next) {
        var _id = req.session.account._id;
        var update = {notifications: []};

        User.findByIdAndUpdate(_id, update)
            .exec(function (err, update) {
                if (err)
                    return next(new DataBaseError(400));

                res.status(200).send(true);
            });
    }
};