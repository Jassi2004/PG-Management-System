const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Get all food records
router.get('/', foodController.getAllFoodRecords);

// Get a specific food record by ID
router.get('/:id', foodController.getFoodRecordById);

// Add a new food record
router.post('/', foodController.addFoodRecord);

// Update a food record
router.put('/:id', foodController.updateFoodRecord);

// Delete a food record
router.delete('/:id', foodController.deleteFoodRecord);

module.exports = router;
