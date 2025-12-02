import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

type RequestType = "orphan" | "family" | "volunteer";

const RequestsType = () => {
	const [type, setType] = useState<RequestType>("orphan");

	const validationSchema = Yup.object({
		fullName: Yup.string().required("Required"),
		phone: Yup.string().required("Required"),
		email: Yup.string().email("Invalid email"),
	});

	return (
		<div className="min-h-screen bg-[#F3F2E7] pt-10 pb-20">
			<div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
				<div className="relative p-8 rounded-lg bg-[#FBFAF2] shadow-md">
					<div className="absolute -left-6 -top-6 w-16 h-16 bg-[#E3E2CD] rounded-full"></div>
					<div className="absolute -left-2 -top-2 w-13 h-13 bg-[#00b6b7]/50 rounded-full"></div>

					<h1 className="text-xl md:text-2xl font-bold text-black mb-3">
						Make a Request. Change a Life.
					</h1>
					<p className="text-sm md:text-base text-black max-w-xl font-light leading-6">
						Select the type of request you want to make and fill in the required
						information.
					</p>
				</div>
			</div>

			<div className="max-w-5xl mx-auto mt-10 px-4 sm:px-8 md:px-12 lg:px-20">
				<label className="block mb-2 text-black font-medium">
					Choose Request Type
				</label>

				<select
					value={type}
					onChange={(e) => setType(e.target.value as RequestType)}
					className="w-full md:w-80 bg-white border border-gray-300 text-black px-4 py-2 rounded-md shadow-sm focus:outline-none">
					<option value="orphan">Help an Orphan</option>
					<option value="family">Help a Family or Poor People</option>
					<option value="volunteer">Become a Volunteer</option>
				</select>
			</div>

			<div className="max-w-5xl mx-auto mt-10 px-4 sm:px-8 md:px-12 lg:px-20">
				<Formik
					initialValues={{
						fullName: "",
						phone: "",
						email: "",
						childName: "",
						orphanHelpType: "",
						orphanNotes: "",
						familyAddress: "",
						familyMembers: "",
						familyHelpType: "",
						familyNotes: "",
						availability: "",
						skills: "",
						reason: "",
					}}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						console.log("FORM SUBMITTED:", values);
						alert("Request Submitted!");
					}}>
					{({ errors, touched }) => (
						<Form className="bg-white p-8 rounded-lg shadow-md space-y-6">
							<div>
								<label className="block text-black font-medium mb-1">
									Full Name
								</label>
								<Field
									name="fullName"
									type="text"
									className="w-full bg-[#FBFAF2] border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
									placeholder="Enter your full name"
								/>
								{touched.fullName && errors.fullName && (
									<p className="text-red-500 text-sm">{errors.fullName}</p>
								)}
							</div>

							<div>
								<label className="block text-black font-medium mb-1">
									Phone Number
								</label>
								<Field
									name="phone"
									type="tel"
									className="w-full bg-[#FBFAF2] border border-gray-400 px-4 py-2 rounded-md focus:outline-none"
									placeholder="Enter your phone number"
								/>
								{touched.phone && errors.phone && (
									<p className="text-red-500 text-sm">{errors.phone}</p>
								)}
							</div>

							<div>
								<label className="block text-black font-medium mb-1">
									Email (optional)
								</label>
								<Field
									name="email"
									type="email"
									className="w-full bg-[#FBFAF2] border border-gray-400 px-4 py-2 rounded-md focus:outline-none"
									placeholder="Enter your email"
								/>
								{touched.email && errors.email && (
									<p className="text-red-500 text-sm">{errors.email}</p>
								)}
							</div>

							{type === "orphan" && (
								<>
									<h2 className="text-lg font-semibold text-black">
										Orphan Details
									</h2>

									<div>
										<label className="block text-black font-medium mb-1">
											Child’s Name (if known)
										</label>
										<Field
											name="childName"
											type="text"
											className="w-full bg-[#FBFAF2] border border-gray-400 px-4 py-2 rounded-md"
											placeholder="Optional"
										/>
									</div>

									<div>
										<label className="block text-black font-medium mb-1">
											Type of Help Needed
										</label>
										<Field
											as="select"
											name="orphanHelpType"
											className="w-full bg-[#FBFAF2] border border-gray-400 px-4 py-2 rounded-md focus:outline-none">
											<option value="">Select help type</option>
											<option>Monthly Sponsorship</option>
											<option>Food & Clothing</option>
											<option>Medical Support</option>
											<option>Education Support</option>
										</Field>
									</div>

									<div>
										<label className="block text-black font-medium mb-1">
											Additional Notes
										</label>
										<Field
											as="textarea"
											name="orphanNotes"
											className="w-full bg-[#FBFAF2] border border-gray-400 px-4 py-2 rounded-md h-24"
											placeholder="Describe the situation..."
										/>
									</div>
								</>
							)}

							{type === "family" && (
								<>
									<h2 className="text-lg font-semibold text-black">
										Family Support Details
									</h2>

									<div>
										<label className="block text-black font-medium mb-1">
											Family Address
										</label>
										<Field
											name="familyAddress"
											type="text"
											className="w-full bg-[#FBFAF2] border-gray-400 px-4 py-2 rounded-md"
											placeholder="Enter address"
										/>
									</div>

									<div>
										<label className="block text-black font-medium mb-1">
											Number of Family Members
										</label>
										<Field
											name="familyMembers"
											type="number"
											className="w-full bg-[#FBFAF2] border-gray-400 px-4 py-2 rounded-md"
											placeholder="e.g., 5"
										/>
									</div>

									<div>
										<label className="block text-black font-medium mb-1">
											Type of Assistance
										</label>
										<Field
											as="select"
											name="familyHelpType"
											className="w-full bg-[#FBFAF2] border-gray-400 px-4 py-2 rounded-md">
											<option value="">Select assistance</option>
											<option>Food Packages</option>
											<option>Winter Essentials</option>
											<option>Financial Aid</option>
											<option>Home Repairs</option>
										</Field>
									</div>

									<div>
										<label className="block text-black font-medium mb-1">
											Additional Notes
										</label>
										<Field
											as="textarea"
											name="familyNotes"
											className="w-full bg-[#FBFAF2] border-gray-400 px-4 py-2 rounded-md h-24"
											placeholder="Describe the situation..."
										/>
									</div>
								</>
							)}

							{type === "volunteer" && (
								<>
									<h2 className="text-lg font-semibold text-black">
										Volunteer Information
									</h2>

									<div>
										<label className="block text-black font-medium mb-1">
											Availability
										</label>
										<Field
											as="select"
											name="availability"
											className="w-full bg-[#FBFAF2] border-gray-400 px-4 py-2 rounded-md">
											<option value="">Select availability</option>
											<option>Weekdays</option>
											<option>Weekends</option>
											<option>Flexible</option>
										</Field>
									</div>

									<div>
										<label className="block text-black font-medium mb-1">
											Skills (optional)
										</label>
										<Field
											name="skills"
											type="text"
											className="w-full bg-[#FBFAF2] border-gray-400 px-4 py-2 rounded-md"
											placeholder="e.g., teaching, organizing events, logistics"
										/>
									</div>

									<div>
										<label className="block text-black font-medium mb-1">
											Why do you want to volunteer?
										</label>
										<Field
											as="textarea"
											name="reason"
											className="w-full bg-[#FBFAF2] border-gray-400 px-4 py-2 rounded-md h-24"
											placeholder="Tell us a bit about yourself..."
										/>
									</div>
								</>
							)}

							<button
								type="submit"
								className="w-full md:w-auto bg-[#00CFD0] text-black font-medium px-6 py-3 rounded-md hover:bg-[#00b6b7] transition">
								Submit Request
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default RequestsType;
