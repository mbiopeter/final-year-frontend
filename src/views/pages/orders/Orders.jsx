import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PaymentIcon from "@mui/icons-material/Payment";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";

const shippingOrderSteps = [
	{
		label: "Estimated delivery tomorrow",
		description: "Tomorrow 24 November 2023",
		StepIconComponent: <HomeIcon />,
	},
	{
		label: "Products ready for delivery",
		description: "24 November 2023 between 15:00 - 17:00 ",
		details: "View details",
		StepIconComponent: <LocalShippingIcon />,
		StepIconDetails: <VisibilityIcon />,
	},
	{
		label: "Products in the courier's warehouse",
		description: "23 November 2023 at 15:15 ",
		StepIconComponent: <LocalShippingIcon />,
	},
	{
		label: "Products delivered to the courier - DHL",
		description: "22 November 2023 at 12:27 ",
		StepIconComponent: <LocalGroceryStoreIcon />,
	},
	{
		label: "Payment accepted",
		description: "19 November 2023 at 10:47 ",
		StepIconComponent: <PaymentIcon />,
	},
	{
		label: "Order placed",
		description: "19 November 2023 at 10:45 ",
		details: "View details",
		StepIconDetails: <VisibilityIcon />,
		StepIconComponent: <Inventory2Icon />,
	},
];

const billingInfo = [
	{
		label: "Billing information",
		details: "Individual: Bonnie Green - +1 234 567 890",
		address: "San Francisco, California, United States, 3454, Scott Street",
	},
	{
		label: "Delivery information",
		details: "Individual: Bonnie Green - +1 234 567 890",
		address: "San Francisco, California, United States, 3454, Scott Street",
	},
	{
		label: "Payment method",
		description: "Online with credit card",
	},
	{
		label: "The amount to be paid",
		description: "$7,191.00",
	},
];

const Orders = () => {
	return (
		<div className="w-full flex  flex-col py-[20px] px-[50px] lg:px-[130px]">
			<div className="flex flex-row my-6   gap-1.5">
				<Link to="/">
					<span className="font-semibold text-gray-500">Home</span>
				</Link>
				/
				<Link to="/orders">
					<span className="font-semibold">My Orders</span>
				</Link>
			</div>
			<div className=" mx-4 lg:mx-10 ">
				<div className="flex flex-col mb-5">
					<h1 className="font-semibold text-lg">
						Track the delivery for order,{" "}
						<span className="text-red-500 font semibold italic">
							#957684673
						</span>
					</h1>
				</div>

				<div className="flex flex-col w-full gap-10 lg:gap-20 lg:flex-row justify-between mb-7">
					{/* Stepper (Left Section) */}
					<div className="shadow-md rounded-lg p-3 lg:p-5 lg:w-2/4 h-auto ">
						<Box sx={{ width: "100%" }}>
							<Stepper orientation="vertical">
								{shippingOrderSteps.map((step, index) => (
									<Step key={index}>
										<StepLabel
											icon={step.StepIconComponent}
											className="font-bold">
											<Typography>{step.label}</Typography>
										</StepLabel>
										{step.description && (
											<Typography className="text-gray-600 px-7">
												{step.description}
											</Typography>
										)}
										{step.details && (
											<button className="bg-gray-200 flex justify-center ml-6 p-2.5 rounded-md">
												<Typography className="text-gray-600 ml-6 cursor-pointer">
													{step.StepIconDetails} {step.details}
												</Typography>
											</button>
										)}
									</Step>
								))}
							</Stepper>
						</Box>
					</div>

					{/* Right section- Billing Information */}
					<div className="shadow-md lg:w-2/4 lg:m-2 gap-10 p-2 lg:p-6 h-auto">
						{billingInfo.map((info, index) => (
							<div
								key={index}
								className="bg-gray-100 shadow-md mb-4 lg:mb-10 p-4 lg:p-7">
								<h1 className="font-bold pb-2">{info.label}</h1>

								{info.description && (
									<p className="font-semibold text-gray-600">
										{info.description}
									</p>
								)}
								{info.details && (
									<p className="text-gray-600">{info.details}</p>
								)}
								{info.address && (
									<p className="text-gray-600">{info.address}</p>
								)}
							</div>
						))}
					</div>
				</div>
				<div className="w-40 cursor-pointer bg-red-500 hover:bg-red-600  flex flex-row-reverse justify-center rounded-md ">
					<button className=" p-2 cursor-pointer">Cancel Order</button>
				</div>
			</div>
		</div>
	);
};

export default Orders;
