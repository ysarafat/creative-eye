import React from 'react';
import { Bounce } from 'react-awesome-reveal';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';

function ClassCard({ classes }) {
    const { _id, className, classImage, instructor, price, seats, bookedSeats, instructorEmail } =
        classes;
    const [userRole] = useRole();
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const handleEnroll = (id) => {
        if (userRole === 'admin' || userRole === 'instructor') {
            Swal.fire('Sorry!!!', `Admin & instructor can not select classes`, 'error');
        } else {
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
                console.log(data.data.message);
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
        }
    };
    return (
        <Bounce triggerOnce fraction={1} delay={100} duration={1000}>
            <div className="card card-compact w-full rounded-lg bg-white  dark:bg-slate-800 shadow-xl">
                <figure>
                    <img className="h-[300px] w-full" src={classImage} alt="class" />
                </figure>
                <div className=" py-4 px-4 rounded-b-lg  dark:text-gray-300 text-gray-800">
                    <h2 className="card-title dark:text-white text-dark-grey">
                        {className}{' '}
                        <div className="badge absolute top-5 right-5 bg-black  p-3  text-white">
                            Popular
                        </div>
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
                        Select Now
                    </button>
                </div>
            </div>
        </Bounce>
    );
}

export default ClassCard;
