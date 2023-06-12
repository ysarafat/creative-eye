/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Container from '../../Components/Container/Container';
import DynamicTitle from '../../Components/DynamicTitle/DynamicTitle';
import { AuthContext } from '../../Context/AuthProvider';
import image from '../../assets/register/Fingerprint.svg';
import GoogleLogin from '../Shared/SocialLogin/GoogleLogin';

function Register() {
    const { registerUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const from = location.state?.from?.pathname || '/';
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        setError('');
        setLoading(true);
        // host image
        const formData = new FormData();
        formData.append('file', data.picture[0]);
        formData.append('upload_preset', 'creativeeye');
        formData.append('cloud_name', 'dcpdcdfxy');
        axios
            .post(`https://api.cloudinary.com/v1_1/dcpdcdfxy/image/upload`, formData)
            .then((image) => {
                const img = image.data.url;
                if (data.password !== data.confirmPassword) {
                    setLoading(false);
                    return setError('Password Do not match');
                }
                // create user
                registerUser(data.email, data.password)
                    .then(() => {
                        updateUser(data.name, img);
                        const userInfo = {
                            userName: data.name,
                            email: data.email,
                            image: img,
                            role: 'student',
                        };
                        fetch('https://creative-eye.onrender.com/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify(userInfo),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data);
                                Swal.fire({
                                    position: 'top-center',
                                    icon: 'success',
                                    title: 'Register Successful',
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                reset();
                                navigate(from, { replace: true });
                                setLoading(false);
                            });
                    })
                    .catch((err) => {
                        setError(err.message);
                        setLoading(false);
                    });
            });
    };

    return (
        <div className="my-14">
            <DynamicTitle title="Register" />
            <Container>
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
                    <div className='className=" w-full lg:w-1/2 text-center" '>
                        <img src={image} alt="" />
                    </div>
                    <div className="w-full lg:w-1/2 lg:p-10 p-4 rounded-lg bg-slate-100 dark:bg-slate-800 ">
                        <h1 className="text-2xl font-bold text-center mb-5 text-dark-grey dark:text-white">
                            Register
                        </h1>
                        {error && (
                            <p className="text-base font-semibold my-2 text-red-500 text-center">
                                {error}
                            </p>
                        )}
                        <form onSubmit={handleSubmit(onSubmit)} action="">
                            <div>
                                <label
                                    htmlFor=""
                                    className="text-lg dark:text-gray-300 text-slate-600"
                                >
                                    Your Name
                                </label>
                                <input
                                    name="name"
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 bg-white dark:text-white  rounded-lg px-3 h-11 w-full my-2 text-dark-grey focus:border-s-8 focus:border-green"
                                    type="text"
                                    placeholder="Enter Your Name"
                                    {...register('name', { required: true })}
                                />
                                <span>
                                    {errors.name?.type === 'required' && (
                                        <p className="text-red-500 mb-2">
                                            Profile Picture Required
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div>
                                <label
                                    htmlFor=""
                                    className="text-lg dark:text-gray-300 text-slate-600"
                                >
                                    Profile Picture
                                </label>
                                <input
                                    {...register('picture', { required: true })}
                                    type="file"
                                    name="picture"
                                    className="file-input h-11 file-input-bordered shadow focus:shadow-lg w-full my-2 dark:bg-slate-900 dark:text-white bg-white text-dark-grey border-none"
                                />
                                <span>
                                    {errors.picture?.type === 'required' && (
                                        <p className="text-red-500 mb-2">
                                            Profile Picture Required
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div>
                                <label
                                    htmlFor=""
                                    className="text-lg dark:text-gray-300 text-slate-600"
                                >
                                    Phone Number
                                </label>
                                <input
                                    {...register('phoneNumber', { required: true })}
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  bg-white rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 text-dark-grey focus:border-green"
                                    type="number"
                                    placeholder="Enter Your Phone"
                                />
                                <span>
                                    {errors.phoneNumber?.type === 'required' && (
                                        <p className="text-red-500 mb-2">
                                            Phone Number Field Required
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div>
                                <label
                                    htmlFor=""
                                    className="text-lg dark:text-gray-300 text-slate-600"
                                >
                                    Email Address
                                </label>
                                <input
                                    {...register('email', { required: true })}
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 text-dark-grey bg-white focus:border-green"
                                    type="email"
                                    placeholder="Enter Your Email"
                                />
                                <span>
                                    {errors.email?.type === 'required' && (
                                        <p className="text-red-500 mb-2">Email Field Required</p>
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
                                    {...register('password', {
                                        required: true,
                                        minLength: 6,
                                        pattern:
                                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                                    })}
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 text-dark-grey bg-white focus:border-green"
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="Enter Your Password"
                                />

                                <span>
                                    {errors.password?.type === 'pattern' && (
                                        <p className="text-red-500 mb-2">
                                            Password must be a letter A-Z with a special character
                                        </p>
                                    )}
                                </span>
                                <span>
                                    {errors.password?.type === 'minLength' && (
                                        <p className="text-red-500 mb-2">
                                            Password must be a minimum of 6 digits
                                        </p>
                                    )}
                                </span>
                                <span>
                                    {errors.password?.type === 'required' && (
                                        <p className="text-red-500 mb-2">Password Field Required</p>
                                    )}
                                </span>
                            </div>
                            <div>
                                <label
                                    htmlFor=""
                                    className="text-lg dark:text-gray-300 text-slate-600"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    {...register('confirmPassword', {
                                        required: true,
                                        pattern:
                                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                                        minLength: 6,
                                    })}
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 text-dark-grey bg-white focus:border-green"
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="Enter Confirm Password"
                                />
                                <span>
                                    {errors.confirmPassword?.type === 'pattern' && (
                                        <p className="text-red-500 mb-2">
                                            Password must be a letter A-Z with a special character
                                        </p>
                                    )}
                                </span>
                                <span>
                                    {errors.confirmPassword?.type === 'minLength' && (
                                        <p className="text-red-500 mb-2">
                                            Password must be a minimum of 6 digits
                                        </p>
                                    )}
                                </span>
                                <span>
                                    {errors.confirmPassword?.type === 'required' && (
                                        <p className="text-red-500 mb-2">Password Field Required</p>
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
                                className="w-full h-11 btn mt-5 bg-green text-white hover:bg-dark-grey dark:hover:bg-slate-300 dark:hover:text-black dark:text-white dark:disabled:text-white border-none"
                                type="submit"
                                value={loading ? 'Please Wait' : 'Register'}
                            />
                        </form>
                        <p className="mt-6 dark:text-white">
                            Already have an account?
                            <Link className="text-green underline ms-2" to="/login">
                                Login
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

export default Register;
