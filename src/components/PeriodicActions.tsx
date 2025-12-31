import { useEffect, useRef, useState } from "react";
import littleOrphan from "../assets/images/little-orphan.svg";
import lineCircle from "../assets/icons/line-circle.svg";
import squiggle from "../assets/icons/squiggle.svg";

export default function PeriodicActions() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      id: 1,
      title: "Give package",
      slogan: "Change a Life.",
      description:
        "From emergency food packs to long-term hunger solutions, every gift you make feeds hope, restores dignity, and sustains lives. Make an impact one meal, one family at a time.",
      image: littleOrphan,
    },
    {
      id: 2,
      title: "Help Street Animals",
      slogan: "Change Someone's Life",
      description:
        "Your donation helps feed and care for abandoned animals in your city. Every little bit counts!",
      image: littleOrphan,
    },
    {
      id: 3,
      title: "Support Children's Education",
      slogan: "Change Someone's Life",
      description:
        "We provide school supplies and tuition for children in rural areas who can't afford education.",
      image: littleOrphan,
    },
    {
      id: 4,
      title: "Support Orphans",
      slogan: "Change Someone's Life",
      description:
        "Every child deserves love, care, and a chance to dream. Your support can help provide food, shelter, and education to orphans in need.",
      image: littleOrphan,
    },
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let index = 0;
    const slideCount = items.length;

    const interval = setInterval(() => {
      index = (index + 1) % slideCount;
      const nextSlide = slider.children[index] as HTMLElement;

      slider.scrollTo({
        left: nextSlide.offsetLeft,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }, 3000);

    // Track scroll position to update currentIndex
    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const slideWidth = slider.children[0]?.clientWidth || 0;
      if (slideWidth > 0) {
        const newIndex = Math.round(scrollLeft / slideWidth);
        if (newIndex < items.length) {
          setCurrentIndex((prev) => (prev !== newIndex ? newIndex : prev));
        }
      }
    };

    slider.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
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
          <div
            key={index}
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
        className="relative flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-none w-screen min-h-[500px] md:h-[600px] bg-[#F3F2E7] flex flex-col md:flex-row rounded-[8px] snap-start">
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
                <button className="bg-[#00CFD0] text-white text-[14px] uppercase py-3 px-8 rounded-[24px] w-full sm:w-[202px] h-[48px] flex items-center justify-center hover:bg-[#00b6b7] transition font-bold">
                  Make A Donation
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center relative py-4 md:py-0 z-50">
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
