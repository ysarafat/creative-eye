/* eslint-disable no-useless-return */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

function CheckoutForm({ price, selectedClasses, id }) {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [error, setError] = useState();
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const findClass = selectedClasses.find((cls) => cls._id === id);
    useEffect(() => {
        if (price > 0) {
            axiosSecure
                .post('/create-payment-intent', { price })
                .then((res) => setClientSecret(res.data.clientSecret));
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message);
        } else {
            setError('');
            // console.log(paymentMethod);
        }
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            }
        );
        if (confirmError) {
            console.log(confirmError);
        }
        setProcessing(false);
        console.log(paymentIntent);
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const paymentDetails = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                status: paymentIntent.status,
                className: findClass?.class,
                instructor: findClass?.instructor,
                image: findClass?.classImage,
                classId: findClass.classId,
            };
            axiosSecure.post('/payment', paymentDetails).then((res) => console.log(res.data));
        }
    };
    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            {transactionId && (
                <p className="text-green">
                    Your transaction is Successful. Transaction id: {transactionId}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '18px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                    className="w-full h-11 btn mt-5 bg-green capitalize text-lg text-white hover:bg-dark-grey dark:hover:bg-slate-300 dark:hover:text-black border-none disabled:bg-gray-500"
                >
                    Pay
                </button>
            </form>
        </>
    );
}

export default CheckoutForm;
