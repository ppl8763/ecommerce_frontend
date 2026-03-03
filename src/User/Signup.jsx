import React, { useState } from "react";
import axios from "axios";
import { User, Mail, Lock, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: [{ street: "", city: "", state: "", pincode: "", region: "" }]
  });
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const updatedAddress = [...data.address];
    updatedAddress[0] = { ...updatedAddress[0], [name]: value };
    setData((prev) => ({ ...prev, address: updatedAddress }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/signup", data);
      alert("Account created successfully! Welcome to the store.");
      navigate("/login")
    } catch (error) {
      alert(error.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-indigo-600">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already a member?{" "}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in to your account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            
            {/* --- Profile Section --- */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                <User size={16} className="mr-2" /> Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                  />
                </div>
                <div className="relative">
                  <input
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="mt-4 space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="email@example.com"
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="Create a strong password"
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                <MapPin size={16} className="mr-2" /> Shipping Address
              </h3>
              <div className="space-y-4">
                <input
                  name="street"
                  placeholder="Street Address, P.O. box, company name"
                  onChange={handleAddressChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="city"
                    placeholder="City"
                    onChange={handleAddressChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                  />
                  <input
                    name="pincode"
                    placeholder="Zip / Postal Code"
                    onChange={handleAddressChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="state"
                    placeholder="State / Province"
                    onChange={handleAddressChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                  />
                  <select
                    name="region"
                    onChange={handleAddressChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                  >
                    <option value="">Select Region Type</option>
                    <option value="Home">Home (Delivery all day)</option>
                    <option value="Office">Office (9 AM - 6 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && <ArrowRight size={18} className="ml-2" />}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Secure 256-bit SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;