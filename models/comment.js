module.exports = (function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.Types.ObjectId;

    var CommentSchema = new Schema({
        author: {
            type: ObjectId,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('Comment', CommentSchema);
})();