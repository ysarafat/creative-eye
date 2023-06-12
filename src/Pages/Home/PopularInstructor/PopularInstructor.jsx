import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import Container from '../../../Components/Container/Container';
import Spinner from '../../../Components/Spinner/Spinner';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';

function PopularInstructor() {
    const [popularInstructor, setPopularInstructor] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('https://creative-eye.onrender.com/popular-instructor').then((res) => {
            setPopularInstructor(res.data);
            setLoading(false);
        });
    }, []);
    return (
        <div className="my-16">
            <Container>
                <div>
                    <SectionTitle
                        title="our legend Instructor"
                        subtitle="The Legendary Instructor Unleashing the Power of Knowledge"
                    />
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Zoom triggerOnce fraction={1}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10 my-10">
                                {popularInstructor?.map((instructor) => (
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
                                        <div className=" py-4 px-4 rounded-b-lg  dark:text-gray-300 text-gray-800">
                                            <h2 className="card-title flex justify-center dark:text-white text-center text-dark-grey">
                                                Name: {instructor.userName}
                                            </h2>
                                            <div className="badge absolute top-5 right-5 bg-black p-3  text-white">
                                                Popular Instructor
                                            </div>
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
                        </Zoom>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default PopularInstructor;
