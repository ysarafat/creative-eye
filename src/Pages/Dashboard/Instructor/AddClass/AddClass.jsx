/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import DynamicTitle from '../../../../Components/DynamicTitle/DynamicTitle';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

function AddClass() {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const formData = new FormData();
        setLoading(true);
        formData.append('file', data.classImage[0]);
        formData.append('upload_preset', 'creativeeye');
        formData.append('cloud_name', 'dcpdcdfxy');
        axios
            .post(`https://api.cloudinary.com/v1_1/dcpdcdfxy/image/upload`, formData)
            .then((image) => {
                const imageUrl = image.data.url;
                const priceValue = parseFloat(data.price);
                const newClass = {
                    className: data.className,
                    classImage: imageUrl,
                    instructor: data.instructor,
                    instructorEmail: data.instructorEmail,
                    seats: parseInt(data.availableSeats),
                    price: parseFloat(priceValue.toFixed(2)),
                    classDetails: data.classDetails,
                    status: 'pending',
                    feedback: [],
                };
                console.log(newClass);
                axiosSecure.post('/add-class', newClass).then((data) => {
                    if (data.data.insertedId) {
                        reset();
                        setLoading(false);
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Class added successfully',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
            });
    };
    return (
        <div className="">
            <DynamicTitle title="Add Class" />
            <h1 className="text-center text-3xl font-bold dark:text-white text-dark-grey mb-5 ">
                Add Class
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                action=""
                className="dark:bg-slate-800 bg-slate-100 p-5 rounded-lg"
            >
                <div className="lg:flex items-center gap-5">
                    {' '}
                    <div className="w-full">
                        <label htmlFor="" className="text-lg dark:text-gray-300 text-slate-600">
                            Class Name
                        </label>
                        <input
                            {...register('className', { required: true })}
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white text-dark-grey focus:border-green"
                            type="text"
                            placeholder="Enter Class Name"
                        />
                        <span>
                            {errors.className?.type === 'required' && (
                                <p className="text-red-500 mb-2">Class Name Required</p>
                            )}
                        </span>
                    </div>
                    <div className="w-full">
                        <label htmlFor="" className="text-lg dark:text-gray-300 text-slate-600">
                            Class Image
                        </label>
                        <input
                            {...register('classImage', { required: true })}
                            type="file"
                            className="file-input h-11 file-input-bordered shadow focus:shadow-lg w-full my-2 dark:bg-slate-900 dark:text-white bg-white text-dark-grey border-none"
                        />
                        <span>
                            {errors.classImage?.type === 'required' && (
                                <p className="text-red-500 mb-2">class Image Required</p>
                            )}
                        </span>
                    </div>
                </div>
                <div className="lg:flex gap-5 items-center">
                    <div className="w-full">
                        <label htmlFor="" className="text-lg dark:text-gray-300 text-slate-600">
                            Instructor name
                        </label>
                        <input
                            {...register('instructor', { required: true })}
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white text-dark-grey focus:border-green"
                            type="text"
                            defaultValue={user?.displayName}
                            readOnly
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="" className="text-lg dark:text-gray-300 text-slate-600">
                            Instructor Email
                        </label>
                        <input
                            {...register('instructorEmail', { required: true })}
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white text-dark-grey focus:border-green"
                            type="email"
                            defaultValue={user?.email}
                            readOnly
                        />
                    </div>
                </div>
                <div className="lg:flex gap-5 items-center">
                    <div className="w-full">
                        <label htmlFor="" className="text-lg dark:text-gray-300 text-slate-600">
                            Available seats
                        </label>
                        <input
                            {...register('availableSeats', { required: true })}
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white text-dark-grey focus:border-green"
                            type="number"
                            placeholder="Enter Available seats"
                        />
                        <span>
                            {errors.availableSeats?.type === 'required' && (
                                <p className="text-red-500 mb-2">Available seats Required</p>
                            )}
                        </span>
                    </div>
                    <div className="w-full">
                        <label htmlFor="" className="text-lg dark:text-gray-300 text-slate-600">
                            Price
                        </label>
                        <input
                            {...register('price', { required: true })}
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white text-dark-grey focus:border-green"
                            type="number"
                            step="any"
                            placeholder="Enter Price"
                        />
                        <span>
                            {errors.price?.type === 'required' && (
                                <p className="text-red-500 mb-2">Enter Price Required</p>
                            )}
                        </span>
                    </div>
                </div>
                <textarea
                    rows="10"
                    {...register('classDetails', { required: true })}
                    className=" py-2 outline-none border-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3  w-full my-2 border bg-white text-dark-grey focus:border-green"
                    placeholder="Class Details"
                />
                <span>
                    {errors.classDetails?.type === 'required' && (
                        <p className="text-red-500 mb-2">Class Details Required</p>
                    )}
                </span>
                <input
                    disabled={loading}
                    className="w-full h-11 btn mt-5 bg-green disabled:text-dark-grey text-white hover:bg-dark-grey dark:hover:bg-slate-300 dark:hover:text-black border-none"
                    type="submit"
                    value={loading ? 'Please Wait' : 'Add Class'}
                />
            </form>
        </div>
    );
}

export default AddClass;
