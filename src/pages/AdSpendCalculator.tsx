import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';

export default function AdSpendCalculator() {
  const [budget, setBudget] = useState(50000);
  const [industry, setIndustry] = useState<'b2b' | 'ecommerce'>('b2b');
  const [platform, setPlatform] = useState<'google' | 'facebook' | 'instagram'>('google');
  const { items } = useCartStore();

  const [results, setResults] = useState({
    clicks: 0,
    leads: 0,
    sales: 0,
    revenue: 0,
    roas: 0
  });

  useEffect(() => {
    let cpc, convRate, leadToSale, avgOrderValue;

    if (platform === 'google') {
      cpc = industry === 'b2b' ? 60 : 20;
      convRate = industry === 'b2b' ? 0.08 : 0.04;
      leadToSale = industry === 'b2b' ? 0.15 : 1;
      avgOrderValue = industry === 'b2b' ? 40000 : 2500;
    } else if (platform === 'facebook') {
      cpc = industry === 'b2b' ? 30 : 12;
      convRate = industry === 'b2b' ? 0.04 : 0.025;
      leadToSale = industry === 'b2b' ? 0.08 : 1;
      avgOrderValue = industry === 'b2b' ? 40000 : 2500;
    } else { // instagram
      cpc = industry === 'b2b' ? 35 : 10;
      convRate = industry === 'b2b' ? 0.03 : 0.03;
      leadToSale = industry === 'b2b' ? 0.07 : 1;
      avgOrderValue = industry === 'b2b' ? 40000 : 2500;
    }

    const clicks = Math.floor(budget / cpc);
    const leads = Math.floor(clicks * convRate);
    const sales = Math.floor(leads * leadToSale);
    const revenue = sales * avgOrderValue;
    const roas = budget > 0 ? (revenue / budget).toFixed(1) : 0;

    setResults({
      clicks,
      leads: industry === 'b2b' ? leads : 0,
      sales,
      revenue,
      roas: Number(roas)
    });
  }, [budget, industry, platform]);

  return (
    <div className="bg-[#0c1205] min-h-screen text-white overflow-x-hidden selection:bg-brand-accent selection:text-brand-dark relative">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12 px-6 relative bg-[#0c1205]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
          
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-bold text-xs uppercase tracking-wider mb-4">
                See Your Potential
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-display">
                Ad Spend Calculator
              </h1>
              <p className="text-[#8997a7] max-w-2xl mx-auto text-lg">
                Stop guessing. See exactly what your ad budget could generate with optimized campaigns.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Controls */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#161a20] p-8 md:p-10 rounded-[32px] border border-white/5 space-y-8"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Calculator className="text-brand-accent w-6 h-6" />
                    Your Inputs
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-[#8997a7] uppercase tracking-wider mb-3">
                        Business Type
                      </label>
                      <div className="flex bg-[#0c1205] p-1.5 rounded-xl border border-white/5">
                        <button
                          onClick={() => setIndustry('b2b')}
                          className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${
                            industry === 'b2b' 
                              ? 'bg-white/10 text-white shadow-md' 
                              : 'text-[#8997a7] hover:text-white'
                          }`}
                        >
                          B2B / Form Leads
                        </button>
                        <button
                          onClick={() => setIndustry('ecommerce')}
                          className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${
                            industry === 'ecommerce' 
                              ? 'bg-white/10 text-white shadow-md' 
                              : 'text-[#8997a7] hover:text-white'
                          }`}
                        >
                          E-commerce
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#8997a7] uppercase tracking-wider mb-3">
                        Ad Platform
                      </label>
                      <div className="flex flex-wrap sm:flex-nowrap bg-[#0c1205] p-1.5 rounded-xl border border-white/5 gap-1">
                        <button
                          onClick={() => setPlatform('google')}
                          className={`flex-1 min-w-[30%] py-3 px-2 rounded-lg flex items-center justify-center transition-all ${
                            platform === 'google' 
                              ? 'bg-white/10 shadow-md' 
                              : 'opacity-50 hover:opacity-100 hover:bg-white/5'
                          }`}
                        >
                          <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => setPlatform('facebook')}
                          className={`flex-1 min-w-[30%] py-3 px-2 rounded-lg flex items-center justify-center transition-all ${
                            platform === 'facebook' 
                              ? 'bg-white/10 shadow-md' 
                              : 'opacity-50 hover:opacity-100 hover:bg-white/5'
                          }`}
                        >
                          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => setPlatform('instagram')}
                          className={`flex-1 min-w-[30%] py-3 px-2 rounded-lg flex items-center justify-center transition-all ${
                            platform === 'instagram' 
                              ? 'bg-white/10 shadow-md' 
                              : 'opacity-50 hover:opacity-100 hover:bg-white/5'
                          }`}
                        >
                          <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <radialGradient id="ig-grad1" cx="0.2" cy="1" r="1.5" fx="0.1" fy="1" gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor="#f09433"/>
                                <stop offset="0.3" stopColor="#e6683c"/>
                                <stop offset="0.6" stopColor="#dc2743"/>
                                <stop offset="0.8" stopColor="#cc2366"/>
                                <stop offset="1" stopColor="#bc1888"/>
                              </radialGradient>
                            </defs>
                            <path fill="url(#ig-grad1)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.362-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.2-4.358-2.618-6.78-6.98-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.98a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-3">
                        <label className="block text-sm font-bold text-[#8997a7] uppercase tracking-wider">
                          Monthly Ad Budget
                        </label>
                        <span className="text-xl font-bold text-brand-accent font-mono z-10">
                          ₹{budget.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10000"
                        max="500000"
                        step="5000"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full h-2 bg-[#0c1205] rounded-lg appearance-none cursor-pointer accent-brand-accent"
                      />
                      <div className="flex justify-between text-xs text-[#8997a7] mt-2 font-mono">
                        <span>₹10,000</span>
                        <span>₹5L+</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-[#0c1205] rounded-xl border border-white/5 text-sm text-[#8997a7] flex items-start gap-3">
                  <span className="text-brand-accent text-lg leading-none">💡</span>
                  <p>These are conservative estimates based on industry benchmarks. Our goal is to beat these numbers.</p>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="bg-brand-accent/5 p-8 md:p-10 rounded-[32px] border border-brand-accent/20 relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <p className="text-sm font-bold text-[#8997a7] uppercase tracking-wider mb-2">
                      Estimated Monthly Revenue
                    </p>
                    <div className="text-5xl md:text-6xl font-black text-white font-display tracking-tight mb-8">
                      ₹{results.revenue.toLocaleString()}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#161a20]/80 backdrop-blur p-4 rounded-2xl border border-white/5">
                        <div className="text-[#8997a7] text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-brand-accent" /> ROAS
                        </div>
                        <div className="text-2xl font-bold text-white">{results.roas}x</div>
                      </div>
                      
                      {industry === 'b2b' ? (
                        <div className="bg-[#161a20]/80 backdrop-blur p-4 rounded-2xl border border-white/5">
                          <div className="text-[#8997a7] text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-brand-accent" /> Leads
                          </div>
                          <div className="text-2xl font-bold text-white">{results.leads.toLocaleString()}</div>
                        </div>
                      ) : (
                        <div className="bg-[#161a20]/80 backdrop-blur p-4 rounded-2xl border border-white/5">
                          <div className="text-[#8997a7] text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                            <ShoppingCart className="w-3.5 h-3.5 text-brand-accent" /> Sales
                          </div>
                          <div className="text-2xl font-bold text-white">{results.sales.toLocaleString()}</div>
                        </div>
                      )}

                      <div className="bg-[#161a20]/80 backdrop-blur p-4 rounded-2xl border border-white/5 col-span-2">
                          <div className="flex justify-between items-center mb-1">
                              <span className="text-[#8997a7] text-xs font-bold uppercase tracking-wider">Estimated Traffic</span>
                              <span className="text-white font-bold">{results.clicks.toLocaleString()} visitors</span>
                          </div>
                          <div className="w-full bg-[#0c1205] h-1.5 rounded-full overflow-hidden">
                              <div className="bg-brand-accent/50 h-full w-full rounded-full"></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="/#contact"
                  className="block w-full py-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center font-bold text-white transition-all text-lg shadow-lg hover:border-brand-accent/30"
                >
                  Get Your Custom Growth Plan
                </Link>
              </motion.div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      
      {items.length > 0 && (
        <Link 
          to="/build-plan" 
          className="fixed bottom-24 right-6 z-50 flex items-center justify-center gap-2 bg-[#161a20] border-2 border-brand-accent text-white px-5 py-3 rounded-full shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:scale-105 transition-transform"
        >
          <ShoppingCart className="w-5 h-5 text-brand-accent" />
          <span className="font-bold">{items.length} item{items.length > 1 ? 's' : ''} in Plan</span>
        </Link>
      )}
    </div>
  );
}
