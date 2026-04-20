import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.svg";
import { useOrganizationCurrent } from "../lib/queries";

export const Footer = () => {
	const { data: organization } = useOrganizationCurrent();
	const orgName = organization?.name || "Organizata Bashkeveprimi";
	const orgPhone = organization?.phone || "+38345 111 222";
	const orgAddress = organization?.address || "Kosove, Gjilan";
	const orgEmail = organization?.email || "bashkeveprimi@gmail.com";

	return (
		<footer className="bg-gray-900 text-white" id="footer-id">
			<div className="bg-[#ffffff19] px-4 py-8 sm:px-12">
				<div className="grid gap-8 md:grid-cols-3">
					<div>
						<div className="flex items-center gap-2 sm:gap-3">
							<img
								src={logo}
								alt={`${orgName} logo`}
								className="h-8 w-8 sm:h-10 sm:w-10"
							/>
							<p className="max-w-44 text-sm font-semibold text-white sm:text-base">
								{orgName}
							</p>
						</div>
						<p className="mt-3 text-sm leading-relaxed text-white/80">
							Supporting families, children, and communities with practical help
							and long-term impact.
						</p>
					</div>

					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
							Quick Links
						</h3>
						<div className="mt-3 flex flex-col gap-2 text-sm text-white/85">
							<Link to="/" className="transition hover:text-[#00CFD0]">
								Home
							</Link>
							<Link to="/about-us" className="transition hover:text-[#00CFD0]">
								About Us
							</Link>
							<Link to="/orphans" className="transition hover:text-[#00CFD0]">
								Orphans
							</Link>
							<Link to="/projects" className="transition hover:text-[#00CFD0]">
								Projects
							</Link>
							<Link to="/requests" className="transition hover:text-[#00CFD0]">
								Requests
							</Link>
							<Link to="/contact" className="transition hover:text-[#00CFD0]">
								Contact
							</Link>
						</div>
					</div>

					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
							Contact
						</h3>
						<div className="mt-3 flex flex-col gap-2 text-sm text-white/85">
							<a
								href={`tel:${orgPhone.replace(/\s/g, "")}`}
								className="transition hover:text-[#00CFD0]">
								Phone: {orgPhone}
							</a>
							<a
								href={`mailto:${orgEmail}`}
								className="break-all transition hover:text-[#00CFD0]">
								Email: {orgEmail}
							</a>
							<p>Address: {orgAddress}</p>
						</div>
					</div>
				</div>

				<div className="mt-8 border-t border-white/20 pt-4 text-xs text-white/65 sm:text-sm">
					<p>
						© {new Date().getFullYear()} {orgName}. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
