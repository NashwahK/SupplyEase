import { Link } from 'react-router-dom';

const RetailerHeader = ({ profilePhoto }) => {
  return (
    <nav className="bg-[#2E2047] h-32 text-white mt-5 py-6 rounded-3xl mx-4 md:mx-20 px-6">
      <ul className="flex flex-col md:flex-row justify-between items-center gap-4 text-xl md:text-2xl lg:text-[28px]">
        
        {/* Logo */}
        <div className="h-8 w-14">
          <img alt="SupplyEase Logo" src="/assets/SupplyEase Logo.png" />
        </div>

        {/* Nav Links */}
        <li className="hover:underline cursor-pointer">
          <Link to='/rlandingpage'>Home</Link>
        </li>
        <li className="hover:underline cursor-pointer">
          <Link to='/productcatalog'>Products</Link>
        </li>
        <li className="hover:underline cursor-pointer"> <Link to="/productauthenticity">Product Authenticity</Link></li>
        
        {/* View Cart */}
        <li className="flex items-center hover:underline cursor-pointer">
          <Link to="/cartpage" className="flex items-center gap-2">
            <img src="cart.png" alt="Cart" className="h-12 w-12 mx-1" />
            View Cart
          </Link>
        </li>

        {/* User Icon */}
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <Link to="/loginretailer">
            <img
              alt="User"
              src={profilePhoto ? profilePhoto : "/user.png"}
              className="object-cover h-full w-full"
            />
          </Link>
        </div>

      </ul>
    </nav>
  );
};

export default RetailerHeader;
