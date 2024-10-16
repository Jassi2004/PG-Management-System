import { useEffect, useState } from 'react';
import {
  Box, Grid2, Typography, Avatar, TextField, Button,
  useTheme, IconButton, Divider
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles'; // Import keyframes for animation
import { useParams } from 'react-router-dom';
import { fetchTenantData, updateTenantDataByTenant } from '../../services/api';
import {
  Phone, Email, CalendarToday, AttachMoney, Home, Edit, Save
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PaymentLogs from '../paymentPage/PaymentLogs';

// Animation for flashing button (red -> darkred)
const flashAnimation = keyframes`
  0%, 100% { background-color: red; }
  50% { background-color: darkred; }
`;

// Styled Pay Now button that flashes if payment is overdue
const FlashingButton = styled(Button)(() => ({
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '50px',
  padding: '10px 20px',
  animation: `${flashAnimation} 1s infinite`, // Infinite flashing animation
  '&:hover': { backgroundColor: 'darkred' },
}));

const StyledSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: 'all 0.3s ease-in-out',
}));

const InfoItem = ({ icon, label, value, editable, name, onChange, editMode }) => (
  <Box display="flex" alignItems="center" mb={3}>
    <Box mr={2}>{icon}</Box>
    <Box flexGrow={1}>
      <Typography variant="caption" color="textSecondary">
        {label}
      </Typography>
      {editable && editMode ? (
        <TextField
          fullWidth
          variant="standard"
          name={name}
          value={value}
          onChange={onChange}
          sx={{ mt: 0.5 }}
        />
      ) : (
        <Typography variant="body1" sx={{ mt: 0.5 }}>
          {value}
        </Typography>
      )}
    </Box>
  </Box>
);

const TenantDashboard = () => {
  const navigate = useNavigate();

  const paymentPageNavigation = async () => {
    navigate('/new-payment', { state: { amount: tenantData.balance } });
  };

  const { tenantId } = useParams();
  const [tenantData, setTenantData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const theme = useTheme();
  const [overdueDays, setOverdueDays] = useState(0); // Track overdue days

  useEffect(() => {
    const getTenant = async () => {
      if (!tenantId) return console.error('No tenant ID provided');
      try {
        const data = await fetchTenantData(tenantId);
        setTenantData(data);
        console.log(tenantData);

        // Calculate overdue days if balance > 0
        const today = new Date();
        const overdueDate = new Date(data.overdueDate);
        const diffTime = today - overdueDate; // Difference in milliseconds
        const daysOverdue = Math.max(Math.floor(diffTime / (1000 * 60 * 60 * 24)), 0);

        setOverdueDays(daysOverdue); // Set the overdue days
      } catch (error) {
        console.error('Failed to fetch tenant:', error);
      }
    };
    getTenant();
  }, [tenantId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTenantData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateTenantDataByTenant(tenantId, tenantData);
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update tenant:', error);
    }
  };

  if (!tenantData) {
    return <Typography>Loading tenant data...</Typography>;
  }

  // Check if the payment is overdue and if the balance is greater than zero
  const isOverdue = overdueDays > 0 && tenantData.balance > 0;

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        transition: 'background-color 0.3s ease-in-out',
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          backgroundColor: theme.palette.background.paper,
          borderRadius: 4,
          boxShadow: theme.shadows[4],
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            p: 3,
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Tenant Dashboard
          </Typography>

          <Box display="flex" alignItems="center" gap={2}>
            {isOverdue && (
              <FlashingButton
                onClick={paymentPageNavigation}
              >
                Pay Now - {overdueDays} day(s) overdue!
              </FlashingButton>
            )}
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>


          <Grid2 container spacing={4}>
            <Grid2 item xs={12} md={4}>
              <StyledSection>
                <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: theme.palette.secondary.main,
                      fontSize: '3rem',
                      mb: 2,
                    }}
                  >
                    {tenantData?.name?.charAt(0).toUpperCase()}
                  </Avatar>

                  <InfoItem
                    value={tenantData.name}
                    editable={true}
                    name="name"
                    onChange={handleChange}
                    editMode={editMode}
                  />

                  <Typography variant="subtitle1" color="textSecondary">
                    Tenant ID: {tenantId}
                  </Typography>
                  <IconButton
                    onClick={() => (editMode ? handleSave() : setEditMode(true))}
                    color="primary"
                  >
                    {editMode ? <Save /> : <Edit />}
                  </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />
                <InfoItem
                  icon={<Phone color="primary" />}
                  label="Phone Number"
                  value={tenantData.phoneNumber}
                  editable={true}
                  name="phoneNumber"
                  onChange={handleChange}
                  editMode={editMode}
                />
                <InfoItem
                  icon={<Email color="primary" />}
                  label="Email"
                  value={tenantData.email}
                  editable={true}
                  name="email"
                  onChange={handleChange}
                  editMode={editMode}
                />
              </StyledSection>
            </Grid2>

            {/* This is the new section that matches the height and width of the first box */}
            <Grid2 item minWidth={350} xs={16} md={4}>
              <StyledSection>
                <Grid2 container spacing={4}>
                  <Grid2 item xs={12} sm={6}>
                    <InfoItem
                      icon={<CalendarToday color="primary" />}
                      label="Date of Joining"
                      value={new Date(tenantData.dateOfJoining).toLocaleDateString()}
                      editable={false}
                    />
                    <InfoItem
                      icon={<AttachMoney color="primary" />}
                      label="Monthly Rent"
                      value={`₹${tenantData.monthlyRent}`}
                      editable={false}
                    />
                    <InfoItem
                      icon={<AttachMoney color="primary" />}
                      label="Balance Due"
                      value={`₹${tenantData.balance}`}
                      editable={false}
                    />
                    <InfoItem
                      icon={<Home color="primary" />}
                      label="Room Number"
                      value={tenantData.roomNumber}
                      editable={false}
                    />
                  </Grid2>
                </Grid2>
              </StyledSection>
            </Grid2>

            <Grid2 item minWidth={350} xs={16} md={4}>
              <PaymentLogs tenantId={tenantId} />
            </Grid2>



          </Grid2>



        </Box>
      </Box>
    </Box>
  );
};

export default TenantDashboard;
