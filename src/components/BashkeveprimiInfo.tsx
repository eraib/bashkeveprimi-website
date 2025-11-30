import Phone from "../assets/icons/PhoneInCircle.svg";
import Location from "../assets/icons/LocationInCircle.svg";
import Envelope from "../assets/icons/EnvelopeInCircle.svg";

export const BashkeveprimiInfo = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-3 sm:grid-rows-1 gap-0 parent min-h-48">
      {/* Phone */}
      <div className="bg-[#00CFD0] flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 p-4 sm:p-0">
        <img src={Phone} alt="Phone" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
        <div className="text-center">
          <h1 className="text-white font-semibold text-sm sm:text-base">Phone</h1>
          <h1 className="text-white text-xs sm:text-sm md:text-base">+383 45-111-222</h1>
        </div>
      </div>

      {/* Email */}
      <div className="bg-[#00A5A6] flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 p-4 sm:p-0">
        <img src={Location} alt="Location" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
        <div className="text-center">
          <h1 className="text-white font-semibold text-sm sm:text-base">Email</h1>
          <h1 className="text-white text-xs sm:text-sm md:text-base break-all">info@max.com</h1>
        </div>
      </div>

      {/* Address */}
      <div className="bg-[#088B8C] flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 p-4 sm:p-0">
        <img src={Envelope} alt="Address" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
        <div className="text-center">
          <h1 className="text-white font-semibold text-sm sm:text-base">Address</h1>
          <h1 className="text-white text-xs sm:text-sm md:text-base">Gjilan</h1>
        </div>
      </div>
    </div>
  );
};

export default BashkeveprimiInfo;
