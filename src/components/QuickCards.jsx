import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const QuickCard = ({ title, value, percentage, isPositive }) => {
  const arrowIcon = isPositive ? <ArrowUpRight className="text-[#45F996]" /> : <ArrowDownRight className="text-[F94545]" />;
  const percentColor = isPositive ? "text-[#45F996]" : "text-[]#F94545]";

  return (
    <div className="bg-[#2E2047] p-4 rounded-xl w-72 h-48 text-white shadow-md space-y-1">
      <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
      <p className="text-5xl font-bold text-center pt-4">{value}</p>
      <div className={`flex flex-col items-center text-center gap-1 text-sm ${percentColor}`}>
        <div className="flex items-center pt-2 gap-1">
          {arrowIcon}
          <span>{percentage}</span>
        </div>
        <span className="pt-2 text-gray-400">compared to last week</span>
      </div>
    </div>
  );
  
};

export default QuickCard;
