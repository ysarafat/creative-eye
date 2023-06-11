import React from 'react';
import './PageTitleBanner.css';

function PageTitleBanner({ title, subtitle }) {
    return (
        <div className="title-banner h-[250px] flex justify-center  items-center">
            <div className=" mx-auto text-center ">
                <h1 className="text-2xl lg:text-4xl uppercase font-bold text-white   ">{title}</h1>
                <p className="text-xl mt-1 text-slate-300 ">{subtitle}</p>
            </div>
        </div>
    );
}

export default PageTitleBanner;
