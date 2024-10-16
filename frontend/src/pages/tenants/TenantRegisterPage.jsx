import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, TextField, Button, Link, Box, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { registerTenant, sendOtp } from '../../services/authService';

const MEAL_OPTIONS = [
  { value: 'none', label: 'No Food', charge: 0 },
  { value: 'breakfast', label: 'Breakfast', charge: 1500 },
  { value: 'dinner', label: 'Dinner', charge: 1500 },
];

function TenantRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    dateOfJoining: '',
    roomNumber: '',
    monthlyRent: '',
    email: '',
    // meals: [], // We won't store meals in the form data
    fixedMealCharges: 0, // Fixed meal charges based on selections
  });
  const [selectedMeals, setSelectedMeals] = useState([]); // Separate state for selected meals
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'meals') {
      const updatedMeals = value;
      setSelectedMeals(updatedMeals); // Update the selected meals
      setFormData((prevData) => ({
        ...prevData,
        fixedMealCharges: calculateMealCharge(updatedMeals), // Calculate fixed charges based on updated meals
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const calculateMealCharge = (meals) => {
    // Calculate the total meal charge based on selected meals
    let totalCharge = 0;
    if (meals.includes('breakfast')) totalCharge += 1500;
    if (meals.includes('dinner')) totalCharge += 1500;

    return totalCharge;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate that all required fields are filled
    if (!formData.name || !formData.phoneNumber || !formData.dateOfJoining || !formData.monthlyRent || !formData.email) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }

    // Send the form data to the backend including fixedMealCharges
    try {
      await registerTenant({
        ...formData,
        monthlyRent: parseInt(formData.monthlyRent),
        fixedMealCharges: parseInt(formData.fixedMealCharges), // Add meal charges to the monthly rent
        // meals: selectedMeals // Only send selected meals if necessary
      });
      sendOtp({ email: formData.email });
      navigate('/tenant/otp-verification', { state: { email: formData.email } });
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
            required
            fullWidth
            id="monthlyRent"
            label="Monthly Rent"
            name="monthlyRent"
            type="number"
            value={formData.monthlyRent}
            onChange={handleChange}
          />

          {/* Meal Selection Field */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="meal-select-label">Meals</InputLabel>
            <Select
              labelId="meal-select-label"
              id="meals"
              name="meals"
              multiple
              value={selectedMeals}
              onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={MEAL_OPTIONS.find(option => option.value === value)?.label} />
                  ))}
                </Box>
              )}
            >
              {MEAL_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
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
