import AboutUsBackgroundImg from "../assets/images/AboutUsBackgroundImg.png";

const AboutUsBackground = () => {
  return (
    <div
      className="min-h-[600px] flex flex-col justify-center  text-white bg-cover bg-center bg-no-repeat p-8 relative"
      style={{ backgroundImage: `url(${AboutUsBackgroundImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative ">
        <p className="text-[14px]">About Us</p>
        <h1 className="text-[56px] font-bold max-w-[120px] ">Contact Us</h1>
        <p className="text-[14px] max-w-1/3">
          Let us know your thoughts, comments, or feedback. We love getting to
          meet new people and reconnecting with old friends.
        </p>
      </div>
    </div>
  );
};

export default AboutUsBackground;
