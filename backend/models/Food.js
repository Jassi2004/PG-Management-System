const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    mealType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner'],
        required: true
    },
    cost: {
        type: Number,
        default: 75
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Food', foodSchema);
