const WhoAreWe = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#F3F2E7]">
      {/* Top Section */}
      <div className="w-full flex flex-col items-center justify-center text-center py-10 px-6 max-w-4xl">
        <h1 className="text-5xl font-bold mb-4">Who are we</h1>
        <p className="text-lg mb-2">Together for a brighter future.</p>
        <p className="text-lg leading-relaxed">
          We are a humanitarian organization dedicated to supporting families,
          orphans, and communities in need across Kosovo—restoring hope,
          dignity, and opportunity.
        </p>
      </div>

      {/* Bottom Stats Section */}
      <div className="grid grid-cols-4 w-full max-w-5xl  rounded-lg overflow-hidden m-4 ">
        <div className="flex flex-col items-center justify-center text-center p-6 bg-white ">
          <h1 className="text-[#00cfd0] text-5xl font-bold">1.2k+</h1>
          <div className="w-12 h-0.5 rounded-4xl bg-black my-3"></div>{" "}
          {/* Divider line */}
          <p>Projects Completed</p>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-6  bg-white ">
          <h1 className="text-[#00cfd0] text-5xl font-bold">850+</h1>
          <div className="w-12 h-0.5rounded-4xl bg-black my-3"></div>{" "}
          {/* Divider line */}
          <p>Monthly Donate</p>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-6  bg-white ">
          <h1 className="text-[#00cfd0] text-5xl font-bold">320+</h1>
          <div className="w-12 h-0.5 rounded-4xl bg-black my-3"></div>{" "}
          {/* Divider line */}
          <p>Donations Received</p>
        </div>

        <div className="bg-[#00A5A6] flex flex-col items-center justify-center text-center p-6">
          <div className="w-16 h-0.5 rounded-4xl bg-black my-3 self-start"></div>

          <h1 className="text-white text-2xl font-semibold">
            Our Goal is to Help Poor People
          </h1>
          <p className="text-white mt-2 cursor-pointer">Become a volunteer</p>
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;
