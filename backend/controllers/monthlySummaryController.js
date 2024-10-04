// backend/controllers/monthlySummaryController.js
const MonthlySummary = require('../models/MonthlySummary'); // Import your MonthlySummary model

// Get all monthly summaries
exports.getAllSummaries = async (req, res) => {
    try {
        const summaries = await MonthlySummary.find();
        res.json(summaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get monthly summary by ID
exports.getSummaryById = async (req, res) => {
    try {
        const summary = await MonthlySummary.findById(req.params.id);
        if (!summary) {
            return res.status(404).json({ message: 'Summary not found' });
        }
        res.json(summary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new monthly summary
exports.addSummary = async (req, res) => {
    const summary = new MonthlySummary(req.body);
    try {
        const savedSummary = await summary.save();
        res.status(201).json(savedSummary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update monthly summary
exports.updateSummary = async (req, res) => {
    try {
        const summary = await MonthlySummary.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!summary) {
            return res.status(404).json({ message: 'Summary not found' });
        }
        res.json(summary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete monthly summary
exports.deleteSummary = async (req, res) => {
    try {
        const summary = await MonthlySummary.findByIdAndDelete(req.params.id);
        if (!summary) {
            return res.status(404).json({ message: 'Summary not found' });
        }
        res.json({ message: 'Summary deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
