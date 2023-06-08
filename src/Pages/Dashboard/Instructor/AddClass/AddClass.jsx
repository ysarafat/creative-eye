/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';

function AddClass() {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.classImage[0]);
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                const imageUrl = data.data.display_url;
            });
    };
    return (
        <div className="">
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
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
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
                            className="file-input h-11 file-input-bordered shadow focus:shadow-lg w-full my-2 dark:bg-slate-900 dark:text-white  border-none"
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
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
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
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
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
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
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
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
                            type="number"
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
                    className=" py-2 outline-none border-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3  w-full my-2 border bg-white focus:border-green"
                    placeholder="Class Details"
                />
                <span>
                    {errors.classDetails?.type === 'required' && (
                        <p className="text-red-500 mb-2">Class Details Required</p>
                    )}
                </span>
                <input
                    className="w-full h-11 btn mt-5 bg-green text-white hover:bg-dark-grey dark:hover:bg-slate-300 dark:hover:text-black border-none"
                    type="submit"
                    value="Add Class"
                />
            </form>
        </div>
    );
}

export default AddClass;
