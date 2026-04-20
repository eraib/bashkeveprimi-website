import HandOverHeart from "../assets/icons/HandOverHeart.svg";
import RibbonInsideHeart from "../assets/icons/RibbonInsideHeart.svg";
import PeopleInsideHeart from "../assets/icons/PeopleInsideHeart.svg";
import PeopleCarryingBoxes from "../assets/images/PeopleCarryingBoxes.svg";
import PeopleWithGrocieries from "../assets/images/PeopleWithGrocieries.svg";

type Props = {
	orgTitle?: string;
	missionText?: string;
	visionText?: string;
	valuesText?: string;
	orgImage1?: string | null;
	orgImage2?: string | null;
};

const OrganizationInfo = ({
	orgTitle,
	missionText,
	visionText,
	valuesText,
	orgImage1,
	orgImage2,
}: Props) => {
	const infoBlocks = [
		{
			title: "Our Mission",
			icon: HandOverHeart,
			text: missionText ??
				"At Bashkveprimi, our mission is to bring hope and dignity to vulnerable families across Kosovo. Through food, water, education, healthcare, and community support, we aim to ease hardship and open doors to a brighter future.",
		},
		{
			title: "Our Vision",
			icon: RibbonInsideHeart,
			text: visionText ??
				"We envision a society where no family is left behind, where children grow with opportunities, and where compassion unites communities to overcome poverty and injustice.",
		},
		{
			title: "Our Values",
			icon: PeopleInsideHeart,
			text: valuesText ??
				"Guided by empathy, transparency, and collective responsibility, we believe in the power of working together. Every action we take is rooted in sincerity, trust, and meaningful long-term impact.",
		},
	];

	return (
		<section className="bg-[#F3F2E7] py-12 md:py-16">
			<div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-8 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-10">
				<div>
					<h2 className="text-3xl font-bold leading-tight text-[#213430] sm:text-4xl">
						{orgTitle ?? "About our Organization"}
					</h2>
					<div className="mt-8 space-y-6">
						{infoBlocks.map((item) => (
							<div key={item.title}>
								<div className="flex items-center gap-3">
									<img src={item.icon} alt="" className="h-8 w-8" />
									<h3 className="text-xl font-semibold text-[#213430]">{item.title}</h3>
								</div>
								<p className="mt-3 leading-relaxed text-[#3A1700]/85">{item.text}</p>
							</div>
						))}
					</div>
				</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div className="overflow-hidden rounded-2xl">
					<img
						src={orgImage1 || PeopleWithGrocieries}
						alt="Volunteers with groceries"
						className="h-[320px] w-full object-cover"
					/>
				</div>
				<div className="overflow-hidden rounded-2xl">
					<img
						src={orgImage2 || PeopleCarryingBoxes}
						alt="People carrying aid boxes"
						className="h-[320px] w-full object-cover"
					/>
				</div>
			</div>
			</div>
		</section>
	);
};

export default OrganizationInfo;
