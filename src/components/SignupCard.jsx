import { supabase } from "../supabaseClient";
import { useState } from "react";
import { useSnackbar } from "../context/SnackbarContext";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash, FaThumbsUp, FaThumbsDown
 } from "react-icons/fa";


const SignUpCard = ({ toggleView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    number: false,
    specialChar: false,
  });
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
  
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5173/login" 
      }
    });
  
    if (signupError) {
      setError(signupError.message);
      return;
    }
  
    // The email confirmation bit (might need to make this fancier)
    showSnackbar("Almost there! Please check your email and confirm your account before logging in.", "success");
    localStorage.setItem("signupFirstName", firstName);
    localStorage.setItem("signupLastName", lastName);

    navigate("/");
  };
  
  

  return (
    <div className="bg-[#A584EC]/40 backdrop-blur-md p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-white text-2xl font-semibold text-center mb-8">Create an Account</h2>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <form onSubmit={handleSignup}>
        {/* First Name and Last Name in a row */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-white text-sm mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#F8EDFF] text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-white text-sm mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#F8EDFF] text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-white text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#F8EDFF] text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
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

        <p className="text-white text-sm text-center mt-8">
          Already have an account? <span onClick={toggleView} className="text-purple-300 underline cursor-pointer">Login</span>
        </p>
      </form>
    </div>
  );
};

export default SignUpCard;
