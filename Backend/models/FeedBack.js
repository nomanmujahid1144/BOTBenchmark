const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const FeedBackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    softwareId: {
        type: Schema.Types.ObjectId,
        ref: 'Software',
    },
    feedback: {
        type: String,
        default: '',
    },
    reviewTitle: {
        type: String,
        default: '',
    },
    rating: {
        type: Number,
        default: 0,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = Message = mongoose.model('Feedback', FeedBackSchema);
