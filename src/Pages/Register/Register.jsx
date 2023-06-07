/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Container from '../../Components/Container/Container';
import { AuthContext } from '../../Context/AuthProvider';
import image from '../../assets/register/Fingerprint.svg';

function Register() {
    const { registerUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        // host image
        const formData = new FormData();
        formData.append('image', data.picture[0]);
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((image) => console.log(image));
        // create user
        registerUser(data.email, data.password)
            .then((res) => console.log(res.user))
            .catch((err) => console.log(err.message));
    };

    return (
        <div className="my-14">
            <Container>
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
                    <div className='className=" w-full lg:w-1/2 text-center" '>
                        <img src={image} alt="" />
                    </div>
                    <div className="w-full lg:w-1/2 lg:p-10 p-4 rounded-lg bg-slate-200 dark:bg-slate-800 ">
                        <h1 className="text-2xl font-bold text-center mb-5 text-dark-grey dark:text-white">
                            Register
                        </h1>
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
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 focus:border-green"
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
                                    className="file-input h-11 file-input-bordered shadow focus:shadow-lg w-full my-2 dark:bg-slate-900 dark:text-white border-none"
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
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 focus:border-green"
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
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 focus:border-green"
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
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 focus:border-green"
                                    type="password"
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
                                    className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 focus:border-green"
                                    type="password"
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
                            <input
                                className="w-full h-11 btn mt-5 bg-green text-white hover:bg-dark-grey dark:hover:bg-slate-300 dark:hover:text-black border-none"
                                type="submit"
                                value="Register"
                            />
                        </form>
                        <p className="mt-6">
                            Already have an account?
                            <Link className="text-green underline " to="/login">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Register;
