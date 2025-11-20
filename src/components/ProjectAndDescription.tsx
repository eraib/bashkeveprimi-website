import FerizajCow from "../assets/images/FerizajCow.svg";
import GjilanCow from "../assets/images/GjilanCow.svg";
import PrishtinaCow from "../assets/images/PrishtinaCow.svg";
import FoodInBox from "../assets/images/FoodInBox.png";

const projects = [
  {
    city: "Ferizaj",
    description:
      "Families in Ferizaj have benefited from dairy support, improving nutrition and income.",
    image: FerizajCow,
  },
  {
    city: "Gjilan",
    description:
      "Families in Gjilan have benefited from fresh dairy products and stable income opportunities, helping them cover school expenses and improve daily nutrition.",
    image: GjilanCow,
  },
  {
    city: "Prishtina",
    description:
      "In Prizren, the cow donation project helped families grow sustainable income sources.",
    image: PrishtinaCow,
  },
];
const projectType = {
  projectType: "Food package",
  description:
    "Families in Ferizaj have benefited from dairy support, improving nutrition and income.",
  image: FoodInBox,
};

const ProjectAndDescription = () => {
  return (
    <div>
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-4">{projectType.projectType}</h1>
        <p className="text-lg leading-relaxed mb-6">
          {projectType.description}
        </p>
        <img
          src={projectType.image}
          alt={projectType.projectType}
          className="w-full max-w-6xl rounded-lg shadow-lg"
        />
      </div>

      <div className="flex flex-col gap-10 pt-2 pb-2 ">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`grid grid-cols-2 gap-0 h-96 rounded-lg overflow-hidden shadow-lg`}
          >
            {/* Image Section */}
            <div
              className={`bg-gray-200 ${
                index % 2 === 1 ? "order-2" : "order-1"
              }`}
            >
              <img
                src={project.image}
                alt={project.city}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description Section */}
            <div
              className={`p-6 flex flex-col justify-center ${
                index % 2 === 1 ? "order-1 text-right pr-8" : "order-2 pl-8"
              }`}
            >
              <h1 className="text-5xl font-bold mb-4">{project.city}</h1>
              <p className="text-lg leading-relaxed max-w-xl">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectAndDescription;
