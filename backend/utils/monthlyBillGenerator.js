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



// New function to send bill notification email
async function sendBillNotificationEmail(email, tenantName, balance, nextDueDate) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Monthly Bill Generated',
        text: `Dear ${tenantName},

We hope this message finds you well. 

We would like to inform you that your monthly bill has been generated successfully. Below are the details:

- **Current Balance**: ₹${balance}
- **Next Due Date**: ${nextDueDate.toLocaleDateString()}

Please make sure to clear your balance by the due date to avoid any penalties.

Thank you for your attention!

Best regards,
Your Company Name
Your Contact Information
`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Bill notification sent to ${tenantName} at ${email}.`);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending bill notification email:', error);
        return false;
    }
}


module.exports = {
    sendBillNotificationEmail, // Export the new function
};