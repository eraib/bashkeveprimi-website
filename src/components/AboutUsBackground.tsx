import AboutUsBackgroundImg from "../assets/images/AboutUsBackgroundImg.png";

type Props = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string | null;
};

const AboutUsBackground = ({ heroTitle, heroSubtitle, heroImage }: Props) => {
  const bg = heroImage || AboutUsBackgroundImg;

  return (
    <section
      className="relative min-h-[520px] bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative mx-auto flex min-h-[520px] w-full max-w-6xl items-center px-4 py-16 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-white/90">
            About Us
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {heroTitle ?? "Compassion in Action"}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
            {heroSubtitle ??
              "We stand with families and children in need across Kosovo by turning generosity into direct, practical support."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsBackground;
