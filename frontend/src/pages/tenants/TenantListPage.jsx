import { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import { fetchTenants } from '../../services/api';

const TenantListPage = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const getTenants = async () => {
      try {
        const data = await fetchTenants();
        setTenants(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTenants();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tenant List
      </Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: '20px' }}>
        Add Tenant
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Room No.</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant._id}>
                <TableCell>{tenant.name}</TableCell>
                <TableCell>{tenant.roomNo}</TableCell>
                <TableCell>{tenant.isActive ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TenantListPage;
