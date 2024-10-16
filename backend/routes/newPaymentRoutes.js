const express = require('express');
const router = express.Router();
const newPaymentController = require('../controllers/newPayment'); // Assuming you use reportController for summaries
const { sendPaymentNotificationEmail } = require('../utils/sendPaymentNotificationEmail');

// Get all monthly summaries
router.get('/orders', newPaymentController.newPayment);

router.get('/:paymentId', newPaymentController.getPayment)


// Endpoint to send payment notification email
router.post('/send-payment-notification', async (req, res) => {
    const { adminEmail, tenantName, amount } = req.body;

    try {
        const success = await sendPaymentNotificationEmail(adminEmail, tenantName, amount);

        if (success) {
            return res.status(200).json({ message: 'Notification email sent successfully.' });
        } else {
            return res.status(500).json({ message: 'Failed to send notification email.' });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});




module.exports = router;
