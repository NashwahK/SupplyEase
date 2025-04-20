import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Navbar from '../components/Navbar';
import ProductAddBox from '../components/ProductAddBox';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import ProductEditModal from '../components/ProductEditModal';
import MainBg from "../../public/assets/DashboardBg.png";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [productMaterials, setProductMaterials] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [priceValue, setPriceValue] = useState(20);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("product")
        .select("*");
      if (error) console.error("Error fetching products:", error);
      else {
        setProducts(data);
        updateCategoriesFromProducts(data)
      };
    };

    const fetchProductMaterials = async () => {
      const { data, error } = await supabase
        .from("product_material")
        .select("*");
      if (error) console.error("Error fetching product_material:", error);
      else setProductMaterials(data);
    };

    fetchProducts();
    fetchProductMaterials();
  }, []);

  const updateCategoriesFromProducts = (products) => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    setCategories(uniqueCategories);
  };
  

  const handleSearch = (query) => setSearchQuery(query);

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handlePriceChange = (newPrice) => setPriceValue(newPrice);
  const incrementPrice = () => setPriceValue(priceValue + 1);
  const decrementPrice = () => setPriceValue(priceValue - 1);

  const handleInputChange = (field) => (e) => {
    setProductData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const productFields = [
    { label: "Title", value: productData.title, onChange: handleInputChange("title") },
    { label: "Description", value: productData.description, onChange: handleInputChange("description") },
    { label: "Category", value: productData.category, onChange: handleInputChange("category") }
  ];

  // Not exactly hardcoded but necessary
  const productCheckboxes = [
    {
      label: "Size Options",
      options: ["XS", "S", "M", "L", "XL", "XXL", "3XL"].map(opt => ({
        label: opt, checked: false, onChange: () => {}
      })),
    },
    {
      label: "Length Options",
      options: ["28\"", "30\"", "32\"", "34\"", "36\"", "38\"", "40\"", "42\"", "44\""].map(opt => ({
        label: opt, checked: false, onChange: () => {}
      })),
    },
    {
      label: "Batch Options",
      options: ["20", "50", "75", "100", "200", "500", "1000"].map(opt => ({
        label: opt, checked: false, onChange: () => {}
      })),
    },
  ];

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "" || p.category === selectedCategory)
  );

  return (
    <div className="min-h-screen px-6 bg-gradient-to-b from-[#1B0036] to-[#000] text-white"
      style={{ backgroundImage: `url(${MainBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <div className="py-6">
        <ProductAddBox
          title="Add New Product"
          fields={productFields}
          checkboxGroups={productCheckboxes}
          priceLabel="Unit Price:"
          priceValue={priceValue}
          onPriceChange={handlePriceChange}
          onSubmit={handleAddProduct}
          imagePreview={null}
          onImageUpload={() => console.log("Image upload triggered")}
          products={products}
          productMaterials={productMaterials}
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
              title={product.name}
              image={product.image}
              category={product.category}
              details={[
                `Size Options: ${product.available_sizes}`,
                `Batch Options: ${product.batch_quantities}`,
              ]}
              onEdit={() => {
                setSelectedProduct(product); 
                setIsModalOpen(true);
              }}
              onDelete={() => {
                setProductToDelete(product);
                setShowDeleteConfirm(true);
              }}
            />
          ))
        ) : (
          <p className="text-center text-white">No products found</p>
        )}
        
      </div>
      {isModalOpen && (
        <ProductEditModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={async () => {
            setIsModalOpen(false);
            const { data, error } = await supabase
              .from('product')
              .select('*');
            if (!error) setProducts(data);
          }}
      />
        )}
    </div>
  );
};

export default Products;
