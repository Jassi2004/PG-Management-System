import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Change based on your backend URL

export const fetchDashboardData = async () => {
  const token = localStorage.getItem('token'); // Get the token from local storage

  const response = await axios.get(`${API_URL}/admin/dashboard`, {
    
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response.data;
};



export const fetchAllTenants = async () => {
  const response = await axios.get(`${API_URL}/tenants`);
  return response.data;
};

// Fetch data for a specific tenant by ID
export const fetchTenantData = async (tenantId) => {
  try {
      const response = await axios.get(`${API_URL}/tenants/${tenantId}`);
      return response.data; // Assuming your API returns the tenant data in the response
  } catch (error) {
      console.error("Error fetching tenant data:", error);
      throw error; // Rethrow the error for handling in the component
  }
};

// Update tenant data by ID
export const updateTenantData = async (tenantId, tenantData) => {
  try {
      const response = await axios.put(`${API_URL}/tenants/${tenantId}`, tenantData);
      return response.data; // Assuming the API returns the updated tenant data
  } catch (error) {
      console.error("Error updating tenant data:", error);
      throw error; // Rethrow the error for handling in the component
  }
};