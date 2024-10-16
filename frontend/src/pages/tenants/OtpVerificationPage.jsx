import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { verifyOtp, resendOtp } from '../../services/authService'; // Import the resendOtp function
import { getTenantIdFromEmail } from '../../services/api';

function OtpVerificationPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for OTP verification
  const [resendLoading, setResendLoading] = useState(false); // Loading state for Resend OTP
  const [resendDisabled, setResendDisabled] = useState(false); // Disable resend button for a short period
  const [resendMessage, setResendMessage] = useState(''); // Message after resending OTP

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get the email passed during navigation from registration

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // console.log("email , otp => ", email, otp);
    

    try {
      const response = await verifyOtp({ email, otp }); // Call backend API to verify OTP
      console.log("rsponse by jassi=> ",response.token);

      console.log("email: ", email);
      
      const tenantId = await getTenantIdFromEmail(email);
      console.log("tenantId: ", tenantId);
      
      navigate(`/tenant/dashboard/${tenantId.tenantId}`); // Redirect to the dashboard upon success
    } catch (err) {
      setError('Invalid OTP. Please try again.', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setResendMessage('');
    setResendDisabled(true);

    try {
      await resendOtp({ email }); // Call backend API to resend OTP
      setResendMessage('OTP has been resent. Please check your email.');
    } catch (err) {
      setResendMessage('Failed to resend OTP. Please try again later.', err);
    } finally {
      setResendLoading(false);
      // Re-enable the resend button after 30 seconds
      setTimeout(() => {
        setResendDisabled(false);
      }, 30000); // 30 seconds
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Verify OTP</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {resendMessage && <Typography color="primary">{resendMessage}</Typography>}
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="Enter OTP from Email"
            name="otp"
            value={otp}
            onChange={handleOtpChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
        </Box>

        <Button 
          onClick={handleResendOtp} 
          fullWidth 
          variant="outlined" 
          sx={{ mt: 3, mb: 1 }}
          disabled={resendLoading || resendDisabled} // Disable button while loading or during cooldown
        >
          {resendLoading ? 'Resending OTP...' : 'Resend OTP'}
        </Button>
      </Box>
    </Container>
  );
}

export default OtpVerificationPage;
