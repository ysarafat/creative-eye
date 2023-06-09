/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaUserCog, FaUserTie } from 'react-icons/fa';
import { LuTrash } from 'react-icons/lu';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

function AllUsers() {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    });
    const handleAdminRole = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Want to make ${user.userName} an admin`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make an Admin',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/user/admin/${user._id}`, {
                    method: 'PATCH',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.modifiedCount) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: `${user.userName} has been successfully made an admin`,
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                        refetch();
                    });
            }
        });
    };
    const handleInstructorRole = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Want to make ${user.userName} an instructor`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make an instructor',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/user/instructor/${user._id}`, {
                    method: 'PATCH',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.modifiedCount) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: `${user.userName} has been successfully made an instructor`,
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                        refetch();
                    });
            }
        });
    };
    const handleDelete = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Want to delete ${user.userName} from the user list`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/user/delete/${user._id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data.deletedCount > 0);
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: `${user.userName} was deleted from the user list`,
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
        <div className="max-w-full ">
            <h1 className="text-center text-3xl font-bold dark:text-white text-dark-grey mb-5 ">
                All Users
            </h1>
            <div className="overflow-x-auto dark:bg-slate-800 bg-slate-100 p-5 rounded-lg dark:text-white text-dark-grey">
                <table className="table">
                    <thead>
                        <tr className="dark:text-white">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Make Instructor</th>
                            <th>Make Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <div
                                        className="tooltip"
                                        data-tip={
                                            user.role === 'instructor'
                                                ? 'Already Instructor'
                                                : 'Make Instructor'
                                        }
                                    >
                                        <button
                                            onClick={() => handleInstructorRole(user)}
                                            disabled={user.role === 'instructor' && true}
                                            className="btn text-lg hover:bg-green bg-white hover:text-white dark:disabled:bg-slate-400"
                                        >
                                            <FaUserTie />
                                        </button>{' '}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className="tooltip"
                                        data-tip={
                                            user.role === 'admin' ? 'Already Admin' : 'Make Admin'
                                        }
                                    >
                                        <button
                                            onClick={() => handleAdminRole(user)}
                                            disabled={user.role === 'admin' && true}
                                            className="btn text-lg hover:bg-green bg-white hover:text-white dark:disabled:bg-slate-400"
                                        >
                                            <FaUserCog />
                                        </button>{' '}
                                    </div>
                                </td>
                                <td>
                                    <div className="tooltip" data-tip="Delete this user">
                                        <button
                                            onClick={() => handleDelete(user)}
                                            className="btn text-lg hover:bg-red-500 bg-white hover:text-white"
                                        >
                                            <LuTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllUsers;
