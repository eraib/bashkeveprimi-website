import DirectHelp from "../assets/icons/heart-above-hand.svg";
import GivingInformation from "../assets/icons/hands-connected.svg";
import RaisingAwareness from "../assets/icons/heart-world.svg";
import RelievingPoverty from "../assets/icons/flower-pot.svg";
import Squiggle2 from "../assets/icons/squiggle-2.svg";

export const BashkeveprimiFeatures = () => {
  return (
    <div className="flex flex-col items-center w-full mt-12 relative mb-24">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 px-4 sm:px-6">
        <h1 className="text-[#00CFD0] text-xl sm:text-2xl font-light uppercase tracking-widest">
          Our Features
        </h1>
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-2xl mx-auto mt-3 sm:mt-4 font-medium">
          Your support with Bashkveprimi helps transform lives across
          Kosovo—bringing hope, dignity, and opportunity to families in need.
        </h1>
      </div>

      {/* Background circular shape */}
      <div className="w-24 h-24 bg-[#00A5A6] absolute top-1/3 left-1/8 -z-1 rounded-full hidden sm:block" />

      <img
        src={Squiggle2}
        alt="Squiggle2"
        className="absolute top-2/5 left-48 -z-2 w-[190.145px] h-[330.4px] hidden md:block"
      />

      {/* Features Container */}
      <div className="w-full sm:w-5/6 md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 px-2 sm:px-0">
        {/* Feature 1 */}
        <div className="bg-[#F3F2E7] p-4 sm:p-6 sm:py-12 rounded-2xl">
          <div className="flex items-center gap-8">
            <img
              src={DirectHelp}
              alt="Direct help"
              className="p-1 sm:p-2 w-8 h-8 sm:w-auto sm:h-auto"
            />
            <h1 className="font-semibold text-lg sm:text-xl md:text-2xl">
              Direct help
            </h1>
          </div>
          <p className="mt-3 text-[#3A170080] sm:mt-4 text-sm sm:text-base">
            Providing immediate support with food, clean water, winter aid, and
            essential care for families in need.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-[#F3F2E7] p-4 sm:p-6 sm:py-12  rounded-2xl">
          <div className="flex items-center gap-8">
            <img
              src={GivingInformation}
              alt="Giving Information"
              className="p-1 sm:p-2 w-8 h-8 sm:w-auto sm:h-auto"
            />
            <h1 className="font-semibold text-lg sm:text-xl md:text-2xl">
              Giving Information
            </h1>
          </div>
          <p className="mt-3 text-[#3A170080] sm sm:mt-4 text-sm sm:text-base">
            Sharing updates and guidance to connect communities, donors, and
            those in need of support.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-[#F3F2E7] p-4 sm:p-6 sm:py-12  rounded-2xl">
          <div className="flex items-center gap-8">
            <img
              src={RaisingAwareness}
              alt="Raising Awareness"
              className="p-1 sm:p-2 w-8 h-8 sm:w-auto sm:h-auto"
            />
            <h1 className="font-semibold text-lg sm:text-xl md:text-2xl">
              Raising Awareness
            </h1>
          </div>
          <p className="mt-3 text-[#3A170080] sm sm:mt-4 text-sm sm:text-base">
            Highlighting the struggles of orphans and vulnerable families to
            inspire collective action.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-[#F3F2E7] p-4 sm:p-6 sm:py-12  rounded-2xl">
          <div className="flex items-center gap-6">
            <img
              src={RelievingPoverty}
              alt="Relieving Poverty"
              className="p-1 sm:p-2 w-8 h-8 sm:w-auto sm:h-auto"
            />
            <h1 className="text-lg font-semibold sm:text-xl md:text-2xl">
              Relieving Poverty
            </h1>
          </div>
          <p className="mt-3 text-[#3A170080] sm sm:mt-4 text-sm sm:text-base">
            Empowering families through long-term solutions like farming, sewing
            machines, and egg incubators.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BashkeveprimiFeatures;
