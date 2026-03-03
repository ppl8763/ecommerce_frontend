import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import api from "../Api/api";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false); // For button loading states
  const navigate = useNavigate()
  useEffect(() => {
    fetchCart();
  }, []);

  const checkout = async () => {
  try {
    const res = await api.post("/checkout");
    const data = res.data;

    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      name: "Your Store",
      order_id: data.razorpay_order_id,

      handler: async function (response) {
        await api.post("/verify-payment", response);
        alert("Payment Successful!");
        navigate("/user_cart");
      },

      modal: {
        ondismiss: function () {
          alert("Payment Cancelled");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert("Payment failed. Try again.");
  }
};
  const handleDeleteItem = async (productId) => {
    try {
      await api.delete(`/cart/delete/${productId}`);
      fetchCart();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/my_cart", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.message === "Cart is empty") {
        setCart(null);
      } else {
        setCart(res.data);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to load your shopping bag.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    try {
      await api.put("/cart/update", {
        product_id: productId,
        quantity: newQuantity
      });

      fetchCart();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsUpdating(false);
    }
  };


  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-gray-500 font-medium">Syncing your cart...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-10">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-gray-900 flex items-center justify-center md:justify-start gap-3">
            <ShoppingBag className="text-indigo-600" size={36} />
            My Cart
          </h1>
          {error && <p className="text-red-500 mt-2 bg-red-50 py-2 px-4 rounded-lg inline-block">{error}</p>}
        </header>

        {!cart || cart.items.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-16 text-center border border-gray-100 shadow-xl shadow-gray-200/50">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Your cart is feeling light</h3>
            <p className="text-gray-500 mt-2 mb-8">Items you add to your cart will appear here.</p>
            <button className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-all"onClick={()=>navigate("/user")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Items List */}
            <div className="lg:col-span-8 space-y-6">
              {cart.items.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500"
                >
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100">
                    <img src={item.images} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <p className="text-indigo-600 font-black text-lg mt-1">₹{item.price_at_time.toLocaleString()}</p>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                        <button
                          disabled={isUpdating}
                          onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1)}
                          className="p-2 hover:bg-white rounded-lg transition-all disabled:opacity-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button
                          disabled={isUpdating}
                          onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                          className="p-2 hover:bg-white rounded-lg transition-all disabled:opacity-50"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item.product_id)}
                        className="ml-4 p-2 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <aside className="lg:col-span-4">
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/60 sticky top-10">
                <h2 className="text-2xl font-bold mb-6">Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-gray-900">₹{cart.total_ammount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Delivery</span>
                    <span className="text-green-600 flex items-center gap-1 font-bold">
                      <Truck size={16} /> FREE
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                    <span className="text-gray-500 font-medium">Total</span>
                    <span className="text-3xl font-black text-indigo-600">
                      ₹{cart.total_ammount?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-indigo-600 text-white mt-8 py-5 rounded-[1.5rem] font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-all shadow-lg shadow-indigo-200 active:scale-[0.97]" onClick={checkout}>
                  Checkout
                  <ArrowRight size={20} />
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-green-500" />
                  Secure 256-bit SSL Payment
                </div>
              </div>
            </aside>

          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;