// utils/emailService.js

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Configure your email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Generate a random OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
}

// Send OTP via email
async function sendOtpEmail(email, otp) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Registration',
        text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`your otp is: ${otp}`);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

// Send payment notification email to the admin
async function sendPaymentNotificationEmail(adminEmail, tenantName, amount) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: 'Payment Notification',
        text: `Dear Admin,\n\nA payment of ₹${amount} has been received from ${tenantName}.\n\nThank you!`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Payment notification sent to admin at ${adminEmail}.`);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending payment notification email:', error);
        return false;
    }
}

module.exports = {
    generateOtp,
    sendOtpEmail,
    sendPaymentNotificationEmail, // Export the new function
};
