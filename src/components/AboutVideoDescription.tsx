import ObvCharityCase from "../assets/videos/ObvCharityCase.mp4";

type Props = {
	videoTitle?: string;
	videoUrl?: string | null;
};

const AboutVideoDescription = ({ videoTitle, videoUrl }: Props) => {
	return (
		<section className="bg-[#F3F2E7] py-12 md:py-16">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-10">
				<h2 className="mx-auto max-w-3xl text-center text-3xl font-bold leading-tight text-[#213430] sm:text-4xl">
					{videoTitle ?? "Transforming lives through love and generosity."}
				</h2>

				<div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-xl shadow-lg">
					<video
						src={videoUrl || ObvCharityCase}
						controls
						muted
						className="max-h-[520px] w-full bg-black object-contain"
					/>
				</div>
			</div>
		</section>
	);
};

export default AboutVideoDescription;
