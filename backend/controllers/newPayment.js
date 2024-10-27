// backend/controllers/monthlySummaryController.js
// const MonthlySummary = require('../models/MonthlySummary'); // Import your MonthlySummary model
const QRCode = require('qrcode');
const crypto = require('crypto');
const {sendPaymentNotificationEmail} = require('../utils/sendPaymentNotificationEmail')


exports.sendPaymentNotification = async (req, res) => {
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
}
// src/services/paymentService.js

exports.qrCodeGenerator = async (req, res) => {
    try {
        const { amount } = req.query;
        
        // Validate the amount
        const amountNumber = parseFloat(amount);
        if (!amount || isNaN(amountNumber) || amountNumber <= 0) {
            return res.status(400).send('Valid amount is required');
        }

        // Generate a unique transaction ID
        const transactionId = crypto.randomBytes(16).toString('hex');

        // Construct the payment data (this may vary based on your payment processor)
        const paymentData = {
            recipient: 'your_account_identifier', // Replace with your actual account identifier
            amount: amountNumber,
            transactionId,
            timestamp: new Date().toISOString(),
        };
        
        // Convert payment data to a JSON string
        const paymentString = JSON.stringify(paymentData);
        
        // Generate QR code
        const qrCodeBuffer = await QRCode.toBuffer(paymentString);

        // Set response headers
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', 'inline; filename="qr-code.png"');
        
        // Send the QR code image
        res.send(qrCodeBuffer);
        
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Error generating QR code');
    }
}




    // // Get all monthly summaries
    // exports.newPayment = async (req, res) => {
    //     const razorpay = new Razorpay({
    //         key_id: "rzp_test_GcZZFDPP0jHtC4",
    //         key_secret: "6JdtQv2u7oUw7EWziYeyoewJ"
    //     })
    
    //     const options = {
    //         amount: req.body.amount,
    //         currency: req.body.currency,
    //         receipt: "receipt#1",
    //         payment_capture: 1
    //     }
    
    //     try {
    //         const response = await razorpay.orders.create(options)
    
    //         res.json({
    //             order_id: response.id,
    //             currency: response.currency,
    //             amount: response.amount
    //         })
    //     } catch (error) {
    //         res.status(500).send("Internal server error")
    //     }
    // };
    
    // exports.getPayment = async (req, res) => {
    //     const { paymentId } = req.params;
    
    //     const razorpay = new Razorpay({
    //         key_id: "rzp_test_GcZZFDPP0jHtC4",
    //         key_secret: "6JdtQv2u7oUw7EWziYeyoewJ"
    //     })
    
    //     try {
    //         const payment = await razorpay.payments.fetch(paymentId)
    
    //         if (!payment) {
    //             return res.status(500).json("Error at razorpay loading")
    //         }
    
    //         res.json({
    //             status: payment.status,
    //             method: payment.method,
    //             amount: payment.amount,
    //             currency: payment.currency
    //         })
    //     } catch (error) {
    //         res.status(500).json("failed to fetch")
    //     }
    // }