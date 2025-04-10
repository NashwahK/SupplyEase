import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const BarChartCard = ({ title, data, colors = ["#3EF3E3", "#BB7CF7"] }) => (
  <div className="bg-[#1E1033] p-4 rounded-xl text-white shadow-md w-full">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="text-sm text-purple-300">February 2025</span>
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Bar dataKey="value1" fill={colors[0]} />
        <Bar dataKey="value2" fill={colors[1]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default BarChartCard;
