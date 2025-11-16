import Navbar from "./Navbar";
import logo from "../assets/icons/logo.svg";
import { menuitems } from "../constants/menuitems";

const Header = () => {
	return (
		<div className="bg-[#F3F2E7] py-4">
			<div className="h-16 flex items-center justify-between px-4">
				<div className="text-3xl text-white font-bold flex items-center gap-1.5">
					<img src={logo} alt="" />
					<p className="text-[#00CFD0] break-normal max-w-40 text-base ">
						Organizata Bashkeveprimi
					</p>
				</div>
				<Navbar menuitems={menuitems} />
			</div>
		</div>
	);
};

export default Header;
