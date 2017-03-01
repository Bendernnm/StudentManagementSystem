var config = require('../config/flag');

module.exports = function (flag, data) {
    var text;
    switch (flag) {
        case config.CHATH:
            text = '#Auth: ' + data + '.';
            break;
        case config.REG:
            text = '#Register new user. User name - ' + data + '.';
            break;
        case config.SIN:
            text = '#SignIn. User name - ' + data + '.';
            break;
        case config.SOT:
            text = '#Session destroy. User ' + data + ' sign out.';
            break;
        case config.FP:
            text = '#Password is reset. User name - ' + data + '.';
            break;
        case config.CHA:
            text = '#Check auth.';
            break;
        case config.ACS:
            text = '#Check access: ' + data.person + '. Access: ' + data.access + '.';
            break;
        case config.VF:
            text = '#Verification: ' + data + '.';
            break;
        default:
            text = config.LOG;
    }

    console.log(text);
};