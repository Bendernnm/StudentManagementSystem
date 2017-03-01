module.exports = function (email, subject, message) {
    var config = require('../config/mail');

    var nodemailer = require('nodemailer');

    var mailConfig = {
        host: config.host,
        port: config.port,
        auth: {
            user: config.mail,
            pass: config.pass
        }
    };

    var mailOptions = {
        from: config.mail,
        to: email,
        subject: subject,
        text: message
    };

    var smtpTransport = nodemailer.createTransport(mailConfig);
    smtpTransport.sendMail(mailOptions, function (err, res) {
        if (err) return err;

        console.log('Message send to ' + email + '.');
    });
};