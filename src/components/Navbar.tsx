import logo from "../assets/icons/logo.svg"

export const Navbar = () => {
  return (
    <nav className="bg-[#F3F2E7] py-4">
      <div className="h-16 flex items-center justify-between px-4">
        <div className="text-3xl text-white font-bold flex items-center"><img src={logo} alt="" />
        <p className="text-[#00CFD0] break-normal max-w-40 text-base ">Organizata Bashkeveprimi</p>
        </div>

        <div className="flex gap-6 bg-[#F3F2E7] items-center">
          <a href="#" className="text-black-100 opacity-50  text-base hover:text-white ">Home</a>
          <a href="#" className="text-black-100 opacity-50  text-base hover:text-white ">Programs</a>
          <a href="#" className="text-black-100 opacity-50 text-base hover:text-white ">About Us</a>
          <a href="#" className="text-black-100 opacity-50  text-base hover:text-white ">Support</a>
          <a href="#" className="text-black-100 opacity-50  text-base hover:text-white ">Emergency</a>
          <button className="bg-[#00CFD0] text-black px-8 py-4 rounded hover:text-white transition-colors">
              Donate now
          </button>

        </div>
      </div>
    </nav>
  );
};

