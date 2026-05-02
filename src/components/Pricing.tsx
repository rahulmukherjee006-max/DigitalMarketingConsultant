import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Sparkles, LayoutPanelLeft, Palette, Globe, MapPin, Layers, ChevronDown, Plus, Minus } from 'lucide-react';
import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { builderItems } from '../data/builderData';

const packages = [
  {
    id: 'plan-starter',
    name: 'Starter Plan',
    badge: 'For Small Businesses',
    price: '₹15,000',
    frequency: '/ month',
    bestFor: 'Local businesses & beginners',
    popular: false,
    includes: [
      'Google Ads Management (1 campaign)',
      'Facebook & Instagram Ads (1 campaign)',
      'Basic SEO (on-page setup)',
      'WhatsApp lead integration',
      'Monthly performance report'
    ],
    notIncluded: [
      'Funnel setup',
      'Advanced optimization'
    ]
  },
  {
    id: 'plan-growth',
    name: 'Growth Plan',
    badge: 'Most Popular',
    price: '₹30,000',
    frequency: '/ month',
    bestFor: 'Growing businesses & serious scaling',
    popular: true,
    includes: [
      'Google Ads (Search + Display)',
      'Facebook & Instagram Ads (multiple campaigns)',
      'SEO (on-page + keyword targeting)',
      'Website Conversion Optimization',
      'Sales Funnel Setup (basic)',
      'WhatsApp automation setup',
      'Analytics & tracking setup',
      'Bi-weekly performance reports'
    ],
    notIncluded: []
  },
  {
    id: 'plan-scale',
    name: 'Scale Plan',
    badge: 'Advanced / High Rev',
    price: '₹60,000',
    frequency: '/ month',
    bestFor: 'Businesses looking for aggressive growth',
    popular: false,
    includes: [
      'Full Google Ads strategy (Search + Display + YouTube)',
      'Advanced Meta Ads scaling',
      'Complete SEO (on-page + off-page strategy)',
      'Conversion rate optimization (A/B testing)',
      'Advanced sales funnels',
      'E-commerce marketing (if applicable)',
      'WhatsApp automation + follow-up funnel',
      'Full analytics dashboard',
      'Weekly strategy calls + reports'
    ],
    notIncluded: []
  }
];

const addons = [
  {
    icon: LayoutPanelLeft,
    title: 'Landing Page Design (AI-Assisted)',
    tiers: [
      { id: 'add-lp-basic', name: 'Basic', price: '₹5,000', features: ['1 simple landing page', 'AI-generated copy', 'Basic design', 'Mobile responsive'] },
      { id: 'add-lp-std', name: 'Standard', price: '₹10,000', features: ['Custom layout + better UI', 'Conversion-focused copy', 'Lead form integration', 'Basic optimization'] },
      { id: 'add-lp-adv', name: 'Advanced', price: '₹15,000', features: ['High-converting premium design', 'Advanced copywriting (sales-focus)', 'A/B testing setup', 'Funnel-ready structure'] }
    ]
  },
  {
    icon: Globe,
    title: 'Website Development (AI-Assisted)',
    tiers: [
      { id: 'add-web-basic', name: 'Basic', price: '₹10,000', features: ['3–4 pages website', 'Template-based design', 'Basic content (AI-assisted)'] },
      { id: 'add-web-std', name: 'Standard', price: '₹20,000', features: ['5–8 pages', 'Custom design + branding', 'SEO-friendly structure'] },
      { id: 'add-web-adv', name: 'Advanced', price: '₹30,000', features: ['Fully custom website', 'Speed optimization', 'Conversion-focused UI/UX', 'Advanced integrations'] }
    ]
  },
  {
    icon: Palette,
    title: 'Creative Ads (AI-Generated)',
    tiers: [
      { id: 'add-creative-basic', name: 'Basic', price: '₹3,000', features: ['3–5 creatives', 'Simple designs', 'AI-generated visuals'] },
      { id: 'add-creative-std', name: 'Standard', price: '₹6,000', features: ['6–10 creatives', 'Better design quality', 'Ad copy variations'] },
      { id: 'add-creative-adv', name: 'Advanced', price: '₹10,000', features: ['12–20 creatives', 'High-converting ad concepts', 'Multiple hooks & variations'] }
    ]
  },
  {
    icon: MapPin,
    title: 'Google My Business Optimization',
    tiers: [
      { id: 'add-gmb-setup', name: 'Complete Setup', price: '₹3,000', features: ['Profile optimization', 'Business info setup', 'Keywords optimization', 'Basic posting setup'] }
    ]
  }
];

