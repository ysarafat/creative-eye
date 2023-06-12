import React from 'react';
import { BsCalendar3 } from 'react-icons/bs';
import Container from '../../../../Components/Container/Container';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';

function Blog() {
    return (
        <div className="my-16">
            <SectionTitle
                title="our blog"
                subtitle="Illuminating Photography Techniques for Aspiring Shutterbugs"
            />
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10 my-10">
                    <div className="card card-compact test-start  w-full rounded-lg bg-white  dark:bg-slate-800 shadow-xl">
                        <figure>
                            <img
                                className="h-[300px] w-full"
                                src="https://res.cloudinary.com/dcpdcdfxy/image/upload/v1686559606/pexels-israelzin-oliveira-3773478_pmvmuy.jpg"
                                alt="class"
                            />
                        </figure>
                        <div className=" py-4 px-4 rounded-b-lg  dark:text-gray-300">
                            <h2 className=" text-base font-bold  dark:text-white ">
                                Illuminating the Path Mastering Lighting in Photography
                            </h2>
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                    <img
                                        className="rounded-full h-8 w-8"
                                        src="https://res.cloudinary.com/dcpdcdfxy/image/upload/v1686394889/iclhkqepty7saksbzxxw.jpg"
                                        alt=""
                                    />
                                    <p>Harry Bunt</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <BsCalendar3 /> 12 Feb 2023
                                </div>
                            </div>
                            <p className="text-start mt-3">
                                In the realm of photography, light is the quintessential ingredient
                                that can transform an ordinary image into an extraordinary work of
                                art{' '}
                                <span className="text-green hover:underline cursor-pointer">
                                    ...read more
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="card card-compact test-start  w-full rounded-lg bg-white  dark:bg-slate-800 shadow-xl">
                        <figure>
                            <img
                                className="h-[300px] w-full"
                                src="https://res.cloudinary.com/dcpdcdfxy/image/upload/v1686561271/CreativeEye/natural-light-5-1920x860-c_lkxl4b.jpg"
                                alt="class"
                            />
                        </figure>
                        <div className=" py-4 px-4 rounded-b-lg  dark:text-gray-300">
                            <h2 className=" text-base font-bold  dark:text-white ">
                                Natural light often hailed as the purest
                            </h2>
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                    <img
                                        className="rounded-full h-8 w-8"
                                        src="https://res.cloudinary.com/dcpdcdfxy/image/upload/v1686536686/CreativeEye/pv8irgvatakvcw2zsba4.jpg"
                                        alt=""
                                    />
                                    <p>Elon</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <BsCalendar3 /> 12 Feb 2023
                                </div>
                            </div>
                            <p className="text-start mt-3">
                                Understanding the different types of lighting is crucial in
                                photography, as it allows you to select the most suitable approach
                                for your desired outcome
                                <span className="text-green hover:underline cursor-pointer">
                                    ...read more
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="card card-compact test-start  w-full rounded-lg bg-white  dark:bg-slate-800 shadow-xl">
                        <figure>
                            <img
                                className="h-[300px] w-full"
                                src="https://res.cloudinary.com/dcpdcdfxy/image/upload/v1686394018/nqbcotekhpugtcxe6pci.jpg"
                                alt="class"
                            />
                        </figure>
                        <div className=" py-4 px-4 rounded-b-lg  dark:text-gray-300">
                            <h2 className=" text-base font-bold  dark:text-white ">
                                Natural light is a photographer's best friend
                            </h2>
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                    <img
                                        className="rounded-full h-8 w-8"
                                        src="https://res.cloudinary.com/dcpdcdfxy/image/upload/v1686392484/cld-sample.jpg"
                                        alt=""
                                    />
                                    <p>Harika</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <BsCalendar3 /> 10 May 2023
                                </div>
                            </div>
                            <p className="text-start mt-3">
                                tart by observing how the light changes throughout the day, from the
                                soft, warm tones of sunrise and sunset to the harsh midday sunlight.
                                <span className="text-green hover:underline cursor-pointer">
                                    ...read more
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Blog;
