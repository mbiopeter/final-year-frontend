import React from 'react'
import { cancelations } from '../../../model/cart/cart'
import SubHeading from '../../components/subheading/Subheading'

const Cancellation = () => {
    return (
        <div className='w-full flex flex-col gap-5 py-[20px] px-[50px] lg:px-[150px]'>
            <SubHeading heading="cancelled" title='Your Cancellations'/>
            <div className="overflow-x-auto shadow-xl p-5">
                <table className="min-w-full text-nowrap">
                    <thead className="border-b-[1px] border-b-[#e2dfdf] sticky top-0">
                        <tr className='py-5'>
                            <td>Product</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Subtotal</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cancelations.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`${index % 2 === 1 && 'bg-[#e7e5e5]'} transition-opacity duration-300 border-b-[1px] border-b-[#e2dfdf] text-[#424242]`}>
                                <td className="flex justify-start flex-row gap-5 items-center py-5 min-w-[200px]">
                                    <img src={item.img} className="object-cover h-[30px] ml-3" alt={item.product} />
                                    <span>{item.product}</span>
                                </td>
                                <td className=' min-w-[100px]'>${item.price}</td>
                                <td className=' min-w-[200px]'>{item.quantity}</td>                    
                                <td className=' min-w-[200px]'>${item.price * item.quantity}</td>
                                <td className=' min-w-[200px]'>{item.date}</td>
                            </tr>
                        ))}
                        {cancelations.length === 0 && (
                            <tr>
                                <td className='py-2 flex' colSpan={5}>No items in the cart</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cancellation
