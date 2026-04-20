import PeopleWithBoxes from "../assets/images/PeopleWithboxes.svg";

type Props = {
	title?: string;
	body?: string;
	image?: string | null;
};

const DEFAULT_PARAGRAPHS = [
	"At Bashkveprimi, we believe even the smallest act of kindness can create lasting change. Every day, families in Kosovo face poverty, hunger, and uncertainty. With your support, we provide food packages, clean water, education opportunities, healthcare, winter aid, and safe care for orphans.",
	"Your donation is not just a gift - it is hope. Together we restore dignity, ease suffering, and help vulnerable families stand on their own feet.",
];

const SupportThoseWhoNeed = ({ title, body, image }: Props) => {
	const paragraphs = body
		? body.split("\n\n").filter(Boolean)
		: DEFAULT_PARAGRAPHS;

	return (
		<section className="bg-[#F3F2E7] py-12 md:py-16">
		<div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-8 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-10">
			<div className="flex items-start justify-center">
				<img
					src={image || PeopleWithBoxes}
					alt="Support"
					className="h-auto w-full max-w-xl rounded-2xl object-contain"
				/>
			</div>

				<div>
					<h2 className="text-3xl font-bold leading-tight text-[#213430] sm:text-4xl">
						{title ?? "Make a Difference, Support Those in Need"}
					</h2>
					{paragraphs.map((p, i) => (
						<p key={i} className="mt-4 text-base leading-relaxed text-[#3A1700]/85">
							{p}
						</p>
					))}
					<p className="mt-6 font-semibold text-[#213430]">Bashkveprimi Team</p>
				</div>
			</div>
		</section>
	);
};

export default SupportThoseWhoNeed;
