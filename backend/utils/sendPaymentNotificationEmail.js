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


// New function to send payment notification email to the admin
async function sendPaymentNotificationEmail(adminEmail, tenantName, amount) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: 'Rent Paid Successfully',
        text: `Dear Admin,

We would like to inform you that a payment has been sent successfully. Below are the details:

- **Tenant Name**: ${tenantName}
- **Payment Amount**: ₹${amount}

Please check your account and update the records accordingly.

Thank you!

Best regards,
Jaskirat Singh
`,
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
    sendPaymentNotificationEmail, // Export the new function
};
