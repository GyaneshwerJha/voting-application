const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    aadhar: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    email: String,
    twoFactorEnabled: { type: Boolean, default: true },
    twoFactorCode: String,
    twoFactorExpires: Date,
    isVerified: { type: Boolean, default: false },
    votingHistory: [
        { electionId: String, candidateId: String }
    ],
});

module.exports = mongoose.model('User', userSchema);