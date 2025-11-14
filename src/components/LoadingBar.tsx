type LoadingBarProps = {
  value: number;
  max: number;
};

const LoadingBar: React.FC<LoadingBarProps> = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full bg-white rounded-full h-3 border border-gray-200 overflow-hidden mb-2 mt-2 ">
      <div
        className="h-3  transition-all duration-500"
        style={{ width: `${percentage}%`, backgroundColor: "#00CFD0" }}
      ></div>
    </div>
  );
};

export default LoadingBar;
