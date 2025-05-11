<<<<<<< HEAD
import Navbar from '../components/Navbar'
import AddBox from '../components/AddBox'
import SearchBar from '../components/SearchBar'
import ItemCard from '../components/ItemCard'
import MainBg from "../../public/assets/DashboardBg.png"
import { useState } from 'react'
=======
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Navbar from '../components/Navbar';
import ProductAddBox from '../components/ProductAddBox';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import ProductEditModal from '../components/ProductEditModal';
import MainBg from "../../public/assets/DashboardBg.png";
>>>>>>> master

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
<<<<<<< HEAD
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
=======
  const [products, setProducts] = useState([]);
  const [productMaterials, setProductMaterials] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
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
  
>>>>>>> master

  const handleSearch = (query) => setSearchQuery(query);

  const handleAddProduct = (newProduct) => {
<<<<<<< HEAD
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
=======
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleConfirmDelete = async () => {
    console.log(productToDelete);
    if (!productToDelete) return;

    const { error: deleteProductMaterialError } = await supabase
      .from("product_material")
      .delete()
      .eq("product_id", productToDelete.product_id);
  
    if (deleteProductMaterialError) {
      console.error("Error deleting product references from product_material:", deleteProductMaterialError);
      return; 
    }
    const { error } = await supabase
      .from("product")
      .delete()
      .eq("product_id", productToDelete.product_id);
  
    if (error) {
      console.error("Error deleting product:", error);
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    }
    setShowDeleteConfirm(false);
    setProductToDelete(null);
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
>>>>>>> master
    },
  ];

  const filteredProducts = products.filter(p =>
<<<<<<< HEAD
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "" || p.category === selectedCategory)
  );
  
  return (
    <div className="min-h-screen px-6 bg-gradient-to-b from-[#1B0036] to-[#000] text-white"
    style={{ backgroundImage: `url(${MainBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <div className="py-6">
        <AddBox
=======
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "" || p.category === selectedCategory)
  );

  return (
    <div className="min-h-screen px-6 bg-gradient-to-b from-[#1B0036] to-[#000] text-white"
      style={{ backgroundImage: `url(${MainBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <div className="py-6">
        <ProductAddBox
>>>>>>> master
          title="Add New Product"
          fields={productFields}
          checkboxGroups={productCheckboxes}
          priceLabel="Unit Price:"
          priceValue={priceValue}
          onPriceChange={handlePriceChange}
          onSubmit={handleAddProduct}
<<<<<<< HEAD
          imagePreview={null}  // Initially no image
          onImageUpload={() => console.log("Image upload triggered")}
        />
      </div>
=======
          imagePreview={null}
          onImageUpload={() => console.log("Image upload triggered")}
          products={products}
          productMaterials={productMaterials}
        />
      </div>

>>>>>>> master
      <h2 className="text-xl font-semibold mt-8 mb-2 text-center">All Categories</h2>
      <SearchBar
        placeholder="Type in your product name..."
        onSearch={handleSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
<<<<<<< HEAD
        />
=======
      />
>>>>>>> master
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, idx) => (
            <ItemCard
              key={idx}
<<<<<<< HEAD
              {...product}
              onEdit={() => console.log("Edit", product.title)}
              onDelete={() => console.log("Delete", product.title)}
            />
          ))
          
        ) : (
          <p className="text-center text-white">No products found</p>
        )}
      </div>
=======
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
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
            <div className="bg-[#2E2047] p-6 rounded-xl shadow-xl w-96">
              <h2 className="text-lg font-bold mb-4 text-white">Confirm Deletion</h2>
              <p className="text-sm text-gray-300 mb-6">
                Are you sure you want to delete <span className="font-semibold">{productToDelete?.name}</span>?
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-800 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

>>>>>>> master
    </div>
  );
};

<<<<<<< HEAD
export default Products;
=======
export default Products;
>>>>>>> master
