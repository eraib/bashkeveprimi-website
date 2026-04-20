import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import {
  useOrganizationCurrent,
  useSubmitContactMessage,
} from "../lib/queries";

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const inputClass =
  "w-full rounded-[8px] border border-[#E8E4D8] bg-white px-4 py-3 text-sm text-[#3A1700] placeholder:text-[#3A170055] outline-none transition focus:border-[#00CFD0] focus:ring-2 focus:ring-[#00CFD0]/20";

const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#3A170080]";

const GetInTouch = () => {
  const { data: org } = useOrganizationCurrent();
  const { mutateAsync: submitContact, isPending } = useSubmitContactMessage();

  const [values, setValues] = useState<ContactFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<{ success?: string; error?: string }>(
    {},
  );

  const phone = org?.phone ?? "+383 048 225 402";
  const email = org?.email ?? "bashkeveprimi@gmail.com";
  const address = org?.address ?? "Gjilan, Kosovo";

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: ContactFormErrors = {};
    if (!values.firstName.trim())
      nextErrors.firstName = "First name is required.";
    if (!values.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Invalid email.";
    }
    if (!values.phone.trim()) nextErrors.phone = "Phone is required.";
    if (!values.message.trim()) nextErrors.message = "Message is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({});
    if (!validate()) return;

    try {
      const fullName =
        `${values.firstName.trim()} ${values.lastName.trim()}`.trim();
      const response = await submitContact({
        full_name: fullName,
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
      });

      setStatus({
        success:
          response.message ??
          "Your message has been sent successfully. Thank you!",
      });
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      const err = error as {
        response?: { data?: { message?: string; detail?: string } };
        message?: string;
      };
      setStatus({
        error:
          err.response?.data?.message ||
          err.response?.data?.detail ||
          err.message ||
          "Failed to send your message. Please try again.",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F3F2E7] px-4 py-14 sm:px-8 md:py-20 lg:px-[100px]">
      {/* Decorative circles — matches PeriodicActions / BashkeveprimiFeatures style */}
      <div className="pointer-events-none absolute -left-10 top-1/3 h-40 w-40 rounded-full bg-[#00A5A6] opacity-15 hidden sm:block" />
      <div className="pointer-events-none absolute -right-12 bottom-10 h-56 w-56 rounded-full bg-[#00CFD0] opacity-10 hidden sm:block" />

      <div className="relative mx-auto max-w-5xl">
        {/* Section header — matches BashkeveprimiFeatures / OrganizationRecentFeatures */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="text-[#00CFD0] text-xl font-light uppercase tracking-widest">
            Contact Us
          </h2>
          <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-medium text-[#3A1700] leading-tight tracking-[-1px]">
            Get In Touch
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#3A170080] sm:text-base">
            We'd love to hear from you — questions, ideas, or just a friendly
            message. We read every one.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(240px,300px)] lg:items-start lg:gap-10">
          {/* Form card */}
          <div className="bg-white rounded-[20px] p-6 sm:p-8">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {status.success && (
                <p className="rounded-[8px] bg-green-100 px-4 py-3 text-sm text-green-800">
                  {status.success}
                </p>
              )}
              {status.error && (
                <p className="rounded-[8px] bg-red-100 px-4 py-3 text-sm text-red-700">
                  {status.error}
                </p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>First name</span>
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="Your first name"
                    value={values.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className={inputClass}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </label>
                <label className="block">
                  <span className={labelClass}>Last name</span>
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Your last name"
                    value={values.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className={inputClass}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </label>
                <label className="block">
                  <span className={labelClass}>Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+383 ..."
                    value={values.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </label>
              </div>

              <label className="block">
                <span className={labelClass}>Your message</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us what's on your heart..."
                  value={values.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={`${inputClass} min-h-[140px] resize-y leading-relaxed`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                )}
              </label>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-[#00CFD0] h-[48px] w-full sm:w-[202px] rounded-[24px] text-white font-['Rowdies'] font-normal text-[14px] uppercase flex items-center justify-center hover:bg-[#00b6b7] transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isPending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          {/* Contact info aside */}
          <aside className="flex flex-col gap-4">
            <div className="bg-white rounded-[20px] p-6">
              <h3 className="text-[#00CFD0] text-xs font-light uppercase tracking-widest mb-1">
                Find Us
              </h3>
              <p className="text-lg font-semibold text-[#3A1700] mb-5">
                Bashkveprimi
              </p>

              <ul className="space-y-5 text-sm text-[#3A1700]">
                <li className="flex gap-4 items-start">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3F2E7] text-[#00A5A6]">
                    <FaMapMarkerAlt className="h-4 w-4" />
                  </span>
                  <span>
                    <span className={labelClass}>Address</span>
                    {address}
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3F2E7] text-[#00A5A6]">
                    <FaPhone className="h-4 w-4" />
                  </span>
                  <span>
                    <span className={labelClass}>Phone</span>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="hover:text-[#00CFD0] transition-colors">
                      {phone}
                    </a>
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3F2E7] text-[#00A5A6]">
                    <FaEnvelope className="h-4 w-4" />
                  </span>
                  <span>
                    <span className={labelClass}>Email</span>
                    <a
                      href={`mailto:${email}`}
                      className="break-all hover:text-[#00CFD0] transition-colors">
                      {email}
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-[20px] px-5 py-4">
              <p className="text-xs leading-relaxed text-[#3A170065] text-center">
                Prefer a quick chat? Call us — we're always happy to help.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
