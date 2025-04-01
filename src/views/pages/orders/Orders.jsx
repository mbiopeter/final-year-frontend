import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AssignmentReturnedOutlinedIcon from '@mui/icons-material/AssignmentReturnedOutlined';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PaymentIcon from "@mui/icons-material/Payment";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";
import { orderUrl } from "../../../const";
import axios from "axios";
import { getUserDetails, getUserId } from "../../../model/auth/token";
import Error404 from "../error/Error404";
import Loader from "../../components/loader/Loader";


const Orders = () => {
    const userId = getUserId();
    const [order, setOrder] = useState({});
	const [loading, setLoading] = useState(false);
	const {orderId} = useParams();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
				setLoading(true);
                const response = await axios.get(`${orderUrl}/one`, { params: { userId,orderId } });
                setOrder(response.data);
            } catch (error) {
                console.log(error);
            }finally{
				setTimeout(()=> {
					setLoading(false);
				},1000)
			}
        };
        fetchOrder();
		
    }, []);

	const [billingInfo, setBillingInfo] = useState({
		firstName: '',
		streetAdress: '',
		apartment: '',
		town: '',
		phoneNumber: '',
		email: '',
	});


	useEffect(() => {
		const handleFetch = async () => {
			try{
				setLoading(true);
				if(userId){
					const userDetails = await getUserDetails(userId);
					setBillingInfo({
						firstName: userDetails?.firstName || "",
						streetAdress: userDetails?.streetAddress || "",
						apartment: userDetails?.apartment || "",
						town: userDetails?.town || "",
						phoneNumber: userDetails?.phoneNumber || "",
						email: userDetails?.email || "",
					});
				}
			}catch(error){
				return
			}finally{
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			}
		}
		handleFetch();
	},[userId]);
	console.log(billingInfo);


    if (!order) return <Error404 />;

    const orderSteps = [
        { label: "Order placed", key: "pending", icon: <Inventory2Icon /> },
        { label: "Payment status", key: "payment", icon: <PaymentIcon /> },
        { label: "Processed", key: "processed", icon: <DeveloperBoardOutlinedIcon /> },
        { label: "Shipped", key: "shipped", icon: <LocalShippingIcon /> },
        { label: "Delivered", key: "delivered", icon: <LocalGroceryStoreIcon /> },
        { label: "Waiting to be picked", key: "waitingDelivery", icon: <HourglassTopOutlinedIcon /> },
        { label: "Cancelled", key: "cancelled", icon: <CancelOutlinedIcon /> },
        { label: "Returned", key: "returned", icon: <AssignmentReturnedOutlinedIcon /> },
    ];

    return (
		loading ? <Loader />:
			<div className="w-full flex flex-col py-5 px-10 lg:px-32">
				<div className="flex flex-row my-6 gap-1.5">
					<Link to="/">
						<span className="font-semibold text-gray-500">Home</span>
					</Link>
					/
					<Link to="/orders">
						<span className="font-semibold">My Orders</span>
					</Link>
				</div>

				<div className="mx-4 lg:mx-10">
					<h1 className="font-semibold text-lg">
						Track the delivery for order <span className="text-red-500 italic">#{order.id}</span>
					</h1>

					<div className="flex flex-col w-full gap-10 lg:gap-20 lg:flex-row justify-between mb-7">
						<div className="shadow-md rounded-lg p-5 lg:w-2/4 h-auto">
							<Box sx={{ width: "100%" }}>
								<Stepper orientation="vertical">
									{orderSteps.map((step, index) => {
										const stepDate = step.key === "pending" ? order.createdAt : order[step.key];
										const isCompleted = stepDate !== null || step.key === "pending";
										const isCancelledOrReturned = step.key === "cancelled" || step.key === "returned";
										const stepColor = step.key === "pending" || (!isCancelledOrReturned && isCompleted) ? "text-green-500" : isCancelledOrReturned && isCompleted ? "text-red-500" : "text-gray-400";

										return (
											<Step key={index}>
												<StepLabel icon={step.icon} className={stepColor}>
													<Typography className={stepColor}>{step.label}</Typography>
													{isCompleted && (
														<Typography className={stepColor + " text-sm"}>
															{stepDate}
														</Typography>
													)}
												</StepLabel>
											</Step>
										);
									})}
								</Stepper>
							</Box>
						</div>

						<div className="shadow-md lg:w-2/4 lg:m-2 gap-10 p-2 lg:p-6 h-auto">
								<div className="bg-gray-100 shadow-md mb-4 lg:mb-10 p-4 lg:p-7">
									<h1 className="font-bold pb-2">Billing Information</h1>
									<p className="font-semibold text-gray-600">{billingInfo.firstName}, {billingInfo.apartment}, {billingInfo.streetAdress},<br /> {billingInfo.phoneNumber} </p>

								</div>
							<button className="py-2 text-white bg-red-500 cursor-pointer rounded-sm w-full font-[700]">CANCEL ORDER</button>
						</div>
					</div>
				</div>
			</div>
    );
};

export default Orders;
