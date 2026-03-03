import React from "react";
import { ShoppingCart, Plus, Minus, Package } from "lucide-react";

const ProductCard = ({
  item,
  quantity = 1, // Defaulting to 1 for better UX
  onIncrease,
  onDecrease,
  onAddToCart,
}) => {
  // Logic for discount and stock status
  const discountPercent =
    item.discount_price > 0
      ? Math.round(((item.price - item.discount_price) / item.price) * 100)
      : 0;

  const isOutOfStock = item.stock <= 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-indigo-100">
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={Array.isArray(item.images) ? item.images[0] : item.images}
          alt={item.name}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${isOutOfStock ? 'grayscale opacity-50' : ''}`}
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
            {discountPercent}% Off
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <h3 className="font-bold text-slate-800 text-base line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {item.name}
          </h3>
          <p className="text-slate-500 text-xs line-clamp-1 mt-0.5">
            {item.description}
          </p>
        </div>

        {/* Price & Stock Row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-black text-slate-900">
            ₹{item.price.toLocaleString('en-IN')}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            <Package size={12} />
            {isOutOfStock ? <span className="text-rose-500">Out of Stock</span> : `${item.stock} left`}
          </div>
        </div>

        {/* Controls Grid */}
        <div className="mt-auto flex items-center gap-2">
          {/* Quantity Selector */}
          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden shrink-0">
            <button
              onClick={onDecrease}
              disabled={isOutOfStock}
              className="px-2.5 py-2 hover:bg-white hover:text-rose-600 transition-colors disabled:opacity-30"
            >
              <Minus size={14} strokeWidth={2.5} />
            </button>

            <span className="px-2 text-sm font-bold text-slate-700 min-w-[24px] text-center">
              {quantity}
            </span>

            <button
              onClick={onIncrease}
              disabled={isOutOfStock || quantity >= item.stock}
              className="px-2.5 py-2 hover:bg-white hover:text-indigo-600 transition-colors disabled:opacity-30"
            >
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={onAddToCart}
            disabled={isOutOfStock}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2 px-3 rounded-lg text-sm font-bold transition-all hover:bg-indigo-600 active:scale-[0.97] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;