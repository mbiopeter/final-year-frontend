import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { handleSliderFetchHelper } from "../../../model/slider/Slider";


const Slider = () => {
    const[slides, setSlides] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            setSlides(await handleSliderFetchHelper())
        }
        handleFetch();
    },[])
    return (
        <div className="w-full lg:w-[73%] h-[344px] mx-auto relative">
            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]} 
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="overflow-hidden">
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative py-10 bg-black">
                        <div className="relative flex justify-end">
                            <div className="absolute inset-0 bg-black opacity-40"></div>
                            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
                                <h3 className="text-xl font-semibold">{slide.title}</h3>
                                <h3 className="text-3xl font-bold w-[180px] mt-2">{slide.discount}</h3>
                                <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all">
                                    {slide.buttonText} →
                                </button>
                            </div>
                            <img src={slide.image} className="w-auto h-[70px] md:h-[200px] m-10 md:mr-20 object-cover" />
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-pagination !absolute bottom-4  left-1/2 transform -translate-x-1/2 z-10"></div>
            </Swiper>
        </div>
    );
};

export default Slider;
