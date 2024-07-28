const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    startDate: {
        type: String, required: true
    },
    endDate: {
        type: String, required: true
    },
    isActive: {
        type: Boolean, default: true
    }
});

const Election = mongoose.model('Election', electionSchema);
module.exports = Election;