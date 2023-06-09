import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

function UpdateClass() {
    const [singleClass, setSingleClass] = useState({});
    const [axiosSecure] = useAxiosSecure();
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/class/${id}`).then((data) => setSingleClass(data.data));
    }, []);

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
            .then((image) => {
                const imageUrl = image.data.display_url;
                const priceValue = parseFloat(data.price);
                const updatedata = {
                    className: data.className,
                    classImage: imageUrl,
                    seats: parseInt(data.availableSeats),
                    price: parseFloat(priceValue.toFixed(2)),
                    classDetails: data.classDetails,
                };
                axiosSecure
                    .put(`http://localhost:5000/update-class/${singleClass._id}`, updatedata)
                    .then((res) => console.log(res));
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
                            {...register('className')}
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
                            type="text"
                            placeholder="Enter Class Name"
                            defaultValue={singleClass.className}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="" className="text-lg dark:text-gray-300 text-slate-600">
                            Class Image
                        </label>
                        <input
                            {...register('classImage')}
                            type="file"
                            className="file-input h-11 file-input-bordered shadow focus:shadow-lg w-full my-2 dark:bg-slate-900 dark:text-white  border-none"
                            required
                        />
                    </div>
                </div>

                <div className="lg:flex gap-5 items-center">
                    <div className="w-full">
                        <label htmlFor="" className="text-lg dark:text-gray-300 text-slate-600">
                            Available seats
                        </label>
                        <input
                            {...register('availableSeats')}
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
                            type="number"
                            placeholder="Enter Available seats"
                            defaultValue={singleClass.seats}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="" className="text-lg dark:text-gray-300 text-slate-600">
                            Price
                        </label>
                        <input
                            {...register('price')}
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
                            type="number"
                            step="any"
                            placeholder="Enter Price"
                            defaultValue={singleClass.price}
                            required
                        />
                    </div>
                </div>
                <textarea
                    rows="10"
                    {...register('classDetails')}
                    className=" py-2 outline-none border-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3  w-full my-2 border bg-white focus:border-green"
                    placeholder="Class Details"
                    defaultValue={singleClass.classDetails}
                    required
                />
                <input
                    className="w-full h-11 btn mt-5 bg-green text-white hover:bg-dark-grey dark:hover:bg-slate-300 dark:hover:text-black border-none"
                    type="submit"
                    value="Add Class"
                />
            </form>
        </div>
    );
}

export default UpdateClass;
