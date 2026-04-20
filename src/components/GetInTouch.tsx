import { useState } from "react";
import {
  FaEnvelopeOpenText,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
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
    <section className="relative overflow-hidden bg-[#F3F2E7] px-4 py-14 sm:px-8 md:py-20">
      <div
        className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#00CFD0]/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-48 w-48 rounded-full bg-[#00A5A6]/20 blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#00A5A6] shadow-sm ring-1 ring-[#00CFD0]/20">
            <span aria-hidden>✉️</span> Say hello
          </p>
          <h2 className="mt-3 font-['Rowdies'] text-3xl font-normal text-[#213430] sm:text-4xl md:text-[2.75rem] md:leading-tight">
            Get in touch
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#3A1700]/70 sm:text-base">
            We'd love to hear from you - questions, ideas, or just a friendly
            wave. We read every message.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(260px,320px)] lg:items-start lg:gap-10">
          <div className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[0_20px_50px_-12px_rgba(33,52,48,0.12)] backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#00CFD0] to-[#00A5A6] text-white shadow-md shadow-[#00CFD0]/25">
                <FaEnvelopeOpenText className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#213430]">
                  Send a message
                </p>
                <p className="text-xs text-[#3A1700]/55">
                  Takes a minute - promise.
                </p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {status.success && (
                <p className="rounded-xl bg-green-100 px-4 py-3 text-sm text-green-800">
                  {status.success}
                </p>
              )}
              {status.error && (
                <p className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
                  {status.error}
                </p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="group block">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#00A5A6]">
                    First name
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="Your first name"
                    value={values.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className="w-full rounded-2xl border border-[#E8E4D8] bg-[#FFFCF7] px-4 py-3 text-sm text-[#213430] placeholder:text-[#3A1700]/35 outline-none transition focus:border-[#00CFD0]/50 focus:bg-white focus:ring-2 focus:ring-[#00CFD0]/25"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </label>
                <label className="group block">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#00A5A6]">
                    Last name
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Your last name"
                    value={values.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className="w-full rounded-2xl border border-[#E8E4D8] bg-[#FFFCF7] px-4 py-3 text-sm text-[#213430] placeholder:text-[#3A1700]/35 outline-none transition focus:border-[#00CFD0]/50 focus:bg-white focus:ring-2 focus:ring-[#00CFD0]/25"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#00A5A6]">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-2xl border border-[#E8E4D8] bg-[#FFFCF7] px-4 py-3 text-sm text-[#213430] placeholder:text-[#3A1700]/35 outline-none transition focus:border-[#00CFD0]/50 focus:bg-white focus:ring-2 focus:ring-[#00CFD0]/25"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#00A5A6]">
                    Phone
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+383 ..."
                    value={values.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full rounded-2xl border border-[#E8E4D8] bg-[#FFFCF7] px-4 py-3 text-sm text-[#213430] placeholder:text-[#3A1700]/35 outline-none transition focus:border-[#00CFD0]/50 focus:bg-white focus:ring-2 focus:ring-[#00CFD0]/25"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#00A5A6]">
                  Your message
                </span>
                <textarea
                  name="message"
                  id="get-in-touch-message"
                  rows={5}
                  placeholder="Tell us what's on your heart..."
                  value={values.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="min-h-[140px] w-full resize-y rounded-2xl border border-[#E8E4D8] bg-[#FFFCF7] px-4 py-3 text-sm leading-relaxed text-[#213430] placeholder:text-[#3A1700]/35 outline-none transition focus:border-[#00CFD0]/50 focus:bg-white focus:ring-2 focus:ring-[#00CFD0]/25"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </label>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[#3A1700]/50">
                  <span aria-hidden>💛</span> We'll get back to you as soon as
                  we can.
                </p>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#00CFD0] to-[#00A5A6] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#00CFD0]/30 transition hover:brightness-105 hover:shadow-xl hover:shadow-[#00CFD0]/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70">
                  <FaPaperPlane className="h-4 w-4" aria-hidden />
                  {isPending ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-[24px] border border-[#00CFD0]/25 bg-linear-to-br from-[#00CFD0]/12 via-white to-[#00A5A6]/10 p-6 shadow-sm ring-1 ring-white/60">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#088B8C]">
                Visit &amp; reach us
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[#213430]">
                Bashkveprimi
              </h3>
              <ul className="mt-5 space-y-4 text-sm text-[#213430]/90">
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/80 text-[#00A5A6] shadow-sm">
                    <FaMapMarkerAlt className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-[#3A1700]/50">
                      Address
                    </span>
                    {address}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/80 text-[#00A5A6] shadow-sm">
                    <span className="text-base" aria-hidden>
                      📞
                    </span>
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-[#3A1700]/50">
                      Phone
                    </span>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="hover:text-[#00CFD0]">
                      {phone}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/80 text-[#00A5A6] shadow-sm">
                    <span className="text-base" aria-hidden>
                      ✉️
                    </span>
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-[#3A1700]/50">
                      Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="break-all hover:text-[#00CFD0]">
                      {email}
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            <p className="rounded-2xl border border-dashed border-[#00CFD0]/35 bg-[#FFFCF7]/80 px-4 py-3 text-center text-xs leading-relaxed text-[#3A1700]/65">
              Prefer a quick chat? Call us - we're always happy to help.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
