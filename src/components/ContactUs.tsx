import Phone2 from "../assets/icons/phone-2.svg";
import MapPin from "../assets/icons/map-pin.svg";
import Mail from "../assets/icons/mail.svg";
import { useOrganizationCurrent } from "../lib/queries";

const ContactUs = () => {
	const { data: org } = useOrganizationCurrent();
	const email = org?.email || "bashkeveprimi@gmail.com";
	const phone = org?.phone || "+383 048 225 402";
	const address = org?.address || "Gjilan, Kosovo";

	return (
		<section className="bg-[#F3F2E7] py-12 md:py-16">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-10">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<div className="rounded-2xl bg-white p-6 text-center shadow-sm">
						<img src={Mail} alt="" className="mx-auto mb-4 h-[96px] w-[96px]" />
						<h3 className="mb-2 text-2xl font-bold text-[#213430]">Send us an Email</h3>
						<p className="text-[#3A1700]/75">
							Prefer email? Send your message and we'll get back to you promptly.
						</p>
						<a
							href={`mailto:${email}`}
							className="mt-3 block break-all font-bold text-[#00CFD0] hover:underline">
							{email}
						</a>
					</div>

					<div className="rounded-2xl bg-white p-6 text-center shadow-sm">
						<img src={Phone2} alt="" className="mx-auto mb-4 h-[96px] w-[96px]" />
						<h3 className="mb-2 text-2xl font-bold text-[#213430]">Call Us</h3>
						<p className="text-[#3A1700]/75">
							Have questions? Reach us directly and we'll be happy to help.
						</p>
						<a
							href={`tel:${phone.replace(/\s/g, "")}`}
							className="mt-3 block font-bold text-[#00CFD0] hover:underline">
							{phone}
						</a>
					</div>

					<div className="rounded-2xl bg-white p-6 text-center shadow-sm">
						<img src={MapPin} alt="" className="mx-auto mb-4 h-[96px] w-[96px]" />
						<h3 className="mb-2 text-2xl font-bold text-[#213430]">Location</h3>
						<p className="text-[#3A1700]/75">
							Visit us and connect with our team in person.
						</p>
						<p className="mt-3 font-bold text-[#00CFD0]">{address}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactUs;
