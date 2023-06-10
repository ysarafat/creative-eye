import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { VscFeedback } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import ShowFeedback from './ShowFeedback';

function MyClassTable({ classes, index }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <tr key={classes._id}>
            <td>{index + 1}</td>
            <td>
                <div className="avatar">
                    <div className="rounded w-12 h-12">
                        <img src={classes.classImage} alt="Avatar Tailwind CSS Component" />
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
                        classes.status === 'approved' ? 'badge bg-green text-white w-20 p-3' : ''
                    } ${classes.status === 'deny' ? 'badge bg-red-500 text-white w-20 p-3' : ''} ${
                        classes.status === 'pending'
                            ? 'badge bg-orange-400 text-white w-20 p-3'
                            : ''
                    } border-none`}
                >
                    {classes.status}
                </div>
            </td>
            <td>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-sm capitalize hover:bg-green bg-white hover:text-white border-none"
                >
                    <VscFeedback size={25} />
                    <div className="badge badge-primary badge-sm bg-red-500 border-none text-white">
                        +{classes.feedback.length}
                    </div>
                </button>
            </td>
            <td>
                <Link to={`/dashboard/update-class/${classes._id}`}>
                    <button className="btn btn-sm capitalize hover:bg-orange-500 bg-orange-300 hover:text-white border-none">
                        <MdEdit size={25} />
                    </button>
                </Link>
            </td>

            <ShowFeedback
                closeModal={closeModal}
                isOpen={isModalOpen}
                feedback={classes.feedback}
            />
        </tr>
    );
}

export default MyClassTable;
