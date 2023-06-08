/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { AiFillBook, AiFillHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { NavLink, Outlet } from 'react-router-dom';
import Theme from '../Components/Theme/Theme';

function Dashboard() {
    // TODO : load data from server
    const role = 'admin';
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content relative top-[57px] lg:top-0 bg-white dark:bg-dark-blue p-8 ">
                <Outlet />
                <div className=" w-full fixed top-0 right-0  py-3 px-4 lg:hidden dark:bg-[#0C1322] nb_border bg-[#EDF1F7]">
                    <div className="flex items-center lg:justify-end justify-between">
                        {' '}
                        <label htmlFor="my-drawer-2" className=" drawer-button ">
                            <div className="text-dark-grey dark:text-white">
                                <HiBars3BottomLeft size={30} />
                            </div>
                        </label>
                        <Theme />
                    </div>
                </div>
            </div>
            <div className="drawer-side fixed">
                <label htmlFor="my-drawer-2" className="drawer-overlay" />
                <ul className="menu p-4 w-80 h-full text-base dark:bg-[#0C1322] nb_border bg-[#EDF1F7]">
                    {/* Sidebar content here */}
                    {role === 'student' && (
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-green'
                                        : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                }
                                to="user-home"
                            >
                                <AiFillHome /> User Home
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-green'
                                        : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                }
                                to="my-classes"
                            >
                                <AiFillBook /> My Enroll Classes
                            </NavLink>
                        </li>
                    )}
                    {role === 'instructor' && (
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-green'
                                        : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                }
                                to="instructor-home"
                            >
                                <AiFillHome /> Instructor Home
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-green'
                                        : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                }
                                to="add-class"
                            >
                                <AiFillBook /> Add Class
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-green'
                                        : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                }
                                to="my-classes"
                            >
                                <AiFillBook /> My Classes
                            </NavLink>
                        </li>
                    )}
                    {role === 'admin' && (
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-green'
                                        : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                }
                                to="admin-home"
                            >
                                <AiFillHome /> Admin Home
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-green'
                                        : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                }
                                to="manage-classes"
                            >
                                <AiFillBook /> Manage Classes
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-green'
                                        : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                }
                                to="users"
                            >
                                <FaUsers /> Users
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
