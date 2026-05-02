import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Plus, Minus, ShoppingCart, ChevronDown, AlertCircle, Sparkles, X, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { useCartStore, CartItem } from '../store/useCartStore';
import { builderItems } from '../data/builderData';
import { useTheme } from '../components/ThemeProvider';

interface WizardProps {
  onComplete: (recommendedIds: string[]) => void;
  onClose: () => void;
}

const AutoSuggestWizard: React.FC<WizardProps> = ({ onComplete, onClose }) => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [budget, setBudget] = useState('');
  const [needsWeb, setNeedsWeb] = useState('');

  const goals = [
    { id: 'leads', title: 'Generate Leads & Sales Quickly', icon: 'zap' },
    { id: 'organic', title: 'Long-term Organic Growth', icon: 'trending-up' },
    { id: 'brand', title: 'Establish Brand Presence', icon: 'globe' },
    { id: 'web', title: 'Build/Revamp a Website', icon: 'layout' }
  ];

  const budgets = [
    { id: 'low', title: 'Under ₹15,000 /mo', desc: 'Focus on single most effective channel' },
    { id: 'med', title: '₹15,000 - ₹30,000 /mo', desc: 'Good for starting multi-channel marketing' },
    { id: 'high', title: '₹30,000 - ₹50,000 /mo', desc: 'Accelerated growth & campaigns' },
    { id: 'enterprise', title: 'Above ₹50,000 /mo', desc: 'Full-scale digital dominance' }
  ];

  const websiteNeeds = [
    { id: 'lp', title: 'I just need a Landing Page' },
    { id: 'full', title: 'I need a full Website' },
    { id: 'none', title: 'My current website is fine' }
  ];

  const handleComplete = () => {
    let ids: string[] = [];
    
    // Logic for packages/services
    if (budget === 'low') {
      if (goal === 'leads') ids.push('srv-meta-ads');
      else if (goal === 'organic') ids.push('srv-seo');
      else if (goal === 'brand') ids.push('srv-meta-ads');
      else ids.push('plan-starter'); 
    } else if (budget === 'med') {
      if (goal === 'leads' || goal === 'brand') ids.push('plan-starter');
      else if (goal === 'organic') ids.push('srv-seo', 'srv-cro');
      else ids.push('plan-starter');
    } else if (budget === 'high') {
      ids.push('plan-growth');
    } else if (budget === 'enterprise') {
      ids.push('plan-scale');
    } else {
      ids.push('plan-starter');
    }

    // Logic for addons
    if (needsWeb === 'lp') ids.push('add-lp-basic');
    if (needsWeb === 'full') ids.push('add-web-basic');

    // Deduplicate
    ids = Array.from(new Set(ids));
    onComplete(ids);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-bg-secondary rounded-3xl border border-border-subtle p-6 md:p-8 shadow-2xl relative z-10 custom-scrollbar max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-main">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-main mb-2">Build My Perfect Plan</h2>
          <p className="text-text-muted text-sm md:text-base">Answer 3 quick questions and we'll recommend the best services for your goals and budget.</p>
          
          <div className="flex gap-2 mt-6">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-brand-accent' : 'bg-bg-primary border border-border-subtle'}`}></div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h3 className="text-xl font-bold mb-4">1. What is your primary goal?</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {goals.map(g => (
                <button 
                  key={g.id}
                  onClick={() => { setGoal(g.id); setStep(2); }}
                  className={`p-4 rounded-xl border text-left transition-all ${goal === g.id ? 'border-brand-accent bg-brand-accent/10' : 'border-border-subtle hover:border-brand-accent/50'}`}
                >
                  <p className="font-bold text-text-main text-sm">{g.title}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h3 className="text-xl font-bold mb-4">2. What's your estimated monthly marketing budget?</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {budgets.map(b => (
                <button 
                  key={b.id}
                  onClick={() => { setBudget(b.id); setStep(3); }}
                  className={`p-4 rounded-xl border text-left transition-all ${budget === b.id ? 'border-brand-accent bg-brand-accent/10' : 'border-border-subtle hover:border-brand-accent/50'}`}
                >
                  <p className="font-bold text-text-main text-sm">{b.title}</p>
                  <p className="text-xs text-text-muted mt-1">{b.desc}</p>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="text-sm font-medium text-text-muted hover:text-text-main mt-4">&larr; Back</button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h3 className="text-xl font-bold mb-4">3. Do you need a new website or landing page?</h3>
            <div className="grid gap-3">
              {websiteNeeds.map(w => (
                <button 
                  key={w.id}
                  onClick={() => { setNeedsWeb(w.id); }}
                  className={`p-4 rounded-xl border text-left transition-all ${needsWeb === w.id ? 'border-brand-accent bg-brand-accent/10' : 'border-border-subtle hover:border-brand-accent/50'}`}
                >
                  <p className="font-bold text-text-main text-sm">{w.title}</p>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-border-subtle">
              <button onClick={() => setStep(2)} className="text-sm font-medium text-text-muted hover:text-text-main">&larr; Back</button>
              <button 
                disabled={!needsWeb}
                onClick={handleComplete}
                className="px-6 py-3 bg-brand-accent text-brand-dark rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Show My Plan
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const addonGroups = [
  {
    title: 'Landing Page Design (AI-Assisted)',
    items: builderItems.filter(i => i.id.startsWith('add-lp'))
  },
  {
    title: 'Website Development (AI-Assisted)',
    items: builderItems.filter(i => i.id.startsWith('add-web'))
  },
  {
    title: 'Creative Ads (AI-Generated)',
    items: builderItems.filter(i => i.id.startsWith('add-creative'))
  },
  {
    title: 'Google My Business Optimization',
    items: builderItems.filter(i => i.id.startsWith('add-gmb'))
  }
];

export default function PlanBuilder() {
  const { items, addItem, removeItem, isInCart, isWomenEntrepreneur, toggleWomenEntrepreneur } = useCartStore();
  const [activeTab, setActiveTab] = useState<'plan' | 'service' | 'addon'>('plan');
  const [errorMsg, setErrorMsg] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const availableItems = useMemo(() => builderItems.filter(i => i.type === activeTab), [activeTab]);

  const calculateTotal = (min: boolean, isMonthly: boolean) => {
    const total = items.filter(i => i.isMonthly === isMonthly).reduce((acc, curr) => acc + (min ? curr.minPrice : curr.maxPrice), 0);
    return isWomenEntrepreneur ? total * 0.7 : total;
  };
  
  const getOriginalTotal = (min: boolean, isMonthly: boolean) => {
    return items.filter(i => i.isMonthly === isMonthly).reduce((acc, curr) => acc + (min ? curr.minPrice : curr.maxPrice), 0);
  };

  const monthlyTotalMin = calculateTotal(true, true);
  const monthlyTotalMax = calculateTotal(false, true);
  const oneTimeTotalMin = calculateTotal(true, false);
  const oneTimeTotalMax = calculateTotal(false, false);
  
  const orgMonthlyTotalMin = getOriginalTotal(true, true);
  const orgMonthlyTotalMax = getOriginalTotal(false, true);
  const orgOneTimeTotalMin = getOriginalTotal(true, false);
  const orgOneTimeTotalMax = getOriginalTotal(false, false);

  const formatPrice = (min: number, max: number) => {
    if (min === max) return `₹${min.toLocaleString()}`;
    return `₹${min.toLocaleString()} – ₹${max.toLocaleString()}`;
  };

  const handleAddItem = (item: CartItem) => {
    if (item.type === 'plan') {
      const hasPlan = items.some(i => i.type === 'plan');
      if (hasPlan) {
        setErrorMsg("You can only select one complete plan at a time. Please remove the existing plan first.");
        return;
      }
    }
    
    if (item.type === 'addon') {
      const hasCoreItem = items.some(i => i.type === 'plan' || i.type === 'service');
      if (!hasCoreItem) {
        setErrorMsg("Please select at least one Plan or Service before adding an Add-on.");
        return;
      }
    }
    addItem(item);
  };

  const handleWizardComplete = (recommendedIds: string[]) => {
    // Clear out items
    items.forEach(item => removeItem(item.id));

    // Wait a tick then add new items
    setTimeout(() => {
      recommendedIds.forEach(id => {
        const item = builderItems.find(i => i.id === id);
        if (item && !isInCart(item.id)) addItem(item);
      });
      setShowWizard(false);
      setActiveTab('plan'); // reset to plans tab
      setErrorMsg("We've added our recommended services to your plan! Feel free to modify them.");
    }, 50);
  };

  const handleCheckout = () => {
    const hasCoreItem = items.some(i => i.type === 'plan' || i.type === 'service');
    if (!hasCoreItem && items.length > 0) {
      setErrorMsg("You cannot checkout with only Add-ons. Please select a Plan or Service.");
      return;
    }

    let message = `Hi, I'm interested in the following services:%0A%0A`;
    
    if (isWomenEntrepreneur) {
      message += `*(Applying Women Entrepreneur 30% Discount)*%0A%0A`;
    }

    const plans = items.filter(i => i.type === 'plan');
    if (plans.length > 0) {
      message += `*Plans:*%0A${plans.map(p => `- ${p.title}`).join('%0A')}%0A%0A`;
    }
    
    const services = items.filter(i => i.type === 'service');
    if (services.length > 0) {
      message += `*Services:*%0A${services.map(s => `- ${s.title}`).join('%0A')}%0A%0A`;
    }

    const addons = items.filter(i => i.type === 'addon');
    if (addons.length > 0) {
      message += `*Add-ons:*%0A${addons.map(a => `- ${a.title}`).join('%0A')}%0A%0A`;
    }

    message += `*Estimated Monthly:* ${formatPrice(monthlyTotalMin, monthlyTotalMax)}%0A`;
    message += `*Estimated One-Time:* ${formatPrice(oneTimeTotalMin, oneTimeTotalMax)}%0A%0A`;
    message += `Please let me know the next steps!`;

    window.open(`https://wa.me/919903686204?text=${message}`, '_blank');
  };

  return (
    <div className="bg-bg-primary min-h-screen text-text-main selection:bg-brand-accent selection:text-brand-dark pb-24">
      <AnimatePresence>
        {showWizard && (
          <AutoSuggestWizard 
            onClose={() => setShowWizard(false)} 
            onComplete={handleWizardComplete} 
          />
        )}
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%', scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 50, x: '-50%', scale: 0.9 }}
            className="fixed bottom-6 left-1/2 z-50 flex items-center gap-4 bg-bg-secondary border-2 border-brand-accent text-text-main px-6 py-4 rounded-2xl shadow-xl max-w-md w-[calc(100%-2rem)] md:w-full"
          >
            <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center shrink-0 shadow-inner">
               <AlertCircle className="w-5 h-5 text-brand-dark" />
            </div>
            <span className="font-bold flex-1 text-sm md:text-base leading-tight">{errorMsg}</span>
            <button onClick={() => setErrorMsg("")} className="ml-1 hover:bg-text-main/10 rounded-full p-1.5 transition-colors"><X className="w-4 h-4 text-text-muted" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="border-b border-border-subtle bg-bg-primary/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
             <button
               onClick={toggleTheme}
               className="p-2 sm:mr-2 text-text-muted hover:text-text-main transition-colors"
               aria-label="Toggle theme"
             >
               {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
             </button>
             <img src="https://lh3.googleusercontent.com/pw/AP1GczMeL8nQ-BOtc2fF7rteVLd2LgDoyeAcV9mavjs_DGghRA-IxfbnqfCH8mwoQii3qCqLv4mBPuHxbROx1BdCjX77IXEggPiqbKMnNxy0A30jkSMlkw0o=w400" alt="Logo" className="w-8 h-8 rounded-lg object-cover shrink-0" referrerPolicy="no-referrer" />
             <span className="font-display font-bold text-xl tracking-tight text-text-main hidden sm:block">Digital Marketing Consultant</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Build Your <span className="text-brand-accent">Custom Plan</span></h1>
              <p className="text-text-muted text-lg max-w-2xl">
                Choose a complete package, select individual services, or add extra capabilities. Mix and match to fit your exact business needs.
              </p>
            </div>
            <button 
              onClick={() => setShowWizard(true)}
              className="shrink-0 group flex items-center justify-center gap-2 bg-text-main text-bg-primary px-5 py-3 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base shadow-lg hover:opacity-90 transition-all border border-transparent hover:border-brand-accent/30"
            >
              ✨ Best for You Auto Suggestion
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Builder Section */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-8 bg-bg-secondary p-2 rounded-xl sticky top-24 z-30">
              {(['plan', 'service', 'addon'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm tracking-wide capitalize transition-all ${
                    activeTab === tab 
                      ? 'bg-brand-accent text-brand-dark shadow-lg' 
                      : 'text-text-muted hover:text-text-main hover:bg-text-main/5'
                  }`}
                >
                  {tab}s
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {activeTab === 'addon' ? (
                addonGroups.map((group, index) => (
                   <AddonGroupBuilder key={group.title} group={group} index={index} onAdd={handleAddItem} />
                ))
              ) : (
                availableItems.map((item, index) => {
                  const inCart = isInCart(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                        inCart 
                          ? 'bg-brand-accent/5 border-brand-accent shadow-[0_0_20px_-5px_rgba(204,255,0,0.2)]' 
                          : 'bg-bg-secondary border-border-subtle hover:border-text-main/20'
                      }`}
                      onClick={() => inCart ? removeItem(item.id) : handleAddItem(item)}
                    >
                      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-text-main mb-1">{item.title}</h3>
                          <p className="text-text-muted text-sm">
                            {formatPrice(item.minPrice, item.maxPrice)} {item.isMonthly ? '/ month' : '(one-time)'}
                          </p>
                        </div>
                        <button 
                          className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                            inCart 
                              ? 'bg-brand-accent text-brand-dark' 
                              : 'bg-text-main/10 text-text-main group-hover:bg-brand-accent group-hover:text-brand-dark'
                          }`}
                        >
                          {inCart ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-bg-secondary border border-border-subtle rounded-[28px] p-6 lg:p-8 sticky top-24 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <ShoppingCart className="w-6 h-6 text-brand-accent" />
                <h2 className="text-2xl font-bold text-text-main">Your Plan</h2>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12 px-6 border-2 border-dashed border-border-subtle rounded-2xl">
                  <p className="text-text-muted">Select packages to see your estimate.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between items-start gap-4">
                        <div>
                          <p className="text-text-main font-medium text-sm leading-tight mb-1">{item.title}</p>
                          <p className="text-text-muted text-xs">
                             {item.minPrice === item.maxPrice ? `₹${item.minPrice.toLocaleString()}` : `₹${item.minPrice.toLocaleString()} – ₹${item.maxPrice.toLocaleString()}`}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-text-muted hover:text-red-400 p-1"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-6 mt-6 border-t border-border-subtle">
                    <label className="flex items-start gap-3 p-4 rounded-xl cursor-pointer bg-brand-accent/5 border border-brand-accent/20 hover:bg-brand-accent/10 transition-colors">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input 
                          type="checkbox" 
                          checked={isWomenEntrepreneur}
                          onChange={(e) => toggleWomenEntrepreneur(e.target.checked)}
                          className="peer appearance-none w-5 h-5 border-2 border-brand-accent/50 rounded bg-bg-primary checked:bg-brand-accent checked:border-brand-accent transition-colors"
                        />
                        <Check className="absolute w-3.5 h-3.5 text-brand-dark opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      <div>
                        <p className="font-bold text-text-main text-sm">Women Entrepreneur? (30% OFF)</p>
                        <p className="text-xs text-text-muted mt-1 relative z-10">We will verify this later with proper documents.</p>
                      </div>
                    </label>

                    <div className="flex justify-between items-baseline pt-4">
                      <span className="text-text-muted shrink-0 mr-4">Monthly</span>
                      <div className="flex flex-col items-end">
                        {isWomenEntrepreneur && orgMonthlyTotalMax > 0 && (
                          <span className="text-xs text-text-muted line-through mb-0.5">
                            {orgMonthlyTotalMin === orgMonthlyTotalMax 
                               ? `₹${orgMonthlyTotalMin.toLocaleString()}`
                               : `₹${orgMonthlyTotalMin.toLocaleString()} – ₹${orgMonthlyTotalMax.toLocaleString()}`}
                          </span>
                        )}
                        <span className="font-bold text-text-main text-lg text-right">
                          {monthlyTotalMin === monthlyTotalMax 
                             ? `₹${monthlyTotalMin.toLocaleString()}`
                             : `₹${monthlyTotalMin.toLocaleString()} – ₹${monthlyTotalMax.toLocaleString()}`
                          }
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-baseline mt-2">
                      <span className="text-text-muted shrink-0 mr-4">One-Time</span>
                      <div className="flex flex-col items-end">
                        {isWomenEntrepreneur && orgOneTimeTotalMax > 0 && (
                          <span className="text-xs text-text-muted line-through mb-0.5">
                            {orgOneTimeTotalMin === orgOneTimeTotalMax 
                               ? `₹${orgOneTimeTotalMin.toLocaleString()}`
                               : `₹${orgOneTimeTotalMin.toLocaleString()} – ₹${orgOneTimeTotalMax.toLocaleString()}`}
                          </span>
                        )}
                        <span className="font-bold text-brand-accent text-lg text-right">
                          {oneTimeTotalMin === oneTimeTotalMax 
                             ? `₹${oneTimeTotalMin.toLocaleString()}`
                             : `₹${oneTimeTotalMin.toLocaleString()} – ₹${oneTimeTotalMax.toLocaleString()}`
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full mt-8 bg-brand-accent text-brand-dark py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Discuss & Buy Now
                  </button>
                  <p className="text-center text-text-muted text-xs mt-4">
                    All prices are estimates. Final price will be confirmed over discussion.
                  </p>
                </>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

const AddonGroupBuilder: React.FC<{ group: { title: string; items: CartItem[] }, index: number, onAdd: (item: CartItem) => void }> = ({ group, index, onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { removeItem, isInCart } = useCartStore();

  const formatPrice = (min: number, max: number) => {
    if (min === max) return `₹${min.toLocaleString()}`;
    return `₹${min.toLocaleString()} – ₹${max.toLocaleString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-bg-secondary rounded-2xl border border-border-subtle overflow-hidden"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-center justify-between hover:bg-text-main/[0.02] transition-colors"
      >
        <h3 className="text-xl font-bold text-text-main">{group.title}</h3>
        <ChevronDown className={`w-5 h-5 text-text-muted transition-transform ${isOpen ? 'rotate-180 text-brand-accent' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6"
          >
            <div className="space-y-3 pt-4 border-t border-border-subtle">
              {group.items.map(item => {
                const inCart = isInCart(item.id);
                return (
                  <div 
                    key={item.id}
                    onClick={() => inCart ? removeItem(item.id) : onAdd(item)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                      inCart 
                        ? 'bg-brand-accent/10 border-brand-accent' 
                        : 'bg-text-main/5 border-border-subtle hover:border-text-main/20'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-text-main mb-1.5 text-[15px]">{item.title}</p>
                      <span className="text-brand-accent font-mono text-xs px-2 py-1 bg-brand-accent/10 rounded-md">
                        {formatPrice(item.minPrice, item.maxPrice)} {item.isMonthly ? '/ month' : '(one-time)'}
                      </span>
                    </div>
                    <button 
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        inCart 
                          ? 'bg-brand-accent text-brand-dark' 
                          : 'bg-text-main/10 text-text-main'
                      }`}
                    >
                      {inCart ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
