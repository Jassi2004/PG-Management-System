import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { sendOtp } from '../../services/authService'; // Service function to call the backend

function TenantLoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for login action
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call the backend to check the email and send OTP
      await sendOtp({ email });
      // Redirect to OTP verification page with email in state
      navigate('/tenant/otp-verification', { state: { email } });
    } catch (err) {
      setError('Login failed. Make sure the email is correct or try again later.', err);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to the registration page
  const handleRegister = () => {
    navigate('/tenant/register');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Tenant Login</Typography>
        {error && <Typography color="error">{error}</Typography>}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
          />
          
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{ mt: 3, mb: 2 }} 
            disabled={loading || !email} // Disable if loading or email is empty
          >
            {loading ? 'Sending OTP...' : 'Login'}
          </Button>

          {/* Add the option to register */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button 
                variant="text" 
                onClick={handleRegister}
                sx={{ textTransform: 'none', fontSize: '14px', padding: '10px' }}
              >
                Don not have an account? Register as a new tenant
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default TenantLoginPage;
