import React from "react";

const HeroBanner = () => {
  return (
    <section className="relative w-full mb-12">
      <div className="bg-slate-900 rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center">
        <div className="p-8 md:p-16 flex-1 text-center md:text-left">
          <span className="text-indigo-400 font-bold tracking-widest text-sm uppercase">
            Limited Time Offer
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-6 leading-tight">
            Summer <span className="text-indigo-500">Essentials</span> <br />
            Are Here.
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Get up to 50% off on our latest arrivals. Free shipping on orders over $50.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/20">
            Explore Collection
          </button>
        </div>
        
        {/* Ad Image / Graphic Placeholder */}
        <div className="flex-1 w-full h-64 md:h-[400px] bg-indigo-600/20 relative group">
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition"></div>
             <p className="text-indigo-200 font-serif italic text-2xl">Featured Ad Space</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;