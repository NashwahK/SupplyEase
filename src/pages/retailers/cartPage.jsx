import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { supabase } from "../../supabaseClient"; // adjust path to your client
import { Link } from "react-router-dom";
import Header from "../../components/RetailerHeader";
import Footer from "../../components/RetailerFooter";
import { useNavigate } from "react-router-dom"; // at the top of your file
const CartPage = () => {
  const navigate = useNavigate(); // inside your component
  const [cartItems, setCartItems] = useState([]);
  const [image, setImage] = useState(null); // Add state for image

  

  useEffect(() => {
    const storedItems = JSON.parse(sessionStorage.getItem("myItems")) || [];
    setCartItems(storedItems);
  }, []);
  
  
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
    
  

  

  const handleRemove = (indexToRemove) => {
    const updatedItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedItems);
    sessionStorage.setItem("myItems", JSON.stringify(updatedItems));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    const customerId = sessionStorage.getItem("customer_id");
    if (!customerId) {
      alert("Please log in as a customer to proceed to checkout.");
      return;
    }
  
    navigate("/payment", {
      state: {
        amount: totalPrice,
        itemName: cartItems,
      },
    });
  };


  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#EBDDFC] to-[#D0BDFB] text-[#2E2047]">
      {/* Navbar */}
      <Header profilePhoto={image} />

      {/* Cart Content */}
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

          {/* Total & Button */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CartPage; 