// backend/controllers/foodController.js
const Food = require('../models/Food'); // Import your Food model

// Get all food records
exports.getAllFoodRecords = async (req, res) => {
    try {
        const foodRecords = await Food.find();
        res.json(foodRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get food record by ID
exports.getFoodRecordById = async (req, res) => {
    try {
        const foodRecord = await Food.findById(req.params.id);
        if (!foodRecord) {
            return res.status(404).json({ message: 'Food record not found' });
        }
        res.json(foodRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new food record
exports.addFoodRecord = async (req, res) => {
    const foodRecord = new Food(req.body);
    try {
        const savedFoodRecord = await foodRecord.save();
        res.status(201).json(savedFoodRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update food record
exports.updateFoodRecord = async (req, res) => {
    try {
        const foodRecord = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!foodRecord) {
            return res.status(404).json({ message: 'Food record not found' });
        }
        res.json(foodRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete food record
exports.deleteFoodRecord = async (req, res) => {
    try {
        const foodRecord = await Food.findByIdAndDelete(req.params.id);
        if (!foodRecord) {
            return res.status(404).json({ message: 'Food record not found' });
        }
        res.json({ message: 'Food record deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
