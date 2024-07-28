const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get user profile' });
    }
}


// Update user profile
exports.updateProfile = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { email }, { new: true }).select('-password -twoFactorCode -twoFactorExpires');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user profile' });
    }
}

// Get voting history
exports.getVotingHistory = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user.votingHistory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get voting history' })
    }
}
