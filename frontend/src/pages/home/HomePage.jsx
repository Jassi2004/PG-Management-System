import { Box, Button, Container, Typography, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function HomePage() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: 8 }}>
      {/* Introductory Heading */}
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the PG Management System
      </Typography>

      {/* Description Section */}
      <Typography variant="body1" color="textSecondary" paragraph>
        Our PG Management System helps you manage tenants, track payments, and monitor food and utility charges efficiently.
        This platform simplifies the administration of PG accommodations and ensures smooth tenant relations with secure login options.
      </Typography>

      {/* Login Options */}
      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item>

          </Grid>



          <Grid item>
            <Button
              component={RouterLink}
              to="/tenant/login"
              variant="contained"
              color="secondary"
              size="large"
            >
              Tenant Login
            </Button>
          </Grid>

          <Grid item>
            <Button
              component={RouterLink}
              to="/tenant/register"
              variant="contained"
              color="secondary"
              size="large"
            >
              Tenant Register
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: 8, paddingTop: 4 }}>
        <Button
          component={RouterLink}
          to="/admin/login"
          variant="contained"
          color="primary"
          size="large"
        >
          Admin Login
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ marginTop: 8, paddingTop: 4, borderTop: '1px solid #ddd' }}>
        <Typography variant="body2" color="textSecondary">
          Made with 💻 & ❤️ by Jaskirat Singh
        </Typography>
      </Box>
    </Container>
  );
}

export default HomePage;
