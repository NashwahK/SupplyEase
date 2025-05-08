import { useState } from 'react';
import { supabase } from '../supabaseClient';
import fallbackImage from '../../public/assets/default-fallback-image.png';

const ProductEditModal = ({ isOpen, onClose, product, onUpdate }) => {
  const [title, setTitle] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [category, setCategory] = useState(product?.category || '');
  const [availableSizes, setAvailableSizes] = useState(() => {
    const sizes = product?.available_sizes;
  
    if (Array.isArray(sizes)) return sizes;
  
    if (typeof sizes === 'string') {
      try {
        const parsed = JSON.parse(sizes);
        return Array.isArray(parsed) ? parsed : sizes.split(',').map(s => s.trim());
      } catch {
        return sizes.split(',').map(s => s.trim());
      }
    }
  
    return [];
  });
  
  const [batchQuantities, setBatchQuantities] = useState(() => {
    const quantities = product?.batch_quantities;
  
    if (typeof quantities === 'string') {
      return quantities.split(',').map(s => s.trim());
    }
  
    return [];
  });
  
  const [availableColors, setAvailableColors] = useState(() => {
    const colours = product?.available_colors;
    if (typeof colours === 'string') {
      return colours.split(',').map(s => s.trim());
    }
    return []
    });
  const [unitPrice, setUnitPrice] = useState(product?.unit_price || 0);
  const [imagePreview, setImagePreview] = useState(product?.image || fallbackImage);
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
        const filePath = `product/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product')
          .upload(filePath, newImage, {
            cacheControl: '3600',
            upsert: false,
            contentType: newImage.type
          });

        if (uploadError) throw uploadError;

        const { publicUrl } = supabase.storage
          .from('product')
          .getPublicUrl(filePath).data;

        imageUrl = publicUrl;
      }

      const { data, error } = await supabase
        .from('product')
        .update({
          name: title,
          description,
          category,
          available_sizes: availableSizes.join(','),
          batch_quantities: batchQuantities.join(','),
          available_colors: availableColors.join(','),
          unit_price: unitPrice,
          image: imageUrl || null,
        })
        .eq('product_id', product.product_id)
        .select()
        .single();

      if (error) throw error;
      onUpdate();
      onClose();
    } catch (err) {
      console.error('Error updating product:', err.message);
      alert('Failed to update product');
    } finally {
      setIsUploading(false);
    }
  };

  // Guess type based on first element (if it contains a letter, it's clothing sizes)
  const isClothingSize = availableSizes.some(size => /[a-zA-Z]/.test(size));
  const sizeOptions = isClothingSize
    ? ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
    : ['28', '30', '32', '34', '36', '38', '40', '42'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div className="bg-white text-black p-6 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">Edit Product</h2>

        <label className="block mb-2">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          rows={3}
        />

        <label className="block mb-2">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Available Sizes</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {sizeOptions.map((size) => (
            <label key={size} className="flex items-center gap-2 text-sm bg-gray-100 px-2 py-1 rounded">
              <input
                type="checkbox"
                checked={availableSizes.includes(size)}
                onChange={() =>
                  setAvailableSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((s) => s !== size)
                      : [...prev, size]
                  )
                }
              />
              {size}
            </label>
          ))}
        </div>

        <label className="block mb-2">Batch Quantities</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {[20, 50, 100, 250, 500, 1000].map((batch) => (
              <label key={batch} className="flex items-center gap-2 text-sm bg-gray-100 px-2 py-1 rounded">
                <input
                  type="checkbox"
                  checked={batchQuantities.includes(batch.toString())}
                  onChange={() => {
                    setBatchQuantities((prev) =>
                      prev.includes(batch.toString())
                        ? prev.filter((b) => b !== batch.toString())
                        : [...prev, batch.toString()]
                    );
                  }}
                />
                {batch}
              </label>
            ))}
          </div>


          <label className="block mb-2">Available Colors</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Red', 'Blue', 'Black', 'White', 'Green', 'Yellow', 'Purple', 'Orange', 'Grey', 'Pink'].map((color) => (
                <div
                  key={color}
                  onClick={() => {
                    setAvailableColors((prev) =>
                      prev.includes(color)
                        ? prev.filter((c) => c !== color)
                        : [...prev, color]
                    );
                  }}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${availableColors.includes(color) ? 'border-black scale-110' : 'border-gray-300'}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                ></div>
              ))}
            </div>


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
            alt="Product Preview"
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

export default ProductEditModal;
