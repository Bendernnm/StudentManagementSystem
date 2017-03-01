var mongoose = require('mongoose');

var User = mongoose.model('User');
var Job = mongoose.model('Job');

var access = require('../config/access');

var DataBaseError = require('../errors/DataBaseError');

module.exports = {
    getProfile: function (req, res, next) {
        var _id = req.params.id;
        var user = req.session.account._id;
        var userAccess = req.session.account.access;

        var isUser = user === _id;
        var moderatorAccess = userAccess & access.moderator;

        User.findById(_id)
            .exec(function (err, user) {
                if (err)
                    return next(new DataBaseError());

                var data = {
                    _id: user._id,
                    name: user.name,
                    date: user.date,
                    mail: user.mail,
                    phone: user.phone,
                    avatar: user.avatar,
                    access: user.access
                };

                if (!isUser && !moderatorAccess)
                    return res.status(200).send(data);

                var populate = {
                    path: 'jobs',
                    populate: {
                        path: 'teacher subject',
                        select: 'name'
                    }
                };
                User.populate(user, populate, function (err, user) {
                    if (err)
                        return next(new DataBaseError());

                    data.group = user.group;
                    data.jobs = user.jobs;

                    res.status(200).send(data);
                });
            });
    }
};