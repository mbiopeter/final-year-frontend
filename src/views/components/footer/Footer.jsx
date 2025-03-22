import React from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
    return (
        <div className=' w-full flex-col gap-10 py-[15px]  items-start px-[50px] lg:px-[150px] justify-between bg-black'>
            <div className='flex flex-col md:flex-row flex-wrap gap-10'>
                <div className='flex flex-col'>
                    <span className='font-[700] text-[20px] text-[#FAFAFA]'>Exclusive</span>
                    <span className='font-[500] text-[16px] pt-[10px] text-[#FAFAFA]'>Subscribe</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>Get 10% off your first order</span>
                    <div className='flex mt-2 items-center justify-between border border-[#ddd] rounded-[4px] px-4 py-2 shadow-sm'>
                        <input 
                            type='text' 
                            placeholder='Enter your email' 
                            className='border-none outline-none text-sm text-[#FAFAFA] w-36' 
                        />
                        <SendOutlinedIcon className='text-[#ddd]' />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='font-[700] text-[20px] text-[#FAFAFA]'>Support</span>
                    <span className='font-[400] text-[14px] pt-[10px] text-[#FAFAFA]'>111 Bijoy sarani, Dhaka,</span>
                    <span className='font-[400] text-[14px] text-[#FAFAFA]'>DH 1515, Bangladesh.</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>exclusive@gmail.com</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>+88015-88888-9999</span>
                </div>
                <div className='flex flex-col'>
                    <span className='font-[700] text-[20px] text-[#FAFAFA]'>Account</span>
                    <span className='font-[400] text-[14px] pt-[10px] text-[#FAFAFA]'>My Account</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>Login / Register</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>Cart</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>Wishlist</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>Shop</span>
                </div>
                <div className='flex flex-col'>
                    <span className='font-[700] text-[20px] text-[#FAFAFA]'>Account</span>
                    <span className='font-[400] text-[14px] pt-[10px] text-[#FAFAFA]'>My Account</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>Login / Register</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>Cart</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>Wishlist</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>Shop</span>
                </div>
                <div className='flex flex-col'>
                    <span className='font-[700] text-[20px] text-[#FAFAFA]'>Quick Link</span>
                    <span className='font-[400] text-[14px] pt-[10px] text-[#FAFAFA]'>Privacy Policy</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>Terms Of Use</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>FAQ</span>
                    <span className='font-[400] text-[14px] pt-[5px] text-[#FAFAFA]'>Contact</span>
                </div>
                <div className='flex flex-col'>
                    <span className='font-[700] text-[20px] text-[#FAFAFA]'>Social Media</span>
                    <span className='font-[400] text-[12px] pt-[10px] text-[#FAFAFA]'>Save $3 with App New User Only</span>
                    <div className='flex flex-row mt-[10px] gap-[24px]'>
                        <FacebookSharpIcon fontSize='medium' className='text-[#FAFAFA] cursor-pointer' />
                        <TwitterIcon fontSize='medium' className='text-[#FAFAFA] cursor-pointer' />
                        <InstagramIcon fontSize='medium' className='text-[#FAFAFA] cursor-pointer' />
                        <LinkedInIcon fontSize='medium' className='text-[#FAFAFA] cursor-pointer' />
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-center mt-10 items-center'>
                <span className='font-[400] text-[14px] text-[#FFFFFF] flex gap-1 items-center'> <CopyrightIcon fontSize='20' className='text-[#FAFAFA] cursor-pointer' /> Copyright Rimel 2022. All right reserved</span>
            </div>
        </div>
    )
}

export default Footer
