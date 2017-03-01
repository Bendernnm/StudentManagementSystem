var config = require('../config/errors').AuthError;

function AuthError(status, message) {
    status = status || config.status;
    message = message || config.message;

    Error.call(this, status, message);

    this.name = "AuthError";
    this.status = status;
    this.message = message;
}

AuthError.prototype = Object.create(Error.prototype);

module.exports = AuthError;