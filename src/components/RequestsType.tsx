import { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSubmitHelpRequest } from "../lib/queries";

type RequestType = "orphan" | "family" | "volunteer" | "other";

type RequestFormValues = {
  fullName: string;
  phone: string;
  email: string;
  childName: string;
  orphanHelpType: string;
  orphanNotes: string;
  familyAddress: string;
  familyMembers: string;
  familyHelpType: string;
  familyNotes: string;
  availability: string;
  skills: string;
  reason: string;
  otherAddress: string;
  otherDescription: string;
};

const inputFieldClasses =
  "w-full bg-white/90 border border-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-sm focus:border-[#00b6b7] focus:ring-1 focus:ring-[#00b6b7] focus:outline-none transition duration-150 ease-in-out";
const selectFieldClasses =
  "w-full bg-white/90 border border-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-sm focus:border-[#00b6b7] focus:ring-1 focus:ring-[#00b6b7] focus:outline-none transition duration-150 ease-in-out appearance-none";
const textAreaClasses =
  "w-full bg-white/90 border border-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-sm focus:border-[#00b6b7] focus:ring-1 focus:ring-[#00b6b7] focus:outline-none h-24 transition duration-150 ease-in-out resize-none";

const selectArrow = (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg
      className="fill-current h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>
);

const RequestsType = () => {
  const [type, setType] = useState<RequestType>("orphan");
  const { mutateAsync: submitRequest, isPending } = useSubmitHelpRequest();

  const getErrorMessage = (error: unknown) => {
    if (!error || typeof error !== "object") return "Failed to submit request.";
    const err = error as {
      response?: { data?: { details?: string[]; message?: string } };
      message?: string;
    };
    if (
      Array.isArray(err.response?.data?.details) &&
      err.response?.data?.details[0]
    ) {
      return err.response.data.details[0];
    }
    if (err.response?.data?.message) return err.response.data.message;
    return err.message || "Failed to submit request.";
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    email:
      type === "other"
        ? Yup.string().email("Invalid email").required("Required")
        : Yup.string().email("Invalid email").optional(),
    orphanHelpType:
      type === "orphan" ? Yup.string().required("Required") : Yup.string(),
    orphanNotes:
      type === "orphan" ? Yup.string().required("Required") : Yup.string(),
    familyAddress:
      type === "family" ? Yup.string().required("Required") : Yup.string(),
    familyMembers:
      type === "family"
        ? Yup.string()
            .matches(/^\d+$/, "Must be a whole number")
            .test("gt-zero", "Must be greater than 0", (value) =>
              value ? Number(value) > 0 : false,
            )
            .required("Required")
        : Yup.string(),
    familyHelpType:
      type === "family" ? Yup.string().required("Required") : Yup.string(),
    familyNotes:
      type === "family" ? Yup.string().required("Required") : Yup.string(),
    availability:
      type === "volunteer" ? Yup.string().required("Required") : Yup.string(),
    skills:
      type === "volunteer" ? Yup.string().required("Required") : Yup.string(),
    reason:
      type === "volunteer" ? Yup.string().required("Required") : Yup.string(),
    otherAddress:
      type === "other" ? Yup.string().required("Required") : Yup.string(),
    otherDescription:
      type === "other" ? Yup.string().required("Required") : Yup.string(),
  });

  return (
    <div className="min-h-screen bg-[#F3F2E7]/80 pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="relative p-8 rounded-xl bg-[#FBFAF2] shadow-xl">
          <div className="absolute -left-6 -top-6 w-16 h-16 bg-[#E3E2CD] rounded-full"></div>
          <div className="absolute -left-2 -top-2 w-13 h-13 bg-[#00b6b7]/50 rounded-full"></div>

          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Make a Request
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
            className={`${selectFieldClasses} pr-10`}>
            <option value="orphan">Help an Orphan</option>
            <option value="family">Help a Family or Poor People</option>
            <option value="volunteer">Become a Volunteer</option>
            <option value="other">Other Request</option>
          </select>
          {selectArrow}
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
            otherAddress: "",
            otherDescription: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (
            values: RequestFormValues,
            { setSubmitting, setStatus, resetForm },
          ) => {
            setStatus(undefined);
            const payloadByType = {
              orphan: {
                child_name: values.childName.trim(),
                help_type: values.orphanHelpType.trim(),
                notes: values.orphanNotes.trim(),
              },
              family: {
                address: values.familyAddress.trim(),
                family_members: Number(values.familyMembers),
                assistance_type: values.familyHelpType.trim(),
                notes: values.familyNotes.trim(),
              },
              volunteer: {
                availability: values.availability.trim(),
                skills: values.skills.trim(),
                reason: values.reason.trim(),
              },
              other: {
                address: values.otherAddress.trim(),
                description: values.otherDescription.trim(),
              },
            } as const;

            const payload = {
              request_type: type,
              full_name: values.fullName.trim(),
              phone: values.phone.trim(),
              email: values.email.trim() || undefined,
              details: payloadByType[type],
            };

            try {
              const response = await submitRequest(payload);
              setStatus({ success: response.message });
              resetForm();
            } catch (error) {
              setStatus({ error: getErrorMessage(error) });
            } finally {
              setSubmitting(false);
            }
          }}>
          {({ errors, touched, status, isSubmitting }) => (
            <Form className="bg-white/75 flex flex-col items-center p-8 rounded-xl shadow-xl space-y-6 w-full">
              {status?.success && (
                <p className="w-full rounded-lg bg-green-100 text-green-800 px-4 py-3 text-sm">
                  {status.success}
                </p>
              )}
              {status?.error && (
                <p className="w-full rounded-lg bg-red-100 text-red-700 px-4 py-3 text-sm">
                  {status.error}
                </p>
              )}

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
                      Child's Name (if known)
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
                      {selectArrow}
                    </div>
                    {touched.orphanHelpType && errors.orphanHelpType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.orphanHelpType}
                      </p>
                    )}
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
                    {touched.orphanNotes && errors.orphanNotes && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.orphanNotes}
                      </p>
                    )}
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
                    {touched.familyAddress && errors.familyAddress && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.familyAddress}
                      </p>
                    )}
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
                    {touched.familyMembers && errors.familyMembers && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.familyMembers}
                      </p>
                    )}
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
                      {selectArrow}
                    </div>
                    {touched.familyHelpType && errors.familyHelpType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.familyHelpType}
                      </p>
                    )}
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
                    {touched.familyNotes && errors.familyNotes && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.familyNotes}
                      </p>
                    )}
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
                      {selectArrow}
                    </div>
                    {touched.availability && errors.availability && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.availability}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <label className="block text-gray-800 font-medium mb-1">
                      Skills
                    </label>
                    <Field
                      name="skills"
                      type="text"
                      className={inputFieldClasses}
                      placeholder="e.g., teaching, organizing events, logistics"
                    />
                    {touched.skills && errors.skills && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.skills}
                      </p>
                    )}
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
                    {touched.reason && errors.reason && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.reason}
                      </p>
                    )}
                  </div>
                </>
              )}

              {type === "other" && (
                <>
                  <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 w-full mt-4">
                    Other Request Details
                  </h2>

                  <div className="w-full">
                    <label className="block text-gray-800 font-medium mb-1">
                      Address
                    </label>
                    <Field
                      name="otherAddress"
                      type="text"
                      className={inputFieldClasses}
                      placeholder="Enter your address"
                    />
                    {touched.otherAddress && errors.otherAddress && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.otherAddress}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <label className="block text-gray-800 font-medium mb-1">
                      Request Description
                    </label>
                    <Field
                      as="textarea"
                      name="otherDescription"
                      className={textAreaClasses}
                      placeholder="Describe your request..."
                    />
                    {touched.otherDescription && errors.otherDescription && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.otherDescription}
                      </p>
                    )}
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isPending}
                className="bg-[#00CFD0] whitespace-nowrap text-white py-2.5 lg:py-3.5 px-6 lg:px-8 leading-5 font-semibold rounded-lg hover:bg-[#00b6b7] transition max-w-56 w-full self-center sm:self-end shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                {isSubmitting || isPending ? "Submitting..." : "Submit Request"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RequestsType;
