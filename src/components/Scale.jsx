import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Skeleton from "react-loading-skeleton";

const Scale = ({ title }) => {
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchFulfillmentRate = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_order_fulfillment_rate");

      if (error) {
        console.error("Error fetching order fulfillment rate:", error);
        setLoading(false); 
        return;
      }

      if (data && data.length > 0) {
        const { shipped_orders, total_active_orders } = data[0];
        const percent = total_active_orders > 0 
          ? Math.round((shipped_orders / total_active_orders) * 100)
          : 0;
        setPercentage(percent);
      }
      setLoading(false); 
    };

    fetchFulfillmentRate();
  }, []);

  const clamped = Math.min(Math.max(percentage, 0), 100);
  const radius = 60;
  const circumference = Math.PI * radius;
  const progress = (clamped / 100) * circumference; // Math 101 yall

  return (
    <div className="bg-[#2E2047] p-4 rounded-xl text-white shadow-md w-full">
      <h3 className="text-lg font-semibold mb-4 p-2">
        {loading ? <Skeleton width={150} /> : title}
      </h3>
      <div className="relative w-40 h-20 mx-auto">
        {loading ? (
          <Skeleton height={80} />
        ) : (
          <svg width="100%" height="100%" viewBox="0 0 160 80">
            {/* Background arc */}
            <path
              d="M 20 80 A 60 60 0 0 1 140 80"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="35"
            />
            {/* Progress arc */}
            <path
              d="M 20 80 A 60 60 0 0 1 140 80"
              fill="none"
              stroke="#4ACBAE"
              strokeWidth="35"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress} // It's this thing. 
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      <p className="text-center text-3xl font-bold mt-8">
        {loading ? <Skeleton width={80} height={40} /> : `${clamped}%`}
      </p>
      <p className="text-center text-sm text-gray-400">
        {loading ? <Skeleton width={150} /> : "orders shipped on time"}
      </p>
    </div>
  );
};

export default Scale;
