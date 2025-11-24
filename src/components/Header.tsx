import Navbar from "./Navbar";
import logo from "../assets/icons/logo.svg";
import { menuitems } from "../constants/menuitems";

const Header = () => {
  return (
    <div className="bg-[#F3F2E7] py-3.5">
      <div className="h-16 flex items-center px-4">
        {/* Left Section - Logo */}
        <div className="text-3xl text-white font-bold flex items-center gap-1.5">
          <img src={logo} alt="" />
          <p className="text-[#00CFD0] break-normal max-w-40 text-base ">
            Organizata Bashkeveprimi
          </p>
        </div>

        {/* Right Section - Navbar + Button */}
        <div className="flex items-center gap-6 ml-auto">
          <Navbar menuitems={menuitems} />
          <button className="bg-[#00CFD0] text-black font-medium py-3 px-6 rounded-md hover:bg-[#00b6b7] transition max-w-48">
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
