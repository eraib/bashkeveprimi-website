import { useEffect, useRef } from "react";
import littleOrphan from "../assets/images/little-orphan.svg";

export default function PeriodicActions() {
	const sliderRef = useRef<HTMLDivElement>(null);

	const items = [
		{
			id: 1,
			title: "Support Orphans",
			slogan: "Change Someone’s Life",
			description:
				"Every child deserves love, care, and a chance to dream. Your support can help provide food, shelter, and education to orphans in need. Together, we can build a brighter future—one child at a time.",
			image: littleOrphan,
		},
		{
			id: 2,
			title: "Help Street Animals",
			slogan: "Change Someone’s Life",
			description:
				"Your donation helps feed and care for abandoned animals in your city. Every little bit counts!",
			image: littleOrphan,
		},
		{
			id: 3,
			title: "Support Children’s Education",
			slogan: "Change Someone’s Life",
			description:
				"We provide school supplies and tuition for children in rural areas who can’t afford education.",
			image: littleOrphan,
		},
	];

	useEffect(() => {
		const slider = sliderRef.current;
		if (!slider) return;

		let currentIndex = 0;
		const slideCount = items.length;

		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % slideCount;
			const nextSlide = slider.children[currentIndex] as HTMLElement;

			slider.scrollTo({
				left: nextSlide.offsetLeft,
				behavior: "smooth",
			});
		}, 3000);

		return () => clearInterval(interval);
	}, [items.length]);

	return (
		<div className="relative w-full min-h-[500px] md:h-128 overflow-hidden">
			<div className="absolute -left-8 md:-left-16 -top-5 md:-top-7 w-16 h-16 md:w-[122px] md:h-[122px] bg-[#E3E2CD] rounded-full z-99 pointer-events-none"></div>

			<div className=" md:block absolute md:w-[674px] w-[300px] md:h-[1034px] h-[510px] bg-[#00CFD0] rounded-[380px] rotate-45 md:top-20  md:right-[-200px] top-50  right-[-100px] z-30 pointer-events-none"></div>

			<div
				ref={sliderRef}
				className="relative flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar ">
				{items.map((item) => (
					<div
						key={item.id}
						className="flex-none w-screen min-h-[500px] md:h-128 bg-[#F3F2E7] flex flex-col md:flex-row rounded-lg shadow-md snap-start">
						<div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-8 md:py-0 relative z-40">
							<h1 className="text-xl sm:text-2xl md:text-3xl text-black mb-2">
								{item.title}
							</h1>
							<h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">
								{item.slogan}
							</h1>
							<p className="text-black font-light text-xs sm:text-sm md:text-[14px] leading-6 md:leading-[26px] tracking-[0.01em] mb-6 max-w-md">
								{item.description}
							</p>
							<button className="bg-[#00CFD0] text-black font-medium py-3 px-6 rounded-md hover:bg-[#00b6b7] transition w-full sm:w-auto sm:max-w-48 text-sm md:text-base">
								Donate Now
							</button>
						</div>

						<div className="w-full md:w-1/2 flex justify-center items-center relative py-4 md:py-0 z-90">
							<img
								src={item.image}
								alt={item.title}
								className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
