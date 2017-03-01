var mongoose = require('mongoose');
var Job = mongoose.model('Job');

var send = require('../helpers/sendMessage');
var DataBaseError = require('../errors/DataBaseError');

module.exports = {
    createJob: function (req, res, next) {
        var data = req.body;

        var job = new Job(data);
        job.save(function (err, job) {
            if (err)
                return next(new DataBaseError());

            data.job = job._id;
            next();
        });
    },
    sendMail: function (req, res, next) {
        var data = req.body;

        var mail = data.mail;
        var subject = 'Jobs';
        var message = data.subject + ' (' + data.name + '): ' + data.rating;

        send(mail, subject, message);
        
        res.sendStatus(200);
    },
    deleteAllStudentJobs: function (req, res, next) {
        var _id = req.params.id;

        Job.remove({student: _id})
            .exec(function (err, remove) {
                if (err)
                    return next(new DataBaseError());

                next();
            });
    },
    deleteJobsOnSubjects: function (req, res, next) {
        var _id = req.params.id;
        var query = {
            subject: _id
        };

        Job.find(query)
            .exec(function (err, jobs) {
                if (err)
                    return next(new DataBaseError());

                Job.remove(query)
                    .exec(function (err, remove) {
                        if (err)
                            return next(new DataBaseError(400));

                        var array = [];
                        for (var i = 0; i < jobs.length; i++) {
                            array.push(jobs[i]._id);
                        }
                        
                        req.body.jobs = array;
                        next();
                    });
            });

    }
};