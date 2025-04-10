import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const QuickCard = ({ title, value, percentage, isPositive }) => {
  const arrowIcon = isPositive ? <ArrowUpRight className="text-green-400" /> : <ArrowDownRight className="text-red-400" />;
  const percentColor = isPositive ? "text-green-400" : "text-red-400";

  return (
    <div className="bg-[#1E1033] p-4 rounded-xl w-full text-white shadow-md space-y-1">
      <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
      <div className={`flex items-center gap-1 text-sm ${percentColor}`}>
        {arrowIcon}
        <span>{percentage}</span>
        <span className="text-gray-400 ml-1">compared to last week</span>
      </div>
    </div>
  );
};

export default QuickCard;
