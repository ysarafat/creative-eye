import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import DynamicTitle from '../../../../Components/DynamicTitle/DynamicTitle';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

function PaymentHistory() {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const [payHistory, setPayHistory] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/payment-history?email=${user?.email}`).then((data) => {
            setPayHistory(data.data);
        });
    }, []);
    return (
        <div>
            <DynamicTitle title="My Payment History" />
            <h1 className="text-center text-3xl font-bold dark:text-white text-dark-grey mb-5 ">
                My pay
            </h1>
            {payHistory.length ? (
                <div className="overflow-x-auto dark:bg-slate-800 bg-slate-100 p-5 rounded-lg dark:text-white text-dark-grey">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="dark:text-white text-dark-grey">
                                <th>#</th>
                                <th>Image</th>
                                <th>Class Name</th>
                                <th>Price</th>
                                <th>Instructor</th>
                                <th>Payment ID</th>
                                <th>Status</th>
                                <th>Time & Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payHistory.map((pay, index) => (
                                <tr key={pay._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="rounded w-12 h-12">
                                                <img
                                                    src={pay.image}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{pay.className}</td>
                                    <td>${pay?.price ? pay.price.toFixed(2) : 0}</td>
                                    <td>{pay.instructor}</td>

                                    <td>{pay.transactionId}</td>
                                    <td>
                                        <div className="badge bg-green text-white w-20 p-3 border-none">
                                            {' '}
                                            {pay.status}
                                        </div>
                                    </td>
                                    <td>{moment(pay.date).format('LLL')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex items-center justify-center  h-[500px]">
                    <h1 className="text-2xl">You have not any payment history</h1>
                </div>
            )}
        </div>
    );
}

export default PaymentHistory;