export default function Pricing() {
  const { addItem, removeItem, isInCart } = useCartStore();

  return (
    <section id="pricing" className="py-24 px-6 border-t border-border-subtle relative bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center px-6 py-2 rounded-full border border-brand-accent text-brand-accent text-xs font-bold uppercase tracking-[0.2em] mb-8">
            PACKAGES
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 text-text-main max-w-4xl tracking-tight leading-tight">
            Digital Marketing <span className="text-brand-accent">Packages</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl">
            Choose the right plan to scale your business. Transparent pricing, no hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {packages.map((pkg, index) => {
            const inCart = isInCart(pkg.id);
            return (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.2 }}
              className={`bg-bg-secondary rounded-[28px] p-8 flex flex-col h-full hover:bg-border-subtle/20 transition-colors relative group ${
                pkg.popular ? 'border-2 border-brand-accent shadow-[0_0_40px_-15px_rgba(204,255,0,0.3)]' : 'border border-border-subtle shadow-xl'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-dark px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <div className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">{pkg.badge}</div>
                <h3 className="text-2xl font-bold text-text-main mb-4">{pkg.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text-main">{pkg.price}</span>
                  <span className="text-text-muted">{pkg.frequency}</span>
                </div>
              </div>

              <div className="bg-text-main/5 rounded-xl p-4 mb-8">
                <span className="text-sm text-text-muted font-medium block mb-1">Best for:</span>
                <p className="text-text-main text-sm font-bold">{pkg.bestFor}</p>
              </div>

              <div className="flex-grow space-y-6">
                <div>
                  <p className="text-text-main font-bold mb-4">Includes:</p>
                  <ul className="space-y-3">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                        <span className="text-text-muted text-sm leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {pkg.notIncluded && pkg.notIncluded.length > 0 && (
                  <div>
                    <p className="text-text-main/50 font-medium mb-4 text-sm uppercase tracking-wider">Not Included:</p>
                    <ul className="space-y-3">
                      {pkg.notIncluded.map((item) => (
                        <li key={item} className="flex items-start gap-3 opacity-50">
                          <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                          <span className="text-text-muted text-sm leading-tight line-through">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-border-subtle space-y-3">
                <button 
                  onClick={() => {
                    const item = builderItems.find(i => i.id === pkg.id);
                    if (item) {
                      inCart ? removeItem(item.id) : addItem(item);
                    }
                  }}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold mb-4 transition-all shadow-lg ${
                    inCart 
                      ? 'bg-text-main/10 text-text-main hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/20' 
                      : 'bg-brand-accent text-brand-dark hover:opacity-90'
                  }`}
                >
                  {inCart ? (
                    <>
                      <Minus className="w-5 h-5 shrink-0" /> Remove from Plan
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 shrink-0" /> Add to Plan
                    </>
                  )}
                </button>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* Add-ons Section */}
        <div className="mt-20">
           <div className="flex flex-col items-center text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-text-main flex items-center justify-center gap-3">
              <Sparkles className="text-brand-accent w-6 h-6" /> 
              Add-On Services (AI-Powered Solutions)
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {addons.map((addon, index) => (
               <AddonCard key={addon.title} addon={addon} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

const AddonCard: React.FC<{ addon: typeof addons[0], index: number }> = ({ addon, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addItem, removeItem, isInCart } = useCartStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      className="bg-bg-secondary rounded-2xl border border-border-subtle hover:border-brand-accent/30 transition-all shadow-lg group relative overflow-hidden flex flex-col"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-text-main/10 rounded-xl flex items-center justify-center shrink-0 border border-border-subtle group-hover:bg-brand-accent/10 transition-colors">
            <addon.icon className="w-6 h-6 text-brand-accent" />
          </div>
          <h4 className="font-bold text-lg text-text-main">{addon.title}</h4>
        </div>
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
            <div className="space-y-4 pt-4 border-t border-border-subtle">
              {addon.tiers.map((tier) => {
                const inCart = isInCart(tier.id);
                return (
                <div key={tier.name} className="bg-text-main/5 rounded-xl border border-border-subtle transition-colors overflow-hidden flex flex-col">
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                       <span className="font-bold text-text-main text-sm">{tier.name}</span>
                       <span className="text-brand-accent font-mono text-sm px-2 py-1 bg-brand-accent/10 rounded-md">
                         {tier.price}
                       </span>
                    </div>
                    <ul className="space-y-2 mb-4 flex-grow">
                       {tier.features.map(feature => (
                         <li key={feature} className="flex items-start gap-2 text-xs text-text-muted">
                            <Check className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                            <span>{feature}</span>
                         </li>
                       ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => {
                        const item = builderItems.find(i => i.id === tier.id);
                        if (item) {
                          inCart ? removeItem(item.id) : addItem(item);
                        }
                    }}
                    className={`w-full py-2.5 text-xs font-bold uppercase tracking-wider flex justify-center items-center gap-2 transition-colors ${
                      inCart 
                        ? 'bg-brand-accent/20 text-brand-accent hover:bg-red-500/20 hover:text-red-400' 
                        : 'bg-text-main/5 text-text-main hover:bg-brand-accent hover:text-brand-dark'
                    }`}
                  >
                    {inCart ? (
                        <>
                          <Minus className="w-3 h-3" /> Remove
                        </>
                    ) : (
                        <>
                          <Plus className="w-3 h-3" /> Add to Plan
                        </>
                    )}
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
