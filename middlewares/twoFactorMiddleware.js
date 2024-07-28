const User = require('../models/User');

const twoFactorMiddleware = async (req, res, next) => {
    const { aadhar, otp } = req.body;
    const user = await User.findOne({ aadhar });

    if (!user || !user.twoFactorEnabled) {
        return next();
    }

    if (!otp || user.twoFactorCode !== otp || user.twoFactorExpires < Date.now()) {
        return res.status(401).json({ message: 'Invalid or expired OTP' });
    }

    // Clear OTP after successful verification
    user.twoFactorCode = undefined;
    user.twoFactorExpires = undefined;
    user.isVerified = true;
    await user.save();

    next();
}

module.exports = twoFactorMiddleware;