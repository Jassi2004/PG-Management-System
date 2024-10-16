const Tenant = require('../models/Tenant');
const Food = require('../models/Food');

// Function to add food charges to a tenant's balance
const addFoodCharges = async (tenantId, cost) => {
    try {
        const tenant = await Tenant.findById(tenantId);
        if (!tenant) throw new Error('Tenant not found');
        
        tenant.balance -= cost; // Deduct the cost of the meal
        await tenant.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to generate monthly bills
const generateMonthlyBill = async (tenantId) => {
    try {
        const tenant = await Tenant.findById(tenantId);
        if (!tenant) throw new Error('Tenant not found');

        const startDate = new Date(tenant.dateOfJoining);
        const endDate = new Date();
        const totalFoodCharges = await Food.aggregate([
            { $match: { tenantId: tenantId, date: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, total: { $sum: '$cost' } } }
        ]);

        const billAmount = tenant.monthlyRent + (totalFoodCharges[0]?.total || 0);
        // Save bill to a Bill model (not shown)
        
        // Reset tenant balance or whatever logic you want
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    addFoodCharges,
    generateMonthlyBill,
};
