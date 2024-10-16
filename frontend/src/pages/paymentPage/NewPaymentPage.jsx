import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Snackbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { sendPaymentNotification } from '../../services/paymentService';

const NewPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access the location object
  const [amount, setAmount] = useState(location.state?.amount || ''); // Get amount from state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      // Send notification to the admin after a successful payment
      await sendPaymentNotification('bedijaskirat2004@gmail.com', 'Tenant Name', amount);
      setSnackbarMessage('Payment Successful! Admin notified.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Payment error:', error);
      setSnackbarMessage('Payment failed. Please try again.');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: 4,
          maxWidth: '600px',
          margin: '0 auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          New Payment
        </Typography>
        <Typography variant="h7" gutterBottom>
          Follow the steps.. <br />
          1. Make The Payment on the below given QR Code. <br />
          2. Click on the submit button below. <br />
          3. Wait for the Admin to approve.
        </Typography>
      </Box>

      <Box
        sx={{
          padding: 4,
          maxWidth: '600px',
          margin: '0 auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: 3,
          marginTop: '5px',
        }}
      >
        <Typography>
          Balance Due: Rs {amount}
        </Typography>

        {/* Display QR Code */}
        <Box sx={{ textAlign: 'center', marginY: 2 }}>
          <img
            src="./qrCode.png" // Replace this with the actual QR code image source
            alt="QR Code for Payment"
            style={{ width: '200px', height: '200px' }} // Adjust the size as necessary
          />
        </Box>

        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} fullWidth>
          Inform Admin
        </Button>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Box>
    </>
  );
};

export default NewPaymentPage;
