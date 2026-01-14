import GroceriesSupply from "../assets/images/groceries-supply.svg";
import ThreeOrphans from "../assets/images/three-orphans.svg";
import WaterSupply from "../assets/images/water-suply.svg";
import LoadingBar from "./LoadingBar";

export const OrganizationRecentFeatures = () => {
  const formatCurrency = (amount: string) => {
    return Number(amount).toLocaleString("en-US");
  };

  const causes = [
    {
      id: 1,
      title: "Support Orphans",
      demandedAmount: "10000",
      collectedAmount: "9500",
      description:
        "Every child deserves love, care, and a chance to dream. Your support can help provide food, shelter, and education to orphans in need. Together, we can build a brighter future—one child at a time.",
      image: GroceriesSupply,
    },
    {
      id: 2,
      title: "Help Street Animals",
      demandedAmount: "10000",
      collectedAmount: "180",
      description:
        "Your donation helps feed and care for abandoned animals in your city. Every little bit counts!",
      image: ThreeOrphans,
    },
    {
      id: 3,
      title: "Support Children’s Education",
      demandedAmount: "10000",
      collectedAmount: "1500",
      description:
        "We provide school supplies and tuition for children in rural areas who can’t afford education.",
      image: WaterSupply,
    },
    {
      id: 4,
      title: "Provide Clean Water",
      demandedAmount: "5000",
      collectedAmount: "3200",
      description:
        "Millions lack access to clean water. Fund a well or filtration system to bring life-sustaining water to a community in need, improving health and reducing disease.",
      image: WaterSupply,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 parent px-4 sm:px-8 lg:px-[100px] py-12 sm:py-16 lg:py-[96px] bg-[#F3F2E7]">
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center px-2">
        <h2
          className="
                w-full sm:w-auto sm:max-w-[514px] h-auto sm:h-8 
                font-inter font-light 
                text-xs sm:text-sm md:text-[16px] leading-6 sm:leading-8
                text-center tracking-[2px] sm:tracking-[3px] 
                uppercase text-[#00CFD0]
                flex-none">
          OUR CASES
        </h2>
        <h1
          className="
                w-full sm:w-auto sm:max-w-[514px] h-auto sm:h-8 
                font-inter font-medium 
                text-2xl sm:text-3xl md:text-4xl lg:text-[56px] leading-tight sm:leading-8 
                text-center tracking-[-1px] sm:tracking-[-2px] 
                text-[#3A1700]
                flex-none mt-1 sm:mt-0
            ">
          Our Recent Causes
        </h1>
      </div>

      {causes.map((item) => (
        <div
          key={item.id}
          className="bg-[#F3F2E7] rounded-[20px] overflow-hidden hover:shadow-xl transition duration-300 pb-[30px] flex flex-col">
          <div className="w-full h-[250px] relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-tl-[20px] rounded-tr-[20px]"
            />
          </div>

          <div className="flex flex-col gap-[20px] px-[23px] pt-[15px]">
            <div className="flex flex-col gap-[10px]">
              <h1 className="font-['Inter'] font-bold text-[20px] leading-[1.35] text-[#243c4b]">
                {item.title}
              </h1>

              <p className="font-['Inter'] font-normal text-[16px] leading-[1.6] text-[#6d6d6d] overflow-hidden text-ellipsis line-clamp-2">
                {item.description}
              </p>
            </div>

            <div className="flex flex-col gap-[24px]">
              <div className="flex justify-between items-center font-['Manrope'] font-normal leading-[32px]">
                <p className="text-[20px] text-[#3a1700]">
                  {formatCurrency(item.collectedAmount)}€
                </p>
                <p className="text-[16px] text-[rgba(58,23,0,0.5)] text-right">
                  {formatCurrency(item.demandedAmount)}€ Goal
                </p>
              </div>

              <LoadingBar
                value={Number(item.collectedAmount)}
                max={Number(item.demandedAmount)}
              />
            </div>

            <button className="bg-[#00CFD0] h-[48px] w-[202px] rounded-[24px] text-white font-['Rowdies'] font-normal text-[14px] uppercase flex items-center justify-center hover:bg-[#00b6b7] transition duration-300">
              Make A Donation
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrganizationRecentFeatures;
