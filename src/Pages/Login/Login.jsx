/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Container from '../../Components/Container/Container';
import { AuthContext } from '../../Context/AuthProvider';
import image from '../../assets/register/Fingerprint.svg';

function Login() {
    const { loginUser } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state?.from?.pathname || '/';

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        loginUser(data.email, data.password)
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
            })
            .catch((err) => setError(err.message));
    };
    return (
        <div>
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
                                    {...register('email', { required: true })}
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
                                    type="email"
                                    placeholder="Enter Your Email"
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
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
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
                                className="w-full h-11 btn mt-5 bg-green text-white hover:bg-dark-grey dark:hover:bg-slate-300 dark:hover:text-black border-none"
                                type="submit"
                                value="Login"
                            />
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Login;
