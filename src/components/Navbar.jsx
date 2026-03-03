import React, { useEffect, useState } from "react";
import { ShoppingCart, Search, User, Package, Heart, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await api.get("/cart");
        setCartCount(res.data.total_items);
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartCount(0);
      }
    };
    fetchCartCount();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-10 py-3 flex items-center justify-between">
      
      {/* LEFT: Logo */}
      <div
        className="flex items-center gap-2 font-black text-2xl text-indigo-600 cursor-pointer flex-shrink-0"
        onClick={() => navigate("/")}
      >
        <Package size={30} strokeWidth={2.5} />
        <span className="tracking-tight hidden sm:block">LUXE.</span>
      </div>

      {/* CENTER: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search items..."
          className="w-full bg-gray-100 border-none rounded-full py-2 px-10 focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
        />
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-2 sm:gap-6 text-gray-700">
        
        {/* Wishlist */}
        <button className="p-2 hover:bg-gray-100 rounded-full transition group">
          <Heart size={22} className="group-hover:text-red-500" />
        </button>

        {/* Cart */}
        <div
          className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer transition group"
          onClick={() => navigate("/user_cart")}
        >
          <ShoppingCart size={22} className="group-hover:text-indigo-600" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </div>

        {/* User Profile */}
        <div className="hidden sm:flex w-9 h-9 bg-indigo-50 rounded-full items-center justify-center cursor-pointer border border-indigo-100 hover:bg-indigo-100 transition">
          <User size={18} className="text-indigo-600" />
        </div>

        {/* Logout - Styled as a clean icon button */}
        <button 
          onClick={handleLogout}
          title="Logout"
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;