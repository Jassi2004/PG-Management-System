// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware } = require('../middlewares/authMiddleware');


// Admin registration
router.post('/register', adminController.registerAdmin);

// Admin login
router.post('/login', adminController.loginAdmin);

// Get dashboard overview
router.get('/dashboard', authMiddleware , adminController.getDashboardOverview);

// Manage tenants
router.post('/tenants', adminController.addTenant);
router.put('/tenants/:id', adminController.updateTenant);
router.get('/tenants', adminController.getAllTenants);
router.get('/tenants/ever-lived', adminController.getAllTenantsEverLived);
router.get('/tenants/:id', adminController.getTenantProfile);

// Manage payments
router.get('/payments', adminController.getAllPayments);
router.post('/payments', adminController.addPayment);
router.get('/payments/:tenantId', adminController.getPaymentHistory);

// Manage utility charges
router.get('/utilities', adminController.getAllUtilities);
router.post('/utilities', adminController.addUtilityCharge);
router.put('/utilities/:id', adminController.updateUtilityCharge);

// Manage food charges
router.get('/food', adminController.getAllFoodEntries);
router.post('/food', adminController.addFoodEntry);
router.put('/food/:id', adminController.updateFoodEntry);

// Manage monthly summaries
router.get('/summaries', adminController.getAllMonthlySummaries);
router.post('/summaries', adminController.generateMonthlySummary);

// Manage notifications
router.post('/notifications', adminController.sendNotification);
router.get('/notifications/:tenantId', adminController.getTenantNotifications);

module.exports = router;

