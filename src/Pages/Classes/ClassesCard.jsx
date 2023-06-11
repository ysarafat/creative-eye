import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useRole from '../../hooks/useRole';

function ClassesCard({ classes }) {
    const { _id, className, classImage, instructor, price, seats, bookedSeats, instructorEmail } =
        classes;

    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [userRole] = useRole();
    const handleSelect = (id) => {
        const enrollClass = {
            student: user?.displayName,
            email: user?.email,
            classId: id,
            class: className,
            price,
            instructor,
            classImage,
            instructorEmail,
        };

        axiosSecure.post('/select-class', enrollClass).then((data) => {
            if (data.data.message) {
                Swal.fire('Sorry', `${data.data.message}`, 'warning');
            }
            if (data.data.insertedId) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Add to select Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };
    const isFullyBooked = seats - bookedSeats === 0;
    const cardBgColor = isFullyBooked ? 'bg-red-300 dark:bg-red-500' : 'bg-white dark:bg-slate-800';

    return (
        <div className={`card card-compact w-full rounded-lg ${cardBgColor}  shadow-xl`}>
            <figure>
                <img className="h-[300px] w-full" src={classImage} alt="class" />
            </figure>
            <div className=" py-4 px-4 rounded-b-lg  dark:text-gray-300">
                <h2 className="card-title dark:text-white">{className} </h2>

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
                    disabled={
                        seats === bookedSeats || userRole === 'admin' || userRole === 'instructor'
                    }
                    onClick={() => handleSelect(_id)}
                    className=" h-11 text-lg rounded-b-lg disabled:bg-gray-600 bg-green w-full text-white hover:bg-dark-grey border-none "
                >
                    Select Now
                </button>
            </div>
        </div>
    );
}

export default ClassesCard;
