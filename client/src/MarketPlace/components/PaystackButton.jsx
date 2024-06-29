import React from 'react';
import { PaystackButton } from 'react-paystack';

const PaystackPayment = ({ email, amount, onSuccess, onClose }) => {
    const config = {
        reference: (new Date()).getTime().toString(),
        email,
        amount: amount * 100, 
        currency: "ZAR",
        publicKey: import.meta.env.VITE_APP_PAYSTACK_PUBLIC_KEY,
    };

    const handlePaystackSuccessAction = (reference) => {
        onSuccess(reference);
    };

    const handlePaystackCloseAction = () => {
        console.log('Payment modal closed');
        onClose();
    };

    const componentProps = {
        ...config,
        text: 'Confirm',
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

    return (
        <PaystackButton {...componentProps} />
    );
};

export default PaystackPayment;
