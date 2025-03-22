import React from 'react';
import { Link } from 'react-router-dom';

const BlockCategory = ({values, key, activeCategory, setActiveCategory}) => {
    return (
        <Link to={values.link}>
            <div key={key} className={`min-w-[100px] min-h-[80px] min-md:min-w-[120px] min-md:min-h-[100px] lg:w-[175px] lg:h-[145px] rounded-[4px] border-[1px] border-[#ddd] flex items-center justify-center  ${activeCategory === values.name && 'bg-[#DB4444]'}`}>
                <div className={`flex flex-col gap-[10px] items-center cursor-pointer`} onClick={() => setActiveCategory(values.name)}>
                    <div className='h-[20px] md:h-[30px] lg:h-[40px]'>
                        <img src={values.img} className='w-[20px] md:w-[25px] lg:w-[30px]'/>
                    </div>    
                    <span className={`text-[13px] text-center lg:text-[16px] font-[400] font-poppins text-[#000000] ${activeCategory === values.name && 'text-[#FAFAFA]'}`}>{values.name}</span>
                </div>
            </div>
        </Link>
    )
}

export default BlockCategory
