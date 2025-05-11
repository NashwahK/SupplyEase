import SearchBar from '../components/SearchBar'
import OrderCard from '../components/OrderCard'
import Navbar from '../components/Navbar';
import MainBg from "../../public/assets/DashboardBg.png"
import { useState } from 'react';
const OrderTracking = () => {
    const sampleOrders = [
        {
          orderId: "100420",
          deliveryDate: "2025-02-01",
          status: "In-Progress",
          deliverables: [
            {
              title: "50 Green XL Polo T-Shirts",
              departments: [
                { id: 1, entry: "2024-12-31T08:00:00", exit: "2024-12-31T10:30:00" },
                { id: 2, entry: "2024-12-31T11:00:00", exit: "2024-12-31T13:00:00" },
                { id: 3, entry: "2024-12-31T13:30:00", exit: "2024-12-31T15:00:00" },
                { id: 4, entry: "2024-12-31T15:30:00" }, // In progress (yellow)
                { id: 5 },                               // Not started (grey)
                { id: 6 },                               // Not started (grey)
                { id: 7 },                               // Not started (grey)
                { id: 8 },                               // Not started (grey)
                { id: 9 },                               // Not started (grey)
              ],
            },
            {
              title: "100 Blue Unisex Formal Blazers",
              departments: [
                { id: 1, entry: "2024-12-31T08:00:00", exit: "2024-12-31T10:00:00" },
                { id: 2, entry: "2024-12-31T10:30:00", exit: "2024-12-31T12:00:00" },
                { id: 3, entry: "2024-12-31T12:30:00", exit: "2024-12-31T14:00:00" },
                { id: 4, entry: "2024-12-31T14:30:00", exit: "2024-12-31T15:30:00" },
                { id: 5, entry: "2025-01-01T09:00:00" }, // In progress (yellow)
                { id: 6 },                               // Not started (grey)
                { id: 7 },                               // Not started (grey)
                { id: 8 },                               // Not started (grey)
                { id: 9 },                               // Not started (grey)
              ],
            },
          ],
        },
      ];
      const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const categories = ["In-Progress", "Completed", "Late"];
    const handleSearch = (query) => setSearchQuery(query);

    const filteredOrders = sampleOrders.filter(o =>
        o.orderId.includes(searchQuery) &&
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
            onCategoryChange={setSelectedCategory} />
          <div className="mt-6 flex flex-col gap-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order.orderId} order={order} />
            ))}
          </div>
        </div>
      );
}

export default OrderTracking;