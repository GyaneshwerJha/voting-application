const mongoose = require('mongoose');

const feedBackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Feedback = mongoose.model('Feedback', feedBackSchema);
module.exports = Feedback;
