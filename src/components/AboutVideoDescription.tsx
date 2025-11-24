import ObvCharityCase from "../assets/videos/ObvCharityCase.mp4";

const AboutVideoDescription = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#F3F2E7] p-12">
      <h1 className="max-w-1/2 text-5xl p-6 text-center">
        Transforming lives through love and generosity.
      </h1>

      <video
        src={ObvCharityCase}
        controls
        muted
        className="rounded-lg shadow-lg max-w-4xl max-h-96 w-full h-auto object-contain"
      />
    </div>
  );
};

export default AboutVideoDescription;
