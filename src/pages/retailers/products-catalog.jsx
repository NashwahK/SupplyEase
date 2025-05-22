import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import Header from "../../components/RetailerHeader";
import Footer from "../../components/RetailerFooter";

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-[20px] p-5 shadow-md w-full max-w-sm">
    <img
      src={product.image}
      alt={product.name}
      className="mx-auto mb-3 h-40 object-contain"
    />
    <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
    <p>Sizes: {product.available_sizes}</p>
    <p>Batches: {product.batch_quantities}</p>
    <p>Unit Price: {product.unit_price}</p>
    <p>Colours:</p>
    <div className="flex gap-2 mt-1 mb-3">
      {product.available_colors.split(",")?.map((color, idx) => (
        <div
          key={idx}
          className="w-5 h-5 rounded-full border"
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
    <Link
      to="/productdetail"
      state={{
        name: product.name,
        size: product.available_sizes,
        batch: product.batch_quantities,
        color: product.available_colors,
        price: product.unit_price,
        image: product.image,
        description: product.description,
        pid: product.product_id,
      }}
      className="mt-auto flex items-center justify-center my-2 gap-2 bg-[#5B3E8E] text-white px-4 py-2 rounded-[10px] w-full"
    >
      View Product
    </Link>
  </div>
);

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [image, setImage] = useState(null); // Add state for image

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("product").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
        setFilteredProducts(data);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all products when search query is empty
    }
  }, [searchQuery, products]);
  let profilephoto=sessionStorage.getItem("image");

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#EBDDFC] to-[#D0BDFB]">
      {/* Navbar */}
      {sessionStorage.getItem("customer_id") ? (
      <Header profilePhoto={profilephoto} />
      ) : (<Header />
      )}

      {/* Search + Filter */}
      <div className="flex items-center justify-center px-6 w-[100%] mt-6">
        <div className="flex w-[90%] mx-auto items-center bg-white rounded-full px-4 py-5 shadow-md">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for a product or order..."
            className="flex-grow outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiFilter
            className="text-gray-600 ml-2 cursor-pointer"
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>
      </div>

      {/* Price Filter Dropdown */}
      {showFilter && (
  <div className="w-[90%] mx-auto flex justify-end">
    <div className="w-[10%] mt-3 bg-white p-3 rounded-[10px] shadow-md">
      <label className="block font-medium mb-1">Filter by Price:</label>
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        <option value="all">All Prices</option>
        <option value="low">Low (≤ Rs. 100)</option>
        <option value="mid">Mid (Rs. 101 - Rs. 500)</option>
        <option value="high">High (≥ Rs. 501)</option>
      </select>
    </div>
  </div>
)}

      {/* Product Grid */}
      <div className="flex flex-row flex-wrap gap-4 px-2 my-10 justify-start mx-auto">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductCatalog;
