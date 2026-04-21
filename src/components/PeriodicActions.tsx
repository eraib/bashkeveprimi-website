import { useEffect, useRef, useState } from "react";
import littleOrphan from "../assets/images/little-orphan.svg";
import lineCircle from "../assets/icons/line-circle.svg";
import squiggle from "../assets/icons/squiggle.svg";
import { useProjectsList } from "../lib/queries";
import { useDonation } from "../lib/DonationContext";

export default function PeriodicActions() {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const currentIndexRef = useRef(0);
  const { openModal } = useDonation();

  const { data } = useProjectsList({
    ordering: "-created_at",
    is_active: true,
    page: 1,
  });

  const items =
    data?.results?.slice(0, 5).map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      slogan: "Change a Life.",
      description: project.summary,
      image: project.cover_image || littleOrphan,
    })) ??
    [
      {
        id: 1,
        slug: undefined as string | undefined,
        title: "Give package",
        slogan: "Change a Life.",
        description:
          "From emergency food packs to long-term hunger solutions, every gift you make feeds hope, restores dignity, and sustains lives. Make an impact one meal, one family at a time.",
        image: littleOrphan,
      },
    ];

	useEffect(() => {
		const slider = sliderRef.current;
		if (!slider) return;

		const slideCount = items.length;

	const startInterval = () =>
		setInterval(() => {
			const nextIndex = (currentIndexRef.current + 1) % slideCount;
			slider.scrollTo({
				left: nextIndex * slider.clientWidth,
				behavior: "smooth",
			});
			currentIndexRef.current = nextIndex;
			setCurrentIndex(nextIndex);
		}, 3000);

		let intervalId = startInterval();
		let scrollResetTimer: ReturnType<typeof setTimeout>;

		const handleScroll = () => {
			const slideWidth = slider.clientWidth;
			if (slideWidth > 0) {
				const newIndex = Math.round(slider.scrollLeft / slideWidth);
				if (newIndex < slideCount && newIndex !== currentIndexRef.current) {
					currentIndexRef.current = newIndex;
					setCurrentIndex(newIndex);
				}
			}

			// Reset the auto-advance timer on every manual scroll so it
			// doesn't fire immediately after the user finishes swiping.
			clearInterval(intervalId);
			clearTimeout(scrollResetTimer);
			scrollResetTimer = setTimeout(() => {
				intervalId = startInterval();
			}, 3000);
		};

		slider.addEventListener("scroll", handleScroll);

		return () => {
			clearInterval(intervalId);
			clearTimeout(scrollResetTimer);
			slider.removeEventListener("scroll", handleScroll);
		};
	}, [items.length]);

	return (
		<div className="relative w-full min-h-[500px] md:h-[600px] overflow-hidden bg-[#F3F2E7] rounded-[8px]">
			{/* Static decorative elements - outside slider */}
			{/* Darker blue circle - CSS generated */}
			<div className="absolute md:flex items-center justify-center left-[825px] w-[1207px] h-[1034px] top-[-23px] z-30 pointer-events-none">
				<div className="rotate-45">
					<div className="bg-[#00CFD0] w-[673px] h-[1034px] rounded-[380px]"></div>
				</div>
			</div>

			{/* Squiggle SVG - positioned in top-right corner */}
			<img
				src={squiggle}
				alt="Background squiggle"
				className="absolute top-[-10px] right-[50px] w-[144px] h-[279px] z-40 pointer-events-none hidden md:block"
			/>

			{/* Line circle SVG - positioned according to Figma */}
			<img
				src={lineCircle}
				alt="Background line circle"
				className="absolute right-[300px] bottom-[65px] w-[200px] h-[200px] md:w-[300px] md:h-[300px] pointer-events-none hidden lg:block z-40"
			/>

			{/* Darker small blue circle - CSS generated */}
			<div className="absolute hidden lg:flex -right-[900px] bottom-0 w-[1207px] z-30 pointer-events-none">
				<div className="bg-[#00A5A6] w-[228px] h-[228px] rounded-full"></div>
			</div>

			{/* Pagination dots */}
			<div className="absolute top-4 left-4 md:top-[48px] md:left-[98px] flex gap-2 items-center z-50">
			{items.map((_, index) => (
				<button
					key={index}
					onClick={() => {
						const slider = sliderRef.current;
						if (!slider) return;
						slider.scrollTo({ left: index * slider.clientWidth, behavior: "smooth" });
						currentIndexRef.current = index;
						setCurrentIndex(index);
					}}
					className={`rounded-full transition-all ${
						index === currentIndex
							? "w-3 h-3 md:w-[19px] md:h-[19px] bg-[#00C8C8]"
							: "w-2 h-2 md:w-[8px] md:h-[8px] bg-[#D9D9D9]"
					}`}
				/>
			))}
			</div>

			<div
		ref={sliderRef}
			className="relative flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar">
				{items.map((item) => (
					<div
					key={item.id}
					className="flex-none w-full min-h-[500px] md:h-[600px] bg-[#F3F2E7] flex flex-col md:flex-row rounded-[8px] snap-start">
						<div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-8 md:pl-[98px] md:pr-[48px] py-8 md:py-[48px] relative z-40">
							<div className="flex flex-col gap-6 md:gap-[48px] max-w-full md:w-[517px]">
								<div className="flex flex-col gap-4 md:gap-[24px]">
									<h1 className="text-2xl sm:text-3xl md:text-3xl xl:text-5xl leading-normal text-black">
										<span className="font-light">{item.title} </span>
										<span className="font-bold">{item.slogan}</span>
									</h1>
									<p className="text-sm md:text-[14px] leading-6 md:leading-[26px] tracking-[0.14px] text-black font-light max-w-full md:w-[415px]">
										{item.description}
									</p>
								</div>
							<button
								onClick={() => openModal("project", item.slug)}
								className="bg-[#00CFD0] text-white text-[14px] uppercase py-3 px-8 rounded-[24px] w-full sm:w-[202px] h-[48px] flex items-center justify-center hover:bg-[#00b6b7] transition font-bold">
								Make A Donation
							</button>
							</div>
						</div>

						<div className="w-full md:w-1/2 flex justify-center items-center relative py-4 md:py-0 z-49">
							<div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] rounded-full bg-white overflow-hidden z-50">
								<img
									src={item.image}
									alt={item.title}
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
