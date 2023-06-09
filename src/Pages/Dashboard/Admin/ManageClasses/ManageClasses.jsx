/* eslint-disable no-underscore-dangle */
import React from 'react';
import { HiXMark } from 'react-icons/hi2';
import { IoMdCheckmark } from 'react-icons/io';
import { VscFeedback } from 'react-icons/vsc';
import Spinner from '../../../../Components/Spinner/Spinner';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useClasses from '../../../../hooks/useClasses';

function ManageClasses() {
    const [classes, refetch, isLoading] = useClasses();
    const [axiosSecure] = useAxiosSecure();
    const handleAprove = (id) => {
        const status = { status: 'approved' };
        axiosSecure.put(`/update-status/${id}`, status).then((data) => console.log(data));
    };
    const handleDeny = (id) => {
        const status = { status: 'deny' };
        axiosSecure.put(`/update-status/${id}`, status).then((data) => console.log(data));
    };
    // const handleDelete = id => {
    //     axiosSecure.put(`/sent-feedback/${id}`, status).then((data) => console.log(data));
    // }
    return (
        <div>
            <h1 className="text-center text-3xl font-bold dark:text-white text-dark-grey mb-5 ">
                My Select Classes
            </h1>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Class</th>
                                <th>Instructor</th>
                                <th> Instructor email</th>
                                <th>Total Seats</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Approve</th>
                                <th>Deny </th>
                                <th>Feedback </th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes?.map((cls, idx) => (
                                <tr key={cls._id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="rounded w-12 h-12">
                                                <img
                                                    src={cls.classImage}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{cls.className}</td>
                                    <td>{cls.instructor}</td>
                                    <td>{cls.instructorEmail}</td>
                                    <td>{cls.seats}</td>
                                    <td>{cls.price.toFixed(2)}</td>
                                    <td>{cls.status}</td>
                                    <td>
                                        <div
                                            className="tooltip"
                                            data-tip={
                                                cls.status === 'approved'
                                                    ? 'Already Approved'
                                                    : 'Approve'
                                            }
                                        >
                                            <button
                                                onClick={() => handleAprove(cls._id)}
                                                disabled={cls.status === 'approved' && true}
                                                className="btn text-lg hover:bg-green bg-white hover:text-white dark:disabled:bg-slate-400"
                                            >
                                                <IoMdCheckmark />
                                            </button>{' '}
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            className="tooltip"
                                            data-tip={
                                                cls.status === 'deny' ? 'Already Deny' : 'Deny'
                                            }
                                        >
                                            <button
                                                onClick={() => handleDeny(cls._id)}
                                                disabled={cls.status === 'deny' && true}
                                                className="btn text-lg hover:bg-red-500 bg-white hover:text-white dark:disabled:bg-slate-400"
                                            >
                                                <HiXMark />
                                            </button>{' '}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tooltip" data-tip="Sent FeedBack">
                                            <button className="btn text-lg hover:bg-orange-500 bg-white hover:text-white dark:disabled:bg-slate-400">
                                                <VscFeedback />
                                            </button>{' '}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ManageClasses;
