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
          className="flex-none w-screen h-128 bg-[#F3F2E7] flex rounded-lg shadow-md snap-start"
        >
          {/* Left text */}
          <div className="w-1/2 flex flex-col justify-center text-left px-20 relative overflow-hidden">
            {/* Oval element */}
            <div className="absolute -left-16 -top-2.5 w-[122px] h-[122px] bg-[#E3E2CD] rounded-full z-10 "></div>

            {/* Text content */}
            <h1 className="text-3xl text-black mb-2">{item.title}</h1>
            <h1 className="text-2xl font-bold text-black mb-4">{item.slogan}</h1>
            <p className="text-black font-light text-[14px] leading-[26px] tracking-[0.01em] mb-6 max-w-md">
              {item.description}
            </p>
            <button className="bg-[#00CFD0] text-black font-medium py-3 px-6 rounded-md hover:bg-[#00b6b7] transition max-w-48">
              Donate Now
            </button>
          </div>


          {/* Right image */}
          <div className="w-1/2 flex justify-center items-center relative overflow-hidden">
            {/* Rotated rectangle at bottom-right */}
            <div className="absolute w-[674px] h-[1034px] bg-[#00CFD0] rounded-[380px] rotate-45 top-20 left-80 z-0"></div>

            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-96 h-96 object-cover rounded-full relative z-10"
            />
          </div>

        </div>
      ))}
    </div>
  );
}
