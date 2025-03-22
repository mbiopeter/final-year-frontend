import React, { useEffect, useState } from "react";
import { handleSliderFetchHelper } from "../../../model/slider/Slider";

const Banner = () => {
    const [bannerData, setBannerData] = useState(null);

    useEffect(() => {
        const handleFetch = async () => {
            const data = await handleSliderFetchHelper('banner');
            setBannerData(data);
        };
        handleFetch();
    }, []);

    // Render nothing if data hasn't loaded
    if (!bannerData) return null;

    return (
        <div className="flex h-auto w-full flex-col md:flex-row items-center justify-center mx-auto mb-10 rounded-lg bg-black p-6 md:p-10">
            <div className="flex flex-col md:items-start md:text-left">
                <h3 className="cursor-pointer font-semibold text-sm text-[#00FF66]">
                    {bannerData.name}
                </h3>
                <p className="font-semibold text-white text-3xl md:text-5xl my-6">
                    {bannerData.description}
                </p>
                <div className="rounded-md w-[170px] flex justify-center py-3 px-6 bg-[#00FF66] hover:bg-[#00DC58] mt-6 cursor-pointer">
                    <button className="text-white cursor-pointer">
                        {bannerData.buttonText}
                    </button>
                </div>
            </div>

            {/* Right Side: Image */}
            <div className="w-full  mt-5 lg:mt-0  flex md:flex-col justify-center mb-5">
                <img
                    className="h-[200px] lg:max-h-[300px] w-[90%] max-w-[568px] object-contain"
                    src={bannerData.image}
                    alt="Banner"
                />
            </div>
        </div>
    );
};

export default Banner;
