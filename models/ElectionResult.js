const mongoose = require('mongoose');

const electionResultSchema = new mongoose.Schema({
    electionId: {
        type: String,
        required: true,
        unique: true
    },
    results: [
        {
            candidate: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Candidate'
            },
            voteCount: Number
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('ElectionResult', electionResultSchema);
