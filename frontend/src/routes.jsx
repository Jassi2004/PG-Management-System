import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import TenantLoginPage from './pages/tenants/TenantLoginPage';
import TenantRegisterPage from './pages/tenants/TenantRegisterPage';
import HomePage from './pages/home/HomePage';  
import OtpVerificationPage from './pages/tenants/OtpVerificationPage';
import AdminDashboard from './pages/admin/AdminDashboardPage'; // Import your admin dashboard component
import TenantProfile from './pages/tenants/TenantProfile'; // Import the TenantProfile component

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/tenant/register" element={<TenantRegisterPage />} />
            <Route path="/tenant/login" element={<TenantLoginPage />} />
            <Route path="/tenant/otp-verification" element={<OtpVerificationPage />} />

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/tenant/:tenantId" element={<TenantProfile />} /> {/* Tenant profile route */}
        </Routes>
    );
};

export default AppRoutes;
