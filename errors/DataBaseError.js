var config = require('../config/errors').DataBaseError;

function DataBaseError(status, message) {
    status = status || config.status;
    message = message || config.message;

    Error.call(this, status, message);

    this.name = "DataBaseError";
    this.status = status;
    this.message = message;
}

DataBaseError.prototype = Object.create(Error.prototype);

module.exports = DataBaseError;