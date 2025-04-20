import { useState } from "react";
import OrderProgress from "./OrderProgress";
import { ArrowUp } from "lucide-react";
import { ArrowDown } from "lucide-react";

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const statusColors = {
    "In Progress": "#F9C645",
    Completed: "#45F996",
    Late: "#F94545",
    Shipped: "#45F996"
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Order # {order.orderId}</h3>
          <p className="text-sm text-gray-500">
            Date of Delivery: {order.deliveryDate}
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span
            className="px-3 py-1 text-sm text-white rounded-full"
            style={{ backgroundColor: statusColors[order.status] }}
          >
            {order.status}
          </span>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-1 text-sm text-black font-bold"
            >
            Order Progress {expanded ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            </button>

        </div>
      </div>

      {expanded && (
        <div className="mt-4 flex flex-col gap-6">
          {order.deliverables.map((d, i) => (
            <OrderProgress key={i} deliverable={d} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
