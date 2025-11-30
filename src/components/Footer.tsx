import logo from "../assets/icons/logo.svg"

export const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white" id="footer-id">
			<div className="flex flex-col sm:flex-row sm:px-12 px-4 bg-[#ffffff19] py-6 sm:py-7 gap-6 sm:gap-0">
				{/* You can add footer content here later */}
				<div className="flex-1">
					<div className="flex items-center gap-2 sm:gap-3">
						<img src={logo} alt="" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
						<p className="text-[#ffffff] break-normal max-w-32 sm:max-w-40 text-xs sm:text-sm md:text-base">Organizata Bashkeveprimi</p>
					</div>
					<div className="mt-3 sm:mt-4">
						<p className="text-xs sm:text-sm md:text-base">Phone: +38345 111 222</p>
						<p className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Address: Kosove</p>
						<p className="text-xs sm:text-sm md:text-base">60000, Gjilan</p>
					</div>
				</div>
				<div className="flex-1">
					<p className="text-xs sm:text-sm md:text-base">About Us</p>
					<p className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Contact Us</p>
				</div>
			</div>
			
		</footer>
	);
};

export default Footer;
