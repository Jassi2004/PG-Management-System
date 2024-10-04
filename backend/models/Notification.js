const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false // Indicates whether the notification has been read
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
