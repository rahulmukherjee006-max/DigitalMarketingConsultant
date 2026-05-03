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

  const [sBizType, setSBizType] = useState('local');
  const [sLocation, setSLocation] = useState('tier1');
  const [sRadius, setSRadius] = useState('city');
  const [sGoal, setSGoal] = useState('grow');
  const [sPlatform, setSPlatform] = useState('both');
  const [suggestedBudget, setSuggestedBudget] = useState({ min: 0, max: 0 });

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

  useEffect(() => {
    let base = 15000;
    if (sBizType === 'ecom') base = 30000;
    else if (sBizType === 'b2b') base = 25000;
    else if (sBizType === 'realestate') base = 50000;

    let radMult = 1;
    if (sRadius === 'city') radMult = 1.5;
    else if (sRadius === 'state') radMult = 2.5;
    else if (sRadius === 'national') radMult = 4;
    else if (sRadius === 'global') radMult = 8;

    let locMult = 1;
    if (sLocation === 'tier1') locMult = 1.5;
    else if (sLocation === 'tier3') locMult = 0.8;

    let goalMult = 1.5;
    if (sGoal === 'maintain') goalMult = 1;
    else if (sGoal === 'aggressive') goalMult = 2.5;

    let platMult = 1;
    if (sPlatform === 'both') platMult = 1.6;
    else if (sPlatform === 'google') platMult = 1.2;
    // meta/facebook/instagram is 1.0

    const finalBudget = base * radMult * locMult * goalMult * platMult;
    
    setSuggestedBudget({
      min: Math.max(10000, Math.floor(finalBudget * 0.8 / 1000) * 1000),
      max: Math.max(15000, Math.ceil(finalBudget * 1.2 / 1000) * 1000)
    });
  }, [sBizType, sLocation, sRadius, sGoal, sPlatform]);

  return (
    <div className="bg-bg-primary min-h-screen text-text-main overflow-x-hidden selection:bg-brand-accent selection:text-brand-dark relative">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12 px-6 relative bg-bg-primary">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
          
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-bold text-xs uppercase tracking-wider mb-4">
                See Your Potential
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-main font-display">
                Ad Spend Calculator
              </h1>
              <p className="text-text-muted max-w-2xl mx-auto text-lg">
                Stop guessing. See exactly what your ad budget could generate with optimized campaigns.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Controls */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-bg-secondary p-8 md:p-10 rounded-[32px] border border-border-subtle space-y-8"
              >
                <div>
                  <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                    <Calculator className="text-brand-accent w-6 h-6" />
                    Your Inputs
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-3">
                        Business Type
                      </label>
                      <div className="flex bg-bg-primary p-1.5 rounded-xl border border-border-subtle">
                        <button
                          onClick={() => setIndustry('b2b')}
                          className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                            industry === 'b2b' 
                              ? 'bg-text-main/10 text-text-main shadow-md' 
                              : 'text-text-muted hover:text-text-main'
                          }`}
                        >
                          B2B / Form Leads
                        </button>
                        <button
                          onClick={() => setIndustry('ecommerce')}
                          className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                            industry === 'ecommerce' 
                              ? 'bg-text-main/10 text-text-main shadow-md' 
                              : 'text-text-muted hover:text-text-main'
                          }`}
                        >
                          E-Commerce
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-3">
                        Ad Platform
                      </label>
                      <div className="flex flex-wrap sm:flex-nowrap bg-bg-primary p-1.5 rounded-xl border border-border-subtle gap-1">
                        <button
                          onClick={() => setPlatform('google')}
                          className={`flex-1 min-w-[30%] py-3 px-2 rounded-lg flex items-center justify-center transition-all ${
                            platform === 'google' 
                              ? 'bg-text-main/10 shadow-md' 
                              : 'opacity-50 hover:opacity-100 hover:bg-text-main/5'
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
                              ? 'bg-text-main/10 shadow-md' 
                              : 'opacity-50 hover:opacity-100 hover:bg-text-main/5'
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
                              ? 'bg-text-main/10 shadow-md' 
                              : 'opacity-50 hover:opacity-100 hover:bg-text-main/5'
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
                        <label className="block text-sm font-bold text-text-muted uppercase tracking-wider">
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
                        className="w-full h-2 bg-bg-primary rounded-lg appearance-none cursor-pointer accent-brand-accent"
                      />
                      <div className="flex justify-between text-xs text-text-muted mt-2 font-mono">
                        <span>₹10,000</span>
                        <span>₹5L+</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-bg-primary rounded-xl border border-border-subtle text-sm text-text-muted flex items-start gap-3">
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
                    <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
                      Estimated Monthly Revenue
                    </p>
                    <div className="text-4xl md:text-6xl font-black text-text-main font-display tracking-tight mb-8">
                      ₹{results.revenue.toLocaleString()}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-bg-secondary/80 backdrop-blur p-4 rounded-2xl border border-border-subtle">
                        <div className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-brand-accent" /> ROAS
                        </div>
                        <div className="text-2xl font-bold text-text-main">{results.roas}x</div>
                      </div>
                      
                      {industry === 'b2b' ? (
                        <div className="bg-bg-secondary/80 backdrop-blur p-4 rounded-2xl border border-border-subtle">
                          <div className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-brand-accent" /> Leads
                          </div>
                          <div className="text-2xl font-bold text-text-main">{results.leads.toLocaleString()}</div>
                        </div>
                      ) : (
                        <div className="bg-bg-secondary/80 backdrop-blur p-4 rounded-2xl border border-border-subtle">
                          <div className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                            <ShoppingCart className="w-3.5 h-3.5 text-brand-accent" /> Sales
                          </div>
                          <div className="text-2xl font-bold text-text-main">{results.sales.toLocaleString()}</div>
                        </div>
                      )}

                      <div className="bg-bg-secondary/80 backdrop-blur p-4 rounded-2xl border border-border-subtle col-span-2">
                          <div className="flex justify-between items-center mb-1">
                              <span className="text-text-muted text-xs font-bold uppercase tracking-wider">Estimated Traffic</span>
                              <span className="text-text-main font-bold">{results.clicks.toLocaleString()} visitors</span>
                          </div>
                          <div className="w-full bg-bg-primary h-1.5 rounded-full overflow-hidden">
                              <div className="bg-brand-accent/50 h-full w-full rounded-full"></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="/#contact"
                  className="block w-full py-4 md:py-5 rounded-2xl bg-text-main/5 hover:bg-text-main/10 border border-border-subtle text-center font-bold text-text-main transition-all text-lg shadow-lg hover:border-brand-accent/30"
                >
                  Get Your Custom Growth Plan
                </Link>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- Budget Suggestor Section --- */}
        <section className="py-16 px-6 relative bg-bg-secondary border-t border-border-subtle">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-bold text-xs uppercase tracking-wider mb-4">
                Not sure how much to spend?
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-main font-display">
                Ad Budget Suggestor
              </h2>
              <p className="text-text-muted text-lg">
                Answer a few quick questions and we'll suggest a starting ad budget based on your goals and market size.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
                    Business Type
                  </label>
                  <select 
                    value={sBizType} 
                    onChange={(e) => setSBizType(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-xl p-3 text-text-main font-medium focus:outline-none focus:border-brand-accent transition-colors"
                  >
                    <option value="local">Local Business (Salon, Clinic, etc)</option>
                    <option value="ecom">E-commerce / D2C</option>
                    <option value="b2b">B2B Services / Tech</option>
                    <option value="realestate">Real Estate / High Ticket</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
                    Location Tier
                  </label>
                  <select 
                    value={sLocation} 
                    onChange={(e) => setSLocation(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-xl p-3 text-text-main font-medium focus:outline-none focus:border-brand-accent transition-colors"
                  >
                    <option value="tier1">Tier 1 / Metro City</option>
                    <option value="tier2">Tier 2 City</option>
                    <option value="tier3">Tier 3 City / Town</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
                    Targeting Radius
                  </label>
                  <select 
                    value={sRadius} 
                    onChange={(e) => setSRadius(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-xl p-3 text-text-main font-medium focus:outline-none focus:border-brand-accent transition-colors"
                  >
                    <option value="local">Local (&lt; 10km)</option>
                    <option value="city">City-wide</option>
                    <option value="state">State-wide</option>
                    <option value="national">Pan India</option>
                    <option value="global">Global</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
                    Growth Goals
                  </label>
                  <select 
                    value={sGoal} 
                    onChange={(e) => setSGoal(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-xl p-3 text-text-main font-medium focus:outline-none focus:border-brand-accent transition-colors"
                  >
                    <option value="maintain">Steady (Maintain & Build)</option>
                    <option value="grow">Growth (Scale Up)</option>
                    <option value="aggressive">Aggressive (Dominate Market)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
                    Platform Strategy
                  </label>
                  <select 
                    value={sPlatform} 
                    onChange={(e) => setSPlatform(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-xl p-3 text-text-main font-medium focus:outline-none focus:border-brand-accent transition-colors"
                  >
                    <option value="both">Both (Google + Meta/FB/IG)</option>
                    <option value="google">Google Ads</option>
                    <option value="meta">Meta Ads (Facebook/Instagram)</option>
                    <option value="facebook">Facebook Only</option>
                    <option value="instagram">Instagram Only</option>
                  </select>
                </div>
              </div>

              <div className="bg-brand-accent/5 p-8 rounded-[32px] border border-brand-accent/20 h-full flex flex-col justify-center relative overflow-hidden backdrop-blur-sm shadow-xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                 
                 <div className="relative z-10 text-center space-y-6">
                    <p className="text-sm font-bold text-text-muted uppercase tracking-wider">
                      Suggested Monthly Budget
                    </p>
                    <div className="text-4xl lg:text-5xl font-black text-brand-accent font-display tracking-tight">
                      ₹{suggestedBudget.min.toLocaleString()} - ₹{suggestedBudget.max.toLocaleString()}
                    </div>
                    <p className="text-text-muted text-sm px-4">
                      This is a recommended range to effectively reach your target audience and see meaningful return on ad spend.
                    </p>
                    
                    <button 
                      onClick={() => {
                        setBudget(Math.round((suggestedBudget.min + suggestedBudget.max) / 2));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="mt-4 px-6 py-3 bg-brand-accent text-brand-dark rounded-xl font-bold hover:scale-105 transition-transform"
                    >
                      Use Average in Calculator
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
