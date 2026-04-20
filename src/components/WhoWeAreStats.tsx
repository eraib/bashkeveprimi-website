import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import type { AboutStat } from "../lib/api";

type Props = {
	stats?: AboutStat[];
	ctaTitle?: string;
	ctaLinkText?: string;
	ctaUrl?: string;
};

const DEFAULT_STATS: AboutStat[] = [
	{ id: 1, value: "1.2k+", label: "Projects Completed", order: 0 },
	{ id: 2, value: "100+", label: "Monthly Donors", order: 1 },
	{ id: 3, value: "68K+", label: "Donations Received", order: 2 },
];

const WhoWeAreStats = ({
	stats,
	ctaTitle,
	ctaLinkText,
	ctaUrl,
}: Props) => {
	const displayStats = (stats && stats.length > 0 ? stats : DEFAULT_STATS)
		.slice()
		.sort((a, b) => a.order - b.order);

	return (
		<section className="bg-white py-12 md:py-16">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-10">
				<div className="grid overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(33,52,48,0.12)] md:grid-cols-2 lg:grid-cols-4">
					{displayStats.map((stat) => (
						<div
							key={stat.id}
							className="flex min-h-[170px] flex-col items-center justify-center border-b border-[#EDEDED] px-6 py-7 text-center md:border-r md:border-b-0 lg:last:border-r-0">
							<p className="font-['Rowdies'] text-4xl text-[#00CFD0]">{stat.value}</p>
							<div className="my-3 h-[2px] w-14 rounded-full bg-black/60" />
							<p className="font-['Rowdies'] text-base font-light text-[#213430]">
								{stat.label}
							</p>
						</div>
					))}

					<div className="flex min-h-[170px] flex-col justify-center bg-[#00A5A6] px-8 py-7 text-white">
						<p className="font-['Rowdies'] text-xl font-light leading-snug">
							{ctaTitle ?? (
								<>
									Our Goal is to
									<br />
									Help Poor People
								</>
							)}
						</p>
						<Link
							to={ctaUrl ?? "/requests"}
							className="mt-4 inline-flex items-center gap-2 font-['Rowdies'] text-sm font-light text-white/95 transition hover:text-white">
							{ctaLinkText ?? "Become volunteer"}
							<HiArrowRight className="h-4 w-4" />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhoWeAreStats;
