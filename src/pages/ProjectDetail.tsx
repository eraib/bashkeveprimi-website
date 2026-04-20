import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingBar from "../components/LoadingBar";
import WaterSupply from "../assets/images/water-suply.svg";
import { useProjectDetail } from "../lib/queries";
import { useDonation } from "../lib/DonationContext";

function ProjectDetail() {
	const { slug } = useParams<{ slug: string }>();
	const { data, isLoading, isError, error } = useProjectDetail(slug);
	const { openModal } = useDonation();

	const formatCurrency = (amount: string) =>
		Number(amount).toLocaleString("en-US");

	const goal = data?.goal_amount ? Number(data.goal_amount) : 0;

	return (
		<>
			<Header />
			<main className="min-h-screen mt-1 pb-20">
				<div className="max-w-4xl mx-auto px-4 py-10">
					<Link
						to="/projects"
						className="inline-block text-[#00CFD0] hover:underline mb-8">
						← Back to projects
					</Link>

					{isLoading && (
						<div className="animate-pulse space-y-6">
							<div className="h-10 bg-black/10 rounded w-3/4" />
							<div className="h-64 bg-black/10 rounded-lg" />
							<div className="h-4 bg-black/10 rounded w-full" />
							<div className="h-4 bg-black/10 rounded w-5/6" />
						</div>
					)}

					{isError && (
						<p className="text-red-600" role="alert">
							{error instanceof Error
								? error.message
								: "Could not load this project."}
						</p>
					)}

					{!isLoading && !isError && data && (
						<article>
							<header className="mb-8">
								{data.cause_detail && (
									<p className="text-sm uppercase tracking-wider text-[#00CFD0] mb-2">
										{data.cause_detail.title}
									</p>
								)}
								<h1 className="text-4xl font-bold text-[#3A1700] mb-4">
									{data.title}
								</h1>
								<p className="text-lg text-[#3A1700]/85">{data.summary}</p>
							</header>

							{data.cover_image && (
								<img
									src={data.cover_image}
									alt=""
									className="w-full max-h-112 object-cover rounded-lg shadow-lg mb-10"
								/>
							)}
							{!data.cover_image && (
								<img
									src={WaterSupply}
									alt=""
									className="w-full max-h-112 object-cover rounded-lg shadow-lg mb-10 opacity-90"
								/>
							)}

						<div className="flex flex-col gap-4 mb-10 max-w-xl">
							<div className="flex justify-between items-baseline gap-4 text-[#3A1700]">
								<span className="text-xl font-medium">
									{formatCurrency(data.total_donated)}€ raised
								</span>
								{goal > 0 && (
									<span className="text-base text-[rgba(58,23,0,0.5)]">
										{formatCurrency(String(goal))}€ goal
									</span>
								)}
							</div>
							<LoadingBar value={data.donation_progress} max={100} />
							<button
								onClick={() => openModal("project", data.slug)}
								className="mt-2 bg-[#00CFD0] text-white font-bold px-8 py-3 rounded-full hover:bg-[#00b6b7] transition w-fit">
								Donate to This Project
							</button>
						</div>

							<div
								className="max-w-none text-[#3A1700] space-y-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-semibold [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-[#00CFD0] [&_img]:max-w-full [&_img]:rounded-lg"
								dangerouslySetInnerHTML={{ __html: data.content }}
							/>
						</article>
					)}
				</div>
			</main>
			<Footer />
		</>
	);
}

export default ProjectDetail;
