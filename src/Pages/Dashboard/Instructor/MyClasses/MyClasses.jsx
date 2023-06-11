import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import MyClassTable from './MyClassTable';

function MyClasses() {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [myClasses, setMyClasses] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/instructor/my-class?email=${user?.email}`).then((data) => {
            setMyClasses(data.data);
        });
    }, []);

    return (
        <div>
            <h1 className="text-center text-3xl font-bold dark:text-white text-dark-grey mb-5 ">
                My Classes
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
                                <MyClassTable classes={classes} index={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex items-center justify-center  h-[500px]">
                    <h1 className="text-2xl">You have not added any class</h1>
                </div>
            )}
        </div>
    );
}

export default MyClasses;
