import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { supabase } from "../supabaseClient";

const BarChartCard = ({ title }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const month = selectedDate.getMonth() + 1;

      const { data, error } = await supabase.rpc("get_department_items_by_month", {
        month_input: month,
      });

      if (error) {
        console.error("Error fetching chart data:", error);
        return;
      }

      const colors = ["#4ACBAE", "#9E5DC5", "#5DA5D1"];

      const formatted = data.map((item, index) => ({
        name: item["Department Name"],
        value: item["Items Per Month"],
        color: colors[index % colors.length],
      }));

      setChartData(formatted);
    };

    fetchChartData();
  }, [selectedDate]);

  return (
    <div className="bg-[#2E2047] p-4 rounded-xl text-white shadow-md w-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-semibold">{title}</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="text-sm text-purple-300 border border-purple-400 rounded px-2 py-1 focus:outline-none cursor-pointer"
        />
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} barCategoryGap="10%" barSize={30}>
          <CartesianGrid stroke="#9C9C9C" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="#9C9C9C"
            tick={{ fontSize: 10 }}
            interval={0}
            padding={{ bottom: 10 }}
          />
          <YAxis stroke="#9C9C9C" />
          <Tooltip />
          <Bar dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
