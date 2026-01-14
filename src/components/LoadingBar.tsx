type LoadingBarProps = {
  value: number;
  max: number;
};

const LoadingBar: React.FC<LoadingBarProps> = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full bg-[#e6e4d6] rounded-[4px] h-[8px] overflow-hidden">
      <div
        className="h-[8px] bg-[#2fb0ab] rounded-[4px] transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default LoadingBar;
