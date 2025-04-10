import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginCard = ({ toggleView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const { user, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setError("Authentication failed. Please check your email and password.");
      return;
    }
    navigate("/dashboard");
  };
  

  return (
    <div className="bg-[#A584EC]/40 backdrop-blur-md p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-white text-2xl font-semibold text-center mb-8">Welcome Back!</h2>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <form onSubmit={handleLogin}>
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

        {/* Password */}
        <div className="mb-4">
          <label className="block text-white text-sm mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
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
          </div></div>

        <button type="submit" className="w-full py-2 mt-4 rounded bg-purple-500 hover:bg-purple-600 text-white font-semibold">Log In</button>
        <p className="text-white text-sm text-center mt-8">
          Don’t have an account? <span onClick={toggleView} className="text-purple-300 underline cursor-pointer">Sign Up!</span>
        </p>
      </form>
    </div>
  );
};

export default LoginCard;
