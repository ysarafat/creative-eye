import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../Components/Container/Container';
import PageTitleBanner from '../Shared/PageTitleBanner.jsx/PageTitleBanner';

function Instructors() {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/instructors').then((res) => setInstructors(res.data));
    }, []);

    return (
        <div>
            <PageTitleBanner title="our all legend instructor" subtitle="hello" />
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10 my-10">
                    {instructors?.map((instructor) => (
                        <div
                            key={instructor._id}
                            className="card card-compact w-full rounded-lg bg-white  dark:bg-slate-800 shadow-xl"
                        >
                            <figure>
                                <img
                                    className="h-[300px] w-full"
                                    src={instructor.image}
                                    alt="class"
                                />
                            </figure>
                            <div className=" py-4 px-4 rounded-b-lg  dark:text-gray-300">
                                <h2 className="card-title flex justify-center dark:text-white text-center">
                                    Name: {instructor.userName}
                                </h2>

                                <p className="text-center">Email: {instructor.email}</p>
                            </div>
                            <div className="rounded-b-lg">
                                <Link to={`mailto:${instructor.email}`}>
                                    <button className=" h-11 text-lg rounded-b-lg bg-green w-full text-white hover:bg-dark-grey border-none ">
                                        Send Email
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Instructors;
