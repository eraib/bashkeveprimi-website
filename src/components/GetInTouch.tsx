import AboutUsBackgroundImg from "../assets/images/AboutUsBackgroundImg.png";

const GetInTouch = () => {
  return (
    <div className="p-4 bg-[#F3F2E7]">
      {/* Heading above all grid items */}
      <h1 className="text-4xl font-bold text-black  text-[14px] m-4 ">
        Get in Touch
      </h1>
      <h1 className="text-4xl font-bold text-black mb-6 text-[39px] m-4">
        Send me a message
      </h1>

      {/* 6-element grid */}
      <div className="grid grid-cols-3 gap-2 text-white font-bold text-2xl">
        {/* Row 1 */}
        <div className="bg-[#F3F2E7] flex items-center justify-center p-4">
          <input
            type="text"
            name=""
            id=""
            className="bg-white text-black w-full p-2 rounded"
            placeholder="First Name"
          />
        </div>

        <div className="bg-[#F3F2E7] flex items-center justify-center p-4">
          <input
            type="text"
            name=""
            id=""
            className="bg-white text-black w-full p-2 rounded"
            placeholder="Last Name"
          />
        </div>
        <div className="bg-white row-span-3 p-4 flex flex-col justify-between m-6 rounded">
          <div>
            <h1 className="text-[39px] text-black  ">Address</h1>
            <h1 className="text-black text-[16px]">Location : Gjilan</h1>
          </div>

          <div>
            <h1 className="text-black text-[16px]">Phone : +383 048 225 402</h1>
            <h1 className="text-black text-[16px]">
              Email : bashkeveprimi@gmail.com
            </h1>
          </div>
        </div>

        {/* Row 2 */}
        <div className="bg-[#F3F2E7] flex items-center justify-center p-4">
          <input
            type="email"
            name=""
            id=""
            className="bg-white text-black w-full p-2 rounded"
            placeholder="Email"
          />
        </div>
        <div className="bg-[#F3F2E7] flex items-center justify-center p-4">
          <input
            type="tel"
            name=""
            id=""
            className="bg-white text-black w-full p-2 rounded"
            placeholder="Phone number"
          />
        </div>

        {/* Row 3 */}
        <div className="bg-[#F3F2E7] flex items-center justify-center col-span-2 p-4">
          <textarea
            name="message"
            id="message"
            rows={6}
            placeholder="Write your message here..."
            className="w-full p-2 rounded border border-gray-300 text-black resize-none bg-white "
          ></textarea>{" "}
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
