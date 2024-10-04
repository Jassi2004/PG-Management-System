// backend/models/Tenant.js
const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfJoining: {
        type: Date,
        required: true
    },
    roomNumber: {
        type: String,
        default: null
    },
    monthlyRent: {
        type: Number,
        required: true
    },
    meals: {
        type: String,
        // required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        otp: String,
        expiresAt: Date
    }
});

module.exports = mongoose.model('Tenant', tenantSchema);
