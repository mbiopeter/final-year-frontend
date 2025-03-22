import React from 'react';
import img from '../../../assets/images/story.png';


import abaut1 from '../../../assets/images/abaut1.png';
import abaut2 from '../../../assets/images/abaut2.png';
import abaut3 from '../../../assets/images/abaut3.png';
import abaut4 from '../../../assets/images/abaut3.png';

import user1 from '../../../assets/images/user1.png';
import user2 from '../../../assets/images/user2.png';
import user3 from '../../../assets/images/user3.png';

import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { services } from '../../../model/services/services';
import Service from '../../components/service/Service';


const data = [
    {
        img:abaut1,
        title:'10.5k',
        desc:'saller active our site',
        active:false,
    },
    {
        img:abaut2,
        title:'33k',
        desc:'monthly product sale',
        active:true,
    },
    {
        img:abaut3,
        title:'45.5k',
        desc:'ccustomer active in our site',
        active:false,
    },
    {
        img:abaut4,
        title:'25k',
        desc:'Annual gross asale in our site',
        active:false,
    },
]
const usersData = [
    {
        img:user1,
        name:'Tom Cruise',
        position:'Founder & Chairman',
    },
    {
        img:user2,
        name:'Emma Watson',
        position:'Managing Director',
    },
    {
        img:user3,
        name:'Will Smith',
        position:'Product Designer',
    },
]


const Card = ({values, key}) => {
    return(
        <div key={key} className={`${values.active && 'bg-[#DB4444]'} cursor-pointer border-[1px] border-[#ddd] rounded-sm flex items-center justify-center flex-col gap-1 w-[200px] h-[190px]`}>
            <div className='w-[60px] h-[60px] rounded-full flex items-center mb-3 justify-center bg-[#949097]'>
                <div className='h-[48px] w-[48px] flex items-center rounded-full justify-center bg-[#000000]'>
                    <img src={values.img} className='h-[20px]'/>
                </div>
            </div>
            <span className={`${values.active && 'text-[#FAFAFA]'} font-poppins text-[15px] font-[600] leading-[28px] text-[#000000]`}>{values.title}</span>
            <span className={`${values.active && 'text-[#FAFAFA]'}  font-poppins text-[13px] font-[400] leading-[21px] text-[#000000]`}>{values.desc}</span>
        </div>
    )
}

const Users = ({values, key}) => {
    return(    
        <div key={key} className='flex flex-col w-[300px] gap-4 rounded-sm'>
            <div className='bg-[#F5F5F5] flex items-center justify-center'>
                <img src={values.img} className='h-full' />
            </div>
            <div className='flex flex-col gap-2'>
                <span className='text-[23px] font-[500] text-[#000000]'>{values.name}</span>
                <span className='text-[16px] font-[400] text-[#000000]'>{values.position}</span>
                <div className='flex flex-row gap-2 items-center'>
                    <XIcon className='text-[#000000]' fontSize='small' />
                    <InstagramIcon className='text-[#000000]' fontSize='small' />
                    <LinkedInIcon className='text-[#000000]' fontSize='small' />
                </div>
            </div>
        </div>
    )
}


const Abaut = () => {
    return (
        <div className="w-full flex flex-col pb-10 px-[50px] lg:px-[150px]">
            <div className="flex justify-start items-center py-10">
                <div className="flex flex-row gap-1">
                    <span className="text-[14px] text-[#696868] font-[400]">Home</span>/
                    <span className="text-[14px] text-[#000000] font-[400]">Cart</span>
                </div>
            </div>

            <div className='w-full flex flex-col lg:flex-row justify-between'>
                <div className='w-[100%] lg:w-[48%] flex flex-col gap-5'>
                    <span className='text-[30px] text-[#000000] font-[500]'>Our Story</span>
                    <span className='text-[16px] text-[#000000] font-[400]'>
                        Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.<br/><br/>
                        Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging from consumer.
                    </span>
                </div>

                <div className='w-[100%] lg:w-[48%] flex items-center justify-center bg-[##EB7EA8] rounded-lg'>
                    <img src={img} className='object-cover w-full' />
                </div>
            </div>

            <div className='w-full flex flex-row gap-10 flex-wrap items-center justify-center my-20'>
                {data.map((item, index) => (
                    <Card values={item} key={index} />
                ))}
            </div>

            <div className='w-full flex flex-row gap-15 flex-wrap items-center justify-center my-20'>
                {usersData.map((item, index) => (
                    <Users values={item} key={index} />
                ))}
            </div>

            <div className='flex flex-col lg:flex-row gap-15 items-center mt-10 justify-center'>
                {services.map((item,index) => (
                    <Service values={item} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default Abaut;