import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  useTheme,
  useMediaQuery,
  Snackbar,
  IconButton,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fetchTenantData, updateTenantData, deleteTenant } from '../../services/api';
import { submitPayment, sendPaymentNotification } from '../../services/paymentService';
import PaymentLogs from '../paymentPage/PaymentLogs';
import { Edit, Save, Cancel, Delete, Restaurant, Payment, Close } from '@mui/icons-material';

const TenantProfilePageForAdmin = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [tenant, setTenant] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openFoodModal, setOpenFoodModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [mealType, setMealType] = useState('');
  const [mealDate, setMealDate] = useState(null);
  const [mealCharge, setMealCharge] = useState(0);

  const [paymentDate, setPaymentDate] = useState(new Date());
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  useEffect(() => {
    const getTenant = async () => {
      if (!tenantId) {
        console.error('No tenant ID provided');
        setLoading(false);
        return;
      }
      try {
        const data = await fetchTenantData(tenantId);
        setTenant(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tenant:', error);
        setLoading(false);
        showSnackbar('Failed to fetch tenant data', 'error');
      }
    };
    getTenant();
  }, [tenantId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTenant((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateTenantData(tenantId, tenant);
      setEditMode(false);
      showSnackbar('Tenant data updated successfully', 'success');
    } catch (error) {
      console.error('Failed to update tenant:', error);
      showSnackbar('Failed to update tenant data', 'error');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      try {
        await deleteTenant(tenantId);
        navigate('/admin/dashboard');
        showSnackbar('Tenant deleted successfully', 'success');
      } catch (error) {
        console.error('Failed to delete tenant:', error);
        showSnackbar('Failed to delete tenant', 'error');
      }
    }
  };

  const handleClearBalance = async () => {
    const confirmed = window.confirm('Are you sure you want to clear the balance? This action cannot be undone.');
    if (!confirmed) return;

    try {
      const updatedTenant = { ...tenant, balance: 0 };
      await updateTenantData(tenantId, updatedTenant);
      setTenant(updatedTenant);
      setEditMode(false);
      showSnackbar('Balance cleared successfully', 'success');
    } catch (error) {
      console.error('Failed to clear balance:', error);
      showSnackbar('Failed to clear balance', 'error');
    }
  };

  const handleOpenFoodModal = () => setOpenFoodModal(true);
  const handleCloseFoodModal = () => {
    setOpenFoodModal(false);
    setMealType('');
    setMealDate(null);
    setMealCharge(0);
  };

  const handleFoodBalance = async () => {
    if (!mealType || !mealDate || mealCharge <= 0) {
      showSnackbar('Please fill in all fields correctly.', 'error');
      return;
    }

    const newMeal = {
      date: new Date(mealDate),
      type: mealType,
      charge: parseFloat(mealCharge),
    };

    try {
      const updatedMeals = [...(tenant.meals || []), newMeal];
      const updatedFixedMealCharges = tenant.fixedMealCharges + mealCharge;
      const updatedBalance = tenant.balance + mealCharge;

      const updatedTenant = {
        ...tenant,
        meals: updatedMeals,
        fixedMealCharges: updatedFixedMealCharges,
        balance: updatedBalance,
      };

      await updateTenantData(tenantId, updatedTenant);
      setTenant(updatedTenant);
      handleCloseFoodModal();
      showSnackbar('Meal added successfully!', 'success');
    } catch (error) {
      console.error('Failed to add meal:', error);
      showSnackbar('Error adding meal. Please try again.', 'error');
    }
  };

  const handleOpenPaymentModal = () => setOpenPaymentModal(true);
  const handleClosePaymentModal = () => {
    setOpenPaymentModal(false);
    setPaymentAmount(0);
    setPaymentDate(new Date());
    setPaymentMethod('cash');
  };

  const handlePaymentLogs = async () => {
    if (paymentAmount <= 0 || !paymentDate) {
      showSnackbar('Please enter a valid amount and date.', 'error');
      return;
    }

    const newPayment = {
      tenantId: tenantId,
      date: paymentDate,
      amount: paymentAmount,
      method: paymentMethod,
    };

    try {
      await submitPayment(newPayment);
      await sendPaymentNotification('admin@example.com', tenant.name, paymentAmount);
      showSnackbar('Payment logged successfully!', 'success');
      handleClosePaymentModal();
    } catch (error) {
      console.error('Failed to log payment:', error);
      showSnackbar('Error logging payment. Please try again.', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) return <CircularProgress />;
  if (!tenant) return <Typography>Tenant not found</Typography>;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 3, m: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                alt={tenant.name}
                src="/path-to-avatar-image.jpg"
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <Button variant="contained" component="label" sx={{ mb: 2 }}>
                Upload Avatar
                <input type="file" hidden />
              </Button>
              <Typography variant="h4" gutterBottom>
                {tenant.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              Tenant Profile ID: {tenantId}
            </Typography>
            <Grid container spacing={2}>
              {[
                { label: 'Name', name: 'name' },
                { label: 'Phone Number', name: 'phoneNumber' },
                { label: 'Email', name: 'email' },
                { label: 'Date of Joining', name: 'dateOfJoining', type: 'date' },
                { label: 'Room Number', name: 'roomNumber' },
                { label: 'Monthly Rent', name: 'monthlyRent', type: 'number' },
                { label: 'Balance', name: 'balance', type: 'number', disabled: true },
              ].map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    type={field.type || 'text'}
                    value={field.type === 'date' ? tenant[field.name].split('T')[0] : tenant[field.name]}
                    onChange={handleChange}
                    disabled={!editMode || field.disabled}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
              {editMode ? (
                <>
                  <Button variant="contained" onClick={handleSave} startIcon={<Save />}>
                    Save
                  </Button>
                  <Button variant="outlined" onClick={() => setEditMode(false)} startIcon={<Cancel />}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="contained" onClick={() => setEditMode(true)} startIcon={<Edit />}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={handleDelete} startIcon={<Delete />}>
                    Delete Tenant
                  </Button>
                  <Button variant="contained" onClick={handleClearBalance}>
                    Clear Balance
                  </Button>
                </>
              )}
            </Box>
            <Box mt={4} display="flex" flexWrap="wrap" gap={2}>
              <Button variant="contained" onClick={handleOpenFoodModal} startIcon={<Restaurant />}>
                Add Meal
              </Button>
              <Button variant="contained" onClick={handleOpenPaymentModal} startIcon={<Payment />}>
                Add Payment
              </Button>
            </Box>
          </Grid>
        </Grid>
        <PaymentLogs tenantId={tenantId} />
      </Paper>

      {/* Food Modal */}
      <Dialog open={openFoodModal} onClose={handleCloseFoodModal} fullScreen={isMobile}>
        <DialogTitle>Add Meal</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meal Type"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="Meal Date"
                value={mealDate}
                onChange={(newValue) => setMealDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Charge"
                type="number"
                value={mealCharge}
                onChange={(e) => setMealCharge(parseFloat(e.target.value))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFoodModal}>Cancel</Button>
          <Button onClick={handleFoodBalance} variant="contained">
            Add Meal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={openPaymentModal} onClose={handleClosePaymentModal} fullScreen={isMobile}>
        <DialogTitle>Add Payment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Payment Amount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="Payment Date"
                value={paymentDate}
                onChange={(newValue) => setPaymentDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Payment Method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="creditCard">UPI</MenuItem>
                <MenuItem value="debitCard">Debit Card</MenuItem>
                <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentModal}>Cancel</Button>
          <Button onClick={handlePaymentLogs} variant="contained">
            Log Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />

      {/* <PaymentLogs tenantId={tenantId} /> */}

    </LocalizationProvider>
  );
};

export default TenantProfilePageForAdmin;