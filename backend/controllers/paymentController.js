// backend/controllers/paymentController.js
const Payment = require('../models/Payment'); // Import your Payment model
const Tenant = require('../models/Tenant');





// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        console.log(req.params.id);

        const payment = await Payment.findById(req.params.id);
        console.log(payment);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get payments by Tenant ID
exports.getPaymentsByTenantId = async (req, res) => {
    try {
        const tenantId = req.params.id; // Get tenantId from request parameters
        // console.log(`Searching payments for tenantId: ${tenantId}`);

        const payments = await Payment.find({ tenantId }); // Search by tenantId
        // console.log(payments);

        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: 'No payments found for this tenant' });
        }

        res.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: error.message });
    }
};


// Add a new payment

exports.addPayment = async (req, res) => {
    const { tenantId, date, amount, method } = req.body;

    try {
        const payment = new Payment({
            tenantId,
            date,
            amount,
            method,
        });

        await payment.save();

        // Optionally, update the tenant's balance
        const tenant = await Tenant.findById(tenantId);
        tenant.balance -= amount; // Assuming payment reduces balance
        await tenant.save();

        res.status(201).json({ message: 'Payment logged successfully', payment });
    } catch (error) {
        console.error('Error logging payment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update payment
exports.updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete payment
exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json({ message: 'Payment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
