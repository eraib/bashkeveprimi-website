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
    }, 3000); // change slide every 3 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div
      ref={sliderRef}
      className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar "
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="flex-none w-screen min-h-[500px] md:h-128 bg-[#F3F2E7] flex flex-col md:flex-row rounded-lg shadow-md snap-start"
        >
          {/* Left text */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-left px-4 sm:px-8 md:px-12 lg:px-20 py-8 md:py-0 relative overflow-hidden">
            {/* Oval element */}
            <div className="absolute -left-8 md:-left-16 -top-2.5 w-16 h-16 md:w-[122px] md:h-[122px] bg-[#E3E2CD] rounded-full z-10"></div>

            {/* Text content */}
            <h1 className="text-xl sm:text-2xl md:text-3xl text-black mb-2 z-10">{item.title}</h1>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 md:mb-4 z-10">{item.slogan}</h1>
            <p className="text-black font-light text-xs sm:text-sm md:text-[14px] leading-5 sm:leading-6 md:leading-[26px] tracking-[0.01em] mb-4 md:mb-6 max-w-md z-10">
              {item.description}
            </p>
            <button className="bg-[#00CFD0] text-black font-medium py-2.5 md:py-3 px-5 md:px-6 rounded-md hover:bg-[#00b6b7] transition w-full sm:w-auto sm:max-w-48 text-sm md:text-base z-10">
              Donate Now
            </button>
          </div>


          {/* Right image */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative overflow-hidden py-4 md:py-0">
            {/* Rotated rectangle at bottom-right */}
            <div className="hidden md:block absolute w-[674px] h-[1034px] bg-[#00CFD0] rounded-[380px] rotate-45 top-20 left-80 z-0"></div>

            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full relative z-10"
            />
          </div>

        </div>
      ))}
    </div>
  );
}
