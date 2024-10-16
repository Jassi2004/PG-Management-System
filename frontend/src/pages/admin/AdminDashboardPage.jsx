import { useState, useEffect } from 'react';
import { fetchAllTenants, fetchPreviousTenants } from '../../services/api';
import TenantGrid from '../tenants/TenantGrid';
import { Typography, Button, Box, CircularProgress, Tooltip } from '@mui/material';

const AdminDashboard = () => {
    const [activeTenants, setActiveTenants] = useState([]);
    const [previousTenants, setPreviousTenants] = useState([]);
    const [loadingActive, setLoadingActive] = useState(true);
    const [loadingPrevious, setLoadingPrevious] = useState(false);
    const [isShowingPrevious, setIsShowingPrevious] = useState(false);

    // Fetch active tenants when the component loads
    useEffect(() => {
        const getActiveTenants = async () => {
            try {
                const tenants = await fetchAllTenants();
                setActiveTenants(tenants);
            } catch (error) {
                console.error('Failed to fetch active tenants:', error);
            } finally {
                setLoadingActive(false);
            }
        };
        getActiveTenants();
    }, []);

    // Fetch previous tenants only when needed (on toggle)
    const fetchPreviousTenantsData = async () => {
        setLoadingPrevious(true);
        try {
            const tenants = await fetchPreviousTenants();
            setPreviousTenants(tenants);
        } catch (error) {
            console.error('Failed to fetch previous tenants:', error);
        } finally {
            setLoadingPrevious(false);
        }
    };

    // Handle the toggle between active and previous tenants
    const handleToggleTenants = () => {
        setIsShowingPrevious((prev) => !prev);
        if (!isShowingPrevious) {
            fetchPreviousTenantsData(); // Fetch previous tenants only when switching to "Previous Tenants"
        }
    };

    return (
        <div className="dashboard">
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Tooltip
                    title={isShowingPrevious ? 'Show Active Tenants' : 'Show Previous Tenants'}
                    arrow
                    placement="top"
                >
                    <Button
                        variant="contained"
                        onClick={handleToggleTenants}
                        sx={{
                            fontSize: '1.5rem',
                            padding: '1rem 2rem',
                            width: '50%',
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            borderRadius: '12px',
                            transition: 'background-color 0.3s, transform 0.2s',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                                transform: 'scale(1.05)',
                            },
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {isShowingPrevious ? 'Previous Tenants' : 'Active Tenants'}
                    </Button>
                </Tooltip>
            </Box>

            <Box sx={{ mt: 3 }}>
                {isShowingPrevious && loadingPrevious ? (
                    <CircularProgress />
                ) : !isShowingPrevious && loadingActive ? (
                    <CircularProgress />
                ) : (
                    <TenantGrid tenants={isShowingPrevious ? previousTenants : activeTenants} />
                )}
            </Box>
        </div>
    );
};

export default AdminDashboard;
