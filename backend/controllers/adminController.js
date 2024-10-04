// backend/controllers/adminController.js
const Admin = require('../models/Admin'); // Assuming you have an Admin model
const Tenant = require('../models/Tenant');
const Payment = require('../models/Payment');
const Utility = require('../models/Utility');
const Food = require('../models/Food'); // Import the Food model
const MonthlySummary = require('../models/MonthlySummary');
const Notification = require('../models/Notification');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin registration
exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Admin login
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get dashboard overview
exports.getDashboardOverview = async (req, res) => {
    try {
        const totalTenants = await Tenant.countDocuments({ isActive: true });
        const totalPayments = await Payment.countDocuments();
        const totalUtilities = await Utility.countDocuments();
        const totalFoodEntries = await Food.countDocuments();
        
        res.json({ totalTenants, totalPayments, totalUtilities, totalFoodEntries });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Manage tenants
exports.addTenant = async (req, res) => {
    const tenant = new Tenant(req.body);
    try {
        const savedTenant = await tenant.save();
        res.status(201).json(savedTenant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTenant = async (req, res) => {
    try {
        const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.json(tenant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find();
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTenantsEverLived = async (req, res) => {
    try {
        const tenants = await Tenant.find();
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTenantProfile = async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id);
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.status(200).json(tenant);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tenant', error: error.message });
    }
};

// Manage payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addPayment = async (req, res) => {
    const payment = new Payment(req.body);
    try {
        const savedPayment = await payment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPaymentHistory = async (req, res) => {
    try {
        const payments = await Payment.find({ tenantId: req.params.tenantId });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payment history', error: error.message });
    }
};

// Manage utility charges
exports.getAllUtilities = async (req, res) => {
    try {
        const utilities = await Utility.find();
        res.json(utilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addUtilityCharge = async (req, res) => {
    const utility = new Utility(req.body);
    try {
        const savedUtility = await utility.save();
        res.status(201).json(savedUtility);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUtilityCharge = async (req, res) => {
    try {
        const utility = await Utility.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!utility) {
            return res.status(404).json({ message: 'Utility charge not found' });
        }
        res.json(utility);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Manage food entries
exports.getAllFoodEntries = async (req, res) => {
    try {
        const foodEntries = await Food.find();
        res.json(foodEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addFoodEntry = async (req, res) => {
    const foodEntry = new Food(req.body);
    try {
        const savedFoodEntry = await foodEntry.save();
        res.status(201).json(savedFoodEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateFoodEntry = async (req, res) => {
    try {
        const foodEntry = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!foodEntry) {
            return res.status(404).json({ message: 'Food entry not found' });
        }
        res.json(foodEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Manage monthly summaries
exports.getAllMonthlySummaries = async (req, res) => {
    try {
        const summaries = await MonthlySummary.find();
        res.json(summaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.generateMonthlySummary = async (req, res) => {
    const summary = new MonthlySummary(req.body);
    try {
        const savedSummary = await summary.save();
        res.status(201).json(savedSummary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Manage notifications
exports.sendNotification = async (req, res) => {
    const notification = new Notification(req.body);
    try {
        const savedNotification = await notification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTenantNotifications = async (req, res) => {
    const tenantId = req.params.tenantId;

    try {
        const notifications = await Notification.find({ tenantId }).sort({ date: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
};
