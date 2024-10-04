// backend/controllers/utilityController.js
const Utility = require('../models/Utility'); // Import your Utility model

// Get all utility charges
exports.getAllUtilityCharges = async (req, res) => {
    try {
        const utilities = await Utility.find();
        res.json(utilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get utility charge by ID
exports.getUtilityChargeById = async (req, res) => {
    try {
        const utility = await Utility.findById(req.params.id);
        if (!utility) {
            return res.status(404).json({ message: 'Utility charge not found' });
        }
        res.json(utility);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new utility charge
exports.addUtilityCharge = async (req, res) => {
    const utility = new Utility(req.body);
    try {
        const savedUtility = await utility.save();
        res.status(201).json(savedUtility);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update utility charge
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

// Delete utility charge
exports.deleteUtilityCharge = async (req, res) => {
    try {
        const utility = await Utility.findByIdAndDelete(req.params.id);
        if (!utility) {
            return res.status(404).json({ message: 'Utility charge not found' });
        }
        res.json({ message: 'Utility charge deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
