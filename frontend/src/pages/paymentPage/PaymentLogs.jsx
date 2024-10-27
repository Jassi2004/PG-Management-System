import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useTheme,
    Chip,
} from '@mui/material';
import { fetchPaymentsByTenant } from '../../services/paymentService';
import { format } from 'date-fns';
import { Payment, Error } from '@mui/icons-material';

const PaymentLogs = ({ tenantId }) => {
    const [paymentLogs, setPaymentLogs] = useState([]);
    const [visiblePayments, setVisiblePayments] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const fetchPayments = async () => {
            if (tenantId) {
                setIsLoading(true);
                setError(null);
                try {
                    const payments = await fetchPaymentsByTenant(tenantId);
                    console.log("payments in frontend: ", payments);

                    if (Array.isArray(payments)) {
                        setPaymentLogs(payments);
                    } else {
                        throw new Error('Unexpected response format');
                    }
                } catch (error) {
                    console.error('No payments made yet:', error);
                    setError('No payments made yet.');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchPayments();
    }, [tenantId]);

    const handleShowMore = () => setVisiblePayments((prev) => prev + 5);

    const getPaymentMethodColor = (method) => {
        switch (method.toLowerCase()) {
            case 'cash':
                return theme.palette.success.main;
            case 'UPI':
                return theme.palette.info.main;
            case 'debitcard':
                return theme.palette.warning.main;
            case 'banktransfer':
                return theme.palette.secondary.main;
            default:
                return theme.palette.primary.main;
        }
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Card sx={{ mt: 4, bgcolor: theme.palette.error.light, color: theme.palette.error.contrastText }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        <Error sx={{ verticalAlign: 'middle', mr: 1 }} />
                        Error
                    </Typography>
                    <Typography>{error}</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box mt={4}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Payment sx={{ mr: 1 }} />
                Payment Logs
            </Typography>

            {paymentLogs.length === 0 ? (
                <Card sx={{ mt: 2, bgcolor: theme.palette.background.default }}>
                    <CardContent>
                        <Typography>No payment logs available.</Typography>
                    </CardContent>
                </Card>
            ) : (
                <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 400, overflow: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="center">Method</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paymentLogs.slice(0, visiblePayments).map((payment) => (
                                <TableRow key={payment._id} hover>
                                    <TableCell>{format(new Date(payment.date), 'PPP')}</TableCell>
                                    <TableCell align="right">{payment.amount.toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={payment.method}
                                            sx={{
                                                bgcolor: getPaymentMethodColor(payment.method),
                                                color: theme.palette.getContrastText(getPaymentMethodColor(payment.method))
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {visiblePayments < paymentLogs.length && (
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant="contained" color="primary" onClick={handleShowMore}>
                        Show More
                    </Button>
                </Box>
            )}


        </Box>
    );
};

export default PaymentLogs;