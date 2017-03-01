module.exports = (function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.Types.ObjectId;

    var JobSchema = new Schema({
        name: {
            type: String,
            require: true
        },
        rating: {
            type: Number,
            require: true,
            min: 1,
            max: 100
        },
        subject: {
            type: ObjectId,
            ref: 'Subject'
        },
        student: {
            type: ObjectId,
            ref: 'User'
        },
        teacher: {
            type: ObjectId,
            ref: 'User'
        }
    });

    return mongoose.model('Job', JobSchema);
})();