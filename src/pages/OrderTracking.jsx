import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import SearchBar from '../components/SearchBar';
import OrderCard from '../components/OrderCard';
import Navbar from '../components/Navbar';
import MainBg from "../../public/assets/DashboardBg.png";
import { transformTrackingData } from '../../utils/transformTrackingData';

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ["In Progress", "Completed", "Late", "Shipped"];

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.rpc("get_order_tracking_view");
      if (error) {
        console.error("Error fetching tracking data:", error);
        return;
      }
      const transformed = transformTrackingData(data);
      console.log(transformed)
      setOrders(transformed);
    };

    fetchOrders();
  }, []);

  const handleSearch = (query) => setSearchQuery(query);

  const filteredOrders = orders.filter(o =>
    o.orderId.toString().includes(searchQuery) &&
    (selectedCategory === "" || o.status === selectedCategory)
  );

  return (
    <div className="min-h-screen px-6"
      style={{ backgroundImage: `url(${MainBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <SearchBar
        placeholder="Type in your order number..."
        onSearch={handleSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="mt-6 flex flex-col gap-4">
        {filteredOrders.map((order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;