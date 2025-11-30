import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { useRazorpay } from 'react-razorpay';
import { toast } from 'react-toastify';
import api from '../utils/api';

const DonationPage: React.FC = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState<number>(500);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { Razorpay, isLoading, error: razorpayError } = useRazorpay();

    const handlePayment = async () => {
        if (!name || !email) {
            toast.error('Please enter your name and email');
            return;
        }

        if (!Razorpay || isLoading) {
            toast.error('Razorpay is loading, please wait...');
            return;
        }

        let razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

        if (!razorpayKey) {
            toast.error('Razorpay Key missing in environment variables.');
            return;
        }

        razorpayKey = String(razorpayKey).trim();

        if (
            !razorpayKey.startsWith('rzp_live_') &&
            !razorpayKey.startsWith('rzp_test_')
        ) {
            toast.error('Invalid Razorpay Key format.');
            return;
        }

        setLoading(true);

        try {
            const orderResponse = await api.post('/payment/create-order', {
                amount: amount * 100,
                currency: "INR"
            });

            const orderData = orderResponse.data;

            if (!orderData?.id) {
                toast.error("Failed to create payment order");
                setLoading(false);
                return;
            }

            const options: any = {
                key: razorpayKey,
                amount: orderData.amount,
                currency: orderData.currency || 'INR',
                name: "SafeSpace",
                description: "Donation for Victim Support",
                image: "https://example.com/logo.png",
                order_id: orderData.id,

                handler: async (response: any) => {
                    setLoading(true);

                    try {
                        const verifyResponse = await api.post('/payment/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyResponse.data?.success) {
                            toast.success("Payment Successful!");
                            navigate('/payment-success');
                        } else {
                            toast.error("Payment verification failed");
                        }
                    } catch (error: any) {
                        toast.error("Verification failed: " + error.message);
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
                        toast.info("Payment Cancelled");
                    }
                }
            };

            let rzp1 = new Razorpay(options);

            // ONLY valid Razorpay TS event
            rzp1.on("payment.failed", function (response: any) {
                setLoading(false);

                const errorMsg =
                    response.error?.description ||
                    response.error?.reason ||
                    response.error?.code ||
                    "Payment failed. Please try again.";

                toast.error("Payment Failed: " + errorMsg);
            });

            rzp1.open();
            setLoading(false);

        } catch (error: any) {
            setLoading(false);
            toast.error("Payment initiation failed: " + (error.message || "Unknown error"));
        }
    };

    return (
        <Layout title="Support Our Cause">
            <div className="donation-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
                <Card title="Make a Donation">
                    
                    <p style={{ marginBottom: '20px' }}>
                        Your donation helps us provide legal aid, counseling, and emergency support to victims of domestic violence.
                    </p>

                    <div className="amount-selection" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        {[100, 500, 1000, 5000].map((val) => (
                            <button
                                key={val}
                                onClick={() => setAmount(val)}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    border: amount === val ? '2px solid #9B7EDE' : '1px solid #ddd',
                                    background: amount === val ? '#E8DEFF' : 'white',
                                    cursor: 'pointer',
                                    fontWeight: amount === val ? 'bold' : 'normal'
                                }}
                            >
                                ₹{val}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Custom Amount (₹)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <Button 
                        variant="primary" 
                        fullWidth 
                        onClick={handlePayment}
                        disabled={loading || isLoading || !Razorpay}
                    >
                        {loading ? 'Processing...' : 'Pay Now'}
                    </Button>
                </Card>
            </div>
        </Layout>
    );
};

export default DonationPage;
