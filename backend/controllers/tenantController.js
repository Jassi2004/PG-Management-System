// backend/controllers/tenantController.js
const Tenant = require('../models/Tenant'); // Import your Tenant model
const Payment = require('../models/Payment');
const Notification = require('../models/Notification')
const { generateOtp, sendOtpEmail } = require('../utils/otpUtils'); // Adjust the path as necessary

const jwt = require('jsonwebtoken');


// Get all active tenants
exports.getAllTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find({ isActive: true });
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tenants ever lived
exports.getAllTenantsEverLived = async (req, res) => {
    try {
        const tenants = await Tenant.find();
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Tenant Profile
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


// Add a new tenant
exports.addTenant = async (req, res) => {
    const { email, ...restOfTenantData } = req.body;  // Destructure email from request body

    try {
        // Check if tenant already exists
        const existingTenant = await Tenant.findOne({ email });
        
        if (existingTenant) {
            return res.status(400).json({ message: "Tenant with this email already exists. Log in instead" });
        }

        // If not, create a new tenant
        const tenant = new Tenant({
            email, 
            ...restOfTenantData
        });

        const savedTenant = await tenant.save();
        return res.status(201).json(savedTenant);
    } catch (error) {
        return res.status(500).json({ message: error.message });  // Use 500 for server errors
    }
};


// Update tenant
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

// Delete tenant
exports.deleteTenant = async (req, res) => {
    try {
        const tenant = await Tenant.findByIdAndDelete(req.params.id);
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.json({ message: 'Tenant deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Payment History
exports.getPaymentHistory = async (req, res) => {
    try {
        const payments = await Payment.find({ tenantId: req.params.id });
        
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payment history', error: error.message });
    }
};

// Get Notifications
exports.getNotifications = async (req, res) => {
    const tenantId = req.params.id;

    try {
        const notifications = await Notification.find({ tenantId }).sort({ date: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
};  

// Send OTP to tenant's email
exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const tenant = await Tenant.findOne({ email });
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found!' });
        }

        const otp = generateOtp();

        await Tenant.updateOne({ email }, {
            otp: {
                otp,
                expiresAt: Date.now() + 10 * 60 * 1000 // OTP valid for 10 minutes
            }
        });

        const emailSent = await sendOtpEmail(email, otp);

        if (emailSent) {
            res.status(200).json({ message: 'OTP sent to your email!' });
        } else {
            res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
        }
    } catch (error) {
        console.error('Error in sendOtp:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// verify the otp by tenant
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the tenant by email
    const tenant = await Tenant.findOne({ email });

    // Check if the tenant exists and validate OTP
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found!' });
    }
    
    // Check if the OTP is correct and not expired
    if (!tenant.otp || tenant.otp.otp !== otp || tenant.otp.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // OTP is valid, generate JWT token
    const token = jwt.sign(
      { id: tenant._id, email: tenant.email, role: tenant.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Token valid for 24 hours
    );

    // Clear OTP from the database after successful verification
    tenant.otp = undefined; // Clear OTP
    await tenant.save();

    // Send the JWT token to the client
    res.status(200).json({ token, message: 'OTP verified successfully!' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'OTP verification failed. Please try again.', error: error.message });
  }
};




// resend otp
exports.resendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        // Find the tenant by email
        const tenant = await Tenant.findOne({ email });
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found!' });
        }

        // Generate a new OTP
        const otp = generateOtp();

        // Update the tenant with the new OTP and expiration time
        tenant.otp = {
            otp,
            expiresAt: Date.now() + 10 * 60 * 1000 // Valid for 10 minutes
        };
        await tenant.save();

        // Send the new OTP via email
        await sendOtpEmail(email, otp);

        res.status(200).json({ message: 'New OTP sent to your email!' });
    } catch (error) {
        console.error('Error resending OTP:', error);
        res.status(500).json({ message: 'Failed to resend OTP. Please try again later.' });
    }
};
