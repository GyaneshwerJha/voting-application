const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // Correct service for Gmail
    auth: {
        user: process.env.EMAIL_USER, // Ensure this matches your .env variable
        pass: process.env.EMAIL_PASSWORD // Ensure this matches your .env variable
    }
});

module.exports = transporter;
