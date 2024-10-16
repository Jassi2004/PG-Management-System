const cron = require('node-cron');
const Tenant = require('../models/Tenant'); // Import the Tenant model
const { sendBillNotificationEmail } = require('./monthlyBillGenerator');

/**
 * Helper function to safely add months to a date.
 * Handles edge cases where adding a month shifts to the wrong day (e.g., Jan 31 + 1 month).
 */
function addOneMonth(date) {
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1; // Increment month
  newDate.setMonth(month);

  // If month rolls over due to fewer days, correct it to the last day of the previous month.
  if (newDate.getMonth() !== month % 12) {
    newDate.setDate(0); // Set to last day of the previous month
  }

  return newDate;
}

// Function to generate bills and update balances
const generateMonthlyBills = async () => {
  console.log("Generating monthly bills...");

  try {
    const tenants = await Tenant.find({ isActive: true });
    const today = new Date();

    for (const tenant of tenants) {
      if (today >= new Date(tenant.overdueDate)) {
        tenant.balance += tenant.monthlyRent;
        tenant.overdueDate = addOneMonth(tenant.overdueDate);
        await tenant.save();

        // Log bill generation and email sending
        console.log(`Bill generated for ${tenant.name}. New balance: ₹${tenant.balance}. Next due: ${tenant.overdueDate}`);

        // Send email
        await sendBillNotificationEmail(tenant.email, tenant.name, tenant.balance);
      } else {
        console.log(`No action for ${tenant.name}. Overdue date: ${tenant.overdueDate}`);
      }
    }
  } catch (error) {
    console.error('Error generating monthly bills:', error);
  }
};


// Schedule the cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running scheduled bill generation at midnight...');
  await generateMonthlyBills();
});

module.exports = { generateMonthlyBills };
