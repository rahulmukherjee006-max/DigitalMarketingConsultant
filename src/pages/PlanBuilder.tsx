import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Plus, Minus, ShoppingCart, ChevronDown, AlertCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { useCartStore, CartItem } from '../store/useCartStore';
import { builderItems } from '../data/builderData';

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

  const monthlyTotalMin = calculateTotal(true, true);
  const monthlyTotalMax = calculateTotal(false, true);
  const oneTimeTotalMin = calculateTotal(true, false);
  const oneTimeTotalMax = calculateTotal(false, false);

  const formatPrice = (min: number, max: number) => {
    if (min === max) return `₹${min.toLocaleString()}`;
    return `₹${min.toLocaleString()} – ₹${max.toLocaleString()}`;
  };

  const handleAddItem = (item: CartItem) => {
    if (item.type === 'addon') {
      const hasCoreItem = items.some(i => i.type === 'plan' || i.type === 'service');
      if (!hasCoreItem) {
        setErrorMsg("Please select at least one Plan or Service before adding an Add-on.");
        return;
      }
    }
    addItem(item);
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
    <div className="bg-[#0c1205] min-h-screen text-white selection:bg-brand-accent selection:text-brand-dark pb-24">
      <AnimatePresence>
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 bg-[#EF4444] text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 font-bold border border-red-400"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm sm:text-base leading-tight">{errorMsg}</span>
            <button onClick={() => setErrorMsg("")} className="ml-2 hover:opacity-70 p-1"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="border-b border-white/5 bg-[#0c1205]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#8997a7] hover:text-white transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center font-bold text-[#0c1205]">
                D
             </div>
             <span className="font-display font-bold text-xl tracking-tight text-white hidden sm:block">DigitalMarketingConsultant</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Build Your <span className="text-brand-accent">Custom Plan</span></h1>
          <p className="text-[#8997a7] text-lg max-w-2xl">
            Choose a complete package, select individual services, or add extra capabilities. Mix and match to fit your exact business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Builder Section */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-8 bg-[#161a20] p-2 rounded-xl sticky top-24 z-30">
              {(['plan', 'service', 'addon'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm tracking-wide capitalize transition-all ${
                    activeTab === tab 
                      ? 'bg-brand-accent text-[#0c1205] shadow-lg' 
                      : 'text-[#8997a7] hover:text-white hover:bg-white/5'
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
                          : 'bg-[#161a20] border-white/5 hover:border-white/20'
                      }`}
                      onClick={() => inCart ? removeItem(item.id) : handleAddItem(item)}
                    >
                      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                          <p className="text-[#8997a7] text-sm">
                            {formatPrice(item.minPrice, item.maxPrice)} {item.isMonthly ? '/ month' : '(one-time)'}
                          </p>
                        </div>
                        <button 
                          className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                            inCart 
                              ? 'bg-brand-accent text-[#0c1205]' 
                              : 'bg-white/10 text-white group-hover:bg-brand-accent group-hover:text-[#0c1205]'
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
            <div className="bg-[#161a20] border border-white/5 rounded-[28px] p-6 lg:p-8 sticky top-24 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <ShoppingCart className="w-6 h-6 text-brand-accent" />
                <h2 className="text-2xl font-bold text-white">Your Plan</h2>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12 px-6 border-2 border-dashed border-white/10 rounded-2xl">
                  <p className="text-[#8997a7]">Select packages to see your estimate.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between items-start gap-4">
                        <div>
                          <p className="text-white font-medium text-sm leading-tight mb-1">{item.title}</p>
                          <p className="text-[#8997a7] text-xs">
                             {item.minPrice === item.maxPrice ? `₹${item.minPrice.toLocaleString()}` : `₹${item.minPrice.toLocaleString()} – ₹${item.maxPrice.toLocaleString()}`}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[#8997a7] hover:text-red-400 p-1"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-6 mt-6 border-t border-white/10">
                    <label className="flex items-start gap-3 p-4 rounded-xl cursor-pointer bg-brand-accent/5 border border-brand-accent/20 hover:bg-brand-accent/10 transition-colors">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input 
                          type="checkbox" 
                          checked={isWomenEntrepreneur}
                          onChange={(e) => toggleWomenEntrepreneur(e.target.checked)}
                          className="peer appearance-none w-5 h-5 border-2 border-brand-accent/50 rounded bg-[#0c1205] checked:bg-brand-accent checked:border-brand-accent transition-colors"
                        />
                        <Check className="absolute w-3.5 h-3.5 text-[#0c1205] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Women Entrepreneur? (30% OFF)</p>
                        <p className="text-xs text-[#8997a7] mt-1 relative z-10">We will verify this later with proper documents.</p>
                      </div>
                    </label>

                    <div className="flex justify-between items-baseline pt-4">
                      <span className="text-[#d6dae1]">Monthly</span>
                      <span className="font-bold text-white text-lg">
                        {monthlyTotalMin === monthlyTotalMax 
                           ? `₹${monthlyTotalMin.toLocaleString()}`
                           : `₹${monthlyTotalMin.toLocaleString()} – ₹${monthlyTotalMax.toLocaleString()}`
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#d6dae1]">One-Time</span>
                      <span className="font-bold text-brand-accent text-lg">
                        {oneTimeTotalMin === oneTimeTotalMax 
                           ? `₹${oneTimeTotalMin.toLocaleString()}`
                           : `₹${oneTimeTotalMin.toLocaleString()} – ₹${oneTimeTotalMax.toLocaleString()}`
                        }
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full mt-8 bg-brand-accent text-[#0c1205] py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Discuss & Buy Now
                  </button>
                  <p className="text-center text-[#8997a7] text-xs mt-4">
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
      className="bg-[#161a20] rounded-2xl border border-white/5 overflow-hidden"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <h3 className="text-xl font-bold text-white">{group.title}</h3>
        <ChevronDown className={`w-5 h-5 text-[#8997a7] transition-transform ${isOpen ? 'rotate-180 text-brand-accent' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6"
          >
            <div className="space-y-3 pt-4 border-t border-white/5">
              {group.items.map(item => {
                const inCart = isInCart(item.id);
                return (
                  <div 
                    key={item.id}
                    onClick={() => inCart ? removeItem(item.id) : onAdd(item)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                      inCart 
                        ? 'bg-brand-accent/10 border-brand-accent' 
                        : 'bg-white/5 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-white mb-1.5 text-[15px]">{item.title}</p>
                      <span className="text-brand-accent font-mono text-xs px-2 py-1 bg-brand-accent/10 rounded-md">
                        {formatPrice(item.minPrice, item.maxPrice)} {item.isMonthly ? '/ month' : '(one-time)'}
                      </span>
                    </div>
                    <button 
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        inCart 
                          ? 'bg-brand-accent text-[#0c1205]' 
                          : 'bg-white/10 text-white'
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
