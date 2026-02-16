import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
	FaHandsHelping,
	FaHome,
	FaUserFriends,
	FaBox,
	FaSnowflake,
	FaMoneyBillWave,
	FaTools,
	FaRegMoneyBillAlt,
	FaAppleAlt,
	FaStethoscope,
	FaBook,
} from "react-icons/fa";

import type { CardOption } from "./ui/CardSelect";
import CardSelect from "./ui/CardSelect";

type RequestType = "orphan" | "family" | "volunteer";

// Card Options
const orphanHelpOptions: CardOption[] = [
	{
		value: "sponsorship",
		label: "Monthly Sponsorship",
		icon: FaRegMoneyBillAlt,
	},
	{ value: "essentials", label: "Food & Clothing", icon: FaAppleAlt },
	{ value: "medical", label: "Medical Support", icon: FaStethoscope },
	{ value: "education", label: "Education Support", icon: FaBook },
];

const familyHelpOptions: CardOption[] = [
	{ value: "food", label: "Food Packages", icon: FaBox },
	{ value: "winter", label: "Winter Essentials", icon: FaSnowflake },
	{ value: "financial", label: "Financial Aid", icon: FaMoneyBillWave },
	{ value: "repairs", label: "Home Repairs", icon: FaTools },
];

const availabilityOptions: CardOption[] = [
	{ value: "weekdays", label: "Weekdays", icon: FaUserFriends },
	{ value: "weekends", label: "Weekends", icon: FaHandsHelping },
	{ value: "flexible", label: "Flexible", icon: FaHome },
];

const requestOptions: {
	value: RequestType;
	title: string;
	description: string;
	Icon: React.ComponentType<{ className?: string }>;
}[] = [
	{
		value: "orphan",
		title: "Help an Orphan",
		description: "Provide direct support, education, or essentials.",
		Icon: FaHandsHelping,
	},
	{
		value: "family",
		title: "Help a Family",
		description: "Assist families facing financial hardship.",
		Icon: FaHome,
	},
	{
		value: "volunteer",
		title: "Become a Volunteer",
		description: "Offer your time, skills, and compassion.",
		Icon: FaUserFriends,
	},
];

// Input Styles
const inputFieldClasses =
	"w-full bg-white/90 border border-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-sm focus:border-[#00b6b7] focus:ring-1 focus:ring-[#00b6b7] focus:outline-none transition duration-150 ease-in-out";
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
			{/* Header */}
			<div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
				<div className="relative p-8 rounded-xl bg-[#FBFAF2] shadow-xl">
					{/* Big circle */}
					<div className="absolute -top-8 -left-8 w-20 h-20 bg-[#E3E2CD] rounded-full opacity-70"></div>

					{/* Small accent circle */}
					<div className="absolute -top-4 -left-4 w-20 h-20 bg-[#00b6b7]/30 rounded-full blur-lg"></div>

					<h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug relative z-10">
						<span className="relative inline-block">
							<span className="relative z-10">Make a Request.</span>
							<span className="absolute left-0 bottom-1 w-full h-3 bg-[#00b6b7]/20 rounded-md z-0"></span>
						</span>
						<span className="block text-[#00b6b7]">Change a Life.</span>
					</h1>

					<p className="text-sm md:text-base text-gray-700 max-w-xl font-medium leading-6 relative z-10">
						Select the type of request you want to make and fill in the required
						information.
					</p>
				</div>
			</div>

			{/* Request Type Selection */}
			<div className="max-w-5xl mx-auto mt-10 px-4 sm:px-8 md:px-12 lg:px-20">
				<label className="block mb-2 text-gray-800 font-semibold">
					Choose Request Type:
				</label>
				<div className="grid md:grid-cols-3 gap-4">
					{requestOptions.map((option) => {
						const active = type === option.value;
						const Icon = option.Icon;

						return (
							<button
								key={option.value}
								type="button"
								onClick={() => setType(option.value)}
								className={`
                  group text-left p-5 rounded-xl border transition-all duration-200
                  ${
										active
											? "bg-[#00b6b7]/10 border-2 border-[#00b6b7] scale-[1.02]"
											: "bg-white border-gray-200 hover:border-[#00b6b7]/40 hover:scale-[1.01]"
									}
                  shadow-sm hover:shadow-lg
                `}>
								<div
									className={`
                  w-10 h-10 flex items-center justify-center rounded-lg mb-3 transition
                  ${active ? "bg-[#00b6b7] text-white" : "bg-[#F3F2E7] text-[#00b6b7] group-hover:bg-[#00b6b7]/10"}
                `}>
									<Icon className="text-lg" />
								</div>
								<h3 className="font-semibold text-gray-900">{option.title}</h3>
								<p className="text-sm text-gray-600 mt-1 leading-relaxed">
									{option.description}
								</p>
							</button>
						);
					})}
				</div>
			</div>

			{/* Form */}
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
					{({ values, errors, touched, setFieldValue }) => (
						<Form className="bg-white/75 flex flex-col items-center p-8 rounded-xl shadow-xl space-y-6 w-full">
							{/* Full Name */}
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

							{/* Phone */}
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

							{/* Email */}
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

							{/* Orphan Form */}
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
										<CardSelect
											name="orphanHelpType"
											value={values.orphanHelpType}
											options={orphanHelpOptions}
											setFieldValue={setFieldValue}
										/>
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

							{/* Family Form */}
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
										<CardSelect
											name="familyHelpType"
											value={values.familyHelpType}
											options={familyHelpOptions}
											setFieldValue={setFieldValue}
										/>
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

							{/* Volunteer Form */}
							{type === "volunteer" && (
								<>
									<h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 w-full mt-4">
										Volunteer Information
									</h2>

									<div className="w-full">
										<label className="block text-gray-800 font-medium mb-1">
											Availability
										</label>
										<CardSelect
											name="availability"
											value={values.availability}
											options={availabilityOptions}
											setFieldValue={setFieldValue}
										/>
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

							{/* Submit Button */}
							<button
								type="submit"
								className="bg-[#00CFD0] text-white py-2.5 lg:py-3.5 px-6 lg:px-8 font-semibold rounded-lg hover:bg-[#00b6b7] transition max-w-56 w-full self-center sm:self-end shadow-sm hover:shadow-lg">
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
