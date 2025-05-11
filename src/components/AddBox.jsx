import { useState } from 'react';
import { Plus, Edit, X } from 'lucide-react';

const AddBox = ({
  title,
  fields,
  checkboxGroups = [],
  priceLabel = "Unit Price",
  priceValue,
  onPriceChange,
  onSubmit,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null); // Remove the image
  };

  return (
    <div className="bg-[#8D67CE] text-white rounded-xl p-6 flex flex-col lg:flex-row gap-6 w-full">
      {/* Left side: Form fields */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 className="col-span-full text-xl font-bold">{title}</h2>

        {fields.map(({ label, value, onChange }, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm mb-1">{label}</label>
            <input
              value={value}
              onChange={onChange}
              className="bg-white text-black rounded-xl px-3 py-2"
            />
          </div>
        ))}

        {checkboxGroups.map((group, index) => (
          <div key={index} className="col-span-full">
            <label className="block text-sm mb-2 font-semibold">{group.label}</label>
            <div className="flex flex-wrap gap-3">
              {group.options.map((opt, i) => (
                <label key={i} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={opt.checked}
                    onChange={opt.onChange}
                    className="accent-purple-600 w-4 h-4"
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="col-span-full flex items-center gap-2 mt-2">
          <label className="text-sm font-medium">{priceLabel}:</label>
          <button
            onClick={() => onPriceChange(priceValue - 1)}
            className="px-2 py-1 bg-white text-black rounded"
          >
            -
          </button>
          <input
            type="number"
            value={priceValue}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-20 text-center px-2 py-1 bg-white text-black rounded"
          />
          <button
            onClick={() => onPriceChange(priceValue + 1)}
            className="px-2 py-1 bg-white text-black rounded"
          >
            +
          </button>
        </div>

        <button
          onClick={onSubmit}
          className="col-span-full mt-4 bg-[#C2A8FA] hover:bg-[#b69af7] text-black font-semibold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>

      {/* Right side: Image upload box */}
      <div className="w-full lg:w-1/4 flex flex-col items-center justify-start relative">
        <label className="text-sm font-semibold mb-2">Sample Image:</label>
        <div
          className="w-40 h-40 bg-white rounded-xl flex items-center justify-center cursor-pointer overflow-hidden relative"
          onClick={() => document.getElementById("imageUploadInput").click()}
        >
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover w-full h-full"
              />
              {/* Pencil icon on hover */}
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full">
                <Edit className="text-white" size={20} />
              </div>
              {/* Remove image button */}
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

export default AddBox;
