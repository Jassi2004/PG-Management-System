import axios from 'axios';

// Replace with actual backend API URLs
const BASE_URL = 'pg-management-system-cggicjt95.vercel.app/api';

export const getTenants = async () => {
  return await axios.get(`${BASE_URL}/tenants`);
};

export const getTenantById = async (tenantId) => {
  return await axios.get(`${BASE_URL}/tenants/${tenantId}`);
};

export const updateTenant = async (tenantId, tenantData) => {
  return await axios.put(`${BASE_URL}/tenants/${tenantId}`, tenantData);
};

export const deleteTenant = async (tenantId) => {
  return await axios.delete(`${BASE_URL}/tenants/${tenantId}`);
};
