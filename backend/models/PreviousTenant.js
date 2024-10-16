const mongoose = require('mongoose');

// Meal schema: Track meals served (can be used for occasional meal tracking)
const mealSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    type: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner'], // Add lunch if needed
        required: true,
    },
    charge: {
        type: Number,
        required: true,
    },
});

// Previous Tenant schema: Track previous tenant details
const previousTenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email uniqueness in the previous tenant collection
    },
    dateOfJoining: {
        type: Date,
        required: true,
    },
    roomNumber: {
        type: String,
        default: null,
    },
    monthlyRent: {
        type: Number,
        required: true,
    },
    fixedMealCharges: {
        type: Number,
        default: 0, // Default to 0 if no meals are selected
    },
    meals: {
        type: [mealSchema],
        default: [],
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        otp: String,
        expiresAt: Date,
    },
    isActive: {
        type: Boolean,
        default: false, // Previous tenants are not active
    },
    balance: {
        type: Number,
        default: 0, // Initial balance set to 0
    },
    overdueDate: {
        type: Date, // Tracks the last bill due date
    },
    deletionDate: {
        type: Date, // Optional: track when the tenant was deleted
        default: Date.now, // Default to current date/time
    },
});

// Export the Previous Tenant model
module.exports = mongoose.model('PreviousTenant', previousTenantSchema);
