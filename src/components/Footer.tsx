import logo from "../assets/icons/logo.svg"

export const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white " id="footer-id">
			<div className="flex  sm:px-12 px-4 bg-[#ffffff19] py-7">
				{/* You can add footer content here later */}
				<div className="flex-1">
					<div className="flex">
						<img src={logo} alt="" />
						<p className="text-[#ffffff] break-normal max-w-40 text-base ">Organizata Bashkeveprimi</p>
					</div>
					<div>
						<p>Phone: +38345 111 222</p><br/>
						<p>Address: Kosove</p>
						<p>60000, Gjilan</p>
					</div>
				</div>
				<div className="flex-1">
					<p>About Us</p><br/>
					<p>Contact Us</p>
				</div>
			</div>
			
		</footer>
	);
};

export default Footer;
