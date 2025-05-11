<<<<<<< HEAD
const RLandingPage = () => {

    return(
        <div>Retailers Portal Landing Page</div>
    )

}

export default RLandingPage
=======
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // adjust path to your client
import { GiConsoleController } from "react-icons/gi";
import Header from "../../components/RetailerHeader";
import Footer from "../../components/RetailerFooter";

const RLandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [ordersData, setOrdersData] = useState([]);
  const [image, setImage] = useState(null); // Add state for image
  const navigate=useNavigate();

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
        setCategories(uniqueCategories);
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
        setOrdersData(orders);
      }
    };

    fetchData();
  }, []);


  const handleCategoryClick = (category) => {
     navigate(`/productcatalog`);
};

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#cbbceb]">
      {/* Navbar */}
      <Header profilePhoto={image} />

      {/* Banner */}
      <section className="text-white text-center mx-4 md:mx-6">
        <img
          className="w-full max-h-[431px] object-cover rounded-xl mt-8"
          src="sales-banner.png"
          alt="Sales Banner"
        />
      </section>

      {/* Past Orders */}
      <section className="bg-[#5B3E8E] p-6 mx-4 md:mx-10 my-10 rounded-2xl text-white">
  <h3 className="text-3xl md:text-[44px] font-semibold mb-6">Past Orders</h3>

  {!sessionStorage.getItem("customer_id") ? (
    <p className="text-lg">Please log in to view your orders.</p>
  ) : ordersData.length > 0 ? (
    <div className="flex flex-col md:flex-row gap-6 justify-evenly">
      {ordersData.map((order) => (
        <div
          key={order.order_id}
          className="bg-white text-black p-6 rounded-3xl shadow-md w-full md:w-[300px] lg:w-[395px]"
        >
          <p className="text-xl lg:text-[42px] font-bold">Order # {order.order_id}</p>
          <p className="text-lg lg:text-[24px]">Total Price: {order.total_price}</p>
          <p className="text-lg lg:text-[24px]">Vendor: SupplyEase Karachi</p>
          <p className="text-lg lg:text-[24px]">Placed on: {order.placement_timestamp}</p>
          <p className="text-lg lg:text-[24px]">
            {order?.completion_timestamp
              ? `Order Received: ${order.completion_timestamp}`
              : `Expected Delivery: ${order.expected_delivery_date}`}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p>No past orders available.</p>
  )}
</section>


      {/* Product Categories */}
      <section className="w-[70%] mx-auto my-28">
        <h3 className="text-[44px] font-semibold ml-3 mb-14 text-[#5B3E8E]">Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <button
                key={index} onClick={handleCategoryClick}
                className="px-6 py-2 bg-[#5B3E8E] text-[32px] w-[351px] h-[154px] text-white rounded-[30px] hover:bg-purple-700"
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RLandingPage;
>>>>>>> master
