import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useParams } from 'react-router-dom';
import useEnrolled from '../../../../hooks/selectedClasses';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function Payment() {
    const [selectedClasses] = useEnrolled();
    const { id } = useParams();
    const finedClass = selectedClasses.find((cls) => cls._id === id);
    console.log(id, finedClass);
    const classPrice = finedClass?.price;

    return (
        <div>
            <h1>Payment Page</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm selectedClasses={selectedClasses} price={classPrice} id={id} />
            </Elements>
        </div>
    );
}

export default Payment;
