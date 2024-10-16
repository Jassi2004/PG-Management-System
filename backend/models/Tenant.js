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
    default: 75
  },
});

// Tenant schema: Track tenant details
const tenantSchema = new mongoose.Schema({
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
    unique: true,
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
    default: true,
  },
  balance: {
    type: Number,
    default: 0, // Initial balance set to 0
  },
  overdueDate: {
    type: Date, // Tracks the next bill due date
  },
});

// Pre-save hook to set initial balance to monthly rent
tenantSchema.pre('save', function (next) {
  if (this.isNew) {
    this.overdueDate = new Date(this.dateOfJoining); // Set overdue date to date of joining
    this.balance = this.monthlyRent + this.fixedMealCharges; // Set initial balance to monthly rent + fixed meal charges
  }
  next();
});

module.exports = mongoose.model('Tenant', tenantSchema);
