import React, { useEffect, useState } from 'react'
import SubHeading from '../../components/subheading/Subheading'
import { orderUrl } from '../../../const';
import { getUserId } from '../../../model/auth/token';
import Loader from '../../components/loader/Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllOrders = () => {
    const userId = getUserId();
    const [orders, setOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetchorders = async () => {
        try{
            setLoading(true);
            const response = await axios.get(`${orderUrl}/all`, {params: {userId}});
            console.log(response.data)
            setOrders(response.data);
        }catch(error){
            return;
        }finally{
            setTimeout(() => {
                setLoading(false);
            },1000)
        }
    }

    const handleFetchCancelledOrders = async () => {
        try{
            setLoading(true);
            const response = await axios.get(`${orderUrl}/cancelled`, {params: {userId}});
            setCancelledOrders(response.data);
        }catch(error){
            return;
        }finally{
            setTimeout(() => {
                setLoading(false);
            },1000)
        }
    }

    useEffect(() => {
        handleFetchorders();
        handleFetchCancelledOrders();
    },[userId]);

    return (
        loading ? <Loader />:
            <div className='w-full flex flex-col gap-5 py-[20px] px-[50px] lg:px-[150px]'>
                <SubHeading heading="All orders" title='My Orders' btn={false}/>
                <div className='w-full flex flex-col gap-10 lg:flex-row justify-between'>
                    <div className="flex flex-col gap-5 overflow-auto w-full lg:w-[47%] h-[55vh]  shadow-xl p-5">
                        <span className='text-[14px] font-bold uppercase '>Active orders</span>
                        <table className="min-w-full text-nowrap">
                            <thead className="border-b-[1px] border-b-[#e2dfdf] sticky top-0">
                                <tr className='py-5'>
                                    <td>Order Id</td>
                                    <td>Order Date</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 && orders.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`${index % 2 === 1 && 'bg-[#e7e5e5]'} transition-opacity duration-300 border-b-[1px] border-b-[#e2dfdf]  text-[#424242]`}>
                                        <td className='px-5 py-3'>{item.id}</td>
                                        <td className=' min-w-[100px]'>{item.createdAt}</td>
                                        <td className=' min-w-[100px]'>
                                            <Link to={`/orders/${item.id}`}>
                                                <button className='text-white text-[13px] font-[500] py-1 bg-red-500 rounded-sm cursor-pointer px-5 mx-5'>View</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td className='py-2 flex' colSpan={5}>No active order</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className=" flex flex-col gap-5 overflow-auto w-full lg:w-[47%] h-[55vh] shadow-xl p-5">
                        <span className='text-[14px] font-bold uppercase '>Cancelled orders</span>
                        <table className="min-w-full text-nowrap">
                            <thead className="border-b-[1px] border-b-[#e2dfdf] sticky top-0">
                                <tr className='py-5'>
                                    <td>Order Id</td>
                                    <td className='px-10 py-3'>Cancelled Date</td>
                                </tr>
                            </thead>
                            <tbody>
                                {cancelledOrders.length > 0 && cancelledOrders.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`${index % 2 === 1 && 'bg-[#e7e5e5]'} transition-opacity duration-300 border-b-[1px] border-b-[#e2dfdf]  text-[#424242]`}>
                                        <td className='px-5 py-3'>{item.id}</td>
                                        <td className='px-10 py-3'>{item.cancelledAt}</td>
                                    </tr>
                                ))}
                                {cancelledOrders.length === 0 && (
                                    <tr>
                                        <td className='py-2 flex' colSpan={5}>No cancelled order</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    )
}

export default AllOrders
