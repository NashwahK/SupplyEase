import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="flex items-center gap-8 bg-transparent text-white p-4 pt-6">
      <button className="text-white text-2xl" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className="flex flex-2 items-center">
        <img src="/assets/logo192.png" alt="SupplyEase Logo" className="w-8 h-8 mr-2" />
        <span className="text-lg font-semibold">SupplyEase</span>
      </div>

      <div className="flex gap-10">
        <Link to="/" className="hover:font-bold hover:border-b-4 hover:border-[#A584EC] transition duration-300 ease-in-out hover:-translate-y-1">
          Dashboard
        </Link>
        <Link to="/track-product" className="hover:font-bold hover:border-b-4 hover:border-[#A584EC] transition duration-300 ease-in-out hover:-translate-y-1">
          Track Your Product
        </Link>
        <Link to="/departments" className="hover:font-bold hover:border-b-4 hover:border-[#A584EC] transition duration-300 ease-in-out hover:-translate-y-1">
          Departments
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
