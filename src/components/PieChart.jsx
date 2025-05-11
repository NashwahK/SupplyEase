import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import DatePicker from "react-datepicker";
import { supabase } from "../supabaseClient";
<<<<<<< HEAD
=======
import "react-datepicker/dist/react-datepicker.css";
import Skeleton from "react-loading-skeleton"; // Import Skeleton
>>>>>>> master

const COLORS = ["#4ACBAE", "#9E5DC5", "#5DA5D1"];

const PieChartCard = ({ title }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);
<<<<<<< HEAD

  useEffect(() => {
    const fetchChartData = async () => {
      const month = selectedDate.getMonth() + 1;

      const { data, error } = await supabase
        .rpc("get_product_category_orders_by_month", { month_input: month });

      if (error) {
        console.error("Error fetching pie chart data:", error);
=======
  const [loading, setLoading] = useState(true); // Track loading state
  const year = selectedDate.getFullYear();

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true); 
      const month = selectedDate.getMonth() + 1;
      const { data, error } = await supabase.rpc("get_product_category_orders_by_month", {
        month_input: month,
        year_input: year,
      });

      if (error) {
        console.error("Error fetching pie chart data:", error);
        setLoading(false);
>>>>>>> master
        return;
      }

      const formatted = data.map((item, index) => ({
        name: item["Product Category"],
        value: item["Items Ordered Per Month"],
        color: COLORS[index % COLORS.length],
      }));

      setChartData(formatted);
<<<<<<< HEAD
    };

    fetchChartData();
  }, [selectedDate]);
=======
      setLoading(false); 
    };

    fetchChartData();
  }, [selectedDate, year]);
>>>>>>> master

  return (
    <div className="bg-[#2E2047] p-4 rounded-xl text-white shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
<<<<<<< HEAD
        <h3 className="text-lg font-semibold">{title}</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="text-sm text-purple-300 border border-purple-400 rounded px-2 py-1 focus:outline-none cursor-pointer"
        />
      </div>

      <div className="pt-4" style={{ height: "250px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              data={chartData}
              innerRadius={0}
              outerRadius={80}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
=======
        {/* Skeleton for the title */}
        <h3 className="text-lg font-semibold">
          {loading ? <Skeleton width={150} /> : title}
        </h3>

        {loading ? (
          <Skeleton width={120} height={35} />
        ) : (
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="text-sm text-purple-300 border border-purple-400 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
            calendarClassName="react-datepicker-calendar"
            wrapperClassName="react-datepicker-wrapper"
            popperClassName="react-datepicker-popper"
            dayClassName={(date) => "text-gray-700 hover:bg-purple-200"}
          />
        )}
      </div>
      {loading ? (
        <Skeleton height={250} />
      ) : (
        <div className="pt-4" style={{ height: "250px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                data={chartData}
                innerRadius={0}
                outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
>>>>>>> master
    </div>
  );
};

<<<<<<< HEAD
export default PieChartCard;
=======
export default PieChartCard;
>>>>>>> master
