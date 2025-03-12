import React from "react";

const LoginCard = () => {
  return (
    <div className="bg-[#A584EC]/40 backdrop-blur-md p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-white text-2xl font-semibold text-center mb-8">Welcome Back!</h2>
      
      <form>
        <div className="mb-4">
          <label className="block text-white text-sm mb-1">Email</label>
          <input type="email" className="w-full px-4 py-2 rounded-lg bg-[#F8EDFF] text-white focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        
        <div className="mb-4">
          <label className="block text-white text-sm mb-1">Password</label>
          <input type="password" className="w-full px-4 py-2 rounded-lg bg-[#F8EDFF] text-white focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        
        <button type="submit" className="w-full py-2 mt-4 rounded bg-purple-500 hover:bg-purple-600 text-white font-semibold">Log In</button>
      </form>

      <p className="text-white text-sm text-center mt-8">
        Don’t have an account? <a href="#" className="text-purple-300 underline">Sign Up!</a>
      </p>
    </div>
  );
};

export default LoginCard;
