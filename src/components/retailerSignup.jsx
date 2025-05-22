import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useSnackbar } from "../context/SnackbarContext";

import { FaEye, FaEyeSlash, FaThumbsUp, FaThumbsDown
 } from "react-icons/fa";



const NewSignUpCard = ({ toggleView }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [email_address, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle for showing/hiding password
  const [passwordValid, setPasswordValid] = useState({
      length: false,
      number: false,
      specialChar: false,
  });
  const [location, setLocation] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const validatePassword = (password) => {
    setPasswordValid({
      length: password.length >= 8,
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      // Sign up with Supabase Auth
      const {error: signupError } = await supabase.auth.signUp({
        email: email_address, // ✅ Correct key
        password,
        options: {
          emailRedirectTo: "http://localhost:5173/loginretailer",
        },
      });
      
      
  
      if (signupError) {
        setError(signupError.message);
        setLoading(false);
        return;
      }
  
      let profilePhotoUrl = null;
  
   // Upload profile photo if provided
if (profilePhoto) {
  const fileExt = profilePhoto.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("retailers")
    .upload(fileName, profilePhoto, {
      cacheControl: '3600',
      upsert: false,
      contentType: profilePhoto.type, // <== This helps prevent 400 errors
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    setError("Failed to upload profile photo.");
    setLoading(false);
    return;
  }

  
        const { data: publicUrlData } = supabase.storage
          .from("retailers")
          .getPublicUrl(fileName);
  
        profilePhotoUrl = publicUrlData?.publicUrl;
      }
  
      // Insert user details into customer table
      const { error: insertError } = await supabase
        .from("customer")
        .insert([{
          name:name,
          type:type,
          status:status,
          email_address:email_address,
          password:password,
          location:location,
          contact_number: contactNo,
          profile_photo: profilePhotoUrl,
        }]);
  
      if (insertError) {
        console.error(insertError);
        setError("Failed to save user details.");
        setLoading(false);
        return;
      }
  
      showSnackbar("Account created. Please check your email for confirmation.", "success");
      navigate("/loginretailer");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-[#A584EC]/40 backdrop-blur-md p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-white text-2xl font-semibold text-center mb-6">Sign Up</h2>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block text-white text-sm mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-[#F8EDFF] text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-[#F8EDFF] text-black"
          >
            <option value="">Select Type</option>
            <option value="Retailer">Retailer</option>
            <option value="Wholeseller">Wholesaler</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-[#F8EDFF] text-black"
          >
            <option value="">Select Status</option>
            <option value="VIP">VIP</option>
            <option value="Normal">Normal</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm mb-1">Email</label>
          <input
            type="email"
            value={email_address}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-[#F8EDFF] text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-[#F8EDFF] text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm mb-1">Contact No</label>
          <input
            type="text"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-[#F8EDFF] text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm mb-1">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
            className="w-full text-white"
          />
        </div>

        {/* Password and its validation */}
        <div className="mb-4">
          <label className="block text-white text-sm mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              className="w-full px-4 py-2 rounded-lg bg-[#F8EDFF] text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Password requirements */}
          <ul className="text-white text-sm mt-2">
            <li className={`flex items-center ${passwordValid.length ? "text-green-400" : "text-red-400"}`}>
              {passwordValid.length ? <FaThumbsUp/> : <FaThumbsDown />}  Must be at least 8 characters
            </li>
            <li className={`flex items-center ${passwordValid.number ? "text-green-400" : "text-red-400"}`}>
              {passwordValid.number ? <FaThumbsUp /> : <FaThumbsDown />}  Must contain a number
            </li>
            <li className={`flex items-center ${passwordValid.specialChar ? "text-green-400" : "text-red-400"}`}>
              {passwordValid.specialChar ? <FaThumbsUp /> : <FaThumbsDown />}  Must contain a special character
            </li>
          </ul>
        </div>        

        <button
          type="submit"
          className="w-full py-2 mt-4 rounded bg-purple-500 hover:bg-purple-600 text-white font-semibold"
          disabled={!passwordValid.length || !passwordValid.number || !passwordValid.specialChar}
        >
          Sign Up
        </button>

        <p className="text-white text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={toggleView}
            className="text-purple-300 underline cursor-pointer"
          >
            Log In!
          </span>
        </p>
      </form>
    </div>
  );
};

export default NewSignUpCard;
