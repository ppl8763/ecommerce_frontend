import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ShieldAlert, Crown, History, Gem, Award, MapPin, 
  CheckCircle2, ChevronRight, Menu, Mail, ArrowRight, Star 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
    const navigate =useNavigate();
  // Parallax and Opacity effects
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 250]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#f8f5f0] selection:bg-amber-600/30 overflow-x-hidden">
      
      {/* --- PREMIUM NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center transition-all duration-500">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xl border-b border-white/5 z-[-1]" />
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
            <Crown className="text-amber-500" size={20} />
          </div>
          <span className="text-lg font-serif tracking-[0.4em] uppercase font-light">Grand Royale</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 text-[9px] font-bold uppercase tracking-[0.5em] text-amber-100/40">
          {['Heritage', 'Collection', 'The Vault', 'Estates'].map((item) => (
            <a key={item} href={`#${item}`} className="hover:text-amber-500 transition-colors relative group">
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-amber-500 transition-all group-hover:w-full" />
            </a>
          ))}
          <button className="ml-4 bg-amber-600 hover:bg-amber-500 text-black px-8 py-2.5 rounded-full transition-all active:scale-95 text-[10px] font-black shadow-lg shadow-amber-600/20" onClick={()=>{navigate("/login")}}>
            Login
          </button>
        </div>
        <Menu className="lg:hidden text-amber-500" />
      </nav>

      {/* --- CINEMATIC HERO --- */}
      <section className="relative h-screen overflow-hidden">
        <motion.div style={{ y: heroImageY, scale: scaleProgress }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1541693003297-710471092822?q=80&w=2500&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale-[20%] brightness-75"
            alt="Luxury Cigar"
          />
        </motion.div>

        <motion.div style={{ opacity: heroTextOpacity }} className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} 
             animate={{ opacity: 1, scale: 1 }} 
             className="mb-6 p-4 border border-amber-500/20 rounded-full backdrop-blur-sm"
          >
            <Star className="text-amber-500 fill-amber-500" size={12} />
          </motion.div>
          <h1 className="text-[14vw] md:text-[9vw] font-serif italic leading-[0.8] mb-8 text-white">
            Elegance <br /> <span className="not-italic uppercase font-black tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-600">Defined.</span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <button className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 px-10 py-5 rounded-full transition-all" onClick={()=>{navigate("/login")}}>
              <span className="text-xs uppercase font-bold tracking-[0.3em]">Continue to Boutique</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform text-amber-500" size={18} />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* --- THE BENTO FEATURE GRID --- */}
      <section id="heritage" className="py-32 px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          <div className="md:col-span-2 bg-[#0a0a0a] rounded-3xl p-12 border border-white/5 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
               <History size={200} />
            </div>
            <span className="text-amber-500 font-mono text-xs uppercase mb-4 tracking-widest">Est. 1892</span>
            <h2 className="text-4xl font-serif italic mb-4">A Century of Heritage</h2>
            <p className="max-w-md text-white/40 font-light">Hand-rolled by fourth-generation artisans in the heart of the Pinar del Río province.</p>
          </div>
          
          <div className="bg-amber-600 rounded-3xl p-12 flex flex-col justify-between text-black">
            <Award size={40} strokeWidth={1.5} />
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">98 Points</h3>
              <p className="text-sm font-bold opacity-70 italic">Global Connoisseur Rating</p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] rounded-3xl p-12 border border-white/5 flex flex-col items-center justify-center text-center">
            <MapPin className="text-amber-500 mb-6" size={32} />
            <h3 className="text-xl font-serif italic mb-2">Private Estates</h3>
            <p className="text-xs text-white/30 tracking-widest uppercase">Vuelta Abajo, Cuba</p>
          </div>

          <div className="md:col-span-2 bg-[#0a0a0a] rounded-3xl p-12 border border-white/5 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 h-full rounded-2xl overflow-hidden">
               <img src="https://images.unsplash.com/photo-1522032743820-946779438994?auto=format&fit=crop&w=800" className="w-full h-full object-cover" alt="Detail" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-serif italic mb-4">The Cedar Cure</h3>
              <p className="text-sm text-white/40 leading-relaxed italic">Our leaves are aged in Spanish Cedar vaults for a minimum of 12 years to achieve the "Blue Label" smoothness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE PRIVATE CIRCLE (Newsletter) --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0d0d0d] to-[#050505] rounded-[4rem] p-12 md:p-24 border border-amber-900/20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />
          <Mail className="text-amber-600 mx-auto mb-8" size={40} />
          <h2 className="text-5xl md:text-7xl font-serif italic mb-8">The Private Circle.</h2>
          <p className="text-amber-100/40 max-w-xl mx-auto mb-12 font-light text-lg italic">
            Be the first to know about limited reserve releases and private estate invitations.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button className="bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] px-10 py-4 rounded-full hover:bg-amber-500 transition-colors">
              Apply
            </button>
          </div>
        </div>
      </section>

      {/* --- REFINED FOOTER --- */}
      <footer className="bg-black pt-40 pb-12 px-6 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <Crown className="text-amber-500" />
              <h2 className="text-xl font-serif tracking-[0.2em] uppercase">Grand Royale</h2>
            </div>
            <p className="text-white/30 text-sm italic leading-loose">
              Excellence is not an act, but a habit. We curate the world's most exclusive tobacco experiences for the sovereign elite.
            </p>
          </div>
          
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-12 justify-end">
             <div className="bg-rose-950/10 p-10 rounded-3xl border border-rose-900/20 max-w-xl">
                <div className="flex items-center gap-3 mb-6 text-rose-500">
                  <ShieldAlert size={20} />
                  <span className="font-black text-[10px] uppercase tracking-widest">Surgeon General's Notice</span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.1em] leading-relaxed text-rose-200/40 italic font-medium">
                  Tobacco smoke contains carbon monoxide. Cigar smoking is not a safe alternative to cigarettes. Smoking causes lung cancer, heart disease, and emphysema. Strictly 21+ only.
                </p>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.8em]">
            © 2026 Grand Royale • The Sovereign Standard
          </p>
          <div className="flex gap-10 text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
            <span className="hover:text-amber-500 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-amber-500 transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-amber-500 transition-colors cursor-pointer">Origin</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;