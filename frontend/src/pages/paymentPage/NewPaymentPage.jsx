import React, { useState } from 'react';
import { Box, Button, Typography, Snackbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { sendPaymentNotification } from '../../services/paymentService';
import QRCodeComponent from './QRCodeComponent'; // Make sure to import QRCodeComponent

const NewPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState(location.state?.amount || '');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
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
        <div> {/* Changed from <p> to <div> */}
          <Typography variant="body1" gutterBottom>
            Follow the steps:
          </Typography>
          <ol>
            <li>Make the payment using the QR code below.</li>
            <li>Click on the "Inform Admin" button.</li>
            <li>Wait for the Admin to approve.</li>
          </ol>
        </div>
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
        <Typography variant="h6" gutterBottom>
          Balance Due: Rs {amount}
        </Typography>

        {/* Include the QRCodeComponent and pass the amount as a prop */}
        <QRCodeComponent amount={amount} />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
          fullWidth
          disabled={!amount} // Disable button if amount is not available
        >
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
