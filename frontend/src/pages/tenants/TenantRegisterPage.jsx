import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, TextField, Button, Link, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { registerTenant, sendOtp } from '../../services/authService'; // Make sure this function is properly defined in your service

function TenantRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    dateOfJoining: '',
    roomNumber: '',
    monthlyRent: '',
    meals: '', // Meal preferences
    email: '', // Email field
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate that all required fields are filled
    if (!formData.name || !formData.phoneNumber || !formData.dateOfJoining || !formData.monthlyRent || !formData.meals || !formData.email) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }

    try {
      await registerTenant(formData);
      sendOtp({ email: formData.email });
      navigate('/tenant/otp-verification', { state: { email: formData.email } }); // Pass the email to the OTP verification page
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Tenant Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dateOfJoining"
            label="Date Of Joining"
            name="dateOfJoining"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dateOfJoining}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="roomNumber"
            label="Room Number"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="monthlyRent"
            label="Monthly Rent"
            name="monthlyRent"
            type="number"
            value={formData.monthlyRent}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="meals-label">Meals</InputLabel>
            <Select
              labelId="meals-label"
              id="meals"
              name="meals"
              value={formData.meals}
              onChange={handleChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="breakfast">Breakfast</MenuItem>
              <MenuItem value="dinner">Dinner</MenuItem>
              <MenuItem value="all">All Meals</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
          <Link component={RouterLink} to="/tenant/login" variant="body2">
            {"Already have an account? Sign In"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default TenantRegisterPage;
