import HandOverHeart from "../assets/icons/HandOverHeart.svg";
import RibbonInsideHeart from "../assets/icons/RibbonInsideHeart.svg";
import PeopleInsideHeart from "../assets/icons/PeopleInsideHeart.svg";
import PeopleCarryingBoxes from "../assets/images/PeopleCarryingBoxes.svg";
import PeopleWithGrocieries from "../assets/images/PeopleWithGrocieries.svg";

const OrganizationInfo = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-0 bg-[#F3F2E7] m-1 p-3 ">
      <div className="col-start-1 col-end-2 row-start-1 row-end-2">
        <div className="grid grid-cols-1 grid-rows-7 gap-0">
          <div className="row-start-1 row-end-2">
            <h1 className="text-5xl ">About our Organization</h1>
          </div>
          <div className="row-start-2 row-end-3 flex items-center gap-2">
            <img
              src={HandOverHeart}
              alt="Hand Over Heart"
              className="w-8 h-8"
            />
            <h1 className="text-lg font-semibold">Our Mission</h1>
          </div>
          <div className="row-start-3 row-end-4">
            <p>
              At Bashkveprimi, our mission is to bring hope and dignity to
              vulnerable families across Kosovo. Through food, water, education,
              healthcare, and community support, we aim to ease hardship and
              open doors to a brighter future.
            </p>
          </div>
          <div className="row-start-4 row-end-5 flex items-center gap-2">
            <img
              src={RibbonInsideHeart}
              alt="Hand Over Heart"
              className="w-8 h-8"
            />
            <h1 className="text-lg font-semibold">Our Vision</h1>{" "}
          </div>
          <div className="row-start-5 row-end-6">
            <p>
              We envision a society where no family is left behind, where
              children grow with opportunities, and where compassion unites
              communities to overcome poverty and injustice.
            </p>{" "}
          </div>
          <div className="row-start-6 row-end-7 flex items-center gap-2">
            <img
              src={PeopleInsideHeart}
              alt="Hand Over Heart"
              className="w-8 h-8"
            />
            <h1 className="text-lg font-semibold">Our Values</h1>{" "}
          </div>
          <div className="row-start-7 row-end-8">
            <p>
              Guided by empathy, transparency, and collective responsibility, we
              believe in the power of working together. Every action we take is
              rooted in sincerity, trust, and the goal of making a lasting
              impact.
            </p>{" "}
          </div>
        </div>
      </div>

      <div className="col-start-2 col-end-3 row-start-1 row-end-2 p-6">
        <div className="grid grid-cols-2 grid-rows-1 gap-0">
          <div className="col-start-1 col-end-2 row-start-1 row-end-2">
            <img src={PeopleWithGrocieries} alt="" />
          </div>
          <div className="col-start-2 col-end-3 row-start-1 row-end-2">
            <img src={PeopleCarryingBoxes} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo;
