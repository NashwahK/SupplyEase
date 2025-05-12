import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Loader2, UploadCloud } from "lucide-react";
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

import MainBg from "../../public/assets/DashboardBg.png"; 
import Navbar from "../components/Navbar";

const ProfileMgt = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [city, setCity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'error' | 'success'

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      console.log(user)

      if (user) {
        const { data, error } = await supabase
          .from("supply_chain_manager")
          .select("*")
          .eq("email_address", user.email)
          .single();

        if (!error && data) {
          setName(data.name || "");
          setContactNo(data.contact_no || "");
          setCity(data.city || "");
          setImagePreview(data.profile_photo || null);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Set file ONCE here
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // ONLY preview here
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSave = async () => {
    // Check if any field is empty
    if (!name || !contactNo || !city) {
      setSnackbarSeverity('error'); // Show error severity if fields are empty
      setSnackbarMessage("Please fill in all the fields.");
      setOpenSnackbar(true);
      return;
    }
  
    try {
      setSaving(true);
      let imageUrl = imagePreview;
  
      // If there's a new image to upload
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `users/${fileName}`;
  
        const { error: uploadError } = await supabase.storage
          .from('users') // The bucket name is 'users'
          .upload(filePath, imageFile, {
            cacheControl: '3600', // Set cache control to manage caching for the file
            upsert: false, // Don't overwrite existing files
            contentType: imageFile.type, // Set the correct MIME type for the file
          });
  
        if (uploadError) throw uploadError;
  
        // Get the public URL of the uploaded image
        const { data, error: urlError } = supabase.storage
          .from('users')
          .getPublicUrl(filePath);
  
        if (urlError) throw urlError;
  
        imageUrl = data.publicUrl;
      }
  
      // Update the user's profile in the 'supply_chain_manager' table
      const { error: updateError } = await supabase
        .from('supply_chain_manager')
        .update({
          name,
          contact_no: contactNo,
          city,
          profile_photo: imageUrl || null, // Update with the image URL or null if no image
        })
        .eq('email_address', user.email); // Match by email_address
  
      if (updateError) throw updateError;
  
      // Set success message if everything goes fine
      setSnackbarSeverity('success');
      setSnackbarMessage('Profile updated successfully!');
      setOpenSnackbar(true);
  
    } catch (err) {
      console.error('Error updating profile:', err.message);
      setSnackbarSeverity('error'); // Set error severity on failure
      setSnackbarMessage('Error updating profile. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setSaving(false);
    }
  };
    
  

  return (
    <div className="min-h-screen" style={{ backgroundImage: `url(${MainBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Navbar />
    <div className="flex items-center justify-center px-4 py-12 bg-cover bg-center">
            
        <div className="bg-[#A584EC]/40 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-4xl text-gray-800">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">Manage Profile</h2>

            <div className="flex flex-col md:flex-row gap-6">
            {/* LEFT: Form Inputs */}
            <div className="flex-1 space-y-4">
                <div>
                <label className="block text-sm font-medium text-white">Name</label>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full mt-1 p-2 bg-white border border-gray-300 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-white">Contact Number</label>
                <input
                    type="text"
                    placeholder="Contact Number"
                    className="w-full mt-1 p-2 bg-white border border-gray-300 rounded"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-white">City</label>
                <input
                    type="text"
                    placeholder="City"
                    className="w-full mt-1 p-2 bg-white border border-gray-300 rounded"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                </div>

                <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition flex items-center justify-center gap-2"
                >
                {saving && <Loader2 className="animate-spin" size={18} />}
                {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {/* RIGHT: Image Upload */}
            <div className="flex items-start justify-center md:w-1/3 w-full">
                <div
                    className="w-40 h-40 rounded-lg bg-white border border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:shadow-md transition relative group"
                    onClick={() => document.getElementById("profilePictureUpload").click()}
                >
                    {imagePreview ? (
                    <>
                        <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Change Image</span>
                        </div>
                    </>
                    ) : (
                    <div className="flex flex-col items-center text-gray-500">
                        <UploadCloud size={40} />
                        <span className="text-xs">Upload Image</span>
                    </div>
                    )}
                    <input
                    id="profilePictureUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    />
                </div>
                </div>
                </div>

        </div>
        </div>
        <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={() => setOpenSnackbar(false)}
            >
              <Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
        </div>

  );
};

export default ProfileMgt;
