import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import GreetingCard from "../components/GreetingCard";
import QuickCard from "../components/QuickCards";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import Scale from "../components/Scale";
import DashboardBg from "../../public/assets/DashboardBg.png"
import { supabase } from "../supabaseClient";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      navigate("/");
    }
  };

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

  const stockLevelData = [
    { name: "Manufacturing", value: 800, fill:'#4ACBAE' },
    { name: "Production", value: 100, fill: '#9E5DC5' },
    { name: "Design", value: 900, fill: '#5DA5D1' },
    { name: "Stitching", value: 800, fill:'#4ACBAE' },
    { name: "Packaging", value: 300, fill: '#9E5DC5' },
    { name: "Shipping", value: 1000, fill: '#5DA5D1' },
  ];

  const pieChartData = [
    { name: "Pure Cotton", value: 50, color: "#4ACBAE" },
    { name: "Polyester", value: 20, color: "#9E5DC5" },
    { name: "Silk", value: 20, color: "#5DA5D1" },
    { name: "Wool", value: 10, color: "#6BF77C" },
  ];

  return (
    <div className="min-h-screen text-white" 
    style={{ backgroundImage: `url(${DashboardBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <GreetingCard />

      <div className="px-6 my-4 flex gap-4 flex-wrap">
        <button
          onClick={handleLogout}
          className="p-3 rounded-md bg-red-800 text-white text-sm"
        >
          Sign out
        </button>
        <button
          onClick={handleRetailers}
          className="p-3 rounded-md bg-red-800 text-white text-sm"
        >
          Retailers
        </button>
      </div>

      <div className="px-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - QuickCards */}
        <div className="flex flex-col gap-4">
          {statData.map((stat, index) => (
            <QuickCard key={index} {...stat} />
          ))}
        </div>

        {/* Right Columns - Graphs */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <BarChart title="Stock Levels" data={stockLevelData} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieChart title="Product Categories" data={pieChartData} />
            <Scale title="Supply Chain Efficiency" percentage={75} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
