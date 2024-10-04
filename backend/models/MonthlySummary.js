const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monthlySummarySchema = new Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalRent: {
        type: Number,
        required: true
    },
    totalFoodCharges: {
        type: Number,
        required: true
    },
    totalUtilityCharges: {
        type: Number,
        required: true
    },
    totalPayments: {
        type: Number,
        required: true
    },
    balanceDue: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MonthlySummary', monthlySummarySchema);
