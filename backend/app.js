// backend/app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the connectDB function
const tenantRoutes = require('./routes/tenantRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const foodRoutes = require('./routes/foodRoutes');
const newPaymentRoutes = require('./routes/newPaymentRoutes');
// const utilityRoutes = require('./routes/utilityRoutes');
const summaryRoutes = require('./routes/newPaymentRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Optional
const cors = require('cors');
const { newPayment } = require('./controllers/newPayment');


dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
connectDB(); // Call the function to connect to the database

// Use the cors middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods
  credentials: true, // Enable credentials (optional)
}));

app.use('/api/tenants', tenantRoutes);

app.use('/api/payments', paymentRoutes);

app.use('/api/food', foodRoutes);

// app.use('/api/utilities', utilityRoutes);

app.use('/api/summaries', summaryRoutes);

app.use('/api/admin', adminRoutes); // Optional

app.use('/api/newPayment', newPaymentRoutes);

// app.use('/api/qr-code',);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
