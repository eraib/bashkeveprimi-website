import { useState } from "react";
import { Link } from "react-router-dom";
import ThreeOrphans from "../assets/images/three-orphans.svg";
import LoadingBar from "./LoadingBar";
import { useOrphanProjectsList } from "../lib/queries";
import { useDonation } from "../lib/DonationContext";

const OrphansContent = () => {
	const { openModal } = useDonation();
	const [page, setPage] = useState(1);
	const { data, isLoading, isError, error } = useOrphanProjectsList({
		page,
		is_active: true,
		ordering: "-created_at",
	});

	const items = data?.results ?? [];
	const showPrev = Boolean(data?.previous);
	const showNext = Boolean(data?.next);
	const formatCurrency = (amount: string) =>
		Number(amount).toLocaleString("en-US");

	return (
		<div>
			<div className="flex flex-col items-center text-center max-w-3xl mx-auto py-10 px-4">
				<h1 className="text-4xl font-bold mb-4 text-[#3A1700]">Orphans</h1>
				<p className="text-lg leading-relaxed text-[#3A1700]/80">
					Support programs dedicated to children — your donations fund these
					initiatives directly.
				</p>
			</div>

			{isError && (
				<p className="text-center text-red-600 px-4 mb-6" role="alert">
					{error instanceof Error ? error.message : "Failed to load programs."}
				</p>
			)}

			<div className="flex flex-col gap-10 pt-2 pb-2 px-2 sm:px-4 max-w-6xl mx-auto">
				{isLoading && items.length === 0 ? (
					[...Array(2)].map((_, i) => (
						<div
							key={i}
							className="grid grid-cols-1 sm:grid-cols-2 gap-0 h-auto sm:min-h-96 rounded-lg overflow-hidden shadow-lg animate-pulse">
							<div className="bg-gray-200 h-56 sm:h-full min-h-56" />
							<div className="p-6 flex flex-col justify-center gap-4 bg-white">
								<div className="h-8 bg-gray-200 rounded w-2/3" />
								<div className="h-4 bg-gray-200 rounded w-full" />
								<div className="h-4 bg-gray-200 rounded w-5/6" />
							</div>
						</div>
					))
				) : (
					items.map((project, index) => {
						const imageSrc = project.cover_image || ThreeOrphans;
						const goal = project.goal_amount ? Number(project.goal_amount) : 0;
						return (
							<div
								key={project.id}
								className="grid grid-cols-1 sm:grid-cols-2 gap-0 h-auto sm:min-h-96 rounded-lg overflow-hidden shadow-lg">
								<div
									className={`bg-gray-200 ${
										index % 2 === 1 ? "order-2" : "order-1"
									}`}>
									<img
										src={imageSrc}
										alt=""
										className="w-full h-56 sm:h-full min-h-56 object-cover"
									/>
								</div>
								<div
									className={`p-4 sm:p-6 flex flex-col justify-center bg-white ${
										index % 2 === 1
											? "order-1 text-right pr-8"
											: "order-2 pl-8"
									}`}>
									<h2 className="sm:text-5xl text-3xl font-bold mb-4 text-[#3A1700]">
										<Link
											to={`/orphans/${encodeURIComponent(project.slug)}`}
											className="hover:text-[#00b6b7] transition-colors">
											{project.title}
										</Link>
									</h2>
									<p className="sm:text-lg text-md leading-relaxed max-w-xl text-[#3A1700]/85 mb-6">
										{project.summary}
									</p>
									<div className="flex flex-col gap-3 max-w-md sm:max-w-none mx-auto sm:mx-0">
										<div
											className={`flex justify-between items-baseline gap-4 text-[#3A1700] ${
												index % 2 === 1 ? "flex-row-reverse" : ""
											}`}>
											<span className="text-xl font-medium">
												{formatCurrency(project.total_donated)}€ raised
											</span>
											{goal > 0 && (
												<span className="text-base text-[rgba(58,23,0,0.5)]">
													{formatCurrency(String(goal))}€ goal
												</span>
											)}
										</div>
										<LoadingBar
											value={project.donation_progress}
											max={100}
										/>
									<div className="flex items-center gap-4 mt-1 flex-wrap">
										<Link
											to={`/orphans/${encodeURIComponent(project.slug)}`}
											className="inline-flex items-center text-[#00CFD0] font-medium hover:underline">
											Read more →
										</Link>
										<button
											onClick={() => openModal("orphan", project.slug)}
											className="bg-[#00CFD0] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#00b6b7] transition">
											Donate
										</button>
									</div>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>

			{!isLoading && !isError && items.length === 0 && (
				<p className="text-center text-[#3A1700]/70 py-12">
					No orphan programs to show right now.
				</p>
			)}

			{(showPrev || showNext) && (
				<div className="flex justify-center gap-4 py-10">
					<button
						type="button"
						disabled={!showPrev}
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						className="px-5 py-2 rounded-full border border-[#3A1700]/20 text-[#3A1700] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F3F2E7]">
						Previous
					</button>
					<button
						type="button"
						disabled={!showNext}
						onClick={() => setPage((p) => p + 1)}
						className="px-5 py-2 rounded-full border border-[#3A1700]/20 text-[#3A1700] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F3F2E7]">
						Next
					</button>
				</div>
			)}
		</div>
	);
};

export default OrphansContent;
