import React, { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

function MyClasses() {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [myClasses, setMyClasses] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/instructor/my-class?email=${user?.email}`).then((data) => {
            console.log(data.data);
            setMyClasses(data.data);
        });
    }, []);
    return (
        <div>
            <h1 className="text-center text-3xl font-bold dark:text-white text-dark-grey mb-5 ">
                My Select Classes
            </h1>
            {myClasses.length ? (
                <div className="overflow-x-auto dark:bg-slate-800 bg-slate-100 p-5 rounded-lg dark:text-white text-dark-grey">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="dark:text-white">
                                <th>#</th>
                                <th>Image</th>
                                <th>Class Name</th>
                                <th>Price</th>
                                <th>Total Seats</th>
                                <th>Total Enrolled</th>
                                <th>Available Seats</th>
                                <th>Status</th>
                                <th>Feedback</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myClasses.map((classes, index) => (
                                <tr key={classes._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="rounded w-12 h-12">
                                                <img
                                                    src={classes.classImage}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{classes.className}</td>
                                    <td>${classes?.price ? classes.price.toFixed(2) : 0}</td>
                                    <td>{classes.seats || 0}</td>
                                    <td>{classes.bookedSeats || 0}</td>
                                    <td>{classes.seats - (classes.bookedSeats || 0) || 0}</td>
                                    <td>
                                        <div
                                            className={`${
                                                classes.status === 'approved'
                                                    ? 'badge bg-green text-white w-20 p-3'
                                                    : ''
                                            } ${
                                                classes.status === 'deny'
                                                    ? 'badge bg-red-500 text-white w-20 p-3'
                                                    : ''
                                            } ${
                                                classes.status === 'pending'
                                                    ? 'badge bg-orange-400 text-white w-20 p-3'
                                                    : ''
                                            } border-none`}
                                        >
                                            {classes.status}
                                        </div>
                                    </td>
                                    <td>{classes?.feedback || 'No Feedback'}</td>
                                    <td>
                                        <Link to={`/dashboard/update-class/${classes._id}`}>
                                            <button className="btn btn-sm capitalize hover:bg-orange-500 bg-orange-300 hover:text-white border-none">
                                                <MdEdit /> Update
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex items-center justify-center  h-[500px]">
                    <h1 className="text-2xl">You have not selected any class</h1>
                </div>
            )}
        </div>
    );
}

export default MyClasses;
