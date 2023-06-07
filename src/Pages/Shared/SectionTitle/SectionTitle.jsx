import React from 'react';

function SectionTitle({ title, subtitle }) {
    return (
        <div className=" mx-auto text-center">
            <h1 className="text-2xl lg:text-3xl uppercase font-bold dark:text-white text-dark-grey  ">
                {title}
            </h1>
            <p className="text-xl mt-1 text-slate-600 dark:text-gray-300">{subtitle}</p>
        </div>
    );
}

export default SectionTitle;
