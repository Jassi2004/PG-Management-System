const cron = require('node-cron');
const Tenant = require('./models/Tenant');

// Set up a cron job to run every hour
cron.schedule('0 * * * *', async () => {
    console.log('Cleaning up expired OTPs...');
    try {
        // Remove OTPs where the expiration time has passed
        await Tenant.updateMany(
            { 'otp.expiresAt': { $lt: Date.now() } }, // Find OTPs that are expired
            { $unset: { otp: "" } }                  // Remove the otp field
        );
        console.log('Expired OTPs cleaned up.');
    } catch (error) {
        console.error('Error cleaning expired OTPs:', error);
    }
});
