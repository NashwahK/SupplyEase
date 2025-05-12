import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { GiConsoleController } from "react-icons/gi";
import Header from "../../components/RetailerHeader";
import Footer from "../../components/RetailerFooter";

const RLandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [ordersData, setOrdersData] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const customer = JSON.parse(sessionStorage.getItem("customer_id"));
    console.log(customer);

    const fetchData = async () => {
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
        setCategories(uniqueCategories);
      }

      if (imageError) {
        console.error("Error fetching profile photo:", imageError);
      } else {
        setImage(imageData.profile_photo);
        sessionStorage.setItem("image", imageData.profile_photo);
      }

      const { data: orders, error: ordersError } = await supabase
        .from("order")
        .select("*")
        .eq("customer_id", customer.customer_id);
      console.log(orders);

      if (ordersError) {
        console.error("Error fetching past orders:", ordersError);
      } else {
        setOrdersData(orders);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/productcatalog`);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#cbbceb] to-white">
      <Header profilePhoto={image} />

      {/* Banner */}
      <section className="text-white text-center px-4 md:px-6 mt-8">
        <img
          className="w-full max-h-[431px] object-cover rounded-3xl shadow-xl"
          src="sales-banner.png"
          alt="Sales Banner"
        />
      </section>

      {/* Past Orders */}
      <section className="bg-[#5B3E8E] px-6 py-10 mx-4 md:mx-12 my-16 rounded-3xl text-white shadow-2xl">
        <h3 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Your Past Orders</h3>

        {!sessionStorage.getItem("customer_id") ? (
          <p className="text-xl">Please log in to view your orders.</p>
        ) : ordersData.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ordersData.map((order) => (
              <div
                key={order.order_id}
                className="bg-white text-gray-900 p-6 rounded-3xl shadow-lg transition-transform hover:scale-[1.02]"
              >
                <p className="text-2xl font-bold mb-2">Order # {order.order_id}</p>
                <p className="text-lg">Total: <span className="font-medium">Rs. {order.total_price}</span></p>
                <p className="text-lg">Vendor: <span className="font-medium">SupplyEase Karachi</span></p>
                <p className="text-lg">Placed on: {order.placement_timestamp}</p>
                <p className="text-lg">
                  {order?.completion_timestamp
                    ? `Received: ${order.completion_timestamp}`
                    : `Expected: ${order.expected_delivery_date}`}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg">No past orders available.</p>
        )}
      </section>

      {/* Product Categories */}
      <section className="w-[85%] mx-auto mb-24">
        <h3 className="text-[40px] md:text-[44px] font-bold text-[#5B3E8E] mb-12">Explore Product Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <button
                key={index}
                onClick={handleCategoryClick}
                className="px-6 py-4 bg-[#5B3E8E] text-[28px] md:text-[32px] w-full sm:w-[300px] h-[140px] text-white rounded-[30px] hover:bg-purple-700 transition-all duration-200 ease-in-out shadow-md"
              >
                {category}
              </button>
            ))
          ) : (
            <p>No categories available.</p>
          )}
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </section>

      <Footer />
    </div>
  );
};

export default RLandingPage;
