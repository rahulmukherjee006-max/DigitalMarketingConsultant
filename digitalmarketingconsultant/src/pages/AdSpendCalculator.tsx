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
                          className={`flex-1 min-w-[30%] py-3 px-2 rounded-lg text-sm font-bold transition-all ${
                            platform === 'google' 
                              ? 'bg-white/10 text-white shadow-md' 
                              : 'text-[#8997a7] hover:text-white'
                          }`}
                        >
                          Google Ads
                        </button>
                        <button
                          onClick={() => setPlatform('facebook')}
                          className={`flex-1 min-w-[30%] py-3 px-2 rounded-lg text-sm font-bold transition-all ${
                            platform === 'facebook' 
                              ? 'bg-white/10 text-white shadow-md' 
                              : 'text-[#8997a7] hover:text-white'
                          }`}
                        >
                          Facebook
                        </button>
                        <button
                          onClick={() => setPlatform('instagram')}
                          className={`flex-1 min-w-[30%] py-3 px-2 rounded-lg text-sm font-bold transition-all ${
                            platform === 'instagram' 
                              ? 'bg-white/10 text-white shadow-md' 
                              : 'text-[#8997a7] hover:text-white'
                          }`}
                        >
                          Instagram
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
