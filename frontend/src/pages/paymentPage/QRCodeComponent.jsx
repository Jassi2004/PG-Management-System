// src/components/QRCodeComponent.js

import React, { useEffect, useState } from 'react';
import { fetchQRCode } from '../../services/paymentService'; // Adjust the import as needed
import { Box, Typography, CircularProgress } from '@mui/material';
import img from '../../../public/img.jpeg'

const QRCodeComponent = ({ amount }) => {
    // const [qrCodeUrl, setQrCodeUrl] = useState('');
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const loadQRCode = async () => {
    //         try {
    //             const url = await fetchQRCode(amount); // Fetch QR code from backend
    //             setQrCodeUrl(url);
    //         } catch (error) {
    //             console.error('Error loading QR code:', error);
    //             setError('Failed to load QR code.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (amount) {
    //         loadQRCode();
    //     }
    // }, [amount]);

    // if (loading) {
    //     return (
    //         <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
    //             <CircularProgress />
    //         </Box>
    //     );
    // }

    // if (error) {
    //     return <Typography color="error">{error}</Typography>;
    // }

    return (
        <Box sx={{ textAlign: 'center', marginY: 2 }}>
            {/* {qrCodeUrl ? ( */}
            <img
                // src={qrCodeUrl}
                src={img}
                alt="QR Code for Payment"
                style={{ width: '300px', height: '450px' }}
            />
            {/* ) : (
                <Typography color="error">Failed to load QR code. Please refresh the page.</Typography>
            )} */}
        </Box>
    );
};

export default QRCodeComponent;
