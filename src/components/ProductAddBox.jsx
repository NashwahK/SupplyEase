// TODO: ADD TOASTERS
import { useState, useEffect } from 'react';
import { Plus, Edit, X } from 'lucide-react';
import { supabase } from '../supabaseClient';

const fetchMaterials = async () => {
  const { data, error } = await supabase.rpc('get_materials');
  if (error) {
    console.error('Error fetching materials:', error);
    return [];
  }
  return data.map(material => ({
    material_id: material.material_id,
    name: material.name,
    unit_price: parseFloat(material.unit_price),
    measuring_unit: material.measuring_unit,
  }));
};

const ProductAddBox = ({
  title, // this is just the label for the box !!! 
  priceValue,
  onPriceChange,
}) => {
  const [productTitle, setProductTitle] = useState('');
  const [materials, setMaterials] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [unitPrice, setUnitPrice] = useState(priceValue);
  const [category, setCategory] = useState('');
  const [sizeType, setSizeType] = useState('');
  const [sizeOptions, setSizeOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [colourOptions, setColourOptions] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const alphabeticSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const numericSizes = ["28\"", "30\"", "32\"", "34\"", "36\"", "38\"", "40\"", "42\"", "44\""];
  const batchList = [20, 50, 100, 250, 500, 1000];
  const colorOptions = [
    { name: 'Red', class: 'bg-red-500' },
    { name: 'Orange', class: 'bg-orange-500' },
    { name: 'Yellow', class: 'bg-yellow-400' },
    { name: 'Green', class: 'bg-green-500' },
    { name: 'Blue', class: 'bg-blue-500' },
    { name: 'Indigo', class: 'bg-indigo-500' },
    { name: 'Violet', class: 'bg-violet-500' },
    { name: 'White', class: 'bg-white border' },
    { name: 'Black', class: 'bg-black' },
    { name: 'Grey', class: 'bg-gray-400' },
    { name: 'Pink', class: 'bg-pink-400' },
  ];
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedColors, setSelectedColors] = useState('');


  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  useEffect(() => {
    const loadMaterials = async () => {
      const fetchedMaterials = await fetchMaterials();
      setMaterials(fetchedMaterials);
    };
    loadMaterials();
  }, []);

  const handleMaterialSelect = (material) => {
    setSelectedMaterials((prev) => {
      if (prev.find((m) => m.material_id === material.material_id)) {
        return prev.filter((m) => m.material_id !== material.material_id);
      }
      return [...prev, material];
    });
  };

  const handleQuantityChange = (material_id, qty) => {
    const newQuantities = {
      ...quantities,
      [material_id]: qty,
    };
    setQuantities(newQuantities);
  
    const newTotal = selectedMaterials.reduce((total, material) => {
      const materialQty = newQuantities[material.material_id] || 0;
      return total + material.unit_price * materialQty;
    }, 0);
  
    onPriceChange(newTotal);
  };
  

  const calculateBaseUnitPrice = () => {
    return selectedMaterials.reduce((total, material) => {
      const qty = quantities[material.material_id] || 0;
      return total + parseFloat(material.unit_price) * qty;
    }, 0);
  };

  const handlePriceChange = (newPrice) => {
    if (newPrice >= calculateBaseUnitPrice()) {
      onPriceChange(newPrice);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    console.log("Form data before submission:", { // Why-the-heck-are-data-fields-still-wonky checker
      productTitle,
      description,
      category,
      selectedMaterials,
      selectedSize,
      selectedBatch,
      priceValue,
      selectedColors,
      imagePreview,
      quantities
    });
    try {
      setUploading(true);

      let imageUrl = '';
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop().toLowerCase();
        const allowedTypes = ['jpeg', 'jpg', 'png'];

        if (!allowedTypes.includes(fileExt)) {
          alert('Invalid file type. Please upload a JPG or PNG image.');
          return;
        }

        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `product/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: imageFile.type,
          });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('product')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const { data: productData, error: productInsertError } = await supabase
        .from('product')
        .insert([
          {
            name: productTitle,
            description,
            category,
            available_sizes: selectedSize.join(','),
            batch_quantities: selectedBatch.join(','),
            available_colors: selectedColors.join(','),
            unit_price: priceValue,
            image: imageUrl || null,
          },
        ])
        .select('product_id')
        .single();

      if (productInsertError) throw productInsertError;

      const productId = productData.product_id;

      const productMaterialEntries = selectedMaterials
      .filter((material) => quantities[material.material_id] > 0)
      .map((material) => ({
        product_id: productId,
        material_id: material.material_id,
        quantity_used: quantities[material.material_id],
      }));
    

      const { error: materialLinkError } = await supabase
        .from('product_material')
        .insert(productMaterialEntries);

      if (materialLinkError) throw materialLinkError;
      setProductTitle('');setDescription('');setCategory('');setSizeOptions([]);setBatchOptions([]);setColourOptions([]);setSelectedMaterials([]);setUnitPrice(0);setImageFile(null);setImagePreview(null);

      alert('Product saved successfully!');
    } catch (err) {
      console.error('Error saving product:', err.message || err);
      alert('Failed to save product.');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="bg-[#8D67CE] text-white rounded-xl p-6 flex flex-col lg:flex-row gap-6 w-full">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 className="col-span-full text-xl font-bold">{title}</h2>
  
        <div className="flex flex-col mb-4">
          <label className="text-sm mb-1">Product Title</label>
          <input
            type="text"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            className="bg-white text-black rounded-xl px-3 py-2"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-sm mb-1">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white text-black rounded-xl px-3 py-2"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-sm mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white text-black rounded-xl px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1 font-semibold">Size Type</label>
          <select
            value={sizeType}
            onChange={(e) => {
              setSizeType(e.target.value);
              setSelectedSize([]);
            }}
            className="bg-white text-black rounded-xl px-3 py-2"
          >
            <option value="">Select type</option>
            <option value="alpha">Alphabetic (XS-3XL)</option>
            <option value="numeric">Numeric (28"-44")</option>
          </select>
        </div>
  
        {/* Size Options based on Size Type - Check specifically */}
        {sizeType && (
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-semibold">Size Option</label>
            <div className="flex flex-wrap gap-3">
              {(sizeType === 'alpha' ? alphabeticSizes : numericSizes).map((size, idx) => (
                <label key={idx} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={selectedSize.includes(size)}
                    onChange={() => {
                      setSelectedSize((prev) =>
                        prev.includes(size)
                          ? prev.filter(s => s !== size)
                          : [...prev, size]
                      );
                    }}
                    className="accent-purple-600 w-4 h-4"
                  />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>
        )}
  
        {/* Batch Options */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 font-semibold">Batch Option</label>
          <div className="flex flex-wrap gap-3">
            {batchList.map((batch, index) => (
              <label key={index} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={selectedBatch.includes(batch)}
                  onChange={() => {
                    setSelectedBatch((prev) =>
                      prev.includes(batch) ? prev.filter(b => b !== batch) : [...prev, batch]
                    );
                  }}
                  className="accent-purple-600 w-4 h-4"
                />
                <span className="text-sm">{batch}</span>
              </label>
            ))}
          </div>
        </div>
  
        {/* Material Checkboxes */}
        <div className="col-span-full">
          <label className="block text-sm mb-2 font-semibold">Materials</label>
          <div className="flex flex-wrap gap-3">
            {materials.map((material) => (
              <label key={material.material_id} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={selectedMaterials.some((m) => m.material_id === material.material_id)}
                  onChange={() => handleMaterialSelect(material)}
                  className="accent-purple-600 w-4 h-4"
                />
                <span className="text-sm">{material.name}</span>
              </label>
            ))}
          </div>
        </div>
  
        {/* Quantities for selected materials */}
        {selectedMaterials.length > 0 && (
          <div className="col-span-full">
            <label className="block text-sm mb-2 font-semibold">Quantities</label>
            {selectedMaterials.map((material) => (
              <div key={material.material_id} className="flex items-center gap-2 mb-2">
                <span>{material.name} ({material.measuring_unit})</span>
                <input
                  type="number"
                  value={quantities[material.material_id] || 0}
                  onChange={(e) => handleQuantityChange(material.material_id, Number(e.target.value))}
                  min="0"
                  className="w-20 text-center px-2 py-1 bg-white text-black rounded"
                />
              </div>
            ))}
          </div>
        )}
  
        {/* Unit Price Input */}
        <div className="col-span-full flex items-center gap-2 mt-2">
          <label className="text-sm font-medium">Unit Price:</label>
          <button
            onClick={() => handlePriceChange(priceValue - 1)}
            className="px-2 py-1 bg-white text-black rounded"
          >-</button>
          <input
            type="number"
            value={priceValue}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-20 text-center px-2 py-1 bg-white text-black rounded"
          />
          <button
            onClick={() => handlePriceChange(priceValue + 1)}
            className="px-2 py-1 bg-white text-black rounded"
          >+</button>
        </div>
  
        {/* Colour Pickers */}
        <div className="col-span-full mt-4">
          <label className="text-sm font-semibold mb-2 block">Available Colours:</label>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => toggleColor(color.name)}
                className={`w-8 h-8 rounded-full border-2 transition ${color.class} ${
                  selectedColors.includes(color.name)
                    ? 'ring-2 ring-black ring-offset-2'
                    : 'ring-2 ring-transparent'
                }`}
              />
            ))}
          </div>
        </div>
  
        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="col-span-full mt-4 bg-[#C2A8FA] hover:bg-[#b69af7] text-black font-semibold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
  
      {/* Image Upload */}
      <div className="w-full lg:w-1/4 flex flex-col items-center justify-start relative">
        <label className="text-sm font-semibold mb-2">Sample Image:</label>
        <div
          className="w-40 h-40 bg-white rounded-xl flex items-center justify-center cursor-pointer overflow-hidden relative"
          onClick={() => document.getElementById("imageUploadInput").click()}
        >
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full">
                <Edit className="text-white" size={20} />
              </div>
              <button
                onClick={handleImageRemove}
                className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <X />
              </button>
            </>
          ) : (
            <Plus className="text-black" size={32} />
          )}
        </div>
        <input
          id="imageUploadInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
  
};

export default ProductAddBox;
