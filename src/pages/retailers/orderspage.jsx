import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import SearchBar from '../../components/SearchBar';
import OrderCard from '../../components/OrderCard';
import { transformTrackingData } from '../../../utils/transformTrackingData';
import Footer from '../../components/RetailerFooter';
import Header from '../../components/RetailerHeader';

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [image, setImage] = useState(null); // Add state for image
  const categories = ["In Progress", "Completed", "Late", "Shipped"];


  
    useEffect(() => {
        const customer = JSON.parse(sessionStorage.getItem("customer_id"));
        console.log(customer);
    
        const fetchData = async () => {
          // Fetch categories
          const { data: categoryData, error: categoryError } = await supabase
            .from("product")
            .select("category", { distinct: true });
    
          const { data: imageData, error: imageError } = await supabase
            .from("customer")
            .select("profile_photo")
            .eq("customer_id", customer.customer_id)
            .single();
          console.log(imageData);
    
          if (categoryError) {
            setError("Failed to load categories");
            console.error(categoryError);
          } else {
            const uniqueCategories = [...new Set(categoryData.map(item => item.category))];
            setSelectedCategory(uniqueCategories);
          }
    
          if (imageError) {
            console.error("Error fetching profile photo:", imageError);
          } else {
            setImage(imageData.profile_photo); // Set the profile image in state
            sessionStorage.setItem("image",imageData.profile_photo)
          }
    
          // Fetch past orders
          const { data: orders, error: ordersError } = await supabase
            .from("order")
            .select("*")
            .eq("customer_id", customer.customer_id);
          console.log(orders);
    
          if (ordersError) {
            console.error("Error fetching past orders:", ordersError);
          } else {
            setOrders(orders);
          }
        };
    
        fetchData();
      }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const storedData = sessionStorage.getItem("customer_id");

      if (!storedData) {
        setNotLoggedIn(true); // show message on screen
        return;
      }

      const customerID = JSON.parse(storedData);

      const { data: order, error: orderError } = await supabase
        .from("order")
        .select("order_id")
        .eq("customer_id", customerID.customer_id);

      const { data, error } = await supabase.rpc("get_order_tracking_view");
      if (error) {
        console.error("Error fetching tracking data:", error);
        return;
      }

      const transformed = transformTrackingData(data);
      const transformed1 = transformed.filter(item =>
        order.some(idObj => idObj.order_id === item.orderId)
      );

      setOrders(transformed1);
    };

    fetchOrders();
  }, []);

  const handleSearch = (query) => setSearchQuery(query);

  const filteredOrders = orders.filter(o =>
    o.orderId.toString().includes(searchQuery) &&
    (selectedCategory === "" || o.status === selectedCategory)
  );



  return (
    <div className="min-h-screen flex flex-col px-6">
      <Header profilePhoto={image} />

      <div className="flex-grow">
        {notLoggedIn ? (
          <div className="text-center text-red-500 mt-10 text-xl font-semibold">
            Please login as customer to track your orders.
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrderTracking;
