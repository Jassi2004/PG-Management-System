// backend/controllers/tenantController.js
const Tenant = require('../models/Tenant'); // Import your Tenant model
const Payment = require('../models/Payment');
const Notification = require('../models/Notification')
const { generateOtp, sendOtpEmail } = require('../utils/otpUtils'); // Adjust the path as necessary
const PreviousTenant = require('../models/PreviousTenant'); // Import the Previous Tenant model

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
// Get Tenant Profile
exports.getTenantProfile = async (req, res) => {
    try {
        let tenant = await Tenant.findById(req.params.id); // Use 'let' so it can be reassigned

        if (!tenant) {
            tenant = await PreviousTenant.findById(req.params.id); // Check in previous tenants
        }

        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        res.status(200).json(tenant);
    } catch (error) {
        console.error('Error fetching tenant:', error); // Log error for debugging
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
        // Fetch the tenant to calculate the updated fixedMealCharges
        const tenant = await Tenant.findById(req.params.id);
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        // Calculate the new fixedMealCharges if meals are being added
        if (req.body.meals && Array.isArray(req.body.meals)) {
            const newMeals = req.body.meals;
            const additionalCharges = newMeals.reduce((total, meal) => total + meal.charge, 0);
            req.body.fixedMealCharges = tenant.fixedMealCharges + additionalCharges; // Update the fixed meal charges
        }

        // Update the tenant with the new data
        const updatedTenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Check if the tenant was found and updated
        if (!updatedTenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        // Respond with the updated tenant data
        res.json(updatedTenant);
    } catch (error) {
        console.error('Error updating tenant:', error);
        res.status(400).json({ message: error.message });
    }
};




// Delete tenant
exports.deleteTenant = async (req, res) => {
    try {
        // Find the tenant by ID
        const tenant = await Tenant.findById(req.params.id);

        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        // Save the tenant data to Previous Tenants
        const previousTenant = new PreviousTenant({
            name: tenant.name,
            phoneNumber: tenant.phoneNumber,
            email: tenant.email,
            roomNumber: tenant.roomNumber,
            monthlyRent: tenant.monthlyRent,
            balance: tenant.balance,
            dateOfJoining: tenant.dateOfJoining,
            // Add any other fields you want to save
        });

        // Save to Previous Tenants collection
        await previousTenant.save();

        // Delete the tenant
        await Tenant.findByIdAndDelete(req.params.id);

        res.json({ message: 'Tenant deleted and saved to Previous Tenants' });
    } catch (error) {
        console.error(error); // Log the error for debugging
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
        if (!tenant.isActive) {
            return res.status(403).json({ message: 'Tenant not active!' });
        }

        const otp = generateOtp();
        console.log("Generated OTP:", otp);

        // Update tenant's OTP field
        tenant.otp = {
            otp: otp,
            expiresAt: Date.now() + 10 * 60 * 1000 // OTP valid for 10 minutes
        };

        await tenant.save(); // Save updated tenant with OTP

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
    // console.log(email, otp);

    try {
        // Find the tenant by email
        const tenant = await Tenant.findOne({ email });
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found!' });
        }

        // Check if the OTP exists and is valid
        if (!tenant.otp || tenant.otp.otp !== String(otp)) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Check if the OTP is expired
        if (tenant.otp.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'OTP expired.' });
        }

        // OTP is valid, generate JWT token
        const token = jwt.sign(
            { id: tenant._id, email: tenant.email, role: tenant.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Token valid for 24 hours
        );

        // Mark email as verified and clear the OTP
        tenant.isEmailVerified = true;
        tenant.otp = undefined; // Clear OTP field after successful verification
        await tenant.save();

        console.log('OTP verified successfully!');
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

        if (!tenant.isActive) {
            return res.status(403).json({ message: 'Tenant not active!' });
        }

        // Generate a new OTP
        const otp = generateOtp();
        // console.log("Generated new OTP:", otp);

        // Update the tenant with the new OTP and expiration time
        tenant.otp = {
            otp: otp,
            expiresAt: Date.now() + 10 * 60 * 1000 // OTP valid for 10 minutes
        };

        await tenant.save(); // Save updated tenant

        // Send the new OTP via email
        const emailSent = await sendOtpEmail(email, otp);
        if (emailSent) {
            res.status(200).json({ message: 'New OTP sent to your email!' });
        } else {
            res.status(500).json({ message: 'Failed to send new OTP. Please try again later.' });
        }
    } catch (error) {
        console.error('Error resending OTP:', error);
        res.status(500).json({ message: 'Failed to resend OTP. Please try again later.' });
    }
};





// Add a new tenant
exports.getTenantIdFromEmail = async (req, res) => {
    const { email } = req.body;  // Destructure email from request body
    // console.log(email , "sent to backend");


    try {
        // Check if tenant already exists
        const existingTenant = await Tenant.findOne({ email });

        if (existingTenant) {
            return res.status(200).json({ tenantId: existingTenant._id });
        } else {
            // Tenant doesn't exist - Handle the case
            return res.status(404).json({ message: "Tenant with this email not found." }); // (404 Not Found)
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });  // Use 500 for server errors
    }
};
