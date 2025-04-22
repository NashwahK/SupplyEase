import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [city, setCity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFirstName(localStorage.getItem("firstName") || "");
    setLastName(localStorage.getItem("lastName") || "");
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("Unable to retrieve user info.");
      setLoading(false);
      return;
    }

    let imageUrl = null;

    // Upload image if selected
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `user-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("users") 
        .upload(filePath, imageFile);

      if (uploadError) {
        setError("Failed to upload image: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("users")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData?.publicUrl;
    }

    const { error: insertError } = await supabase.from("supply_chain_manager").insert([
      {
        supplier_id: user.id,
        name: firstName + " " + lastName,
        email_address: user.email,
        contact_number: contactNo,
        city: city,
        image: imageUrl,
      },
    ]);

    if (insertError) {
      setError("Failed to save profile: " + insertError.message);
      setLoading(false);
      return;
    }

    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    navigate("/dashboard");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          First Name:
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Last Name:
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Contact Number:
          <input
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          City:
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <label className="block mb-4">
          Upload Profile Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-2"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 h-24 w-24 object-cover rounded-full border"
            />
          )}
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
