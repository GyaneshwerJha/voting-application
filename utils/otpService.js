const crypto = require('crypto');
const transporter = require('../config/emailConfig'); // Adjust path as necessary
require('dotenv').config();

function generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
}

async function sendOTP(email, otp) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        html: `<p>Kindly use this <b>${otp}</b> OTP to verify your email.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send OTP to ${email}:`, error.message);
        throw error;
    }
}

module.exports = { generateOTP, sendOTP };
