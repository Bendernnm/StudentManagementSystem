module.exports = function (app) {
    var auth = require('../middleware/auth');
    var access = require('../middleware/access');

    require('./root')(app);

    app.use('/auth', require('./auth'));
    app.use('/subjects', auth, access.admin, require('./subject'));
    app.use('/groups', auth, require('./group'));
    app.use('/users', require('./user'));
    app.use('/jobs', auth, require('./job'));
    app.use('/blogs', auth, require('./blog'));
    app.use('/posts', auth, require('./post'));
    app.use('/profiles', auth, require('./profile'));
    app.use('/statistics', auth, access.teacher, require('./statistics'));
    app.use('/notifications', auth, require('./notification'));

    app.use(function (err, req, res, next) {
        if (!err)
            return res.status(200).send(true);

        console.log('#error ' + err.status + ': ' + err.message);

        res.status(err.status).send(err.message);
    });
};