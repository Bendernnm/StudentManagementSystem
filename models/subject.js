module.exports = (function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.Types.ObjectId;

    var SubjectSchema = new Schema({
        name: {
            type: String,
            require: true,
            minLength: 2,
            maxLength: 25
        },
        studentList: [ObjectId]
    });

    return mongoose.model('Subject', SubjectSchema);
})();