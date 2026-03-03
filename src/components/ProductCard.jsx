import React from "react";
import { ShoppingCart, Star, Heart, Plus, Minus } from "lucide-react";

const ProductCard = ({
  item,
  quantity,
  onIncrease,
  onDecrease,
  onAddToCart,
}) => {
  const discountPercent =
    item.discount_price > 0
      ? Math.round(((item.price - item.discount_price) / item.price) * 100)
      : 0;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-3 hover:shadow-2xl transition-all duration-500 group">
      
      {/* Image */}
      <div className="relative h-64 rounded-2xl overflow-hidden bg-gray-50">
        <img
          src={Array.isArray(item.images) ? item.images[0] : item.images}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="px-2 py-4">
        <h3 className="font-bold text-gray-800 text-lg line-clamp-1">
          {item.name}
        </h3>

        <p className="text-gray-400 text-xs mb-3 line-clamp-1">
          {item.description}
        </p>

        {/* Price */}
        <div className="mb-3">
          <span className="text-xl font-black text-gray-900">
            ₹{item.price}
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border rounded-xl">
            <button
              onClick={onDecrease}
              className="px-3 py-2 hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>

            <span className="px-4 font-bold">{quantity}</span>

            <button
              onClick={onIncrease}
              className="px-3 py-2 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={onAddToCart}
            className="bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition"
          >
            Add
          </button>
          <div>
            {item.stock}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;