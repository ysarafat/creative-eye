import React from 'react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Banner.css';
import BannerContent from './BannerContent';

function Banner() {
    return (
        <div className="">
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="slider_1 ">
                        <BannerContent
                            title="Fundamentals of Photography"
                            description="Covering exposure, composition, lighting, lenses, and image editing, it equips students with essential photography principles. Whether you're a beginner or seeking to strengthen your foundation, this course offers valuable insights for capturing captivating images"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slider_2 ">
                        <BannerContent
                            title="Digital Photography for Beginners"
                            description="The Fundamentals of Photography course is a comprehensive introduction to the art and science of capturing compelling images. It covers essential topics such as exposure, composition, lighting, and camera settings. Students learn to master their cameras, unleash their creativity, and develop a solid foundation in photography"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slider_3 ">
                        <BannerContent
                            title="Photography Basics and Beyond"
                            description="Suitable for beginners, it explores exposure, lighting, composition, and editing techniques. With a focus on both smartphone and DSLR photography, it provides a comprehensive understanding of capturing and enhancing captivating images."
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slider_4 ">
                        <BannerContent
                            title="The Art of Photography"
                            description=" Going beyond technical aspects, it delves into the artistic elements of photography. From visual storytelling to aesthetic considerations and creative techniques, this course fosters a deeper understanding of photography as a form of artistic expression."
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Banner;
