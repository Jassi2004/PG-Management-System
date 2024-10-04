const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/monthlySummaryController'); // Assuming you use reportController for summaries

// Get all monthly summaries
router.get('/', summaryController.getAllSummaries);

// Get a specific monthly summary by ID
router.get('/:id', summaryController.getSummaryById);

// Create a new monthly summary
router.post('/', summaryController.addSummary);

// Update a monthly summary
router.put('/:id', summaryController.updateSummary);

// Delete a monthly summary
router.delete('/:id', summaryController.deleteSummary);

module.exports = router;
