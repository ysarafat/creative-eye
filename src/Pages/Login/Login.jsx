/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Container from '../../Components/Container/Container';
import DynamicTitle from '../../Components/DynamicTitle/DynamicTitle';
import { AuthContext } from '../../Context/AuthProvider';
import image from '../../assets/register/Fingerprint.svg';
import GoogleLogin from '../Shared/SocialLogin/GoogleLogin';

function Login() {
    const { loginUser, resetPassword } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const emailRref = useRef();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        setLoading(true);
        const email = emailRref.current.value;
        loginUser(email, data.password)
            .then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(from, { replace: true });
                reset();
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    const handelPassReset = () => {
        const email = emailRref.current.value;
        setError('');
        if (!email) {
            return setError('Please input your email');
        }
        resetPassword(email)
            .then(() => {
                alert('Please chaek your email');
            })
            .catch((err) => {
                setError(err.message);
            });
    };
    return (
        <div className="my-16">
            <DynamicTitle title="Login" />
            <Container>
                <div className="flex flex-col-reverse lg:flex-row-reverse items-center justify-between">
                    <div className='className=" w-full lg:w-1/2 text-center" '>
                        <img src={image} alt="" />
                    </div>
                    <div className="w-full lg:w-1/2 lg:p-10 p-4 rounded-lg bg-slate-100 dark:bg-slate-800 ">
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <h1 className="text-2xl font-bold text-center mb-5 text-dark-grey dark:text-white">
                                Login
                            </h1>
                            {error && (
                                <p className="text-base font-semibold my-2 text-red-500 text-center">
                                    {error}
                                </p>
                            )}
                            <div>
                                <label
                                    htmlFor=""
                                    className="text-lg dark:text-gray-300 text-slate-600"
                                >
                                    Email Address
                                </label>
                                <input
                                    {...register('email')}
                                    ref={emailRref}
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white dark:disabled:text-white text-dark-grey focus:border-green"
                                    type="email"
                                    placeholder="Enter Your Email"
                                    required
                                />
                                <span>
                                    {errors.email?.type === 'required' && (
                                        <p className="text-red-500 mb-2">Email Required</p>
                                    )}
                                </span>
                            </div>
                            <div>
                                <label
                                    htmlFor=""
                                    className="text-lg dark:text-gray-300 text-slate-600"
                                >
                                    Password
                                </label>
                                <input
                                    {...register('password', { required: true })}
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white text-dark-grey focus:border-green"
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="Enter Your Password"
                                />
                                <span>
                                    {errors.password?.type === 'required' && (
                                        <p className="text-red-500 mb-2">Password Required</p>
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center mt-2">
                                <input
                                    onClick={() => setShowPass(!showPass)}
                                    type="checkbox"
                                    name="check"
                                    className="checkbox checkbox-success"
                                />

                                <label className="ml-2  font-medium text-gray-900 dark:text-gray-300">
                                    {showPass ? 'Hide Password' : 'Show Password'}{' '}
                                </label>
                            </div>
                            <input
                                disabled={loading}
                                className="w-full h-11 btn mt-5 bg-green text-white hover:bg-dark-grey dark:hover:bg-slate-300 disabled:text-dark-grey dark:hover:text-black border-none"
                                type="submit"
                                value={loading ? 'Please Wait' : 'Login'}
                            />
                        </form>
                        <button
                            onClick={handelPassReset}
                            className="hover:text-primary underline mb-3 mt-5 dark:text-white"
                        >
                            Forgat Password?
                        </button>
                        <p className="mb-6 dark:text-white">
                            Don’t have an account?
                            <Link className="text-green underline " to="/register">
                                Create an account
                            </Link>
                        </p>
                        <div className="divider" />
                        <GoogleLogin />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Login;
