import React from "react";

const Contact = () => {
	return (
		<div className="w-full flex  flex-col py-[20px] px-[50px] lg:px-[130px]">
			<div className="flex flex-row my-6   gap-1.5">
				<span className="font-semibold text-gray-500">Home</span>/
				<span className="font-semibold">Contact</span>
			</div>
			<div className="w-full flex flex-col gap-10 lg:gap-0 lg:flex-row  justify-between mb-10  m-auto ">
				<div className="contacts shadow-sm p-5 w-full lg:w-[45%]">
					<div className="call">
						<div className="header">
							<p className="flex">
								<i className="pi pi-phone text-white bg-red-500 m-2 rounded-4xl p-3"></i>
								<h1 className="m-2 font-bold">Call To Us</h1>
							</p>
							<p className="m-2">We are available 24/7, 7 days a week</p>
							<p className="m-2">Phone: +1 234 567 890</p>
						</div>
					</div>
					<hr className="text-gray-400 font-semibold my-5" />
					<div className="email">
						<div className="header">
							<p className="flex">
								<i className="pi pi-envelope text-white bg-red-500 m-2 rounded-3xl p-3"></i>
								<h1 className="m-2 font-bold">Write To Us</h1>
							</p>
							<p className="m-2">
								Fill out the form and we will contact you in 24 hours.
							</p>
							<p className="m-2">Email: customer@exclusive.com </p>
							<p className="m-2">Email: support@exclusive.com</p>
						</div>
					</div>
				</div>

				<div className=" textbox shadow-sm p-5 flex-row w-full lg:w-[45%] ">
					<div className="details flex flex-col gap-2 sm:flex-row justify-between">
						<input
							type="text"
							className="bg-gray-200 w-full outline-0 p-4 rounded-md "
							placeholder="Your Name*"
							required
						/>
						<input
							type="email"
							className="bg-gray-200 w-full outline-0 p-4 rounded-md "
							placeholder="Your Email*"
							required
						/>
						<input
							type="text"
							className="bg-gray-200 w-full outline-0 p-4 rounded-md "
							placeholder="Your Phone number*"
							required
						/>
					</div>
					<div className="textbox my-4">
						<textarea
							className=" w-full  bg-gray-200 outline-0 p-2 rounded-md"
							placeholder="Your message"
							cols="100"
							rows="10"></textarea>
					</div>
					<div className="flex flex-row-reverse">
						<div className="button flex justify-center  w-50 bg-red-500 p-2 rounded-md">
							<button className="flex   text-white font-semibold">
								Send Message
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
