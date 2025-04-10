import { useState } from "react";
import DatePicker from "react-datepicker";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const BarChartCard = ({ title, data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="bg-[#2E2047] p-4 rounded-xl text-white shadow-md w-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-semibold">{title}</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          className="text-sm text-purple-300 border border-purple-400 rounded px-2 py-1 focus:outline-none cursor-pointer"
        />
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barCategoryGap="25%" barSize={60}>
          <CartesianGrid stroke="#9C9C9C" vertical={false} />
          <XAxis dataKey="name" stroke="#9C9C9C" />
          <YAxis stroke="#9C9C9C" />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
