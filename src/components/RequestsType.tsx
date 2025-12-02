import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

type RequestType = "orphan" | "family" | "volunteer";

const inputFieldClasses =
	"w-full bg-white/90 border border-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-sm focus:border-[#00b6b7] focus:ring-1 focus:ring-[#00b6b7] focus:outline-none transition duration-150 ease-in-out";
const selectFieldClasses =
	"w-full bg-white/90 border border-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-sm focus:border-[#00b6b7] focus:ring-1 focus:ring-[#00b6b7] focus:outline-none transition duration-150 ease-in-out appearance-none";
const textAreaClasses =
	"w-full bg-white/90 border border-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-sm focus:border-[#00b6b7] focus:ring-1 focus:ring-[#00b6b7] focus:outline-none h-24 transition duration-150 ease-in-out resize-none";

const RequestsType = () => {
	const [type, setType] = useState<RequestType>("orphan");

	const validationSchema = Yup.object({
		fullName: Yup.string().required("Required"),
		phone: Yup.string().required("Required"),
		email: Yup.string().email("Invalid email").optional(),
	});

	return (
		<div className="min-h-screen bg-[#F3F2E7] pt-10 pb-20">
			<div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
				<div className="relative p-8 rounded-xl bg-[#FBFAF2] shadow-xl">
					<div className="absolute -left-6 -top-6 w-16 h-16 bg-[#E3E2CD] rounded-full"></div>
					<div className="absolute -left-2 -top-2 w-13 h-13 bg-[#00b6b7]/50 rounded-full"></div>

					<h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
						Make a Request. Change a Life.
					</h1>
					<p className="text-sm md:text-base text-gray-700 max-w-xl font-light leading-6">
						Select the type of request you want to make and fill in the required
						information.
					</p>
				</div>
			</div>

			<div className="max-w-5xl mx-auto mt-10 px-4 sm:px-8 md:px-12 lg:px-20">
				<label className="block mb-2 text-gray-800 font-semibold">
					Choose Request Type
				</label>
				<div className="relative w-full md:w-80">
					<select
						value={type}
						onChange={(e) => setType(e.target.value as RequestType)}
						className={`${selectFieldClasses} pr-10`} // Added pr-10 for arrow spacing
					>
						<option value="orphan">Help an Orphan</option>
						<option value="family">Help a Family or Poor People</option>
						<option value="volunteer">Become a Volunteer</option>
					</select>
					{/* Custom Arrow for select field */}
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
						<svg
							className="fill-current h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20">
							<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
						</svg>
					</div>
				</div>
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
						<Form className="bg-white/75 flex flex-col items-center p-8 rounded-xl shadow-xl space-y-6 w-full">
							<div className="w-full">
								<label className="block text-gray-800 font-medium mb-1">
									Full Name
								</label>
								<Field
									name="fullName"
									type="text"
									className={inputFieldClasses}
									placeholder="Enter your full name"
								/>
								{touched.fullName && errors.fullName && (
									<p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
								)}
							</div>

							<div className="w-full">
								<label className="block text-gray-800 font-medium mb-1">
									Phone Number
								</label>
								<Field
									name="phone"
									type="tel"
									className={inputFieldClasses}
									placeholder="Enter your phone number"
								/>
								{touched.phone && errors.phone && (
									<p className="text-red-500 text-sm mt-1">{errors.phone}</p>
								)}
							</div>

							<div className="w-full">
								<label className="block text-gray-800 font-medium mb-1">
									Email (optional)
								</label>
								<Field
									name="email"
									type="email"
									className={inputFieldClasses}
									placeholder="Enter your email"
								/>
								{touched.email && errors.email && (
									<p className="text-red-500 text-sm mt-1">{errors.email}</p>
								)}
							</div>

							{type === "orphan" && (
								<>
									<h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 w-full mt-4">
										Orphan Details
									</h2>

									<div className="w-full">
										<label className="block text-gray-800 font-medium mb-1">
											Child’s Name (if known)
										</label>
										<Field
											name="childName"
											type="text"
											className={inputFieldClasses}
											placeholder="Optional"
										/>
									</div>

									<div className="w-full">
										<label className="block text-gray-800 font-medium mb-1">
											Type of Help Needed
										</label>
										<div className="relative">
											<Field
												as="select"
												name="orphanHelpType"
												className={selectFieldClasses}>
												<option value="">Select help type</option>
												<option>Monthly Sponsorship</option>
												<option>Food & Clothing</option>
												<option>Medical Support</option>
												<option>Education Support</option>
											</Field>
											<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
												<svg
													className="fill-current h-4 w-4"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20">
													<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
												</svg>
											</div>
										</div>
									</div>

									<div className="w-full">
										<label className="block text-gray-800 font-medium mb-1">
											Additional Notes
										</label>
										<Field
											as="textarea"
											name="orphanNotes"
											className={textAreaClasses}
											placeholder="Describe the situation..."
										/>
									</div>
								</>
							)}

							{type === "family" && (
								<>
									<h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 w-full mt-4">
										Family Support Details
									</h2>

									<div className="w-full">
										<label className="block text-gray-800 font-medium mb-1">
											Family Address
										</label>
										<Field
											name="familyAddress"
											type="text"
											className={inputFieldClasses}
											placeholder="Enter address"
										/>
									</div>

									<div className="w-full">
										<label className="block text-gray-800 font-medium mb-1">
											Number of Family Members
										</label>
										<Field
											name="familyMembers"
											type="number"
											className={inputFieldClasses}
											placeholder="e.g., 5"
										/>
									</div>

									<div className="w-full">
										<label className="block text-gray-800 font-medium mb-1">
											Type of Assistance
										</label>
										<div className="relative">
											<Field
												as="select"
												name="familyHelpType"
												className={selectFieldClasses}>
												<option value="">Select assistance</option>
												<option>Food Packages</option>
												<option>Winter Essentials</option>
												<option>Financial Aid</option>
												<option>Home Repairs</option>
											</Field>
											<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
												<svg
													className="fill-current h-4 w-4"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20">
													<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
												</svg>
											</div>
										</div>
									</div>

									<div className="w-full">
										<label className="block text-gray-800 font-medium mb-1">
											Additional Notes
										</label>
										<Field
											as="textarea"
											name="familyNotes"
											className={textAreaClasses}
											placeholder="Describe the situation..."
										/>
									</div>
								</>
							)}

							{type === "volunteer" && (
								<>
									<h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 w-full mt-4">
										Volunteer Information
									</h2>

									<div className="w-full">
										<label className="block text-gray-800 font-medium mb-1">
											Availability
										</label>
										<div className="relative">
											<Field
												as="select"
												name="availability"
												className={selectFieldClasses}>
												<option value="">Select availability</option>
												<option>Weekdays</option>
												<option>Weekends</option>
												<option>Flexible</option>
											</Field>
											<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
												<svg
													className="fill-current h-4 w-4"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20">
													<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
												</svg>
											</div>
										</div>
									</div>

									<div className="w-full">
										<label className="block text-gray-800 font-medium mb-1">
											Skills (optional)
										</label>
										<Field
											name="skills"
											type="text"
											className={inputFieldClasses}
											placeholder="e.g., teaching, organizing events, logistics"
										/>
									</div>

									<div className="w-full">
										<label className="block text-gray-800 font-medium mb-1">
											Why do you want to volunteer?
										</label>
										<Field
											as="textarea"
											name="reason"
											className={textAreaClasses}
											placeholder="Tell us a bit about yourself..."
										/>
									</div>
								</>
							)}

							<button
								type="submit"
								className="bg-[#00CFD0] whitespace-nowrap text-white py-2.5 lg:py-3.5 px-6 lg:px-8 leading-5 font-semibold rounded-lg hover:bg-[#00b6b7] transition max-w-56 w-full self-center sm:self-end shadow-md hover:shadow-lg">
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
