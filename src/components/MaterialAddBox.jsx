import { useState } from 'react';
import { Plus, Edit, X, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const MaterialAddBox = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [storage, setStorage] = useState('');
  const [measuringUnit, setMeasuringUnit] = useState('');
  const [priceValue, setPriceValue] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    // Input validation
    if (!title || !category || !storage || !measuringUnit || priceValue <= 0) {
      showSnackbar('Please fill all required fields.', 'error');
      return;
    }

    try {
      setUploading(true);

      let imageUrl = '';
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop().toLowerCase();
        const allowedTypes = ['jpeg', 'jpg', 'png'];

        if (!allowedTypes.includes(fileExt)) {
          showSnackbar('Invalid file type. Please upload JPG or PNG.', 'error');
          return;
        }

        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `material/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('material')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: imageFile.type,
          });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('material')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase.from('material').insert({
        name: title,
        category,
        storage_location: storage,
        unit_price: priceValue,
        measuring_unit: measuringUnit,
        image: imageUrl || null,
      });

      if (insertError) throw insertError;

      // Reset form
      setTitle('');
      setCategory('');
      setStorage('');
      setMeasuringUnit('');
      setPriceValue(0);
      setImageFile(null);
      setImagePreview(null);

      showSnackbar('Material saved successfully!', 'success');
    } catch (err) {
      console.error('Error saving material:', err.message || err);
      showSnackbar('Failed to save material.', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="bg-[#8D67CE] text-white rounded-xl p-6 flex flex-col lg:flex-row gap-6 w-full">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="col-span-full text-xl font-bold">Add Material</h2>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white text-black rounded-xl px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white text-black rounded-xl px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Storage</label>
            <input
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              className="bg-white text-black rounded-xl px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Measuring Unit</label>
            <input
              value={measuringUnit}
              onChange={(e) => setMeasuringUnit(e.target.value)}
              className="bg-white text-black rounded-xl px-3 py-2"
            />
          </div>

          <div className="col-span-full flex items-center gap-2 mt-2">
            <label className="text-sm font-medium">Unit Price:</label>
            <button
              onClick={() => setPriceValue((prev) => Math.max(prev - 1, 0))}
              className="px-2 py-1 bg-white text-black rounded"
            >
              -
            </button>
            <input
              type="number"
              value={priceValue}
              onChange={(e) => setPriceValue(Number(e.target.value))}
              className="w-20 text-center px-2 py-1 bg-white text-black rounded"
              min="0"
            />
            <button
              onClick={() => setPriceValue(priceValue + 1)}
              className="px-2 py-1 bg-white text-black rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="col-span-full mt-4 bg-[#C2A8FA] hover:bg-[#b69af7] text-black font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Saving...
              </>
            ) : (
              'Save Material'
            )}
          </button>
        </div>

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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageRemove();
                  }}
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MaterialAddBox;