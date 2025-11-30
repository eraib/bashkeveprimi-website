import DirectHelp from "../assets/icons/heart-above-hand.svg";
import GivingInformation from "../assets/icons/hands-connected.svg";
import RaisingAwareness from "../assets/icons/heart-world.svg";
import RelievingPoverty from "../assets/icons/flower-pot.svg";

export const BashkeveprimiFeatures = () => {
  return (
    //       <div className="flex flex-col justify-center items-center text-center py-2 h-[900px] w-full">
    //         {/* First div */}
    //         <div className=" h-1/3 w-full flex flex-col justify-center items-center">
    //           <h1 className="text-[#00CFD0] text-2xl font-bold">Our Features</h1>
    //           <h1 className="text-3xl max-w-2xl mt-4">
    //             Your support with Bashkveprimi helps transform lives across Kosovo—bringing hope, dignity, and opportunity to families in need.
    //           </h1>
    //         </div>

    //         {/* Second div */}
    //         <div className=" h-1/3 w-2/3 flex ">
    //             <div className="bg-[#F3F2E7]  w-1/2  m-1 rounded-2xl ">
    //                 <div className="flex items-center h-1/2 p-8 ">
    //                     <img src={DirectHelp} alt="" className="p-2" />
    //                     <h1 className="text-2xl ">Direct help</h1>
    //                 </div>
    //                 <div className=" h-1/2 p-8">
    //                     <p>Providing immediate support with food, clean
    //                     water, winter aid, and essential care for families in
    //                     need.</p>
    //                 </div>
    //             </div>
    //             <div className="bg-[#F3F2E7]  w-1/2  m-1 rounded-2xl ">
    //                 <div className="flex items-center h-1/2 p-8 ">
    //                         <img src={GivingInformation} alt="" className="p-2" />
    //                         <h1 className="text-2xl ">Giving Information</h1>
    //                     </div>
    //                     <div className=" h-1/2 p-8">
    //                         <p>Sharing updates and guidance to connect
    //                         communities, donors, and those in need of support.</p>
    //                     </div>
    //             </div>
    //             <div>

    //             </div>

    //         </div>

    //         {/* Third div */}
    //         <div className=" h-1/3 w-2/3 flex">
    //         <div className="bg-[#F3F2E7]  w-1/2  m-1 rounded-2xl ">
    //                 <div className="flex items-center h-1/2 p-8 ">
    //                     <img src={RaisingAwareness} alt="" className="p-2" />
    //                     <h1 className="text-2xl ">Raising Awareness</h1>
    //                 </div>
    //                 <div className=" h-1/2 p-8">
    //                     <p>Highlighting the struggles of orphans and
    //                     vulnerable families to inspire collective action.</p>
    //                 </div>
    //             </div>
    //             <div className="bg-[#F3F2E7]  w-1/2  m-1 rounded-2xl ">
    //                 <div className="flex items-center h-1/2 p-8 ">
    //                         <img src={RelievingPoverty} alt="" className="p-2" />
    //                         <h1 className="text-2xl ">Relieving Poverty</h1>
    //                     </div>
    //                     <div className=" h-1/2 p-8">
    //                         <p>Empowering families through long-term solutions
    // l                           ike farming, sewing machines, and egg incubators.</p>
    //                     </div>
    //             </div>
    //             <div>

    //             </div>
    //         </div>
    //       </div>
    <div className="flex flex-col items-center w-full m-2 sm:m-4">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 px-4 sm:px-6">
        <h1 className="text-[#00CFD0] text-xl sm:text-2xl font-bold">Our Features</h1>
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-2xl mx-auto mt-3 sm:mt-4">
          Your support with Bashkveprimi helps transform lives across
          Kosovo—bringing hope, dignity, and opportunity to families in need.
        </h1>
      </div>

      {/* Features Container */}
      <div className="w-full sm:w-5/6 md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-0">
        {/* Feature 1 */}
        <div className="bg-[#F3F2E7] p-4 sm:p-6 rounded-2xl">
          <div className="flex items-center gap-2 sm:gap-4">
            <img src={DirectHelp} alt="Direct help" className="p-1 sm:p-2 w-8 h-8 sm:w-auto sm:h-auto" />
            <h1 className="text-lg sm:text-xl md:text-2xl">Direct help</h1>
          </div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base">
            Providing immediate support with food, clean water, winter aid, and
            essential care for families in need.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-[#F3F2E7] p-4 sm:p-6 rounded-2xl">
          <div className="flex items-center gap-2 sm:gap-4">
            <img
              src={GivingInformation}
              alt="Giving Information"
              className="p-1 sm:p-2 w-8 h-8 sm:w-auto sm:h-auto"
            />
            <h1 className="text-lg sm:text-xl md:text-2xl">Giving Information</h1>
          </div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base">
            Sharing updates and guidance to connect communities, donors, and
            those in need of support.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-[#F3F2E7] p-4 sm:p-6 rounded-2xl">
          <div className="flex items-center gap-2 sm:gap-4">
            <img
              src={RaisingAwareness}
              alt="Raising Awareness"
              className="p-1 sm:p-2 w-8 h-8 sm:w-auto sm:h-auto"
            />
            <h1 className="text-lg sm:text-xl md:text-2xl">Raising Awareness</h1>
          </div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base">
            Highlighting the struggles of orphans and vulnerable families to
            inspire collective action.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-[#F3F2E7] p-4 sm:p-6 rounded-2xl">
          <div className="flex items-center gap-2 sm:gap-4">
            <img
              src={RelievingPoverty}
              alt="Relieving Poverty"
              className="p-1 sm:p-2 w-8 h-8 sm:w-auto sm:h-auto"
            />
            <h1 className="text-lg sm:text-xl md:text-2xl">Relieving Poverty</h1>
          </div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base">
            Empowering families through long-term solutions like farming, sewing
            machines, and egg incubators.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BashkeveprimiFeatures;
