import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Package, AlertCircle, Edit3, Trash2, 
  Tag, ExternalLink, PlusCircle, Bell, LayoutDashboard, 
  ShoppingBag, Users, TrendingUp, LogOut, Settings, ChevronRight 
} from 'lucide-react';
import api from '../Api/api';

function Product_list() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = [
    "Electronics", "Fashion", "Home & Kitchen", 
    "Beauty & Personal Care", "Sports & Outdoors", "Books", "Health"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/all_products");
        setAllProducts(res.data);
        setProducts(res.data); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/delete_product/${id}`);
      const updatedProducts = allProducts.filter(p => p._id !== id);
      setProducts(updatedProducts);
      setAllProducts(updatedProducts);
      alert("✅ Product deleted successfully");
    } catch (error) {
      alert(error.response?.data?.detail || "Delete failed");
    }
  };

  const handleCategoryChange = async (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    if (cat === "") {
      setProducts(allProducts);
      return;
    }
    try {
      const res = await api.get(`/category_data/${cat.toLowerCase()}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching category:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      
      {/* Sidebar - Same as AdminDashboard */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <div className="flex items-center gap-3 px-2 cursor-pointer" onClick={() => navigate("/admin")}>
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Settings size={22} />
            </div>
            <span className="text-xl font-bold tracking-tight">NexusAdmin</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavLink to="/admin">
            <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" />
          </NavLink>
          <NavLink to="/show_list">
            <NavItem icon={<ShoppingBag size={20}/>} label="Inventory" active />
          </NavLink>
          <NavItem icon={<Users size={20}/>} label="Customers" />
          <NavItem icon={<TrendingUp size={20}/>} label="Analytics" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => { localStorage.clear(); navigate("/"); }}
            className="flex items-center gap-3 w-full p-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 px-6 py-8 lg:px-12 overflow-y-auto">
        
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Product Inventory</h1>
            <p className="text-slate-500 text-sm font-medium">Manage and track {products.length} live items</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
               <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <select
                 value={selectedCategory}
                 onChange={handleCategoryChange}
                 className="pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
               >
                 <option value="">All Categories</option>
                 {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
               </select>
            </div>
            <button
              onClick={() => navigate("/add_items")}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all active:scale-95"
            >
              <PlusCircle size={18} />
              New Product
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[400px] bg-white rounded-3xl animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
             <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
             <h3 className="text-lg font-semibold text-slate-600">No products found</h3>
             <p className="text-slate-400">Try changing the filter or add a new item.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((item) => (
              <div 
                key={item._id} 
                className="group relative bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-52 m-3 overflow-hidden rounded-[1.5rem] bg-slate-50">
                  <img 
                    src={item.images || 'https://via.placeholder.com/300'} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-800 border border-white/20 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className={`px-3 py-1 rounded-xl text-[10px] font-bold shadow-lg border backdrop-blur-md text-white
                      ${item.stock < 10 ? 'bg-rose-500 border-rose-400' : 'bg-emerald-500 border-emerald-400'}`}>
                      {item.stock < 10 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-6 pb-6 flex-1 flex flex-col">
                  <h4 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors line-clamp-1 capitalize">
                    {item.name}
                  </h4>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter mb-2">{item.brand || 'Nexus Brand'}</p>
                  
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 h-10">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</p>
                      <span className="text-xl font-black text-indigo-600">₹{item.price.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => navigate(`/update/${item._id}`)}
                        className="p-2.5 bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2.5 bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Reusable NavItem Component
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
    {icon}
    <span className="font-semibold text-sm">{label}</span>
  </div>
);

export default Product_list;