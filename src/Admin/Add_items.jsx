import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Package, 
  ImageIcon, 
  Tag, 
  Hash, 
  DollarSign, 
  Upload, 
  X, 
  CheckCircle2,
  Type
} from "lucide-react";
import api from "../Api/api";

function Add_items() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    discount_price: "",
    stock: "",
    category: "",
    brand: "",
    image: null // Changed to single file object
  });

  const categories = [
    "Electronics", "Fashion", "Home & Kitchen",
    "Beauty & Personal Care", "Sports & Outdoors", "Books", "Health"
  ];

  const onHandle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({ ...data, image: file });
      setPreview(URL.createObjectURL(file)); // Create local URL for preview
    }
  };

  const removeImage = () => {
    setData({ ...data, image: null });
    setPreview(null);
  };

  const add_items = async (e) => {
    e.preventDefault();
    if (!data.image) return alert("Please upload a product image");

    setLoading(true);
    try {
      // Use FormData for File Uploads
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("discount_price", data.discount_price || 0);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("brand", data.brand);
      formData.append("file", data.image); // Field name must match FastAPI 'file' param

      const res = await api.post("/add_product", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("🎉 Product added successfully!");
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.detail || "Something went wrong during upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-2 font-medium"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <h1 className="text-3xl font-bold text-slate-900">Create New Product</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <form onSubmit={add_items} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Package size={16} /> Product Details
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Product Name</label>
                <div className="relative">
                  <Type className="absolute left-4 top-3 text-slate-400" size={18} />
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="e.g. Sony WH-1000XM5"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    onChange={onHandle}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  required
                  name="description"
                  rows="4"
                  placeholder="Tell customers about your product..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  onChange={onHandle}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <select
                    required
                    name="category"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white outline-none"
                    onChange={onHandle}
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat} value={cat.toLowerCase()}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Brand</label>
                  <input
                    required
                    name="brand"
                    type="text"
                    placeholder="e.g. Apple"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    onChange={onHandle}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <DollarSign size={16} /> Inventory & Pricing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Price (₹)</label>
                  <input required name="price" type="number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" onChange={onHandle} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Discount (₹)</label>
                  <input name="discount_price" type="number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" onChange={onHandle} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Stock</label>
                  <input required name="stock" type="number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" onChange={onHandle} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image Upload & Submit */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <ImageIcon size={16} /> Product Media
              </h3>
              
              <div className="relative group">
                {!preview ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 transition-all cursor-pointer">
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="p-4 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <Upload size={30} className="text-indigo-600" />
                      </div>
                      <p className="text-sm font-bold text-slate-700">Click to upload image</p>
                      <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                ) : (
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={removeImage} className="p-3 bg-white text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-all">
                        <X size={24} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg">
                      <CheckCircle2 size={20} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Processing..." : "Publish Product"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-4 bg-white text-slate-500 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Discard Draft
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Add_items;