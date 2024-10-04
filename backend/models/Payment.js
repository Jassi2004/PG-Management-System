const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        default: 'cash'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
    