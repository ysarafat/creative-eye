/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable radix */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

function UpdateClass() {
    const [axiosSecure] = useAxiosSecure();
    const { id } = useParams();

    const { data: singleClass } = useQuery({
        queryKey: ['id', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/class/${id}`);
            return res.data;
        },
    });

    const onSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.className.value;
        const image = form.image.files;
        const seats = form.seats.value;
        const price = form.price.value;
        const details = form.classDetails.value;
        console.log(name, image, seats, price, details);
        const formData = new FormData();
        formData.append('file', image[0]);
        formData.append('upload_preset', 'creativeeye');
        formData.append('cloud_name', 'dcpdcdfxy');
        if (image.length > 0) {
            axios
                .post(`https://api.cloudinary.com/v1_1/dcpdcdfxy/image/upload`, formData)
                .then((image) => {
                    const imageUrl = image.data.url;
                    const priceValue = parseFloat(price);
                    const updateData = {
                        className: name,
                        classImage: imageUrl,
                        seats: parseInt(seats),
                        price: parseFloat(priceValue.toFixed(2)),
                        classDetails: details,
                    };
                    axiosSecure
                        .put(`http://localhost:5000/update-class/${singleClass._id}`, updateData)
                        .then((res) => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    position: 'top-center',
                                    icon: 'success',
                                    title: 'Class Update successfully',
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                            }
                        });
                });
        } else {
            const priceValue = parseFloat(price);
            const updateData = {
                className: name,
                classImage: singleClass.classImage,
                seats: parseInt(seats),
                price: parseFloat(priceValue.toFixed(2)),
                classDetails: details,
            };
            axiosSecure
                .put(`http://localhost:5000/update-class/${singleClass._id}`, updateData)
                .then((res) => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Class Update successfully',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
        }
    };

    return (
        <div className="">
            <h1 className="text-center text-3xl font-bold dark:text-white text-dark-grey mb-5 ">
                Update Class
            </h1>
            <form
                onSubmit={onSubmit}
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
                            name="className"
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
                            type="text"
                            placeholder="Enter Class Name"
                            defaultValue={singleClass?.className}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="" className="text-lg dark:text-gray-300 text-slate-600">
                            Class Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            className="file-input h-11 file-input-bordered shadow focus:shadow-lg w-full my-2 dark:bg-slate-900 dark:text-white  border-none"
                        />
                    </div>
                </div>

                <div className="lg:flex gap-5 items-center">
                    <div className="w-full">
                        <label htmlFor="" className="text-lg dark:text-gray-300 text-slate-600">
                            Available seats
                        </label>
                        <input
                            name="seats"
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
                            type="number"
                            placeholder="Enter Available seats"
                            defaultValue={singleClass?.seats}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="" className="text-lg dark:text-gray-300 text-slate-600">
                            Price
                        </label>
                        <input
                            name="price"
                            className=" outline-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 h-11 w-full my-2 focus:border-s-8 bg-white focus:border-green"
                            type="number"
                            step="any"
                            placeholder="Enter Price"
                            defaultValue={singleClass?.price}
                            required
                        />
                    </div>
                </div>
                <textarea
                    rows="10"
                    name="classDetails"
                    className=" py-2 outline-none border-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3  w-full my-2 border bg-white focus:border-green"
                    placeholder="Class Details"
                    defaultValue={singleClass?.classDetails}
                    required
                />
                <input
                    className="w-full h-11 btn mt-5 bg-green capitalize text-lg text-white hover:bg-dark-grey dark:hover:bg-slate-300 dark:hover:text-black border-none"
                    type="submit"
                    value="update Class"
                />
            </form>
        </div>
    );
}

export default UpdateClass;
