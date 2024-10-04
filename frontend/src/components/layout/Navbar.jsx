// src/components/layout/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Switch } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useColorMode } from '../../context/ColorModeContext';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const { toggleColorMode, mode } = useColorMode(); // Access toggleColorMode and mode from context
  const theme = useTheme();
  const navigate = useNavigate(); // Use useNavigate to programmatically navigate

  const glassEffect = {
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const textColor = theme.palette.mode === 'light' ? '#000000' : '#FFFFFF';

  const buttonStyles = {
    color: textColor,
    padding: '10px 20px',
    margin: '0 10px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    },
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <AppBar position="static" sx={glassEffect}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: textColor }}>
          Pg Management System
        </Typography>
        <Button sx={buttonStyles} component={Link} to="/">
          Home
        </Button>
        <Button sx={buttonStyles} component={Link} to="/admin/login">
          Admin Login
        </Button>
        <Button sx={buttonStyles} component={Link} to="/tenant/login">
          Tenant Login
        </Button>
        <Switch
          checked={mode === 'dark'} // Toggle switch state based on current mode
          onChange={toggleColorMode} // Call toggleColorMode on change
          color="default"
          inputProps={{ 'aria-label': 'dark mode toggle' }} // Accessibility
        />
        <Button sx={buttonStyles} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
