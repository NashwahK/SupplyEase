import { useNavigate,Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate(); // ✅ use hook inside component

  const handleLogout = () => {   // ✅ standard arrow function
    sessionStorage.removeItem("customer_id");
    navigate("/rlandingpage");   // ✅ use navigate, not Navigate
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(179.72deg, #5B3E8E 0.24%, #391458 157.39%)',
      }}
      className="text-white flex flex-col md:flex-row items-center justify-between p-8 gap-10"
    >
      {/* Left Side - Logo and Text */}
      <div className="text-center md:text-left">
        <img className="h-10 w-10 mx-auto md:mx-0" src="/assets/SupplyEase Logo.png" alt="Logo" />
        <p className="font-medium text-3xl md:text-[50px] italic py-6">SupplyEase</p>
        <p className="text-sm italic font-light">All Rights Reserved</p>
      </div>

      {/* Center - Navigation Links */}
      <ul className="flex flex-col gap-2 text-lg md:text-[32px] text-center italic font-light">
        <li className="hover:underline cursor-pointer"><Link to="/rlandingpage">Home</Link></li>
        <li className="hover:underline cursor-pointer"><Link to="/productcatalog">Products</Link></li>
        <li className="hover:underline cursor-pointer"><Link to="/productauthenticity">Product Authenticity</Link></li>
        
      </ul>

      {/* Right Side - Logout Button */}
      <button
        className="text-base md:text-xl hover:underline italic font-light"
        onClick={handleLogout} // ✅ connected properly
      >
        {sessionStorage.getItem("customer_id")?<p>Logout</p>:" "}
      </button>
    </footer>
  );
};

export default Footer;
