const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

// Get all tenants
router.get('/', tenantController.getAllTenants);

// Get all tenants ever lived
router.get('/getAllTenantsEverLived', tenantController.getAllTenantsEverLived);

// Get Tenant Profile
router.get('/:id', tenantController.getTenantProfile);

// Add a new tenant
router.post('/', tenantController.addTenant);

// Update tenant details
router.put('/:id', tenantController.updateTenant);

// Delete a tenant
router.delete('/:id', tenantController.deleteTenant);

// Get Payment History
router.get('/:id/payments', tenantController.getPaymentHistory);

// Get Notifications
router.get('/:id/notifications', tenantController.getNotifications);

//send Otp
router.post('/send-otp', tenantController.sendOtp);

// verify otp
router.post('/verify-otp', tenantController.verifyOtp);

// resend otp
router.post('/resend-otp', tenantController.resendOtp);







module.exports = router;
