import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
// import opps from '../../../public/Oops404.svg';

function Error() {
    const { error } = useRouteError();
    return (
        <div className="h-screen w-screen bg-[url('../../../public/Sprinkle.svg')] bg-cover bg-no-repeat items-center py-16 ">
            <img
                className="w-[70%] h-[70%] mx-auto"
                src="https://res.cloudinary.com/dcpdcdfxy/image/upload/v1686534745/BannerImg/Oops_404_Error_with_a_broken_robot-bro_auihln.svg"
                alt=""
            />
            <div className="container mx-auto text-center">
                <p className="text-2xl font-semibold md:text-3xl mb-8">{error?.message}</p>
                <Link
                    to="/"
                    className="px-8 py-3 font-semibold rounded btn bg-green text-white hover:bg-dark-grey duration-300"
                >
                    Back to homepage
                </Link>
            </div>
        </div>
    );
}

export default Error;
