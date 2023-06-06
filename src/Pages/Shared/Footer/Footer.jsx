import React from 'react';
import {
    BsEnvelope,
    BsFacebook,
    BsFillTelephoneFill,
    BsInstagram,
    BsLinkedin,
    BsTwitter,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Container from '../../../Components/Container/Container';

function Footer() {
    return (
        <footer className="dark:bg-[#0C1322] nb_border bg-[#EDF1F7] ">
            <Container>
                <div className="py-10 grid grid-cols-1 lg:grid-cols-5 space-y-5 lg:space-y-0  justify-items-center-start lg:justify-items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-dark-grey dark:text-white">
                            <span className="text-green">CREATIVE</span> EYE
                        </h1>
                        <p className="mt-2 dark:text-gray-300 text-slate-600">
                            With your passion for photography and your expertise, your sure to be a
                            success. Your school will provide students with the skills..
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                            <button className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full text-gray-600 dark:bg-gray-800 dark:text-gray-400 focus:outline-none">
                                <BsFacebook style={{ color: '#0A81EC' }} />
                            </button>
                            <button className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-600 dark:bg-gray-800 dark:text-gray-400 focus:outline-none">
                                <BsInstagram style={{ color: '#F74406' }} />
                            </button>
                            <button className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-600 dark:bg-gray-800 dark:text-gray-400 focus:outline-none">
                                <BsTwitter style={{ color: '#1DA1F2' }} />
                            </button>
                            <button className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-600 dark:bg-gray-800 dark:text-gray-400 focus:outline-none">
                                <BsLinkedin style={{ color: '#0077B5' }} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <h2 className="dark:text-white text-dark-grey font-bold mb-2 text-lg">
                            Quick Links
                        </h2>
                        <ul className="dark:text-gray-300 text-slate-600 space-y-2">
                            <li>
                                <Link to="/">Home</Link>
                                <li>
                                    <Link to="/">Instructors</Link>
                                </li>
                            </li>
                            <li>
                                <Link to="/blog">All Courses</Link>
                            </li>
                            <li>
                                <Link to="/">About us</Link>
                            </li>
                            <li>
                                <Link to="/">Contact us</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="dark:text-white text-dark-grey font-bold mb-2 text-lg">
                            Popular Courses
                        </h2>
                        <ul className="dark:text-gray-300 text-slate-600 space-y-2">
                            <li>
                                <Link to="/">Introduction to Photography</Link>
                                <li>
                                    <Link to="/">Digital Photography</Link>
                                </li>
                            </li>
                            <li>
                                <Link to="/blog">Photography Techniques</Link>
                            </li>
                            <li>
                                <Link to="/">Photography Business</Link>
                            </li>
                            <li>
                                <Link to="/">Photography Portfolio Development</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="dark:text-white text-dark-grey font-bold mb-2 text-lg">
                            Find Us
                        </h2>
                        <ul className="dark:text-gray-300 text-slate-600 space-y-2">
                            <li>
                                <Link to="/"> Facebook</Link>
                            </li>
                            <li>
                                <Link to="/"> Linkedin</Link>
                            </li>
                            <li>
                                <Link to="/"> Adobe Stock Image</Link>
                            </li>
                            <li>
                                <Link to="/"> Setters stock </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="dark:text-white text-dark-grey font-bold mb-2 text-lg">
                            Contact Us
                        </h2>
                        <div className="dark:text-gray-300 text-slate-600 space-y-2">
                            <p>1286 Hinkle Deegan Lake Road</p>
                            <p>14850-NY, USA</p>
                            <p className="flex items-center gap-2">
                                <BsFillTelephoneFill />
                                +1 457-286-9594
                            </p>
                            <p className="flex items-center gap-2">
                                <BsEnvelope />
                                admin@creative-eye.com
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="border-b dark:border-none" />
            <div className="dark:border-t fb_border_color" />
            <Container>
                <div className="py-5  dark:text-gray-300 text-slate-600 flex justify-between items-center">
                    <div>Copyright ©2023 All rights reserved</div>
                    <div>
                        <button className="btn btn-sm bg-green text-white hover:bg-dark-grey">
                            Become a Student
                        </button>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
