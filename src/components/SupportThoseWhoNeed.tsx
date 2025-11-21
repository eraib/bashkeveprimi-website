import PeopleWithBoxes from "../assets/images/PeopleWithboxes.svg";

const SupportThoseWhoNeed = () => {
  return (
    <div className="grid grid-cols-2 gap-0 p-12 bg-[#F3F2E7] ">
      {/* Image Section */}
      <div className="flex items-center justify-center ">
        <img src={PeopleWithBoxes} alt="People with boxes" />
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center p-6 ">
        <h1 className="text-5xl font-bold">
          Make a Difference, Support Those in Need
        </h1>
        <p className="pt-4 leading-relaxed">
          At Bashkveprimi, we believe that even the smallest act of kindness can
          bring about great change. Every day, countless families in Kosovo face
          poverty, hunger, and uncertainty. Through your support, we are able to
          provide food packages, clean drinking water, education opportunities
          for children, healthcare, winter aid, and a safe embrace for orphans.
          Your donation is not just a gift—it is a message of hope, reminding
          people in need that they are not forgotten. Together, we can restore
          dignity, ease suffering, and give vulnerable families the chance to
          stand on their own feet. By joining hands, we transform compassion
          into action, and action into lasting impact.
        </p>
        <h1 className="pt-6 font-semibold">Bashkveprimi Team</h1>
      </div>
    </div>
  );
};

export default SupportThoseWhoNeed;
