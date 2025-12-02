import Navbar from "./Navbar";
import logo from "../assets/icons/logo.svg";
import { menuitems } from "../constants/menuitems";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
	const navigate = useNavigate();

	return (
		<div className="bg-white">
			<div className="bg-[#F3F2E7] py-3.5 m-1 rounded-md">
				<div className="h-16 flex items-center px-4 sm:px-8 md-px-16 lg:px-32">
					<div
						className="text-3xl text-white flex items-center gap-1 hover:cursor-pointer"
						onClick={() => navigate("/home")}>
						<img className="w-12 h-12" src={logo} alt="logo" />
						<p className="text-[#00CFD0] hidden sm:flex font-bold break-normal max-w-40 text-base ">
							Organizata Bashkeveprimi
						</p>
					</div>

					<div className="flex items-center gap-2 md:gap-3 lg:gap-6 ml-auto z-90">
						<Navbar menuitems={menuitems} />
						<RxHamburgerMenu className="flex md:hidden w-6 h-6" />
						<button className="bg-[#00CFD0] whitespace-nowrap text-white py-1.5 lg:py-3.5 px-4 lg:px-8 leading-5 rounded-md hover:bg-[#00b6b7] transition max-w-48">
							Donate Now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
