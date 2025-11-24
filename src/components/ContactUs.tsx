import Phone2 from "../assets/icons/phone-2.svg";
import MapPin from "../assets/icons/map-pin.svg";
import Mail from "../assets/icons/mail.svg";

const ContactUs = () => {
  return (
    <div className="grid grid-cols-3 bg-[#F3F2E7]">
      <div className="col-start-1 bg-white m-6 flex flex-col items-center justify-center text-center p-6 rounded-2xl ">
        <img src={Mail} alt="" className="mb-4 max-w-[120px] max-h-[125px]" />
        <h1 className="text-2xl font-bold mb-2">Send us an Email</h1>
        <p className="max-w-4/5">
          Prefer email? So do we! Send us an email and we'll get back to you
          promptly!
        </p>
        <h1 className="text-[#00cfd0] font-bold">bashkeveprimi@gmail.com</h1>
      </div>

      <div className="col-start-2 bg-white m-6 flex flex-col items-center justify-center text-center p-6 rounded-2xl ">
        <img
          src={Phone2}
          alt=""
          className="mb-4 max-w-[120px] max-h-[120px] "
        />
        <h1 className="text-2xl font-bold mb-2">Send us an Email</h1>
        <p className="max-w-4/5">
          Have any questions? Give us a call by clicking here!
        </p>
        <h1 className="text-[#00cfd0] font-bold">+383 048 225 402</h1>{" "}
        <h1 className="text-[#00cfd0] font-bold">+383 048 225 403</h1>{" "}
      </div>
      <div className="col-start-3 bg-white m-6 flex flex-col items-center justify-center text-center p-6 rounded-2xl ">
        <img src={MapPin} alt="" className="mb-4 max-w-[120px] max-h-[120px]" />
        <h1 className="text-2xl font-bold mb-2">Location</h1>
        <p className="max-w-4/5">
          Prefer email? So do we! Send us an email and we'll get back to you
          promptly!
        </p>
        <h1 className="text-[#00cfd0] font-bold">Gjilan</h1>{" "}
      </div>
    </div>
  );
};

export default ContactUs;
