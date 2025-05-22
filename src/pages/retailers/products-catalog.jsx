import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { supabase } from "../../supabaseClient"; // adjust the path based on your project structure
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
    size:product.available_sizes,
    batch:product.batch_quantities,
    color:product.available_colors,
    price: product.unit_price,
    image: product.image,
    description:product.description,
    pid:product.product_id

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
        console.log("Fetched Products:", data); // Log fetched products
        setProducts(data);
        setFilteredProducts(data); // Initially display all products
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the search query
    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all products when search query is empty
    }
  }, [searchQuery, products]);

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
  

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#EBDDFC] to-[#D0BDFB]">
      {/* Navbar */}
<Header profilePhoto={image} />

      {/* Search */}
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
          <FiFilter className="text-gray-600 ml-2 cursor-pointer" />
        </div>
      </div>

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
      <Footer/>
    </div>
  );
};

export default ProductCatalog;
