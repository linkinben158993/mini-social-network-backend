const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    answerContent: {
        type: String,
        required: true
    },
    ansUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    question: {
        type: String,
        required: true
    },
    isAccepted: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Answer', AnswerSchema);
