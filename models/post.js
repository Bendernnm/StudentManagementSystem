module.exports = (function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.Types.ObjectId;

    var PostSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        like: {
            type: Number,
            default: 0
        },
        dislike: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        },
        file: String,
        comments: [ObjectId]
    });

    return mongoose.model('Post', PostSchema);
})();