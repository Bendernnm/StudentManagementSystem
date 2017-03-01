module.exports = (function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.Types.ObjectId;

    var GroupSchema = new Schema({
        name: {
            type: String,
            require: true,
            minLength: 2,
            maxLength: 25
        },
        course: {
            type: Number,
            require: true,
            default: 1,
            min: 1,
            max: 6
        },
        studentList: [ObjectId]
    });

    return mongoose.model('Group', GroupSchema);
})();