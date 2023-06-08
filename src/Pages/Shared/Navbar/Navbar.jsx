import { useContext, useState } from 'react';
import { HiBars3BottomLeft, HiXMark } from 'react-icons/hi2';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Container from '../../../Components/Container/Container';
import Theme from '../../../Components/Theme/Theme';
import { AuthContext } from '../../../Context/AuthProvider';

function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
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
    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-green'
                            : 'text-dark-grey dark:text-white hover:underline  hover:text-green duration-300'
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/instructors"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-green'
                            : 'text-dark-grey hover:underline  hover:text-green duration-300 dark:text-white'
                    }
                >
                    Instructors
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/classes"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-green'
                            : 'text-dark-grey hover:underline  hover:text-green duration-300 dark:text-white '
                    }
                >
                    Classes
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-green'
                                : 'text-dark-grey hover:underline  hover:text-green duration-300 dark:text-white'
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
            {!user && (
                <>
                    {' '}
                    <li>
                        <NavLink
                            to="/Login"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-green'
                                    : 'text-dark-grey hover:underline  hover:text-green duration-300 dark:text-white'
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Register"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-green'
                                    : 'text-dark-grey hover:underline  hover:text-green duration-300 dark:text-white'
                            }
                        >
                            Register
                        </NavLink>
                    </li>{' '}
                </>
            )}
            {user && (
                <li>
                    <NavLink
                        onClick={handleLogout}
                        className={({ isActive }) =>
                            isActive
                                ? 'text-green'
                                : 'text-dark-grey hover:underline  hover:text-green duration-300 dark:text-white'
                        }
                    >
                        Logout
                    </NavLink>
                </li>
            )}
        </>
    );
    return (
        <nav className="dark:bg-[#0C1322] nb_border bg-[#EDF1F7]">
            <Container>
                <div className="hidden lg:flex items-center justify-between py-3">
                    <Link to="/">
                        <div>
                            <h1 className="text-3xl font-bold text-dark-grey dark:text-white">
                                <span className="text-green">CREATIVE</span> EYE
                            </h1>
                        </div>
                    </Link>
                    <div className="flex items-center gap-5">
                        <Theme />
                        <ul className="flex gap-5 text-lg">{navLinks}</ul>
                        {user && (
                            <div className="tooltip tooltip-bottom" data-tip="Yeasir Arafat">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={user?.photoURL} alt="" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* mobile menu */}
                <div className="lg:hidden  text-primary-text py-3  flex justify-between items-center">
                    <div>
                        <Link to="/">
                            <div>
                                <h1 className="text-3xl font-bold text-dark-grey dark:text-white">
                                    <span className="text-green">CREATIVE</span> EYE
                                </h1>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center gap-7">
                        <Theme />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="  text-gray-600 dark:text-white focus:outline-none"
                        >
                            {isOpen ? <HiXMark size={30} /> : <HiBars3BottomLeft size={30} />}
                        </button>
                        {isOpen && (
                            <ul className="absolute z-40 top-[60px] backdrop:blur-md bg-[#EDF1F7] dark:bg-[#0f1729] nb_border right-0  w-1/2 py-3 px-4 flex flex-col gap-2 min-h-[calc(100vh-60px)] ">
                                {navLinks}
                            </ul>
                        )}
                    </div>
                </div>
            </Container>
        </nav>
    );
}

export default Navbar;
