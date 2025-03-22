import React, { useEffect, useState } from "react";
import img from "../../../assets/images/slider1.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { cartUrl } from "../../../const";

const Cart = ({ items, setItems, reload, setReload }) => {
	const [total, setTotal] = useState(0);
	const [shipping, setShipping] = useState(0);

	const location = useLocation();
	const firstSegment = location.pathname.split("/").filter(Boolean)[0]; 
		useEffect(() => {
			if(firstSegment === 'cart'){
				setReload(!reload);
			}
		},[firstSegment])

	useEffect(() => {
		const totalPrice =items.length> 0 && items.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		setTotal(totalPrice);
	}, [items]);

	const handleQuantityChange = (id, quantity) => {
		const updatedItems =items.length> 0 && items.map((item) =>
			item.id === id ? { ...item, quantity: parseInt(quantity, 10) } : item
		);
		setItems(updatedItems);
	};

	const handleDeleteItem = async (itemToDelete) => {
		try{
			const updatedItems = items.map((item) =>
				item.id === itemToDelete.id ? { ...item, fadeOut: true } : item
			);
			setItems(updatedItems);

			await axios.delete(`${cartUrl}/remove`, {params:{cartId: itemToDelete.id}})
			
			setTimeout(() => {
				const newItems =items.length> 0 && items.filter((item) => item.id !== itemToDelete.id);
				setItems(newItems);
			}, 600);

			
		}catch(error){
			console.log(error);
		}
	};

	return (
		<div className="w-full flex flex-col pb-10 px-[50px] lg:px-[150px]">
			<div className="flex justify-start items-center py-10">
				<div className="flex flex-row gap-1">
					<span className="text-[14px] text-[#696868] font-[400]">Home</span>/
					<span className="text-[14px] text-[#000000] font-[400]">Cart</span>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full text-nowrap">
					<thead className="border-b-[1px] border-b-[#f5f4f4]">
						<tr>
							<td>Product</td>
							<td>Price</td>
							<td>Quantity</td>
							<td>Subtotal</td>
							<td>Action</td>
						</tr>
					</thead>
					<tbody>
						{items.length> 0 && items.map((item) => (
							<tr
								key={item.id}
								className={`transition-opacity duration-300 ${
									item.fadeOut ? "opacity-0" : "opacity-100"
								}`}>
								<td className="flex justify-start flex-row gap-5 items-center py-10 min-w-[200px]">
									<img
										src={item.img}
										className="object-cover h-[30px]"
									/>
									<span>{item.product}</span>
								</td>
								<td className=" min-w-[100px]">${item.price}</td>
								<td className=" min-w-[200px]">
									<input
										type="number"
										value={item.quantity}
										min="1"
										onChange={(e) =>
											handleQuantityChange(item.id, e.target.value)
										}
										className="w-[50px] p-1 text-center items-center rounded-md outline-none border-[1px] border-[#666464]"
									/>
								</td>
								<td className=" min-w-[200px]">
									${item.price * item.quantity}
								</td>
								<td className="flex justify-center">
									<DeleteIcon
										onClick={() => handleDeleteItem(item)}
										className="text-[#DB4444] cursor-pointer"
									/>
								</td>
							</tr>
						))}
						{items.length === 0 && (
							<tr>
								<td className="py-2 flex" colSpan={5}>
									No items in the cart
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="w-full flex flex-row justify-between mt-5">
				<Link to={"/"}>
					<button className="p-2 border-[1px] border-[#ddd] cursor-pointer rounded-sm font-[400]">
						Return to Shop
					</button>
				</Link>
				{items.length >= 1 && (
					<button className="p-2 border-[1px] border-[#ddd] cursor-pointer rounded-sm font-[400]">
						Update Cart
					</button>
				)}
			</div>

			{items.length >= 1 && (
				<div className="w-full mt-15 flex items-start gap-5 lg:gap-0 flex-col overflow-auto lg:flex-row justify-between">
					<div className="w-[100%] lg:w-[50%] flex flex-row gap-5 justify-between items-center">
						<input
							type="text"
							placeholder="Coupon Code"
							className="w-[60%] p-2 items-center rounded-sm outline-none font-[400] border-[1px] border-[#000000]"
						/>
						<button className="p-2 w-[65%] text-[#FAFAFA]  text-nowrap border-[1px] border-[#ddd]  cursor-pointer bg-[#DB4444] rounded-sm font-[400]">
							Apply Coupon
						</button>
					</div>

					<div className="w-[100%] lg:w-[45%] rounded-sm border-[1px] flex-col border-[#000000] p-5">
						<span className="text-[20px] text-[#000000] font-[500]">
							Cart Total
						</span>
						<div className="flex flex-row justify-between items-center mt-7 border-b-[#ddd] border-b-[2px] py-2">
							<span className="text-[16px] text-[#000000] font-[400]">
								Subtotal:
							</span>
							<span className="text-[16px] text-[#000000] font-[400]">
								${total}
							</span>
						</div>
						<div className="flex flex-row justify-between items-center mt-7 border-b-[#ddd] border-b-[2px] py-2">
							<span className="text-[16px] text-[#000000] font-[400]">
								Shipping:
							</span>
							<span className="text-[16px] text-[#000000] font-[400]">
								{shipping === 0 ? "Free" : shipping}
							</span>
						</div>
						<div className="flex flex-row justify-between items-center mt-7 py-2">
							<span className="text-[16px] text-[#000000] font-[400]">
								Total:
							</span>
							<span className="text-[16px] text-[#000000] font-[400]">
								${total + shipping}
							</span>
						</div>

						<Link to={"/billing"}>
							<button className="p-2 border-[1px] bg-[#DB4444] mt-5 w-full text-[#FAFAFA] border-[#ddd] cursor-pointer rounded-sm font-[400]">
								Place Order
							</button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
