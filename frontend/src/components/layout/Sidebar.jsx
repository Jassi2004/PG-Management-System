// import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const Sidebar = () => {
  return (
    <div style={{ width: '240px' }}>
      <List component="nav">
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/admin/tenants">
          <ListItemText primary="Tenants" />
        </ListItem>
        <ListItem button component={Link} to="/admin/payments">
          <ListItemText primary="Payments" />
        </ListItem>
        <ListItem button component={Link} to="/admin/food">
          <ListItemText primary="Food Charges" />
        </ListItem>
        <ListItem button component={Link} to="/admin/utilities">
          <ListItemText primary="Utility Charges" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};

export default Sidebar;
