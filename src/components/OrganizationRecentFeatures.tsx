import GroceriesSupply from "../assets/images/groceries-supply.svg";
import ThreeOrphans from "../assets/images/three-orphans.svg";
import WaterSupply from "../assets/images/water-suply.svg";
import LoadingBar from "./LoadingBar";

export const OrganizationRecentFeatures = () => {
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
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 parent px-2 sm:px-4">
			<div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center px-2">
				<h2
					className="
                w-full sm:w-auto sm:max-w-[514px] h-auto sm:h-8 
                font-inter font-light 
                text-xs sm:text-sm md:text-[16px] leading-6 sm:leading-8
                text-center tracking-[2px] sm:tracking-[3px] 
                uppercase text-[#00CFD0]
                flex-none
            ">
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
					className="rounded p-3 sm:p-4 overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition duration-300 bg-white">
					<img
						src={item.image}
						alt={item.title}
						className="w-full h-auto rounded-lg object-cover"
					/>

					<h1 className="text-base sm:text-xl font-bold text-gray-800 mt-4 mb-2">
						{item.title}
					</h1>

					<p className="mt-2 text-sm sm:text-base text-gray-600 line-clamp-3">
						{item.description}
					</p>

					<div className="flex justify-between w-full mt-1 text-sm sm:text-base">
						<h1>{item.collectedAmount + "€"}</h1>
						<h1>{item.demandedAmount + "€"}</h1>
					</div>

					<LoadingBar
						value={Number(item.collectedAmount)}
						max={Number(item.demandedAmount)}
					/>
					<button className="bg-[#00CFD0] mt-4 text-white font-medium py-3 px-6 items-center flex justify-center rounded-lg hover:bg-[#00b6b7] w-full text-base transition duration-300 ease-in-out shadow-md">
						Donate Now
					</button>
				</div>
			))}
		</div>
	);
};

export default OrganizationRecentFeatures;
