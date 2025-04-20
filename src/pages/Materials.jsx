import Navbar from '../components/Navbar';
import MaterialAddBox from '../components/MaterialAddBox';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import MaterialEditModal from '../components/MaterialEditModal'; 
import MainBg from "../../public/assets/DashboardBg.png";
import fallbackImage from '../../public/assets/default-fallback-image.png'
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Materials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storage = ["Warehouse 56", "Warehouse 24", "Warehouse 13"];

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data, error } = await supabase
          .from('material')
          .select('material_id, name, category, image, storage_location, measuring_unit, unit_price');

        if (error) {
          throw error;
        }

        setMaterials(data);
      } catch (err) {
        console.error('Error fetching materials:', err.message);
      }
    };

    fetchMaterials();
  }, []);

  const handleSearch = (query) => setSearchQuery(query);

  const handleAddMaterial = (data) => {
    console.log("Add Material Data:", data);
  };

  // Search criterion is storage location here
  const filteredMaterials = materials.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedStorage === "" || m.storage_location === selectedStorage)
  );

  return (
    <div className="min-h-screen px-6 text-white"
      style={{ backgroundImage: `url(${MainBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <div className='py-6'>
        <MaterialAddBox
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
          key={material.material_id}
          title={material.name}
          image={material.image || fallbackImage}
          storage={material.storage_location}
          details={[
            `Category: ${material.category}`,
            `Measuring Unit: ${material.measuring_unit}`,
            `Unit Price: ${material.unit_price}`
          ]}
          onEdit={() => {
            setSelectedMaterial(material); 
            setIsModalOpen(true);
          }}
          onDelete={() => {
            setMaterialToDelete(material);
            setShowDeleteConfirm(true);
          }}
        />        
        ))}
      </div>
      {isModalOpen && (
        <MaterialEditModal
          material={selectedMaterial}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={async () => {
            setIsModalOpen(false);
            const { data, error } = await supabase
              .from('material')
              .select('material_id, name, category, image, storage_location, measuring_unit, unit_price');
            if (!error) setMaterials(data);
          }}
      />
      
      
      )}
    </div>
  );
};

export default Materials;
