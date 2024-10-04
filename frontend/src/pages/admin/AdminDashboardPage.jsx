import { useEffect, useState } from 'react';
import { fetchDashboardData, fetchAllTenants } from '../../services/api';
import TenantGrid from '../tenants/TenantGrid'; // Import your TenantGrid component

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({});
    const [tenants, setTenants] = useState([]);


    useEffect(() => {
        const getData = async () => {
            const data = await fetchDashboardData();
            setDashboardData(data);
        };
        getData();
    }, []);

    useEffect(() => {
        const getTenants = async () => {
            const tenantData = await fetchAllTenants();
            setTenants(tenantData);
        };
        getTenants();
    }, []);

    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
            <div className="stats">
                <div>Total Tenants: {dashboardData.totalTenants}</div>
                <div>Total Payments: {dashboardData.totalPayments}</div>
                <div>Total Utilities: {dashboardData.totalUtilities}</div>
                <div>Total Food Entries: {dashboardData.totalFoodEntries}</div>
            </div>
            <h2>Active Tenants</h2>
            <TenantGrid tenants={tenants} /> {/* Use TenantGrid component */}
        </div>
    );
};

export default AdminDashboard;
