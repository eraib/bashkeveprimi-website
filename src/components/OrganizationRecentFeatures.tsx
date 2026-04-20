import GroceriesSupply from "../assets/images/groceries-supply.svg";
import ThreeOrphans from "../assets/images/three-orphans.svg";
import WaterSupply from "../assets/images/water-suply.svg";
import LoadingBar from "./LoadingBar";
import { useCausesList } from "../lib/queries";
import { useDonation } from "../lib/DonationContext";

export const OrganizationRecentFeatures = () => {
  const { openModal } = useDonation();
  const formatCurrency = (amount: string) => {
    return Number(amount).toLocaleString("en-US");
  };

  const { data, isLoading } = useCausesList({
    ordering: "-created_at",
    is_active: true,
    page: 1,
  });

  const fallbackImages = [GroceriesSupply, ThreeOrphans, WaterSupply, WaterSupply];
  const causes = (data?.results ?? []).slice(0, 4).map((cause, idx) => {
    const collectedAmount = cause.total_donated ?? "0";
    const demandedAmount = cause.goal_amount ?? "0";

    return {
      id: cause.id,
      slug: cause.slug,
      title: cause.title,
      demandedAmount,
      collectedAmount,
      description: cause.summary,
      image: cause.cover_image || fallbackImages[idx] || WaterSupply,
    };
  });

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

      {isLoading && causes.length === 0 ? (
        [...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-[#F3F2E7] rounded-[20px] overflow-hidden pb-[30px] flex flex-col animate-pulse"
          >
            <div className="w-full h-[250px] bg-black/10" />
            <div className="flex flex-col gap-[20px] px-[23px] pt-[15px]">
              <div className="h-6 bg-black/10 rounded w-2/3" />
              <div className="h-4 bg-black/10 rounded w-full" />
              <div className="h-4 bg-black/10 rounded w-5/6" />
              <div className="h-12 bg-black/10 rounded w-[202px]" />
            </div>
          </div>
        ))
      ) : (
        causes.map((item) => (
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

            <button
              onClick={() => openModal("cause", item.slug)}
              className="bg-[#00CFD0] h-[48px] w-[202px] rounded-[24px] text-white font-['Rowdies'] font-normal text-[14px] uppercase flex items-center justify-center hover:bg-[#00b6b7] transition duration-300">
              Make A Donation
            </button>
          </div>
        </div>
        ))
      )}
    </div>
  );
};

export default OrganizationRecentFeatures;
