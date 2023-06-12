/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { AiOutlineBook, AiOutlineHome, AiOutlineLogout, AiOutlineWallet } from 'react-icons/ai';
import { BiBookAdd } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { MdOutlineBookmarkAdded } from 'react-icons/md';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Theme from '../Components/Theme/Theme';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

function Dashboard() {
    const { user, logoutUser } = useAuth();
    const [userRole] = useRole();
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutUser()
            .then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Logout Successful',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/', { replace: true });
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <div className="drawer lg:drawer-open max-w-[100%] lg:h-full">
            <div className=" fixed top-0 right-0 left-0 py-3 px-4 lg:hidden dark:bg-[#0C1322] nb_border bg-[#EDF1F7]">
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
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content relative top-[57px] lg:top-0  bg-white dark:bg-dark-blue p-8 overflow-x-hidden h-screen">
                <Outlet />
            </div>
            <div className="drawer-side fixed">
                <label htmlFor="my-drawer-2" className="drawer-overlay" />
                <ul className="menu p-4 w-80 h-full text-base dark:bg-[#0C1322] nb_border bg-[#EDF1F7]">
                    <div>
                        <Link to="/">
                            <h1 className="text-3xl mb-5 font-bold text-start  text-dark-grey dark:text-white">
                                <span className="text-green">CREATIVE</span> EYE
                            </h1>
                        </Link>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="avatar">
                            <div className="w-10 rounded-full ring ring-green ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} alt="" />
                            </div>
                        </div>
                        <h4 className="text-dark-grey dark:text-white text-lg">
                            Hi, {user?.displayName}
                        </h4>

                        <div className="hidden lg:block">
                            <Theme />
                        </div>
                    </div>
                    <div className="divider dark:divider-gray-300" />
                    {userRole === 'student' && (
                        <>
                            {/* <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="user-home"
                                >
                                    <AiOutlineDashboard size={25} /> Dashboard
                                </NavLink>
                            </li> */}
                            <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="select-classes"
                                >
                                    <MdOutlineBookmarkAdded size={25} /> My Selected Classes
                                </NavLink>
                            </li>
                            <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="enrolled-classes"
                                >
                                    <AiOutlineBook size={25} /> My Enrolled Classes
                                </NavLink>
                            </li>
                            <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="payment-history"
                                >
                                    <AiOutlineWallet size={25} /> Payment History
                                </NavLink>
                            </li>
                            <div className="divider dark:divider-gray-300" />
                            <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="/"
                                >
                                    <AiOutlineHome size={25} /> Back To Home
                                </NavLink>
                            </li>
                            <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-dark-grey dark:text-white hover:text-green '
                                            : ' '
                                    }
                                    onClick={handleLogout}
                                >
                                    <AiOutlineLogout size={25} /> Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                    {userRole === 'instructor' && (
                        <>
                            {' '}
                            {/* <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="instructor-home"
                                >
                                    <AiOutlineDashboard size={25} /> Instructor Home
                                </NavLink>{' '}
                            </li> */}
                            <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="add-class"
                                >
                                    <BiBookAdd size={25} /> Add Class
                                </NavLink>
                            </li>
                            <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="my-classes"
                                >
                                    <AiOutlineBook size={25} /> My Classes
                                </NavLink>
                            </li>
                            <div className="divider dark:divider-gray-300" />
                            <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="/"
                                >
                                    <AiOutlineHome size={25} /> Back To Home
                                </NavLink>
                            </li>
                            <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-dark-grey dark:text-white hover:text-green'
                                            : ''
                                    }
                                    onClick={handleLogout}
                                >
                                    <AiOutlineLogout size={25} /> Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                    {userRole === 'admin' && (
                        <>
                            {/* <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="admin-home"
                                >
                                    <AiOutlineDashboard size={25} /> Dashboard
                                </NavLink>
                            </li> */}
                            <li className="text-lg">
                                {' '}
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="manage-classes"
                                >
                                    <AiOutlineBook size={25} /> Manage Classes
                                </NavLink>
                            </li>
                            <li className="text-lg">
                                {' '}
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="users"
                                >
                                    <FaUsers size={25} /> Users
                                </NavLink>
                            </li>{' '}
                            <div className="divider dark:divider-gray-300" />
                            <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green'
                                            : 'text-dark-grey   hover:text-green duration-300 dark:text-white'
                                    }
                                    to="/"
                                >
                                    <AiOutlineHome size={25} /> Back To Home
                                </NavLink>
                            </li>
                            <li className="text-lg">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-dark-grey dark:text-white hover:text-green'
                                            : ' '
                                    }
                                    onClick={handleLogout}
                                >
                                    <AiOutlineLogout size={25} /> Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
