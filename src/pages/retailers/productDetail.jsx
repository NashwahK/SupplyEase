import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import Header from "../../components/RetailerHeader";
import Footer from "../../components/RetailerFooter";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, size, batch, color, price, image, description, pid } = location.state || {};

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleBatchSelect = (batch) => setSelectedBatch(batch);
  const handleColorSelect = (color) => setSelectedColor(color);

  const AddItem = (newItem) => {
    const customerId = sessionStorage.getItem("customer_id");
    if (!customerId) {
      toast.error("Please login first!");
      return;
    }

    let existing = sessionStorage.getItem("myItems");
    let items = existing ? JSON.parse(existing) : [];
    items.push(newItem);
    sessionStorage.setItem("myItems", JSON.stringify(items));

    toast.success("Product added to cart!");
    setTimeout(() => navigate("/cartpage"), 2000); // navigate after showing toast
  };

  const profilephoto = sessionStorage.getItem("image");

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#EBDDFC] to-[#D0BDFB] text-[#2E2047]">
      <ToastContainer />

      {/* Navbar */}
      {sessionStorage.getItem("customer_id") ? (
        <Header profilePhoto={profilephoto} />
      ) : (
        <Header />
      )}

      {/* Product Detail Card */}
      <main className="flex-grow p-6 md:px-20 md:py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:flex gap-12">
          {/* Image */}
          <div className="flex justify-center md:w-1/2">
            <img className="max-h-[400px]" src={image} alt="Product" />
          </div>

          {/* Info */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-semibold">{name}</h2>

            {/* Size */}
            <div>
              <p className="font-semibold mb-2 text-[20px]">Size</p>
              <div className="flex gap-2 flex-wrap">
                {size?.split(',').map((s) => (
                  <span
                    key={s}
                    onClick={() => handleSizeSelect(s)}
                    className={`border px-3 py-1 rounded-lg cursor-pointer hover:bg-[#D0BDFB] ${selectedSize === s ? 'bg-[#D0BDFB]' : ''}`}
                  >
                    {s}"
                  </span>
                ))}
              </div>
            </div>

            {/* Batch */}
            <div>
              <p className="font-semibold mb-2">Batch</p>
              <div className="flex gap-2 flex-wrap">
                {batch?.split(',').map((b) => (
                  <span
                    key={b}
                    onClick={() => handleBatchSelect(b)}
                    className={`border px-3 py-1 rounded-lg cursor-pointer hover:bg-[#D0BDFB] ${selectedBatch === b ? 'bg-[#D0BDFB]' : ''}`}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <p className="font-semibold mb-2">Color</p>
              <div className="flex gap-2 flex-wrap">
                {color?.split(',').map((c) => (
                  <span
                    key={c}
                    onClick={() => handleColorSelect(c)}
                    className={`border px-3 py-1 rounded-lg cursor-pointer hover:bg-[#D0BDFB] ${selectedColor === c ? 'bg-[#D0BDFB]' : ''}`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-xl font-semibold">Price</p>
              <div className="bg-[#D0BDFB] px-6 py-2 text-2xl font-bold w-fit rounded-xl">
                Rs. {price}
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => {
                if (selectedSize && selectedBatch && selectedColor) {
                  AddItem({ name, size: selectedSize, batch: selectedBatch, color: selectedColor, price, image, description, pid });
                } else {
                  toast.warning("Please select size, batch, and color.");
                }
              }}
              className="flex items-center gap-2 bg-[#8D67CE] text-white text-[20px] font-medium px-6 py-3 rounded-xl hover:opacity-90"
            >
              <FiShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Description & Source */}
        <div className="bg-white rounded-3xl shadow-md mt-8 p-6 space-y-4">
          <details className="dropdown">
            <summary className="btn m-1 text-3xl underline">Description</summary>
            <div className="text-[20px] p-2">
              <p className="w-full font-light">{description}</p>
            </div>
          </details>
          <details className="dropdown">
            <summary className="btn m-1 text-3xl underline">Source Information</summary>
            <div className="text-[20px] p-2">
              <p className="w-full">
                Pure 100% cotton sourced from ethically-aware and registered cotton manufacturers in Punjab.
              </p>
            </div>
          </details>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetail;

