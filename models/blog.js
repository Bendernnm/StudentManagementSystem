module.exports = (function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.Types.ObjectId;

    var BlogSchema = new Schema({
        name: {
            type: String,
            unique: true,
            required: true
        },
        author: {
            type: ObjectId,
            required: true
        },
        posts: [ObjectId],
        followers: [ObjectId]
    });
    
    return mongoose.model('Blog', BlogSchema);
})();