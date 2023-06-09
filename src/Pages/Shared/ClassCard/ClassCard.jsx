import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

function ClassCard({ classes }) {
    const { _id, className, classImage, instructor, price, seats, bookedSeats } = classes;
    console.log(seats, bookedSeats);
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const handleEnroll = (id) => {
        const enrollClass = {
            student: user?.displayName,
            email: user?.email,
            classId: id,
            class: className,
            price,
            instructor,
            classImage,
        };

        axiosSecure.post('/enroll-class', enrollClass).then((data) => {
            console.log(data.data.message);
            if (data.data.message) {
                // Swal.fire({
                //     position: 'top-center',
                //     icon: 'warning',
                //     title: `${data.data.message}`,
                //     showConfirmButton: false,
                //     timer: 1500,
                // });
                Swal.fire('Sorry', `${data.data.message}`, 'warning');
            }
            if (data.data.insertedId) {
                axios.put(`http://localhost:5000/booked-seat/${id}`).then((res) => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Enroll Success',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
            }
        });
    };
    return (
        <div className="card card-compact w-full rounded-lg bg-white  dark:bg-slate-800 shadow-xl">
            <figure>
                <img className="h-[256px] w-full" src={classImage} alt="class" />
            </figure>
            <div className=" py-4 px-4 rounded-b-lg  dark:text-gray-300">
                <h2 className="card-title dark:text-white">
                    {className}{' '}
                    <div className="badge bg-green p-3 border-none text-white">Popular</div>
                </h2>

                <p className="text-lg">Instructor : {instructor}</p>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg">Total Seats : {seats}</p>
                        <p className="text-lg">Price : ${price}</p>
                    </div>
                    <div className="text-end">
                        <p className="text-lg">Booked Seats : {bookedSeats || 0}</p>
                        <p className="text-lg">Available Seats: {seats - bookedSeats || 0}</p>
                    </div>
                </div>
            </div>
            <div className="rounded-b-lg">
                <button
                    onClick={() => handleEnroll(_id)}
                    className=" h-11 text-lg rounded-b-lg bg-green w-full text-white hover:bg-dark-grey border-none "
                >
                    Enroll Now
                </button>
            </div>
        </div>
    );
}

export default ClassCard;
