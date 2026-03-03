import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Settings,
  LogOut,
  LayoutDashboard,
  ShoppingBag,
  ChevronRight,
  Bell
} from 'lucide-react';

import api from '../Api/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [latestOrders, setLatestOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/total_revnue");
        const ordersData = res.data;

        const sortedOrders = [...ordersData].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setRevenue(ordersData.reduce((sum, order) => sum + (order.total_amount || 0), 0));
        setOrders(ordersData.length);
        setCustomers(new Set(ordersData.map(o => o.user_id)).size);
        setLatestOrders(sortedOrders.slice(0, 5));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const stats = [
    { id: 1, name: 'Total Revenue', value: `₹${revenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+12.5%' },
    { id: 2, name: 'Total Orders', value: orders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+3.2%' },
    { id: 3, name: 'Total Customers', value: customers, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50', trend: '+18%' },
    { id: 4, name: 'Active Sessions', value: '42', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', trend: 'Live' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      
      {/* Sidebar - Sleek & Fixed */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Settings size={22} />
            </div>
            <span className="text-xl font-bold tracking-tight">NexusAdmin</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavLink to="/show_list"><NavItem icon={<ShoppingBag size={20}/>} label="Inventory" /></NavLink>
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

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 lg:px-12">
        
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500 text-sm">Real-time metrics and latest activity.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <Bell size={22} />
            </button>
            <button
              onClick={() => navigate("/add_items")}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all active:scale-95"
            >
              <PlusCircle size={18} />
              New Product
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {stats.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`${item.bg} ${item.color} p-2.5 rounded-lg`}>
                  <item.icon size={22} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.id === 4 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {item.trend}
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium">{item.name}</p>
              <h4 className="text-2xl font-bold mt-1">{loading ? "..." : item.value}</h4>
            </div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Transactions</h3>
            <button className="text-indigo-600 text-sm font-semibold hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-8 py-4 font-semibold">Order ID</th>
                  <th className="px-8 py-4 font-semibold">Date & Time</th>
                  <th className="px-8 py-4 font-semibold">Amount</th>
                  <th className="px-8 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                   <tr><td colSpan="4" className="p-10 text-center text-slate-400">Updating records...</td></tr>
                ) : latestOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-4">
                      <span className="font-mono text-sm font-medium text-slate-700">#{order._id.slice(-6).toUpperCase()}</span>
                    </td>
                    <td className="px-8 py-4 text-sm text-slate-500">
                      {new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-8 py-4 font-bold text-slate-800">
                      ₹{order.total_amount.toLocaleString()}
                    </td>
                    <td className="px-8 py-4">
                      <StatusBadge status={order.order_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Components for Cleaner Code
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}>
    {icon}
    <span className="font-semibold text-sm">{label}</span>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    placed: "bg-blue-50 text-blue-700 border-blue-100",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
    cancelled: "bg-rose-50 text-rose-700 border-rose-100",
  };
  return (
    <span className={`capitalize px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || "bg-slate-100"}`}>
      {status}
    </span>
  );
};

export default AdminDashboard;