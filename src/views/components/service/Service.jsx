import React from 'react';

const Service = ({values}) => {
    return (
        <div key={values.id} className='w-[250px] mb-20 flex flex-col gap-2 justify-center items-center'>
            <div className='w-[60px] h-[60px] rounded-full flex items-center mb-3 justify-center bg-[#2F2E30]'>
                <div className='h-[48px] w-[48px] flex items-center rounded-full justify-center bg-[#000000]'>
                    <img src={values.img} className='h-[30px]'/>
                </div>
            </div>
            <span className='font-poppins text-[18px] font-[600]  text-[#000000]'>{values.title}</span>
            <span className='font-poppins text-[14px] font-[400]  text-[#000000]'>{values.desc}</span>
        </div>
    )
}

export default Service