import React from 'react';

function ClassCard({ classes }) {
    const { _id, className, classImage, instructor, price, seats } = classes;
    return (
        <div className="card card-compact w-full rounded-lg bg-white  dark:bg-slate-800 shadow-xl">
            <figure>
                <img className="h-[256px] w-full" src={classImage} alt="class" />
            </figure>
            <div className=" py-4 px-4 rounded-b-lg  dark:text-gray-300">
                <h2 className="card-title dark:text-white">
                    {className}{' '}
                    <div className="badge bg-green p-3 border-none text-white">Popular</div>
                </h2>

                <p className="text-lg">Instructor : {instructor}</p>
                <p className="text-lg">Available Seats : {seats}</p>
                <p className="text-lg">Price : ${price}</p>
            </div>
            <div className="rounded-b-lg">
                <button className=" h-11 text-lg rounded-b-lg bg-green w-full text-white hover:bg-dark-grey border-none ">
                    Buy Now
                </button>
            </div>
        </div>
    );
}

export default ClassCard;
