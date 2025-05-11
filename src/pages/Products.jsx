import Navbar from '../components/Navbar'
import AddBox from '../components/AddBox'
import SearchBar from '../components/SearchBar'
import ItemCard from '../components/ItemCard'
import MainBg from "../../public/assets/DashboardBg.png"
import { useState } from 'react'

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ["T-Shirts", "Shirts", "Pants"];
  const [products, setProducts] = useState([
    {
      title: "Polo T-Shirts",
      image: "/images/polo.jpg",
      category: "T-Shirts",
      details: [
        "Material: Cotton",
        "Size Options: XS, S, M, L, XL, XXL",
        "Batch Options: 20, 50, 100"
      ],
    },
    {
      title: "Cargo Pants",
      image: "/images/cargo.jpg",
      category: "Pants",
      details: [
        "Material: Cotton",
        "Size Options: 28\"-40\"",
        "Batch Options: 20, 50, 100"
      ],
    },
    {
      title: "Formal Shirts",
      image: "/images/formal.jpg",
      category: "Shirts",
      details: [
        "Material: Silk",
        "Size Options: S, M, L, XL",
        "Batch Options: 50, 100"
      ],
    },
  ]);
  
  const [priceValue, setPriceValue] = useState(20); // Initial unit price

  const handleSearch = (query) => setSearchQuery(query);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handlePriceChange = (newPrice) => {
    setPriceValue(newPrice);
  };

  const productFields = [
    { label: "Title", value: "", onChange: (e) => console.log(e.target.value) },
    { label: "Material", value: "", onChange: (e) => console.log(e.target.value) },
    { label: "Description", value: "", onChange: (e) => console.log(e.target.value) },
  ];

  const productCheckboxes = [
    {
      label: "Size Options",
      options: ["XS", "S", "M", "L", "XL", "XXL", "3XL"].map(opt => ({ label: opt, checked: false, onChange: (e) => console.log(e.target.checked) })),
    },
    {
      label: "Length Options",
      options: ["28\"", "30\"", "32\"", "34\"", "36\"", "38\"", "40\"", "42\"", "44\""].map(opt => ({ label: opt, checked: false, onChange: (e) => console.log(e.target.checked) })),
    },
    {
      label: "Batch Options",
      options: ["20", "50", "75", "100", "200", "500", "1000"].map(opt => ({ label: opt, checked: false, onChange: (e) => console.log(e.target.checked) })),
    },
  ];

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "" || p.category === selectedCategory)
  );
  
  return (
    <div className="min-h-screen px-6 bg-gradient-to-b from-[#1B0036] to-[#000] text-white"
    style={{ backgroundImage: `url(${MainBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <div className="py-6">
        <AddBox
          title="Add New Product"
          fields={productFields}
          checkboxGroups={productCheckboxes}
          priceLabel="Unit Price:"
          priceValue={priceValue}
          onPriceChange={handlePriceChange}
          onSubmit={handleAddProduct}
          imagePreview={null}  // Initially no image
          onImageUpload={() => console.log("Image upload triggered")}
        />
      </div>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-center">All Categories</h2>
      <SearchBar
        placeholder="Type in your product name..."
        onSearch={handleSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, idx) => (
            <ItemCard
              key={idx}
              {...product}
              onEdit={() => console.log("Edit", product.title)}
              onDelete={() => console.log("Delete", product.title)}
            />
          ))
          
        ) : (
          <p className="text-center text-white">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
