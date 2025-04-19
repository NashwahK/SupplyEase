import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import GreetingCard from "../components/GreetingCard";
import QuickCard from "../components/QuickCards";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import Scale from "../components/Scale";
import MainBg from "../../public/assets/DashboardBg.png"
import { supabase } from "../supabaseClient";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleRetailers = () => {
    navigate("/rlandingpage");
  };

  const statData = [
    {
      title: "Inventory Quantity",
      value: "1,420",
      percentage: "13%",
      isPositive: true,
    },
    {
      title: "Order Fulfillment Rate",
      value: "92%",
      percentage: "8%",
      isPositive: true,
    },
    {
      title: "Days of Supply",
      value: "36",
      percentage: "2%",
      isPositive: true,
    },
  ];

  return (
    <div className="min-h-screen text-white" 
      style={{ backgroundImage: `url(${MainBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <GreetingCard />

      <div className="px-6 my-4 flex gap-4 flex-wrap">
        <button
          onClick={handleRetailers}
          className="p-3 rounded-md bg-red-800 text-white text-sm"
        >
          Retailers
        </button>
      </div>

      <div className="px-6 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column - QuickCards */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          {statData.map((stat, index) => (
            <QuickCard key={index} {...stat} />
          ))}
        </div>

        {/* Right Columns - Graphs */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <BarChart title="Stock Levels" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieChart title="Product Categories" />
            <Scale title="Supply Chain Efficiency" percentage={75} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
