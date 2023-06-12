/* eslint-disable no-useless-return */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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
    const navigate = useNavigate();
    const findClass = selectedClasses.find((cls) => cls._id === id);
    const existingPayment = { classId: id, email: user?.email, price };
    useEffect(() => {
        if (price > 0) {
            axiosSecure
                .post('/create-payment-intent', existingPayment)
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
                instructorEmail: findClass?.instructorEmail,
                image: findClass?.classImage,
                classId: findClass.classId,
            };
            axiosSecure.post('/payment', paymentDetails).then((res) => {
                if (res.data.insertedId) {
                    axiosSecure.delete(`/delete-selected-class/${findClass?._id}`).then((res) => {
                        if (res.data.deletedCount > 0) {
                            axios
                                .put(
                                    `https://creative-eye.onrender.com/booked-seat/${findClass.classId}`
                                )
                                .then((res) => {
                                    if (res.data.modifiedCount > 0) {
                                        Swal.fire(
                                            'Enrolled Success',
                                            `Transaction ID: ${paymentIntent.id}`,
                                            'success'
                                        );
                                        navigate('/dashboard/enrolled-classes', { replace: true });
                                    }
                                });
                        }
                    });
                }
            });
        }
    };
    return (
        <div className="flex justify-center items-center h-[500px]">
            <form
                className=" bg-slate-100 dark:bg-slate-800 rounded-lg p-10 "
                onSubmit={handleSubmit}
            >
                {error && <p className="text-red-500 text-lg text-center mb-5">{error}</p>}
                {transactionId && (
                    <p className="text-green text-center mb-5">
                        Your transaction is Successful. Transaction ID: {transactionId}
                    </p>
                )}
                <label htmlFor="">Full Name (read only)</label>
                <input
                    type="text"
                    className="outline-none border-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3  w-full my-2 border bg-white focus:border-green py-3 "
                    defaultValue={user?.displayName}
                    readOnly
                />
                <label htmlFor="">Email Address (read only)</label>
                <input
                    type="text"
                    className="outline-none border-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3  w-full my-2 border bg-white focus:border-green py-3 "
                    defaultValue={user?.email}
                    readOnly
                />
                <label htmlFor="">Card Details</label>
                <CardElement
                    className="outline-none border-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3  w-full my-2 border bg-white focus:border-green py-3 "
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
        </div>
    );
}

export default CheckoutForm;
