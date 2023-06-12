import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { MdInfo } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

function EnrolledClass() {
    const [enrolled, setEnrolled] = useState([]);
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    useEffect(() => {
        axiosSecure.get(`/my-enrolled?email=${user?.email}`).then((data) => {
            setEnrolled(data.data);
        });
    }, [user, axiosSecure]);
    console.log(enrolled);
    return (
        <div>
            <h1 className="text-center text-3xl font-bold dark:text-white text-dark-grey mb-5 ">
                My Enrolled Classes
            </h1>
            {enrolled.length ? (
                <div className="overflow-x-auto dark:bg-slate-800 bg-slate-100 p-5 rounded-lg dark:text-white text-dark-grey">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="dark:text-white text-dark-grey">
                                <th>#</th>
                                <th>Image</th>
                                <th>Class Name</th>
                                <th>Instructor</th>
                                <th>Instructor Email</th>
                                <th>Price</th>
                                <th>Enrolled date & time</th>
                                <th>View Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrolled.map((classes, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="rounded w-12 h-12">
                                                <img
                                                    src={classes.image}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{classes.className}</td>
                                    <td>{classes.instructor}</td>
                                    <td>{classes.instructorEmail}</td>
                                    <td>{classes.price.toFixed(2)}</td>
                                    <td>{moment(classes.date).format('LLL')}</td>
                                    <td>
                                        <Link to={`/dashboard/payment/${classes._id}`}>
                                            <button className="btn btn-sm bg-white hover:bg-green capitalize hover:text-white text-dark-grey	border-none">
                                                <MdInfo /> View Details
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
                    <h1 className="text-2xl">You have not enrolled any class</h1>
                </div>
            )}
        </div>
    );
}

export default EnrolledClass;
