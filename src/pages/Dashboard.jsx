import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import GreetingCard from "../components/GreetingCard";
import QuickCard from "../components/QuickCards";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import Scale from "../components/Scale";
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
      title: "Return Rate",
      value: "0.7%",
      percentage: "3%",
      isPositive: false,
    },
    {
      title: "Days of Supply",
      value: "36",
      percentage: "2%",
      isPositive: true,
    },
  ];

  const stockLevelData = [
    { name: "Manufacturing", value1: 800, value2: 0 },
    { name: "Production", value1: 0, value2: 600 },
    { name: "Design", value1: 900, value2: 0 },
    { name: "Stitching", value1: 0, value2: 1100 },
    { name: "Packaging", value1: 300, value2: 0 },
    { name: "Shipping", value1: 0, value2: 400 },
  ];

  const pieChartData = [
    { name: "Pure Cotton", value: 50, color: "#3EF3E3" },
    { name: "Polyester", value: 20, color: "#BB7CF7" },
    { name: "Silk", value: 20, color: "#7C81F7" },
    { name: "Wool", value: 10, color: "#6BF77C" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B0036] to-[#000] text-white">
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

      <div className="px-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
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
