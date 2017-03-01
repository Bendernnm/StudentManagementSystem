var config = require('../config/errors').AccessError;

function AccessError(status, message) {
    status = status || config.status;
    message = message || config.message;

    Error.call(this, status, message);

    this.name = "AuthError";
    this.status = status;
    this.message = message;
}

AccessError.prototype = Object.create(Error.prototype);

module.exports = AccessError;