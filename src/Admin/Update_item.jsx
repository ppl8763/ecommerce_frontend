import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  ImageIcon,
  DollarSign,
  Upload,
  X,
  CheckCircle2,
  Type,
  Tag,
  Hash,
  AlertCircle
} from "lucide-react";
import api from "../Api/api";

function Update_items() {
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    "Electronics", "Fashion", "Home & Kitchen", 
    "Beauty & Personal Care", "Sports & Outdoors", "Books", "Health"
  ];

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    discount_price: "",
    stock: ""
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`);
        const p = res.data;
        setData({
          name: p.name || "",
          description: p.description || "",
          category: p.category || "",
          brand: p.brand || "",
          price: p.price || "",
          discount_price: p.discount_price || "",
          stock: p.stock || ""
        });
        setPreview(p.images?.[0] || p.images || null);
        setFetching(false);
      } catch (err) {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const onHandle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      if (file) formData.append("file", file);

      await api.put(`/update_product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("✨ Product updated successfully");
      navigate("/show_list");
    } catch (err) {
      alert(err.response?.data?.detail || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-slate-500 font-medium">Loading Product Details...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation & Title */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all font-semibold mb-2"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Inventory
            </button>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Product</h1>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100">
            <AlertCircle size={14} /> ID: {id.slice(-6).toUpperCase()}
          </div>
        </div>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: CORE INFO */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* General Section */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                <Package size={16} className="text-indigo-500" /> General Information
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Product Title</label>
                <div className="relative">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    name="name"
                    value={data.name}
                    onChange={onHandle}
                    placeholder="e.g. UltraHD Smart Monitor"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
                <textarea
                  required
                  name="description"
                  value={data.description}
                  onChange={onHandle}
                  rows="5"
                  placeholder="Detailed product description..."
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                      required
                      name="category"
                      value={data.category}
                      onChange={onHandle}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all appearance-none font-medium"
                    >
                      <option value="">Choose...</option>
                      {categories.map((cat) => <option key={cat} value={cat.toLowerCase()}>{cat}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Brand</label>
                  <input
                    required
                    name="brand"
                    value={data.brand}
                    onChange={onHandle}
                    placeholder="Brand name"
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                <DollarSign size={16} className="text-emerald-500" /> Pricing & Inventory
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Price (₹)</label>
                  <input
                    required
                    name="price"
                    type="number"
                    value={data.price}
                    onChange={onHandle}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Discount (₹)</label>
                  <input
                    name="discount_price"
                    type="number"
                    value={data.discount_price}
                    onChange={onHandle}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Stock Level</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      required
                      name="stock"
                      type="number"
                      value={data.stock}
                      onChange={onHandle}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: MEDIA & ACTIONS */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mb-6">
                Product Media
              </h3>

              <div className="relative group">
                {!preview ? (
                  <label className="flex flex-col items-center justify-center h-72 border-2 border-dashed border-slate-200 rounded-[1.5rem] bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 transition-all cursor-pointer group">
                    <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Upload size={28} className="text-indigo-600" />
                    </div>
                    <p className="text-sm font-bold text-slate-700 mt-4">Upload New Image</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP</p>
                    <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                  </label>
                ) : (
                  <div className="relative h-72 rounded-[1.5rem] overflow-hidden border border-slate-200 group">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={removeImage}
                        className="bg-white text-rose-600 p-3 rounded-full hover:bg-rose-600 hover:text-white transition-all shadow-xl"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase border border-white/20 shadow-sm">
                      Current Image
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Actions */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Store...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-[0.98]"
              >
                Discard Changes
              </button>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
              <AlertCircle size={20} className="text-amber-500 shrink-0" />
              <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
                Changes will be live instantly across the storefront once you save.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update_items;