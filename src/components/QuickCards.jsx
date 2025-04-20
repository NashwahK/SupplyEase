import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const QuickCard = () => {
  const [cards, setCards] = useState([]);

  const getPercentageChange = (current, previous) => {
    if (previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  };

  const formatRs = (value) => `Rs. ${Math.round(value / 1000)}k`;

  useEffect(() => {
    // TODO: Recheck RPC names after final update at DB
    const fetchData = async () => {
      // Card 1 : Inventory Quantity
      const { data: inventory } = await supabase.rpc("get_order_quantity_weekly_comparison");
      const invCurrent = inventory?.[0]?.["Current Week"] || 0;
      const invPrev = inventory?.[0]?.["Previous Week"] || 0;
      const invChange = getPercentageChange(invCurrent, invPrev);

      // Card 2 : Fulfillment Rate
      const { data: fulfillment } = await supabase.rpc("get_order_fulfillment_monthly_comparison");
      const currF = fulfillment?.find(f => f.Duration === "Current Month") || {};
      const prevF = fulfillment?.find(f => f.Duration === "Previous Month") || {};
      const currRate = Math.round((currF["Completed Orders"] / currF["Total Orders"]) * 100) || 0;
      const prevRate = Math.round((prevF["Completed Orders"] / prevF["Total Orders"]) * 100) || 0;
      const fulfillmentChange = getPercentageChange(currRate, prevRate);

      // Card 3 : Revenue
      const { data: revenue } = await supabase.rpc("get_monthly_revenue_comparison");
      const revCurr = revenue?.[0]?.["Current Month Revenue"] || 0;
      const revPrev = revenue?.[0]?.["Previous Month Revenue"] || 0;
      const revenueChange = getPercentageChange(revCurr, revPrev);

      // Card 4 : Gross Margin
      const { data: margin } = await supabase.rpc("get_monthly_gross_margin_comparison");
      const gmCurr = margin?.[0]?.["Current Month Gross Margin"] || 0;
      const gmPrev = margin?.[0]?.["Previous Month Gross Margin"] || 0;
      const marginChange = getPercentageChange(gmCurr, gmPrev);

      // Card 5 : AOV
      const { data: aov } = await supabase.rpc("get_monthly_aov_comparison");
      const aovCurr = aov?.[0]?.["Current Month AOV"] || 0;
      const aovPrev = aov?.[0]?.["Previous Month AOV"] || 0;
      const aovChange = getPercentageChange(aovCurr, aovPrev);

      setCards([
        { // Change card order here. MAYBE: Bring the ECOM-specific ones higher. 
          title: "Inventory Quantity",
          value: invCurrent.toLocaleString(),
          percentage: `${Math.abs(invChange)}%`,
          isPositive: invChange >= 0,
          label: "compared to last week"
        },
        {
          title: "Order Fulfillment Rate",
          value: `${currRate}%`,
          percentage: `${Math.abs(fulfillmentChange)}%`,
          isPositive: fulfillmentChange >= 0,
          label: "compared to last month"
        },
        {
          title: "Revenue",
          value: formatRs(revCurr),
          percentage: `${Math.abs(revenueChange)}%`,
          isPositive: revenueChange >= 0,
          label: "compared to last month"
        },
        {
          title: "Gross Margin",
          value: `${gmCurr.toFixed(1)}%`,
          percentage: `${Math.abs(marginChange)}%`,
          isPositive: marginChange >= 0,
          label: "compared to last month"
        },
        {
          title: "Average Order Value",
          value: formatRs(aovCurr),
          percentage: `${Math.abs(aovChange)}%`,
          isPositive: aovChange >= 0,
          label: "compared to last month"
        }
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="flex gap-4 flex-wrap">
      {cards.map((card, idx) => {
        const arrowIcon = card.isPositive ? (
          <ArrowUpRight className="text-[#45F996]" />
        ) : (
          <ArrowDownRight className="text-[#F94545]" />
        );
        const percentColor = card.isPositive ? "text-[#45F996]" : "text-[#F94545]";

        return (
          <div
            key={idx}
            className="bg-[#2E2047] p-4 rounded-xl w-72 h-48 text-white shadow-md space-y-1"
          >
            <h3 className="text-sm font-semibold text-gray-300">{card.title}</h3>
            <p className="text-5xl font-bold text-center pt-4">{card.value}</p>
            <div className={`flex flex-col items-center text-center gap-1 text-sm ${percentColor}`}>
              {card.title === "Gross Margin" ? (
                <>
                  <div className="flex items-center pt-2 gap-1">
                    {arrowIcon}
                    <span>{card.percentage}</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center pt-2 gap-1">
                  {arrowIcon}
                  <span>{card.percentage}</span>
                </div>
              )}
              <span className="pt-2 text-gray-400">{card.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickCard;
