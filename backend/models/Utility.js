const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const utilitySchema = new Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['Electricity', 'Water', 'Gas', 'Other'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Utility', utilitySchema);
