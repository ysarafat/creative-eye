import React from 'react';
import { MdDeleteOutline, MdPayment } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useEnrolled from '../../../../hooks/useEnrolled';

function EnrollClass() {
    const [enrolledClasses, refetch] = useEnrolled();
    const [axiosSecure] = useAxiosSecure();
    const handleDelete = (classes) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-enrolled-class/${classes._id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Class Delete Successfully',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                    refetch();
                });
            }
        });
    };
    return (
        <div>
            <h1 className="text-center text-3xl font-bold dark:text-white text-dark-grey mb-5 ">
                My Select Classes
            </h1>
            {enrolledClasses.length ? (
                <div className="overflow-x-auto dark:bg-slate-800 bg-slate-100 p-5 rounded-lg dark:text-white text-dark-grey">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="dark:text-white">
                                <th>#</th>
                                <th>Image</th>
                                <th>Class Name</th>
                                <th>Instructor</th>
                                <th>price</th>
                                <th>Payment</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrolledClasses.map((classes, index) => (
                                <tr>
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
                                    <td>{classes.class}</td>
                                    <td>{classes.instructor}</td>
                                    <td>{classes.price.toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-sm bg-white hover:bg-green capitalize hover:text-white text-dark-grey	border-none">
                                            <MdPayment /> Pay now
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(classes)}
                                            className="btn btn-sm capitalize hover:bg-red-500 bg-red-300 hover:text-white border-none"
                                        >
                                            <MdDeleteOutline /> delete
                                        </button>
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

export default EnrollClass;
