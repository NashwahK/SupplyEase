import React from "react";

const Header = () => {
  return (
    <header className="absolute top-4 left-4 flex items-center">
      <img src="/assets/logo.svg" alt="SupplyEase Logo" className="h-8 w-8 mr-2" />
      <span className="text-white text-lg font-thin italic">SupplyEase</span>
    </header>
  );
};

export default Header;
