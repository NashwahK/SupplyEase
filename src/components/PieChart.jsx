import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PieChartCard = ({ title, data }) => (
  <div className="bg-[#1E1033] p-4 rounded-xl text-white shadow-md w-full">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie dataKey="value" data={data} innerRadius={50} outerRadius={80} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default PieChartCard;
