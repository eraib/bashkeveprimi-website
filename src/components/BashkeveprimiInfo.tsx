import Phone from "../assets/icons/PhoneInCircle.svg";
import Location from "../assets/icons/LocationInCircle.svg";
import Envelope from "../assets/icons/EnvelopeInCircle.svg";

export const BashkeveprimiInfo = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-0 parent h-48">
      {/* Phone */}
      <div className="bg-[#00CFD0] flex justify-center items-center gap-4 ">
        <img src={Phone} alt="Phone" className="w-16 h-16" />
        <div className="text-center">
          <h1 className="text-white font-semibold">Phone</h1>
          <h1 className="text-white">+383 45-111-222</h1>
        </div>
      </div>

      {/* Email */}
      <div className="bg-[#00A5A6] flex justify-center items-center gap-4">
        <img src={Location} alt="Location" className="w-16 h-16" />
        <div className="text-center ">
          <h1 className="text-white font-semibold">Email</h1>
          <h1 className="text-white">info@max.com</h1>
        </div>
      </div>

      {/* Address */}
      <div className="bg-[#088B8C] flex justify-center items-center gap-4">
        <img src={Envelope} alt="Address" className="w-16 h-16" />
        <div className="text-center">
          <h1 className="text-white font-semibold">Address</h1>
          <h1 className="text-white">Gjilan</h1>
        </div>
      </div>
    </div>
  );
};

export default BashkeveprimiInfo;
