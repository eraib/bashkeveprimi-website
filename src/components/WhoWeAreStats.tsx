import { HiArrowRight } from "react-icons/hi";

const WhoWeAreStats = () => {
  return (
    <div className="flex items-center justify-center bg-white px-4 sm:px-6 md:px-[100px] py-6 md:py-8 lg:py-0">
      <div className="w-full max-w-[1088px] bg-white rounded-[8.431px] shadow-[0px_8.431px_21.078px_0px_rgba(33,52,48,0.08)] min-h-[172px] md:min-h-[240px] lg:min-h-[172px] lg:h-[172px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative overflow-hidden">
        {/* Stat 1: Projects Completed */}
        <div className="relative min-h-[87.686px] w-full lg:w-[219.216px] flex flex-col items-center justify-center lg:pl-[42.16px] py-6 md:py-0">
          <div className="flex flex-col justify-center items-center mb-2">
            <p className="text-[#00cfd0] text-2xl sm:text-3xl md:text-[40.47px] leading-normal font-['Rowdies'] font-normal text-center">
              1.2k+
            </p>
          </div>
          <div className="flex items-center justify-center py-2">
            <div className="h-[2.529px] w-[50.588px]">
              <div className="bg-black rounded-[50px] w-full h-full"></div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-[#213430] text-xs sm:text-sm md:text-[16.86px] font-['Rowdies'] font-light text-center">
              Projects Completed
            </p>
          </div>
        </div>

        {/* Stat 2: Monthly Donate */}
        <div className="relative min-h-[87.686px] w-full lg:w-[219.216px] flex flex-col items-center justify-center lg:ml-[42.16px] py-6 md:py-0">
          <div className="flex flex-col justify-center items-center mb-2">
            <p className="text-[#00cfd0] text-2xl sm:text-3xl md:text-[40.47px] leading-normal font-['Rowdies'] font-normal text-center">
              100+
            </p>
          </div>
          <div className="flex items-center justify-center py-2">
            <div className="h-[2.529px] w-[50.588px]">
              <div className="bg-black rounded-[50px] w-full h-full"></div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-[#213430] text-xs sm:text-sm md:text-[16.86px] font-['Rowdies'] font-light text-center whitespace-pre-wrap">
              Monthly Donate
            </p>
          </div>
        </div>

        {/* Stat 3: Donations Received */}
        <div className="relative min-h-[87.686px] w-full lg:w-[219.216px] flex flex-col items-center justify-center lg:ml-[42.16px] py-6 md:py-0">
          <div className="flex flex-col justify-center items-center mb-2">
            <p className="text-[#00cfd0] text-2xl sm:text-3xl md:text-[40.47px] leading-normal font-['Rowdies'] font-normal text-center">
              68K+
            </p>
          </div>
          <div className="flex items-center justify-center py-2">
            <div className="h-[2.529px] w-[50.588px]">
              <div className="bg-black rounded-[50px] w-full h-full"></div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-[#213430] text-xs sm:text-sm md:text-[16.86px] font-['Rowdies'] font-light text-center">
              Donations Received
            </p>
          </div>
        </div>

        {/* CTA Box */}
        <div className="bg-[#00a5a6] min-h-[172px] md:h-[172px] lg:h-[172px] lg:w-[261.373px] rounded-b-[8.431px] md:rounded-br-[8.431px] md:rounded-tr-[8.431px] md:rounded-bl-none md:rounded-tl-none lg:rounded-br-[8.431px] lg:rounded-tr-[8.431px] lg:rounded-bl-none lg:rounded-tl-none relative flex flex-col justify-center lg:justify-start">
          {/* "Our Goal is to" and "Help Poor People" */}
          <div className="flex flex-col lg:absolute font-['Rowdies'] font-light justify-center leading-normal px-6 lg:px-0 lg:left-[42.16px] text-white text-base sm:text-lg lg:text-[20px] lg:top-[76.27px] lg:translate-y-[-50%] lg:w-[177.059px] whitespace-pre-wrap pt-6 lg:pt-0">
            <p className="mb-0">Our Goal is to</p>
            <p>Help Poor People</p>
          </div>

          {/* "become volunteer" button with arrow */}
          <div className="relative lg:absolute left-6 lg:left-[42.16px] top-auto lg:top-[113.14px] cursor-pointer pb-6 lg:pb-0">
            <p className="relative lg:absolute text-white text-xs sm:text-sm lg:text-[14px] leading-normal font-['Rowdies'] font-light whitespace-pre-wrap left-0 lg:top-[8.5px] lg:translate-y-[-50%] lg:w-[134.059px]">
              become volunteer
            </p>
            <HiArrowRight className="relative lg:absolute text-black left-auto lg:left-[134.06px] top-auto lg:top-[1.53px] ml-2 lg:ml-0 w-3 h-3 lg:w-[12.141px] lg:h-[13.49px] inline lg:block" />
          </div>

          {/* Divider */}
          <div className="absolute hidden lg:flex items-center justify-center left-[42.16px] top-[139.89px] w-[50.588px] h-[2.828px]">
            <div className="w-[2.828px] h-[50.588px] rotate-90">
              <div className="bg-black rounded-[42.157px] w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAreStats;
