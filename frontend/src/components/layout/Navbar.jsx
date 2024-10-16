import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useColorMode } from '../../context/ColorModeContext';
import { useTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const theme = useTheme(); // Extracts the current theme (light/dark mode)
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token')); // Initialize from localStorage

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(!!localStorage.getItem('token')); // Update state on token change
    };

    window.addEventListener('storage', handleStorageChange); // Listen for localStorage changes

    return () => {
      window.removeEventListener('storage', handleStorageChange); // Cleanup listener
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  };

  const glassEffect = {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(0, 0, 0, 0.7)',
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
      backgroundColor:
        theme.palette.mode === 'light'
          ? 'rgba(0, 0, 0, 0.1)'
          : 'rgba(255, 255, 255, 0.1)',
    },
  };

  return (
    <AppBar position="static" sx={glassEffect}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: textColor }}>
          Pg Management System
        </Typography>

        {!loggedIn ? (
          <>
            <Button sx={buttonStyles} component={Link} to="/">
              Home
            </Button>
            <Button sx={buttonStyles} component={Link} to="/admin/login">
              Admin Login
            </Button>
            <Button sx={buttonStyles} component={Link} to="/tenant/login">
              Tenant Login
            </Button>
          </>
        ) : (
          <Button sx={buttonStyles} onClick={handleLogout}>
            Logout
          </Button>
        )}

        {/* Corrected Color Mode Toggle Button */}
        <IconButton
          onClick={toggleColorMode}
          sx={{
            color: textColor,
            marginLeft: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: '8px',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
            },
          }}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
