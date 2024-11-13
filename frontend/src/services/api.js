// src/services/api.js
import axios from 'axios';

const API_URL = 'pg-management-system-cggicjt95.vercel.app/api'; // Change based on your backend URL

export const fetchDashboardData = async () => {
    const token = localStorage.getItem('token'); // Get the token from local storage

    const response = await axios.get(`${API_URL}/admin/dashboard`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchAllTenants = async () => {
    const token = localStorage.getItem('token'); // Get the token from local storage

    const response = await axios.get(`${API_URL}/tenants`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Fetch Tenant Data
export const fetchTenantData = async (tenantId) => {

    const response = await axios.get(`${API_URL}/tenants/${tenantId}`);
    // console.log("response: ", response.data);


    return response.data;
};



// Update Tenant Data
export const updateTenantData = async (tenantId, data) => {
    const token = localStorage.getItem('token');

    const response = await axios.put(`${API_URL}/admin/tenants/${tenantId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};


// Update Tenant Data by tenant
export const updateTenantDataByTenant = async (tenantId, data) => {
    const token = localStorage.getItem('token');

    const response = await axios.put(`${API_URL}/admin/tenants/${tenantId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Delete Tenant
export const deleteTenant = async (tenantId) => {
    const token = localStorage.getItem('token');

    const response = await axios.delete(`${API_URL}/tenants/${tenantId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const getTenantIdFromEmail = async (email) => {
    // console.log("email to backend=> ", email);

    const response = await axios.post(`${API_URL}/tenants/getTenantIdFromEmail`, { email });
    // console.log(response.data);

    return response.data;
}


// Fetch previous tenants from the backend
export const fetchPreviousTenants = async () => {
    const response = await fetch(`${API_URL}/tenants/previous-tenants`); // Adjust the endpoint as needed
    if (!response.ok) {
        throw new Error('Failed to fetch previous tenants');
    }
    return await response.json();
};
