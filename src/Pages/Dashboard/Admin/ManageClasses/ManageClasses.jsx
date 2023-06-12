/* eslint-disable no-underscore-dangle */
import React from 'react';
import Spinner from '../../../../Components/Spinner/Spinner';
import useClasses from '../../../../hooks/useClasses';
import ManageClassesTable from './ManageClassesTable';

function ManageClasses() {
    const [classes, refetch, isLoading] = useClasses();

    return (
        <div>
            <h1 className="text-center text-3xl font-bold dark:text-white text-dark-grey mb-5 ">
                Manage Classes
            </h1>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className=" dark:bg-slate-800 bg-slate-100 p-5 rounded-lg dark:text-white text-dark-grey max-w-[100%]">
                    <div className="overflow-x-auto">
                        <table className="table  ">
                            {/* head */}
                            <thead>
                                <tr className="dark:text-white text-dark-grey">
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
                                    <ManageClassesTable
                                        key={cls._id}
                                        cls={cls}
                                        idx={idx}
                                        refetch={refetch}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageClasses;
