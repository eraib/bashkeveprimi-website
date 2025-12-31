import { HiArrowRight } from "react-icons/hi";

const WhoWeAreStats = () => {
  return (
    <div className="flex items-center justify-center bg-white px-4 sm:px-8 md:px-[100px] py-8 md:py-0">
      <div className="w-full max-w-[1088px] bg-white rounded-[8.431px] shadow-[0px_8.431px_21.078px_0px_rgba(33,52,48,0.08)] min-h-[172px] md:h-[172px] flex flex-col md:flex-row items-stretch relative overflow-hidden">
        {/* Stats Section */}
        <div className="flex flex-col md:flex-row items-center justify-center flex-1 md:pl-[42.16px]">
          {/* Stat 1: Projects Completed */}
          <div className="relative h-[87.686px] w-full md:w-[219.216px] flex flex-col items-center justify-center ">
            <div className="flex flex-col justify-center items-center mb-2">
              <p className="text-[#00cfd0] text-3xl sm:text-4xl md:text-[40.47px] leading-normal font-['Rowdies'] font-normal text-center">
                1.2k+
              </p>
            </div>
            <div className="flex items-center justify-center py-2">
              <div className="h-[2.529px] w-[50.588px]">
                <div className="bg-black rounded-[50px] w-full h-full"></div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[#213430] text-sm md:text-[16.86px] font-['Rowdies'] font-light text-center">
                Projects Completed
              </p>
            </div>
          </div>

          {/* Stat 2: Monthly Donate */}
          <div className="relative h-[87.686px] w-full md:w-[219.216px] flex flex-col items-center justify-center md:ml-[42.16px]">
            <div className="flex flex-col justify-center items-center mb-2">
              <p className="text-[#00cfd0] text-3xl sm:text-4xl md:text-[40.47px] leading-normal font-['Rowdies'] font-normal text-center">
                100+
              </p>
            </div>
            <div className="flex items-center justify-center py-2">
              <div className="h-[2.529px] w-[50.588px]">
                <div className="bg-black rounded-[50px] w-full h-full"></div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[#213430] text-sm md:text-[16.86px] font-['Rowdies'] font-light text-center whitespace-pre-wrap">
                Monthly Donate
              </p>
            </div>
          </div>

          {/* Stat 3: Donations Received */}
          <div className="relative h-[87.686px] w-full md:w-[219.216px] flex flex-col items-center justify-center md:ml-[42.16px]">
            <div className="flex flex-col justify-center items-center mb-2">
              <p className="text-[#00cfd0] text-3xl sm:text-4xl md:text-[40.47px] leading-normal font-['Rowdies'] font-normal text-center">
                68K+
              </p>
            </div>
            <div className="flex items-center justify-center py-2">
              <div className="h-[2.529px] w-[50.588px]">
                <div className="bg-black rounded-[50px] w-full h-full"></div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[#213430] text-sm md:text-[16.86px] font-['Rowdies'] font-light text-center">
                Donations Received
              </p>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="bg-[#00a5a6] min-h-[172px] md:h-[172px] w-full md:w-[261.373px] rounded-b-[8.431px] md:rounded-br-[8.431px] md:rounded-tr-[8.431px] md:rounded-bl-none md:rounded-tl-none relative">
          {/* "Our Goal is to" and "Help Poor People" */}
          <div className="absolute flex flex-col font-['Rowdies'] font-light justify-center leading-normal left-4 md:left-[42.16px] text-white text-base md:text-[20px] top-[76.27px] translate-y-[-50%] w-[177.059px] whitespace-pre-wrap">
            <p className="mb-0">Our Goal is to</p>
            <p>Help Poor People</p>
          </div>

          {/* "become volunteer" button with arrow */}
          <div className="absolute left-4 md:left-[42.16px] top-[113.14px] cursor-pointer">
            <p className="absolute text-white text-xs md:text-[14px] leading-normal font-['Rowdies'] font-light whitespace-pre-wrap left-0 top-[8.5px] translate-y-[-50%] w-[134.059px]">
              become volunteer
            </p>
            <HiArrowRight className="absolute text-white left-[134.06px] top-[1.53px] w-3 h-3 md:w-[12.141px] md:h-[13.49px]" />
          </div>

          {/* Divider */}
          <div className="absolute hidden md:flex items-center justify-center left-[42.16px] top-[139.89px] w-[50.588px] h-[2.828px]">
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
