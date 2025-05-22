import React, { useState,useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { generatePayFastUrl } from "./apis";
import Header from "../../components/RetailerHeader";
import Footer from "../../components/RetailerFooter";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

  const { amount, itemName } = location.state || {};

  const [amountState] = useState(amount || "");
  const [itemNameState] = useState(itemName || "");
    const [image, setImage] = useState(null); // Add state for image
  console.log(itemNameState)

   
      useEffect(() => {
          const customer = JSON.parse(sessionStorage.getItem("customer_id"));
          console.log(customer);
      
          const fetchData = async () => {
            // Fetch categories
    
            const { data: imageData, error: imageError } = await supabase
              .from("customer")
              .select("profile_photo")
              .eq("customer_id", customer.customer_id)
              .single();
            console.log(imageData);
    
      
            if (imageError) {
              console.error("Error fetching profile photo:", imageError);
            } else {
              setImage(imageData.profile_photo); // Set the profile image in state
              sessionStorage.setItem("image",imageData.profile_photo)
            }
      
    
          };
      
          fetchData();
        }, []);

  const handlePayment = async () => {
    try {
      console.log(itemName)
      // Validate basic data
      
      if (!amount || !itemName) {
        alert("Missing payment details or product information.");
        return;
      }

      // 2. Insert Order
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() + 10);

      const stored = sessionStorage.getItem("customer_id");
      const parsed = stored ? JSON.parse(stored) : null;
      const customerId = parsed?.customer_id;

      if (!customerId || isNaN(customerId)) {
          alert("Invalid or missing customer ID.");
      return;
}

      const { data: orderData, error: orderError } = await supabase
        .from("order")
        .insert([
          {
            placement_timestamp: new Date().toISOString(),
            total_price: amountState,
            status: "pending",
            priority: 1,
            customer_id: customerId,
            expected_delivery_date: expectedDate.toISOString(), // Fixed typo
            supplier_id: 7,
            completion_timestamp: null,
          },
        ])
        .select("order_id");

      if (orderError || !orderData || !orderData[0]?.order_id) {
        console.error("Order insert error:", orderError);
        alert("Failed to create order.");
        return;
      }

      const orderId = orderData[0].order_id;

      // 3. Insert Order Items
      const orderItems = itemNameState.map((p) => ({
        quantity_ordered: p.batch, // Ensure 'batch' represents quantity
        size_ordered: p.size,
        color_ordered: p.color,
        discount_rate: 10.0,
        order_id: orderId,
        product_id: p.pid,
      }));

      const { error: itemError } = await supabase
        .from("order_item")
        .insert(orderItems);

      if (itemError) {
        console.error("Order item insert error:", itemError);
        alert("Failed to insert order items.");
        return;
      }
      const itemNames=itemNameState.map(item => item.name).join(", ");
      // 1. Generate PayFast URL
      const url = await generatePayFastUrl(amount, itemNames);
      if (!url) {
          alert("Payment URL could not be generated.");
          return;
      }

      // 4. Redirect to Payment Gateway
      navigate("/redirect", { state: { url } });
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#cbbceb]">
      {/* Header */}
      <Header profilePhoto={image} />

      {/* Payment Form */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <h2 className="text-4xl font-bold my-8 text-[#2E2047]">Payment Page</h2>
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="mb-6">
            <label className="block text-[#2E2047] font-semibold mb-2">
              Amount (Rs)
            </label>
            <input
              type="number"
              value={amountState}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6CFF]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#2E2047] font-semibold mb-2">
              Item Name
            </label>
            <input
              type="text"
              value={itemNameState.map(item => item.name).join(", ")}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6CFF]"
            />
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-purple-700 hover:bg-purple-400 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Pay with PayFast
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PaymentPage;
