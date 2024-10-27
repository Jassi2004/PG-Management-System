const express = require('express');
const router = express.Router();
const newPaymentController = require('../controllers/newPayment'); // Assuming you use reportController for summaries
const { sendPaymentNotificationEmail } = require('../utils/sendPaymentNotificationEmail');

// Get all monthly summaries
// router.get('/orders', newPaymentController.newPayment);

// router.get('/:paymentId', newPaymentController.getPayment)

router.get('/qr-code', newPaymentController.qrCodeGenerator)


// Endpoint to send payment notification email
router.post('/send-payment-notification', newPaymentController.sendPaymentNotification)


module.exports = router;
