var generator = require('generate-password');

module.exports = function (config) {
    return generator.generate(config);
};