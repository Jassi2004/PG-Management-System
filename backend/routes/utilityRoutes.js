const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');

// Get all utility charges
router.get('/', utilityController.getAllUtilityCharges);

// Get a specific utility charge by ID
router.get('/:id', utilityController.getUtilityChargeById);

// Add a new utility charge
router.post('/', utilityController.addUtilityCharge);

// Update a utility charge
router.put('/:id', utilityController.updateUtilityCharge);

// Delete a utility charge
router.delete('/:id', utilityController.deleteUtilityCharge);

module.exports = router;
