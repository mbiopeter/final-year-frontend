import React, { useState, useEffect } from "react";

const Account = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	console.log("Awaiting stuff: ");

	useEffect(() => {
		setFirstName(firstName);
		setLastName(lastName);
		setEmail(email);
		setAddress(address);
		setPassword(password);
		setConfirmPassword(confirmPassword);
		console.log(
			firstName + lastName + email + address + password + confirmPassword
		);
	}, []);

	function submitChanges(e) {
		e.preventDefault();
		console.log(
			"Submits: ",
			firstName + lastName + email + address + password + confirmPassword
		);
	}

	return (
		<div className="w-full flex h-auto flex-col py-[20px] px-[50px] lg:px-[130px]">
			<div className="flex flex-row my-4 lg:m-12 justify-between gap-1.5">
				<div>
					<span className="font-semibold text-gray-500">Home</span>/{"  "}
					<span className="font-semibold">My Account</span>
				</div>
				<div>
					Welcome,{" "}
					<span className="text-red-500 lg:mr-[48px]  font-semibold">
						Emmanuel
					</span>
				</div>
			</div>
			<div className="container flex flex-col gap-10 lg:gap-0 lg:flex-row justify-between h-auto mb-10 ">
				<div className="h-full w-full lg:w-[35%] px-3 py-6 shadow-sm">
					<div>
						<h1 className="font-semibold">Manage My Account</h1>
						<div className="mx-6 my-2 text-gray-500">
							<p className="text-red-500">My Profile</p>
							<p>Address Book</p>
							<p>My Payment Options</p>
						</div>
					</div>
					<div>
						<h1 className="font-semibold">My Orders</h1>
						<div className="mx-6 my-2 text-gray-500">
							<p>My Returns</p>
							<p>My Cancellations</p>
						</div>
					</div>
					<div>
						<h1 className="font-semibold">My Wishlist</h1>
					</div>
				</div>
				<div className="w-full lg:w-[60%] h-full rounded-md px-3 py-6 shadow-sm">
					<h1 className="mb-5 text-red-500 font-semibold">Edit Your Profile</h1>

					<div className="flex w-full flex-wrap gap-4">
						{/* First Name */}
						<div className="flex w-full lg:w-[48%] flex-col">
							<label htmlFor="fname" className="font-semibold">
								First Name
							</label>
							<input
								type="text"
								id="fname"
								value={firstName}
								className="bg-gray-200 p-3 rounded-md"
								placeholder="Enter first name"
								required
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>

						{/* Last Name */}
						<div className="flex w-full lg:w-[48%] flex-col">
							<label htmlFor="lname" className="font-semibold">
								Last Name
							</label>
							<input
								type="text"
								id="lname"
								value={lastName}
								className="bg-gray-200 p-3 rounded-md"
								placeholder="Enter last name"
								required
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>

						{/* Email */}
						<div className="flex w-full lg:w-[48%] flex-col ">
							<label htmlFor="email" className="font-semibold">
								Email
							</label>
							<input
								type="email"
								id="email"
								value={email}
								className="bg-gray-200 p-3 rounded-md"
								placeholder="Enter email"
								required
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						{/* Address */}
						<div className="flex w-full lg:w-[48%] flex-col ">
							<label htmlFor="address" className="font-semibold">
								Address
							</label>
							<input
								type="text"
								id="address"
								value={address}
								className="bg-gray-200 p-3 rounded-md"
								placeholder="Enter address"
								required
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
					</div>

					{/* Password Change Section */}
					<div className="mt-4">
						<label className="font-semibold">Password Changes</label>
						<input
							type="password"
							value={password}
							className="bg-gray-200 p-3 w-full rounded-md mt-2"
							placeholder="Current Password"
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						<input
							type="password"
							className="bg-gray-200 p-3 w-full rounded-md mt-2"
							placeholder="New Password"
							required
						/>
						<input
							type="password"
							value={confirmPassword}
							className="bg-gray-200 p-3 w-full rounded-md mt-2"
							placeholder="Confirm New Password"
							required
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>

					{/* Buttons */}
					<div className="flex justify-end gap-10 mt-6">
						<button className="text-gray-700 bg-gray-200 p-3 rounded-md px-6">
							Cancel
						</button>
						<button
							onClick={submitChanges}
							className="bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-md">
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
