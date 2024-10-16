// src/routes.jsx
import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import TenantLoginPage from './pages/tenants/TenantLoginPage';
import TenantRegisterPage from './pages/tenants/TenantRegisterPage';
import HomePage from './pages/home/HomePage';  
import OtpVerificationPage from './pages/tenants/OtpVerificationPage';
import AdminDashboard from './pages/admin/AdminDashboardPage'; 
import TenantDashboard from './pages/tenants/TenantDashboard';
import TenantProfilePageForAdmin from './pages/tenants/TenantProfilePageForAdmin';
import NewPaymentPage from './pages/paymentPage/NewPaymentPage';
// import ProtectedRoute from './components/ProtectedRoute';




const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/tenant/:tenantId" element={<TenantProfilePageForAdmin />} /> 

            <Route path="/tenant/register" element={<TenantRegisterPage />} />
            <Route path="/tenant/login" element={<TenantLoginPage />} />
            <Route path="/tenant/otp-verification" element={<OtpVerificationPage />} />

            {/* <ChakraProvider > */}
            <Route path="/tenant/dashboard/:tenantId" element={<TenantDashboard/>} /> 

            <Route path="/new-payment" element={<NewPaymentPage />} />

            {/* </ChakraProvider> */}

            {/* <ProtectedRoute path="/admin/dashboard" component={AdminDashboard}/> */}
        </Routes>
    );
};

export default AppRoutes;
