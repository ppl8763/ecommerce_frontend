import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import api from "../Api/api";
import { Loader2 ,LogOut} from "lucide-react";

const Dashboard = () => {
  const { products, loading, error } = useProducts();
  const [quantities, setQuantities] = useState({});

  // Handle Quantity Change
  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // Add to Cart API Call
  const addToCart = async (productId) => {
    try {
      const quantity = quantities[productId] || 1;

      await api.post("/add_items", {
        product_id: productId,
        quantity: quantity,
      });

      alert("Added to cart successfully ✅");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Failed to add item");
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <HeroBanner />

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                item={product}
                quantity={quantities[product._id] || 1}
                onIncrease={() => increaseQty(product._id)}
                onDecrease={() => decreaseQty(product._id)}
                onAddToCart={() => addToCart(product._id)}
              />
            ))}
          </div>
        )}
        
      </main>
    </div>
  );
};

export default Dashboard;