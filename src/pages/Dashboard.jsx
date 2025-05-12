import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import GreetingCard from "../components/GreetingCard";
import QuickCard from "../components/QuickCards";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import Scale from "../components/Scale";
import MainBg from "../../public/assets/DashboardBg.png"

const Dashboard = () => {

  return (
    <div className="min-h-screen text-white" 
      style={{ backgroundImage: `url(${MainBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <GreetingCard />

      <div className="px-6 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Quick Cards Edit Here !!!!!!!!!*/}
        <div className="flex flex-col gap-4 lg:col-span-1">
            <QuickCard />
        </div>

        {/* Graphs Edit Here !!!!!!!!!!!!! */}
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