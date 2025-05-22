import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import Header from "../../components/RetailerHeader";
import Footer from "../../components/RetailerFooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const storedItems = JSON.parse(sessionStorage.getItem("myItems")) || [];
    setCartItems(storedItems);
  }, []);

  useEffect(() => {
    const customer = JSON.parse(sessionStorage.getItem("customer_id"));
    const fetchData = async () => {
      const { data: imageData, error: imageError } = await supabase
        .from("customer")
        .select("profile_photo")
        .eq("customer_id", customer?.customer_id)
        .single();

      if (imageError) {
        console.error("Error fetching profile photo:", imageError);
      } else {
        setImage(imageData?.profile_photo);
        sessionStorage.setItem("image", imageData?.profile_photo);
      }
    };

    fetchData();
  }, []);

  const handleRemove = (indexToRemove) => {
    const updatedItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedItems);
    sessionStorage.setItem("myItems", JSON.stringify(updatedItems));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

const handleCheckout = () => {
  if (cartItems.length === 0) {
    toast.info("Your cart is empty.");
    return;
  }

  const customerId = sessionStorage.getItem("customer_id");
  if (!customerId) {
    toast.error("Please log in as a customer to proceed to checkout.");  
    return;
  }

  navigate("/payment", {
    state: {
      amount: totalPrice,
      itemName: cartItems,
    },
  });


    navigate("/payment", {
      state: {
        amount: totalPrice,
        itemName: cartItems,
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#EBDDFC] to-[#D0BDFB] text-[#2E2047]">
      <Header profilePhoto={image} />

      <main className="flex-grow p-6 md:px-32 md:py-10">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-[40px] font-semibold text-center mb-6">Your Cart</h2>

          {cartItems.map((item, index) => (
            <div
              key={item.id || index}
              className="flex items-center justify-between border-b border-gray-200 py-4"
            >
              <div className="flex items-center gap-5 text-[25px] font-medium">
                <img src={item.image} className="h-20" alt={item.name} />
                <div className="ml-10">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-[15]">Size: {item.size}</p>
                  <p className="text-[15]">Batch: {item.batch}</p>
                  <p className="text-[15]">Colour: {item.color}</p>
                </div>
              </div>
              <div className="text-right space-y-2">
                <p className="font-semibold text-[25px]">Rs. {item.price.toLocaleString()}</p>
                <div className="flex justify-end gap-3 text-xl text-gray-600">
                  <FiTrash2
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => handleRemove(index)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300">
            <p className="font-bold text-[25px]">Total Price</p>
            <p className="font-bold text-xl">Rs. {totalPrice.toLocaleString()}</p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleCheckout}
              className="bg-purple-400 p-6 text-[20px] font-medium rounded-3xl"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Add ToastContainer to show toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CartPage;
