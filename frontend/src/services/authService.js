import axios from 'axios';

// Replace with actual backend API URLs
const BASE_URL = 'http://localhost:5000/api';

export const loginAdmin = async (adminData) => {
  return await axios.post(`${BASE_URL}/admin/login`, adminData);
};

export const loginTenant = async (tenantData) => {
  return await axios.post(`${BASE_URL}/tenants/login`, tenantData);
};

export const registerTenant = async (formData) => {
  const response = await axios.post('http://localhost:5000/api/tenants', formData);
  return response.data;
};

export const sendOtp = async (email) => {
  const response = await axios.post('http://localhost:5000/api/tenants/send-otp', email);
  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await axios.post('http://localhost:5000/api/tenants/verify-otp', data);
  console.log(response);
  
  return response.data;
};

export const resendOtp = async (data) => {
  const response = await axios.post('http://localhost:5000/api/tenants/resend-otp', data);
  return response.data;
};