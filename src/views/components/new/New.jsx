import React from 'react';
import mainImg from '../../../assets/images/new-arival-main.png';
import subMainImg from '../../../assets/images/new-arival-sub-main.png';
import minor1Img from '../../../assets/images/new-arival-minor-1.png';
import minor2Img from '../../../assets/images/new-arival-minor-2.png';

const NewArrivals = () => {
    return (
        <div className='w-full h-auto mb-50 lg:mb-0 grid grid-cols-1 md:grid-cols-2 gap-4 px-4'>
            {/* Large Image */}
            <div className='relative bg-[#000000] h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center'>
                <img src={mainImg} alt='PlayStation 5' className='h-full object-cover rounded-lg' />
                <div className='absolute bottom-4 left-4 text-white'>
                    <h2 className='text-lg font-bold'>PlayStation 5</h2>
                    <p className='text-sm'>Black and White version of the PS5 coming out on sale.</p>
                    <button className='mt-2 bg-white text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base'>Shop Now</button>
                </div>
            </div>
            {/* Right side grid */}
            <div className='grid grid-rows-2 gap-4 h-[400px] sm:h-[450px] md:h-[500px]'>
                <div className='relative bg-[#000000] flex items-center justify-center h-[190px] sm:h-[220px] md:h-[240px]'>
                    <img src={subMainImg} alt='Women Collection' className='h-full object-cover rounded-lg' />
                    <div className='absolute bottom-4 left-4 text-white'>
                        <h2 className='text-lg font-bold'>Women’s Collections</h2>
                        <p className='text-sm'>Featured woman collections that give you another vibe.</p>
                        <button className='mt-2 bg-white text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base'>Shop Now</button>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {/* Small Image 1 */}
                    <div className='relative flex items-center justify-center bg-[#000000] h-[190px] sm:h-[220px] md:h-[240px]'>
                        <img src={minor1Img} alt='Speakers' className='h-full object-cover rounded-lg' />
                        <div className='absolute bottom-4 left-4 text-white'>
                            <h2 className='text-lg font-bold'>Speakers</h2>
                            <p className='text-sm'>Amazon wireless speakers</p>
                            <button className='mt-2 bg-white text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base'>Shop Now</button>
                        </div>
                    </div>
                    {/* Small Image 2 */}
                    <div className='relative flex items-center justify-center bg-[#000000] h-[190px] sm:h-[220px] md:h-[240px]'>
                        <img src={minor2Img} alt='Perfume' className='h-full object-cover rounded-lg' />
                        <div className='absolute bottom-4 left-4 text-white'>
                            <h2 className='text-lg font-bold'>Perfume</h2>
                            <p className='text-sm'>GUCCI INTENSEOUD EDP</p>
                            <button className='mt-2 bg-white text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base'>Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;
