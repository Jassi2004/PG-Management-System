const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Get all payments
router.get('/', paymentController.getAllPayments);

// Get a specific payment by ID
router.get('/:id', paymentController.getPaymentById);

// Add a new payment
router.post('/', paymentController.addPayment);

// Update a payment
router.put('/:id', paymentController.updatePayment);

// Delete a payment
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
