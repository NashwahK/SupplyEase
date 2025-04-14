import Navbar from '../components/Navbar';
import AddBox from '../components/AddBox';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import MainBg from "../../public/assets/DashboardBg.png"
import { useState } from 'react';

const Materials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const storage = ["Warehouse 56", "Warehouse 24", "Warehouse 13"];
  const [selectedStorage, setSelectedStorage] = useState("");
  const handleSearch = (query) => setSearchQuery(query);

  const handleAddMaterial = (data) => {
    console.log("Add Material Data:", data);
  };

  const materialFields = [
    { label: "Title", name: "title" },
    { label: "Description", name: "description" },
    { label: "Category", name: "category" },
    { label: "Storage", name: "storage" },
  ];

  const materials = [
    {
      title: "Cotton",
      image: "/images/cotton.jpg",
      storage: "Warehouse 13",
      details: ["Category: Fabric", "Batch Options: 100kg, 200kg"],
    },
    {
      title: "Silk",
      image: "/images/silk.jpg",
      storage: "Warehouse 24",
      details: ["Category: Fabric", "Batch Options: 50kg, 100kg"],
    },
  ];

  const filteredMaterials = materials.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedStorage === "" || m.storage === selectedStorage)
  );
  

  return (
    <div className="min-h-screen px-6 text-white"
    style={{ backgroundImage: `url(${MainBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <div className='py-6'>
        <AddBox
          title="Add New Material"
          fields={materialFields}
          priceLabel="Unit Price:"
          onSubmit={handleAddMaterial}
        />
      </div>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-center">All Materials</h2>
      <SearchBar
        placeholder="Type in your material name..."
        onSearch={handleSearch}
        categories={storage}
        selectedCategory={selectedStorage}
        onCategoryChange={setSelectedStorage}
      />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material, idx) => (
            <ItemCard
              key={idx}
              {...material}
              onEdit={() => console.log("Edit", material.title)}
              onDelete={() => console.log("Delete", material.title)}
            />
          ))}
      </div>
    </div>
  );
};

export default Materials;
