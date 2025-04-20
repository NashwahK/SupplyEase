import { useState } from 'react';
import { supabase } from '../supabaseClient';
import fallbackImage from '../../public/assets/default-fallback-image.png'

const MaterialEditModal = ({ isOpen, onClose, material, onUpdate }) => {
  const [title, setTitle] = useState(material?.name || '');
  const [category, setCategory] = useState(material?.category || '');
  const [storage, setStorage] = useState(material?.storage_location || '');
  const [measuringUnit, setMeasuringUnit] = useState(material?.measuring_unit || '');
  const [unitPrice, setUnitPrice] = useState(material?.unit_price || 0);
  const [imagePreview, setImagePreview] = useState(material?.image || fallbackImage);
  const [newImage, setNewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      setIsUploading(true);
      let imageUrl = imagePreview;
  
      if (newImage) {
        const fileExt = newImage.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `material/${fileName}`;
  
        const { error: uploadError } = await supabase.storage
          .from('material')
          .upload(filePath, newImage, {
            cacheControl: '3600',
            upsert: false,
            contentType: newImage.type
          });
  
        if (uploadError) throw uploadError;
  
        const { publicUrl } = supabase.storage
          .from('material')
          .getPublicUrl(filePath).data;
  
        imageUrl = publicUrl;
      }
  
      const { data, error } = await supabase
        .from('material')
        .update({
          name: title,
          category,
          storage_location: storage,
          measuring_unit: measuringUnit,
          unit_price: unitPrice,
          image: imageUrl
        })
        .eq('material_id', material.material_id)
        .select()
        .single();
  
      if (error) throw error;
      onUpdate();
      onClose();
    } catch (err) {
      console.error('Error updating material:', err.message);
      alert('Failed to update material');
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div className="bg-white text-black p-6 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">Edit Material</h2>

        <label className="block mb-2">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Storage</label>
        <input
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Measuring Unit</label>
        <input
          value={measuringUnit}
          onChange={(e) => setMeasuringUnit(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Unit Price</label>
        <input
          type="number"
          value={unitPrice}
          onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="mb-4">
          <label className="block mb-2">Current Image</label>
          <img
            src={imagePreview}
            alt="Material Preview"
            className="w-full h-40 object-cover rounded"
          />
          <button
            onClick={() => setShowImageUpload(!showImageUpload)}
            className="text-sm mt-2 underline text-[#C2A8FA] hover:text-[#b69af7]"
          >
            {showImageUpload ? 'Cancel Image Change' : 'Replace Image'}
          </button>

          {showImageUpload && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={isUploading}
          className="w-full bg-[#C2A8FA] hover:bg-[#b69af7] text-black font-semibold py-2 rounded"
        >
          {isUploading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>

  );
};

export default MaterialEditModal;
