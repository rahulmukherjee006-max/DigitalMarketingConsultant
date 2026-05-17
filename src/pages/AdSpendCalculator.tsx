import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, Users, ShoppingCart, Check, Settings, MousePointerClick, Activity, Award, Calendar } from 'lucide-react';
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
          
          <div className="max-w-6xl mx-auto relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
              <div className="flex-1 space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-text-main font-display tracking-tight">
                  Ad Spend Calculator
                </h1>
                <p className="text-text-muted text-lg max-w-xl">
                  Plan your advertising budget and see potential results based on your campaign goals.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-bg-primary rounded-2xl p-5 flex gap-4 items-center shadow-sm border border-border-subtle hover:border-brand-accent/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0 border border-brand-accent/20">
                  <Calculator className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-text-main text-sm">Plan Smarter</h4>
                  <p className="text-text-muted text-xs mt-1">Optimize your budget allocation</p>
                </div>
              </div>
              <div className="bg-bg-primary rounded-2xl p-5 flex gap-4 items-center shadow-sm border border-border-subtle hover:border-brand-accent/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0 border border-brand-accent/20">
                  <Activity className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-text-main text-sm">Forecast Results</h4>
                  <p className="text-text-muted text-xs mt-1">See estimated clicks, leads and conversions</p>
                </div>
              </div>
              <div className="bg-bg-primary rounded-2xl p-5 flex gap-4 items-center shadow-sm border border-border-subtle hover:border-brand-accent/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0 border border-brand-accent/20">
                  <TrendingUp className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-text-main text-sm">Maximize ROI</h4>
                  <p className="text-text-muted text-xs mt-1">Make data-driven decisions with confidence</p>
                </div>
              </div>
            </div>

            <div className="bg-bg-primary rounded-[32px] p-6 md:p-8 lg:p-10 shadow-sm border border-border-subtle hover:border-brand-accent/20 transition-all">
              
              <div className="mb-10">
                 <h3 className="font-bold text-xl text-text-main mb-1">Choose Your Platform</h3>
                 <p className="text-text-muted text-sm mb-6">Select the advertising platform for your campaign</p>
                 <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <button
                       onClick={() => setPlatform('google')}
                       className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 p-2 md:p-4 rounded-xl border-2 transition-all relative ${
                         platform === 'google' 
                           ? 'border-brand-accent bg-brand-accent/5' 
                           : 'border-border-subtle hover:border-text-muted/30'
                       }`}
                    >
                       <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 shrink-0" xmlns="http://www.w3.org/2000/svg">
                         <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                         <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                         <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                         <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                       </svg>
                       <span className="font-bold text-text-main text-[10px] md:text-sm text-center leading-tight">Google Ads</span>
                       {platform === 'google' && <div className="absolute top-1 right-1 md:top-2 md:right-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-brand-accent flex items-center justify-center shrink-0"><Check className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-brand-dark" /></div>}
                    </button>
                    
                    <button
                       onClick={() => setPlatform('facebook')}
                       className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 p-2 md:p-4 rounded-xl border-2 transition-all relative ${
                         platform === 'facebook' 
                           ? 'border-brand-accent bg-brand-accent/5' 
                           : 'border-border-subtle hover:border-text-muted/30'
                       }`}
                    >
                       <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 shrink-0" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                       </svg>
                       <span className="font-bold text-text-main text-[10px] md:text-sm text-center leading-tight">Facebook</span>
                       {platform === 'facebook' && <div className="absolute top-1 right-1 md:top-2 md:right-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-brand-accent flex items-center justify-center shrink-0"><Check className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-brand-dark" /></div>}
                    </button>
                    
                    <button
                       onClick={() => setPlatform('instagram')}
                       className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 p-2 md:p-4 rounded-xl border-2 transition-all relative ${
                         platform === 'instagram' 
                           ? 'border-brand-accent bg-brand-accent/5' 
                           : 'border-border-subtle hover:border-text-muted/30'
                       }`}
                    >
                       <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 shrink-0" xmlns="http://www.w3.org/2000/svg">
                         <defs>
                           <radialGradient id="ig-grad2" cx="0.2" cy="1" r="1.5" fx="0.1" fy="1" gradientUnits="userSpaceOnUse">
                             <stop offset="0" stopColor="#f09433"/>
                             <stop offset="0.3" stopColor="#e6683c"/>
                             <stop offset="0.6" stopColor="#dc2743"/>
                             <stop offset="0.8" stopColor="#cc2366"/>
                             <stop offset="1" stopColor="#bc1888"/>
                           </radialGradient>
                         </defs>
                         <path fill="url(#ig-grad2)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.362-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.2-4.358-2.618-6.78-6.98-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.98a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                       </svg>
                       <span className="font-bold text-text-main text-[10px] md:text-sm text-center leading-tight">Instagram</span>
                       {platform === 'instagram' && <div className="absolute top-1 right-1 md:top-2 md:right-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-brand-accent flex items-center justify-center shrink-0"><Check className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-brand-dark" /></div>}
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                
                {/* Left: Inputs */}
                <div className="bg-bg-secondary/50 rounded-[32px] p-6 lg:p-8 border border-border-subtle">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent font-bold shrink-0">
                         <Settings className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                         <h3 className="font-bold text-lg text-text-main">Your Campaign Inputs</h3>
                         <p className="text-text-muted text-xs font-medium uppercase tracking-wider mt-0.5">Enter your budget and expected metrics</p>
                      </div>
                   </div>
                   
                   <div className="space-y-6">
                       <div>
                          <label className="block text-sm font-bold text-text-main mb-2 flex items-center gap-2">
                            Total Ad Budget (₹)
                            <span className="w-3.5 h-3.5 rounded-full border border-text-muted/40 text-text-muted/60 text-[9px] flex items-center justify-center cursor-help">?</span>
                          </label>
                          <input
                              type="number"
                              min="10000"
                              max="10000000"
                              step="5000"
                              value={budget}
                              onChange={(e) => setBudget(Number(e.target.value))}
                              className="w-full bg-bg-primary border border-border-subtle rounded-xl p-3.5 text-text-main font-medium focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                          />
                       </div>

                       <div>
                          <label className="block text-sm font-bold text-text-main mb-2 flex items-center gap-2">
                            Business / Conversion Type
                            <span className="w-3.5 h-3.5 rounded-full border border-text-muted/40 text-text-muted/60 text-[9px] flex items-center justify-center cursor-help">?</span>
                          </label>
                          <div className="flex bg-bg-primary p-1 rounded-xl border border-border-subtle">
                            <button
                              onClick={() => setIndustry('b2b')}
                              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-bold transition-all ${
                                industry === 'b2b' 
                                  ? 'bg-text-main/5 text-text-main shadow-sm border border-border-subtle' 
                                  : 'text-text-muted hover:text-text-main border border-transparent'
                              }`}
                            >
                              B2B / Form Leads
                            </button>
                            <button
                              onClick={() => setIndustry('ecommerce')}
                              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-bold transition-all ${
                                industry === 'ecommerce' 
                                  ? 'bg-text-main/5 text-text-main shadow-sm border border-border-subtle' 
                                  : 'text-text-muted hover:text-text-main border border-transparent'
                              }`}
                            >
                              E-Commerce
                            </button>
                          </div>
                       </div>
                       
                       <button className="w-full mt-4 btn-glass py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                          <Calculator className="w-5 h-5" /> Calculate Results
                       </button>

                       <p className="text-xs text-text-muted flex items-center gap-2 mt-4">
                         <Check className="w-3.5 h-3.5 text-brand-accent" />
                         Your data is private and used only for calculations.
                       </p>
                   </div>
                </div>

                {/* Right: Results */}
                <div className="bg-bg-secondary/50 rounded-[32px] p-6 lg:p-8 border border-border-subtle">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent font-bold shrink-0">
                         <Activity className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                         <h3 className="font-bold text-lg text-text-main">Estimated Results</h3>
                         <p className="text-text-muted text-xs font-medium uppercase tracking-wider mt-0.5">Based on your inputs</p>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 md:p-5 border border-border-subtle rounded-2xl bg-bg-primary hover:border-brand-accent/30 transition-colors group">
                             <p className="text-sm font-bold text-text-main mb-3 md:mb-4">Estimated Clicks</p>
                             <div className="flex justify-between items-end gap-2 text-brand-accent">
                                <span className="text-2xl md:text-3xl font-bold">{results.clicks.toLocaleString()}</span>
                                <MousePointerClick className="w-6 h-6 sm:w-8 sm:h-8 opacity-50 group-hover:opacity-100 transition-opacity mb-1" />
                             </div>
                          </div>
                          
                          {industry === 'b2b' ? (
                            <div className="p-4 md:p-5 border border-border-subtle rounded-2xl bg-bg-primary hover:border-brand-accent/30 transition-colors group">
                               <p className="text-sm font-bold text-text-main mb-3 md:mb-4">Estimated Leads</p>
                               <div className="flex justify-between items-end gap-2 text-brand-accent">
                                  <span className="text-2xl md:text-3xl font-bold">{results.leads.toLocaleString()}</span>
                                  <Users className="w-6 h-6 sm:w-8 sm:h-8 opacity-50 group-hover:opacity-100 transition-opacity mb-1" />
                               </div>
                            </div>
                          ) : (
                            <div className="p-4 md:p-5 border border-border-subtle rounded-2xl bg-bg-primary hover:border-brand-accent/30 transition-colors group">
                               <p className="text-sm font-bold text-text-main mb-3 md:mb-4">Estimated Sales</p>
                               <div className="flex justify-between items-end gap-2 text-brand-accent">
                                  <span className="text-2xl md:text-3xl font-bold">{results.sales.toLocaleString()}</span>
                                  <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 opacity-50 group-hover:opacity-100 transition-opacity mb-1" />
                               </div>
                            </div>
                          )}
                       </div>
                       
                       <div className="p-5 border border-border-subtle rounded-2xl bg-bg-primary hover:border-brand-accent/30 transition-colors group">
                           <p className="text-sm font-bold text-text-main mb-4">Estimated Revenue</p>
                           <div className="flex justify-between items-end gap-2 text-brand-accent">
                              <span className="text-3xl md:text-5xl font-bold">₹{results.revenue.toLocaleString()}</span>
                              <TrendingUp className="w-8 h-8 md:w-10 md:h-10 opacity-50 group-hover:opacity-100 transition-opacity mb-1" />
                           </div>
                       </div>

                       <div className="p-5 border border-border-subtle rounded-2xl bg-bg-primary hover:border-brand-accent/30 transition-colors group">
                           <p className="text-sm font-bold text-text-main mb-2">Estimated ROAS</p>
                           <div className="flex justify-between items-end gap-2 text-brand-accent">
                              <div>
                                <span className="text-2xl md:text-3xl font-bold">{results.roas}x</span>
                                <p className="text-text-muted text-xs mt-1 text-text-main/70">For every ₹1 you spend, you earn ₹{results.roas}</p>
                              </div>
                              <Award className="w-8 h-8 md:w-10 md:h-10 opacity-50 group-hover:opacity-100 transition-opacity mb-1" />
                           </div>
                       </div>
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-primary rounded-2xl p-6 md:p-8 shadow-sm border border-border-subtle flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center shrink-0 border border-brand-accent/20">
                  <Calendar className="w-7 h-7 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-text-main text-lg">Want Better Results?</h4>
                  <p className="text-text-muted text-sm mt-1">Let's build high-performing ad campaigns tailored to your business goals.</p>
                </div>
              </div>
              <Link 
                to="/#contact"
                className="btn-glass px-6 py-3 md:py-4 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 w-full md:w-auto justify-center"
              >
                <Calendar className="w-4 h-4" /> Book a Free Strategy Call
              </Link>
            </div>

            <div className="pt-12 pb-6">
              <div className="text-center mb-10">
                <h3 className="text-xl font-bold text-text-main">How This Calculator Works</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative text-center">
                <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[2px] bg-border-subtle z-0"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-brand-accent flex items-center justify-center border-4 border-bg-primary text-brand-dark mb-4 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
                  </div>
                  <h4 className="font-bold text-text-main text-sm mb-2">1. Set Budget</h4>
                  <p className="text-text-muted text-xs max-w-[150px]">Enter your total ad budget and campaign duration.</p>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-brand-accent flex items-center justify-center border-4 border-bg-primary text-brand-dark mb-4 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="m9 15 2 2 4-4"></path></svg>
                  </div>
                  <h4 className="font-bold text-text-main text-sm mb-2">2. Add Metrics</h4>
                  <p className="text-text-muted text-xs max-w-[150px]">Input your average CPC, conversion rate, and order value.</p>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-brand-accent flex items-center justify-center border-4 border-bg-primary text-brand-dark mb-4 shadow-md">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-text-main text-sm mb-2">3. Get Estimates</h4>
                  <p className="text-text-muted text-xs max-w-[150px]">We calculate clicks, leads, conversions, and ROI instantly.</p>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-brand-accent flex items-center justify-center border-4 border-bg-primary text-brand-dark mb-4 shadow-md">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-text-main text-sm mb-2">4. Plan & Scale</h4>
                  <p className="text-text-muted text-xs max-w-[150px]">Use insights to optimize spend and scale what works.</p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-xs text-text-muted flex items-center justify-center gap-1.5 bg-bg-secondary inline-flex px-4 py-2 rounded-full border border-border-subtle">
                  <span className="w-4 h-4 rounded-full border border-text-muted/40 text-[10px] flex items-center justify-center font-bold">i</span>
                  <strong>Note:</strong> Estimates are based on industry averages and your inputs. Actual results may vary.
                </p>
              </div>
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
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSPlatform('google')}
                      className={`flex flex-col sm:flex-row items-center justify-center p-2 sm:p-3 rounded-xl border-2 transition-all relative ${
                        sPlatform === 'google' || sPlatform === 'both'
                          ? 'border-brand-accent bg-brand-accent/5' 
                          : 'border-border-subtle hover:border-text-muted/30'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span className="font-bold text-text-main text-[10px] sm:text-xs text-center mt-1 sm:mt-0 sm:ml-2 leading-tight">Google<span className="hidden sm:inline"> Ads</span></span>
                      {(sPlatform === 'google' || sPlatform === 'both') && <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-brand-accent flex items-center justify-center shrink-0"><Check className="w-2.5 h-2.5 text-brand-dark" /></div>}
                    </button>
                    
                    <button
                      onClick={() => setSPlatform('facebook')}
                      className={`flex flex-col sm:flex-row items-center justify-center p-2 sm:p-3 rounded-xl border-2 transition-all relative ${
                        sPlatform === 'facebook' || sPlatform === 'meta' || sPlatform === 'both'
                          ? 'border-brand-accent bg-brand-accent/5' 
                          : 'border-border-subtle hover:border-text-muted/30'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="font-bold text-text-main text-[10px] sm:text-xs text-center mt-1 sm:mt-0 sm:ml-2 leading-tight">Facebook<span className="hidden sm:inline"> Ads</span></span>
                      {(sPlatform === 'facebook' || sPlatform === 'meta' || sPlatform === 'both') && <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-brand-accent flex items-center justify-center shrink-0"><Check className="w-2.5 h-2.5 text-brand-dark" /></div>}
                    </button>
                    
                    <button
                      onClick={() => setSPlatform('instagram')}
                      className={`flex flex-col sm:flex-row items-center justify-center p-2 sm:p-3 rounded-xl border-2 transition-all relative ${
                        sPlatform === 'instagram' || sPlatform === 'meta' || sPlatform === 'both'
                          ? 'border-brand-accent bg-brand-accent/5' 
                          : 'border-border-subtle hover:border-text-muted/30'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <radialGradient id="ig-grad3" cx="0.2" cy="1" r="1.5" fx="0.1" fy="1" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#f09433"/>
                            <stop offset="0.3" stopColor="#e6683c"/>
                            <stop offset="0.6" stopColor="#dc2743"/>
                            <stop offset="0.8" stopColor="#cc2366"/>
                            <stop offset="1" stopColor="#bc1888"/>
                          </radialGradient>
                        </defs>
                        <path fill="url(#ig-grad3)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.362-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.2-4.358-2.618-6.78-6.98-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.98a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                      <span className="font-bold text-text-main text-[10px] sm:text-xs text-center mt-1 sm:mt-0 sm:ml-2 leading-tight">Instagram<span className="hidden sm:inline"> Ads</span></span>
                      {(sPlatform === 'instagram' || sPlatform === 'meta' || sPlatform === 'both') && <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-brand-accent flex items-center justify-center shrink-0"><Check className="w-2.5 h-2.5 text-brand-dark" /></div>}
                    </button>
                    
                    <button
                      onClick={() => setSPlatform('both')}
                      className="col-span-3 text-xs text-brand-accent font-bold mt-1 text-center hover:underline"
                    >
                      Auto-select best platform combination
                    </button>
                  </div>
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
                      className="mt-4 btn-glass px-6 py-3 rounded-xl font-bold"
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
