import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

function Spinner() {
    return (
        <div className="h-screen flex justify-center items-center dark:bg-dark-blue bg-white">
            <MutatingDots
                height="150"
                width="100"
                color="#4fa94d"
                secondaryColor="#4fa94d"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible
            />
        </div>
    );
}

export default Spinner;
