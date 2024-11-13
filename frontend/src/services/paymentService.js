import axios from 'axios';


// Function to send payment notification email to the admin
export const sendPaymentNotification = async (adminEmail, tenantName, amount) => {
    try {
        const response = await axios.post('https://pg-management-system.onrender.com/api/newPayment/send-payment-notification', {
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

const API_URL = 'https://pg-management-system.onrender.com/api'; // Your API base URL

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

// src/services/paymentService.js

export const fetchQRCode = async (amount) => {
    try {
        // Make sure to encode the amount to handle special characters
        const encodedAmount = encodeURIComponent(amount);

        // Make a request to your backend to fetch the QR code
        const response = await fetch(`${API_URL}/newPayment/qrcode?amount=${encodedAmount}`);

        if (!response.ok) {
            throw new Error('Failed to fetch QR Code');
        }

        // Get the response as a blob to handle binary data
        const blob = await response.blob();

        // Create a URL for the blob and return it
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error fetching QR code:', error);
        throw error; // Re-throw the error to be handled by the calling function
    }
};
