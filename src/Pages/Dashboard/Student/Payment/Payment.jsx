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
    const classPrice = finedClass?.price;

    return (
        <div>
            <h1 className="text-center text-3xl font-bold dark:text-white text-dark-grey mb-5 ">
                Payment
            </h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm selectedClasses={selectedClasses} price={classPrice} id={id} />
            </Elements>
            <div>
                <img
                    src="https://i.ibb.co/VvzK9Pq/pngegg.png"
                    className="w-[800px] h-[200px] mx-auto"
                    alt=""
                />
            </div>
        </div>
    );
}

export default Payment;
