import { useState } from "react";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import logo from "../assets/icons/logo.svg";
import { menuitems } from "../constants/menuitems";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useOrganizationCurrent } from "../lib/queries";
import { useDonation } from "../lib/DonationContext";

const REQUESTS_BLUE = "#1e3a5f";

const Header = () => {
  const navigate = useNavigate();
  const { openModal } = useDonation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: organization } = useOrganizationCurrent();

  return (
    <>
      <div className="sticky top-0 z-100 bg-white shadow-sm">
        <div className="bg-[#F3F2E7] py-2 md:py-3.5 m-1 rounded-md">
          <div className="h-11 md:h-16 flex items-center px-4 sm:px-8 md:px-10 lg:px-16 xl:px-28">
            <div
              className="text-3xl text-white flex items-center gap-1 hover:cursor-pointer"
              onClick={() => navigate("/")}>
              <img className="w-12 h-12" src={logo} alt="logo" />
              <p className="text-[#00CFD0] hidden sm:flex font-bold break-normal max-w-40 text-base ">
                {organization?.name || "Organizata Bashkeveprimi"}
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-2 lg:gap-3 xl:gap-4 ml-auto z-90">
              <Navbar menuitems={menuitems} />

              <button
                onClick={() => navigate("/requests")}
                style={{ backgroundColor: REQUESTS_BLUE }}
                className="hidden md:flex whitespace-nowrap text-white text-xs lg:text-sm py-1.5 px-3 xl:px-5 rounded-md hover:opacity-90 transition">
                Make a Request
              </button>
              <button
                onClick={() => openModal()}
                className="flex whitespace-nowrap text-white text-xs lg:text-sm py-1.5 px-3 xl:px-5 rounded-md hover:bg-[#00b6b7] transition bg-[#00CFD0]">
                Donate Now
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex md:hidden p-1.5 rounded-lg hover:bg-[#00CFD0]/10 transition-colors">
                <RxHamburgerMenu className="w-6 h-6 text-[#00CFD0]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
