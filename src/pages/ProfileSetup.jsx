import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import LoginBg from "../../public/assets/loginpagebg.jpg";
>>>>>>> master

const ProfileSetup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
<<<<<<< HEAD
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Only run once, on component mount
=======
  const [contactNo, setContactNo] = useState("");
  const [city, setCity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

>>>>>>> master
  useEffect(() => {
    setFirstName(localStorage.getItem("firstName") || "");
    setLastName(localStorage.getItem("lastName") || "");
  }, []);

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
=======
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
>>>>>>> master

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

<<<<<<< HEAD
    if (userError) {
      setError("Unable to retrieve user info.");
      return;
    }

    const { error: insertError } = await supabase.from("Users").insert([
      {
        user_id: user.id,
        user_firstname: firstName,
        user_lastname: lastName,
        user_email: user.email,
        user_city: city,
=======
    if (userError || !user) {
      setError("Unable to retrieve user info.");
      setLoading(false);
      return;
    }

    let imageUrl = null;

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
        name: `${firstName} ${lastName}`,
        email_address: user.email,
        contact_number: contactNo,
        city,
        image: imageUrl,
>>>>>>> master
      },
    ]);

    if (insertError) {
      setError("Failed to save profile: " + insertError.message);
<<<<<<< HEAD
      return;
    }

    // Optional cleanup
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");

=======
      setLoading(false);
      return;
    }

    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
>>>>>>> master
    navigate("/dashboard");
  };

  return (
<<<<<<< HEAD
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
        <label className="block mb-4">
          City:
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
        >
          Save & Continue
        </button>
      </form>
=======
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="bg-[#A584EC]/40 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-lg text-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Complete Your Profile</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-white">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-white">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full mt-1 p-2 bg-white border border-gray-300 rounded"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Contact Number</label>
            <input
              type="tel"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="w-full mt-1 p-2 bg-white border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full mt-1 p-2 bg-white border border-gray-300 rounded"
            />
          </div>
          <div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Profile Image</label>
            <label
              htmlFor="profile-image-upload"
              className="inline-block bg-white hover:bg-gray-400 text-purple-600 text-sm px-4 py-2 rounded cursor-pointer transition"
            >
              Choose Image
            </label>
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-3 h-24 w-24 bg-white object-cover rounded-full border text-white"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
>>>>>>> master
    </div>
  );
};

<<<<<<< HEAD
export default ProfileSetup;
=======
export default ProfileSetup;
>>>>>>> master
