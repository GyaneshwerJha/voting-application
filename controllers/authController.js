const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateOTP, sendOTP } = require('../utils/otpService');

const jwtSecret = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    try {
        const { aadhar, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            aadhar: aadhar,
            password: hashedPassword,
            email: email
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed User registration or User Already Exist' });
    }
};

exports.login = async (req, res) => {
    try {
        const { aadhar, password } = req.body;
        const user = await User.findOne({ aadhar });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid Aadhar'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid Password'
            });
        }

        if (user.isVerified === false && user.twoFactorEnabled) {
            // Generate OTP and save it
            const otp = generateOTP();
            console.log(otp);
            console.log(user.email);

            user.twoFactorCode = otp;
            user.twoFactorExpires = Date.now() + 10 * 60 * 1000; // 10 minute expiration
            await user.save();

            try {
                await sendOTP(user.email, otp);
            } catch (error) {
                console.log(error.message);
                return res.status(500).json({ message: 'Failed to send OTP' });
            }

            // Return response indicating OTP is sent
            return res.status(200).json({ message: 'OTP sent to your email', otpRequired: true });
        }
        else {
            const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
            res.status(200).json({ token });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error in login' });
    }
};


exports.verifyLoginOTP = async (req, res) => {
    try {
        const { aadhar, otp } = req.body;
        const user = await User.findOne({ aadhar });

        if (!user || user.twoFactorCode !== otp || user.twoFactorExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Clear OTP after successful verification and mark as verified
        user.twoFactorCode = undefined;
        user.twoFactorExpires = undefined;
        user.isVerified = true;
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error in OTP verification' });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current password matches
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current passwords do not match' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error in password changing' })
    }
}