import React from 'react';
import Container from '../../../Components/Container/Container';

function BannerContent({ title, description }) {
    return (
        <Container>
            <div className="flex flex-col justify-center items-center h-[450px] lg:w-[70%] mx-auto">
                <p className="text-lg lg:text-xl text-green font-semibold">Most Popular course</p>
                <h1 className="text-2xl lg:text-6xl mt-4 text-white font-bold">{title}</h1>
                <p className="lg:text-lg text-base text-gray-300 mt-4 text-center">{description}</p>
                <button className="btn bg-green text-white hover:bg-dark-grey mt-5 border-none">
                    Enroll Now
                </button>
            </div>
        </Container>
    );
}

export default BannerContent;
