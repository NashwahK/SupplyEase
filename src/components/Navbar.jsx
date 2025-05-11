import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar"; 

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation(); 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebarOnClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", closeSidebarOnClickOutside);
    return () => {
      document.removeEventListener("mousedown", closeSidebarOnClickOutside);
    };
  }, []);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "font-bold border-b-4 border-[#A584EC]"
      : "hover:font-bold hover:border-b-4 hover:border-[#A584EC] transition duration-300 ease-in-out hover:-translate-y-1";
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} sidebarRef={sidebarRef} />

      {/* Main Content */}
      <div className="flex-1">
        <nav className="flex items-center gap-8 bg-transparent text-white p-4 pt-6">
          <button className="text-white text-2xl" onClick={toggleSidebar}>
            <FaBars />
          </button>

          <div className="flex flex-2 items-center">
            <img src="/assets/SupplyEase Logo.png" alt="SupplyEase Logo" className="w-7 h-7 mr-2" />
            <span className="text-lg font-semibold">SupplyEase</span>
          </div>

          <div className="flex gap-10">
            <Link to="/dashboard" className={getLinkClass('/dashboard')}>
              Dashboard
            </Link>
            <Link to="/track-orders" className={getLinkClass('/track-orders')}>
              Track Your Orders
            </Link>
            <Link to="/products" className={getLinkClass('/products')}>
              Products
            </Link>
            <Link to="/materials" className={getLinkClass('/materials')}>
              Materials
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> master
