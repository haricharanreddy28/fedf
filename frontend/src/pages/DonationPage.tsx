const options = {
    key: razorpayKey,
    amount: orderData.amount,
    currency: orderData.currency || 'INR',
    name: "SafeSpace",
    description: "Donation for Victim Support",
    image: "https://example.com/logo.png",
    order_id: orderData.id,

    handler: async (response: any) => {
        console.log('Payment Response:', response);
        setLoading(true);

        try {
            const verifyResponse = await api.post('/payment/verify-payment', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
            });

            const verifyData = verifyResponse.data;
            console.log('Verification Response:', verifyData);

            if (verifyData && (verifyData.success || verifyData.message)) {
                toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                navigate('/payment-success');
            } else {
                toast.error(`Payment Verification Failed: ${verifyData?.message || 'Unknown error'}`);
            }
        } catch (verifyError: any) {
            console.error('Verification Error:', verifyError);
            toast.error(`Verification Error: ${verifyError.message || 'Failed to verify payment'}`);
        } finally {
            setLoading(false);
        }
    },

    notes: JSON.stringify({
        name,
        email
    }),

    prefill: {
        name,
        email,
        contact: "9999999999",
    },

    theme: {
        color: "#9B7EDE",
    },

    modal: {
        ondismiss: function () {
            setLoading(false);
            toast.info('Payment cancelled by user');
        }
    }
};
