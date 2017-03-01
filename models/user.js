module.exports = (function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.Types.ObjectId;

    var UserSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        mail: {
            type: String,
            unique: true,
            required: true
        },
        phone: {
            type: String
        },
        date: {
            type: String
        },
        password: {
            type: String,
            required: true
        },
        secretQuestion: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 16
        },
        access: {
            required: true,
            type: Number
        },
        group: {
            type: ObjectId,
            ref: 'Group'
        },
        jobs: [{
            type: ObjectId,
            ref: 'Job'
        }],
        subjects: [{
            type: ObjectId,
            ref: 'Subject'
        }],
        avatar: {
            type: String,
            default: 'none'
        },
        blogs: [ObjectId],
        subscription: [ObjectId],
        notifications: [{text: String}]
    });

    return mongoose.model('User', UserSchema);
})();