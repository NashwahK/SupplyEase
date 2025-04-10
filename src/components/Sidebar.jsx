import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Sidebar = ({ isOpen, toggleSidebar, sidebarRef }) => {
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Error signing out:", error.message);
        } else {
          navigate("/");
        }
      };
  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full bg-[#1F1632] transition-all ease-in-out duration-300 ${
        isOpen ? "w-64" : "w-0"
      } overflow-hidden text-white z-50`} 
    >
      <div className="flex flex-col items-center mt-12 space-y-6">
        <div className="flex flex-col gap-12 text-md font-thin text-white">
          <Link to="/dashboard" className="hover:text-[#A584EC]" onClick={toggleSidebar}>
            Dashboard
          </Link>
          <Link to="/track-product" className="hover:text-[#A584EC]" onClick={toggleSidebar}>
            Track Your Orders
          </Link>
          <Link to="/products" className="hover:text-[#A584EC]" onClick={toggleSidebar}>
            Products
          </Link>
          <Link to="/materials" className="hover:text-[#A584EC]" onClick={toggleSidebar}>
            Materials
          </Link>
          <hr className="border-[#A584EC]" />
          <Link to="/profile" className="hover:text-[#A584EC]" onClick={toggleSidebar}>
            Profile Management
          </Link>
          <Link to="/" className="text-[#F94545] hover:text-[#A584EC]" onClick={handleLogout}>
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
