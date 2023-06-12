import React, { useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { IoMdCheckmark } from 'react-icons/io';
import { VscFeedback } from 'react-icons/vsc';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import FeedbackModal from './FeedbackModal';

function ManageClassesTable({ cls, idx, refetch }) {
    const [axiosSecure] = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAprove = (id) => {
        const status = { status: 'approved' };
        axiosSecure.put(`/update-status/${id}`, status).then((data) => {
            if (data.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Approved',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };
    const handleDeny = (id) => {
        setIsModalOpen(true);
        const status = { status: 'deny' };
        axiosSecure.put(`/update-status/${id}`, status).then((data) => {
            refetch();
        });
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <tr>
            <td>{idx + 1}</td>
            <td>
                <div className="avatar">
                    <div className="rounded w-12 h-12">
                        <img src={cls.classImage} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td>{cls.className}</td>
            <td>{cls.instructor}</td>
            <td>{cls.instructorEmail}</td>
            <td>{cls.seats}</td>
            <td>{cls.price}</td>
            <td>{cls.status}</td>
            <td>
                <div
                    className="tooltip"
                    data-tip={cls.status === 'approved' ? 'Already Approved' : 'Approve'}
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
                <div className="tooltip" data-tip={cls.status === 'deny' ? 'Already Deny' : 'Deny'}>
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
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn text-lg hover:bg-orange-500 bg-white hover:text-white dark:disabled:bg-slate-400"
                    >
                        <VscFeedback />
                    </button>{' '}
                </div>
            </td>
            <FeedbackModal
                closeModal={closeModal}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                id={cls._id}
            />
        </tr>
    );
}

export default ManageClassesTable;
