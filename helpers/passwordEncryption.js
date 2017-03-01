module.exports = function (password) {
    var crypto = require('crypto');
    var config = require('../config/crypto');

    var shaSum = crypto.createHash(config.cryptoCode);
    shaSum.update(password);
    return shaSum.digest(config.hashCode);
};