import axios from 'axios';


// Function to send payment notification email to the admin
export const sendPaymentNotification = async (adminEmail, tenantName, amount) => {
    try {
        const response = await axios.post('http://localhost:5000/api/newPayment/send-payment-notification', {
            adminEmail,
            tenantName,
            amount,
        });
        return response.data; // You can return the response for further handling if needed
    } catch (error) {
        console.error('Error sending payment notification:', error);
        throw error; // Rethrow or handle the error as necessary
    }
};


// api.js

const API_URL = 'http://localhost:5000/api'; // Your API base URL

export const submitPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${API_URL}/payments`, paymentData);
        return response.data; // or response if you want the entire response
    } catch (error) {
        console.error('Error submitting payment:', error);
        throw error; // Rethrow the error for handling in the component
    }
};


export const fetchPaymentsByTenant = async (tenantId) => {
    try {
        const response = await fetch(`${API_URL}/payments/tenant/${tenantId}`);
        const payments = await response.json();
        return payments;
    } catch (error) {
        console.error('Error fetching payments:', error);
        alert('Could not fetch payment logs.');
    }
};
