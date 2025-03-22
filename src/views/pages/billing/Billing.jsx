import React from 'react';
import { TextField, Radio, Button, Checkbox } from '@mui/material';
import { CreditCard, LocalShipping, } from '@mui/icons-material';
import img from '../../../assets/images/slider1.png';


const Billing = ({billedItems}) => {
    let total = 0;
    let shipping = 0;
    billedItems.map((item) => {
        total += item.quantity * item.price;
        shipping += item.shipping;
    })

    return (
        <div className='w-full flex flex-col px-[50px] justify-start lg:px-[150px]'>
            <div className="flex justify-start items-center py-5">
                <div className="flex flex-row gap-1">
                    <span className="text-[14px] text-[#696868] font-[400]">Account</span>/
                    <span className="text-[14px] text-[#696868] font-[400]">Product</span>/
                    <span className="text-[14px] text-[#000000] font-[400]">Billing</span>
                </div>
            </div>
            <div className='w-full flex flex-col lg:flex-row py-5 justify-between gap-10'>
                <div className='w-full lg:w-[40%]'>
                    <h2 className='text-2xl font-semibold mb-5'>Billing Details</h2>
                    <form className='flex flex-col gap-4'>
                        <TextField label='First Name*' variant='outlined' fullWidth />
                        <TextField label='Company Name' variant='outlined' fullWidth />
                        <TextField label='Street Address*' variant='outlined' fullWidth />
                        <TextField label='Apartment, floor, etc. (optional)' variant='outlined' fullWidth />
                        <TextField label='Town/City*' variant='outlined' fullWidth />
                        <TextField label='Phone Number*' variant='outlined' fullWidth />
                        <TextField label='Email Address*' variant='outlined' fullWidth />
                        <div className='flex items-center'>
                            <Checkbox color='primary' />
                            <p className='text-sm'>Save this information for faster check-out next time</p>
                        </div>
                    </form>
                </div>
                
                <div className='w-full lg:w-[60%] border-[#ddd] rounded-lg p-6 bg-gray-50'>
                    <div className='space-y-4 overflow-auto'>
                        <table className="text-nowrap">
                            <thead className="border-b-[1px] border-b-[#f5f4f4]">
                                <tr>
                                    <td >Name</td>
                                    <td>Count</td>
                                    <td>Amount</td>
                                    <td>Subtotal</td>
                                </tr>
                            </thead>
                            <tbody>
                                {billedItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="flex justify-start flex-row gap-5 items-center py-5 min-w-[150px]">
                                            <img src={img} className="object-fit h-[30px] w-[30px] overflow-hidden" />
                                            <span>{item.product}</span>
                                        </td>
                                        <td className=' min-w-[100px]'>{item.quantity}</td>
                                        <td className=' min-w-[200px]'>${item.price}</td>
                                        <td className=' min-w-[200px]'>${item.quantity * item.price}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={3} className='py-5'>Subtotal</td>
                                    <td colSpan={1}>${total}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3 } className='py-5'>Shipping</td>
                                    <td colSpan={1}>{shipping > 0 ? '$'+shipping: 'Free'}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className='py-5'>Total</td>
                                    <td colSpan={1}>${shipping + total}</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* Payment Methods */}
                        <div>
                            <div className='flex items-center gap-2'>
                                <Radio name='payment' color='primary' />
                                <p>Bank</p>
                                <CreditCard className='text-blue-500' />
                            </div>
                            <div className='flex items-center gap-2'>
                                <Radio name='payment' color='primary' checked />
                                <p>Cash on delivery</p>
                                <LocalShipping className='text-blue-500' />
                            </div>
                        </div>
                        
                        <div className='flex flex-wrap lg:flex-nowrap gap-2'>
                            <TextField label='Coupon Code' variant='outlined' size='small' className='w-full lg:min-w-[65%] '/>
                            <Button variant='contained' color='error' className='w-full lg:w-auto text-nowrap'>Apply Coupon</Button>
                        </div>
                        <Button variant='contained' color='error' fullWidth className='mt-4'>
                            Place Order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Billing;
