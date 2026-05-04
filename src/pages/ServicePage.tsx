import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Plus, Minus, ShoppingCart, Info, TrendingUp, HelpCircle, Moon, Sun, Search } from 'lucide-react';
import { servicePagesData } from '../data/servicePagesData';
import { builderItems } from '../data/builderData';
import { useCartStore } from '../store/useCartStore';
import { useTheme } from '../components/ThemeProvider';
import { useUIStore } from '../store/useUIStore';

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, removeItem, isInCart, items, isYearly, toggleYearly } = useCartStore();
  const { theme, toggleTheme } = useTheme();
  const { setSearchOpen } = useUIStore();
  
  if (!slug || !servicePagesData[slug as keyof typeof servicePagesData]) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-main flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Service not found</h1>
        <Link to="/" className="text-brand-accent hover:underline flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    );
  }

  const data = servicePagesData[slug as keyof typeof servicePagesData];
  const cartItem = builderItems.find(item => item.id === data.builderId);
  const inCart = cartItem ? isInCart(cartItem.id) : false;

  const handleToggleCart = () => {
    if (!cartItem) return;
    if (inCart) {
      removeItem(cartItem.id);
    } else {
      addItem(cartItem);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-main selection:bg-brand-accent selection:text-brand-dark relative">
      {/* Background Masked Image for Meta Ads */}
      {slug === 'facebook-instagram-ads' && (
         <motion.div 
           initial={{ y: 0 }}
           animate={{ y: [-15, 15, -15] }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           className={`absolute inset-x-0 -top-10 h-[60vh] md:h-[80vh] z-0 ${theme === 'dark' ? 'opacity-70 md:opacity-50' : 'opacity-100 md:opacity-[0.85]'} bg-center bg-cover bg-no-repeat pointer-events-none`}
           style={{ 
             backgroundImage: `url(${theme === 'dark' ? 'https://lh3.googleusercontent.com/pw/AP1GczOFpYkOTy5hr1VeSnRQ5N2metkRvBqS1hLKa26FrrCvPVgrzOl5sY3m4ZwzcsXbsUeUOHkQBzR9XjFFnHta_uMZtSXisQoNfYE0akci4QCiQHNJKl37Q04kss2zLTwuUPrCuwfXviVu1WlZxk0RstU4bg=w1672-h941-s-no-gm?authuser=0' : 'https://lh3.googleusercontent.com/pw/AP1GczMoaOqPHHqbqGRSU3_ZIQHKUtue6aQqghPy0bLoizpCawSkX9w2mkY7p-r-0w9UWfBjJpfwQ2kHPwZP2pDj-ayS1CvLLF9OdZaFD7fy_gjwKZ9uyTKcQV1cKr3dIK8LeNiEUrhWne3oN0HL97kivcE96Q=w1672-h941-s-no-gm?authuser=0'})`,
             maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
           }}
         />
      )}

      {/* Header */}
      <header className="border-b border-border-subtle bg-bg-primary/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors group relative z-10">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold hidden sm:inline">Back</span>
          </Link>

          <div className="absolute left-1/2 -translate-x-1/2 font-bold text-lg text-text-main whitespace-nowrap hidden sm:block z-10 w-full text-center px-32 truncate pointer-events-none">
            {cartItem?.title || data.title}
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-text-muted hover:text-text-main hover:bg-text-main/5 rounded-full transition-colors flex items-center justify-center relative group"
              aria-label="Search"
            >
               <Search className="w-5 h-5" />
               <div className="hidden group-hover:flex absolute -bottom-8 bg-bg-secondary text-text-muted text-[10px] px-2 py-1 rounded-md border border-border-subtle whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="font-mono">⌘K</span>
               </div>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-text-muted hover:text-text-main hover:bg-text-main/5 rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Link to="/build-plan" className="flex items-center gap-3 bg-bg-secondary px-4 py-2 rounded-full border border-border-subtle hover:border-text-main/20 transition-all group">
               <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-text-muted group-hover:text-text-main transition-colors" />
                  {items.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-accent text-brand-dark text-[10px] font-bold flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
               </div>
               <span className="font-bold text-sm hidden sm:inline group-hover:text-brand-accent transition-colors">
                 Your Plan
               </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 sm:py-24 space-y-16 relative z-10">
        
        {/* Title Section */}
        <section className="text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-4xl lg:text-6xl font-bold font-display tracking-tight text-text-main"
          >
            {data.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl sm:text-2xl text-text-muted max-w-2xl mx-auto leading-relaxed"
          >
            {data.subtitle}
          </motion.p>
        </section>

        {slug === 'google-ads-management' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="w-full rounded-[32px] overflow-hidden shadow-2xl border border-border-subtle"
          >
            <img 
              src={theme === 'dark' ? "https://lh3.googleusercontent.com/pw/AP1GczNfeEi35xuw5Okp19OFXd7g-vRA4YV-E_sgXwovqlfUNYPrnldglaWT3aZFvV6Kmdb6Ik4qKPt34mEMy067Nt_f_sg9FhM73uIYnws00wt8o6DYhQ853WzT1JC3BmYKzkXM543ILFNF03rGllHkvskNAw=w1536-h1024-s-no-gm?authuser=0" : "https://lh3.googleusercontent.com/pw/AP1GczNm5i3HtPsOF7slgro68iR5tHHY2y4m8VedWPpEufjkSy-k8mnFFhSNgxvCWRXOxW2Aso-7HPVrCPUy9LcKVDFBku9d3dGVtFgtY1nwijXyTwNl5lukuDcAZ14TUd4dVn4arLOvKr9fvJpwY8nG48iNrw=w1536-h1024-s-no-gm?authuser=0"}
              alt="Google Ads Service Banner"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-12">
            {/* What We Do */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-bg-secondary rounded-[32px] p-8 border border-border-subtle"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-text-main">
                <Info className="w-6 h-6 text-brand-accent" />
                What We Do
              </h2>
              <ul className="space-y-4">
                {data.whatWeDo.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-text-muted text-lg">
                    <span className="text-brand-accent shrink-0 mt-1">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

             {/* Results */}
             <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-bg-secondary rounded-[32px] p-8 border border-brand-accent/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-text-main relative z-10">
                <TrendingUp className="w-6 h-6 text-brand-accent" />
                Results You Can Expect
              </h2>
              <ul className="space-y-4 relative z-10">
                {data.results.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-text-main font-bold text-lg">
                    <Check className="w-5 h-5 text-brand-accent shrink-0" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* FAQs */}
            {data.faqs.length > 0 && (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6 pt-4"
              >
                <h2 className="text-2xl font-bold flex items-center gap-3 text-text-main">
                  <HelpCircle className="w-6 h-6 text-brand-accent" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {data.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-bg-secondary p-6 rounded-2xl border border-border-subtle">
                      <p className="font-bold text-lg mb-2 text-text-main">Q. {faq.q}</p>
                      <p className="text-text-muted leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Pricing Sidebar */}
          <div className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-bg-secondary rounded-[32px] border border-border-subtle sticky top-28 p-6"
            >
              <div className="flex justify-between items-start mb-6">
                 <h3 className="text-xl font-bold text-text-main">Pricing</h3>
                 
                 {data.pricingDetailed.price.includes('/ month') && (
                   <div className="flex bg-bg-primary rounded-xl border border-border-subtle p-0.5 shadow-sm">
                      <button onClick={() => toggleYearly(false)} className={`py-1.5 px-3 rounded-lg font-bold text-[10px] transition-colors ${!isYearly ? 'bg-text-main text-bg-primary' : 'text-text-muted hover:text-text-main'}`}>
                        Mo.
                      </button>
                      <button onClick={() => toggleYearly(true)} className={`py-1.5 px-3 rounded-lg font-bold text-[10px] transition-colors flex items-center gap-1 ${isYearly ? 'bg-text-main text-bg-primary' : 'text-text-muted hover:text-text-main'}`}>
                        Yr. <span className="bg-brand-accent text-brand-dark px-1 py-0.5 rounded-sm shrink-0 leading-none">30% Off</span>
                      </button>
                   </div>
                 )}
              </div>
              
              <div className="mb-6 flex flex-col items-start gap-1">
                 {(() => {
                   const isMonthly = data.pricingDetailed.price.includes('/ month');
                   let displayPrice = data.pricingDetailed.price;
                   let displayStrikeThrough = null;
                   if (isMonthly && isYearly) {
                      const basePrice = parseInt(data.pricingDetailed.price.replace(/[^\d]/g, ''));
                      displayPrice = `₹${(basePrice * 12 * 0.7).toLocaleString()} / year`;
                      displayStrikeThrough = `₹${(basePrice * 12).toLocaleString()} / year`;
                   }
                   return (
                     <>
                        <p className="text-3xl font-display font-bold text-brand-accent">
                          {displayPrice}
                        </p>
                        {displayStrikeThrough && (
                           <span className="text-sm text-text-muted opacity-80 line-through pl-1">{displayStrikeThrough}</span>
                        )}
                     </>
                   );
                 })()}
              </div>
              
              {data.pricingDetailed.breakdown.length > 0 && (
                <div className="space-y-3 mb-6">
                  <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4">Breakdown</p>
                  {data.pricingDetailed.breakdown.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-text-muted">{item.item}</span>
                      <span className="font-bold text-text-main bg-text-main/5 px-2 py-1 rounded-md">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {(data.pricingDetailed as any).note && (
                <p className="text-sm text-text-muted mb-8 bg-text-main/5 p-3 rounded-xl border border-border-subtle">
                  {(data.pricingDetailed as any).note}
                </p>
              )}

              {cartItem && (
                <button 
                  onClick={handleToggleCart}
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
              )}

              <button 
                onClick={() => navigate('/#contact')} 
                className="w-full py-4 rounded-xl flex items-center justify-center text-text-main border border-text-main/10 hover:bg-text-main/5 transition-colors font-bold"
              >
                Request Free Consultation
              </button>
            </motion.div>
          </div>

        </div>
        
        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8 border-t border-border-subtle"
        >
          <div className="bg-brand-accent p-8 md:p-12 rounded-[32px] relative overflow-hidden shadow-[0_0_40px_-10px_rgba(204,255,0,0.3)]">
            <h3 className="text-2xl md:text-5xl font-display font-bold text-brand-dark mb-6 relative z-10 tracking-tight leading-tight">
              Not sure if this is right for you? Get a free consultation.
            </h3>
             <button 
                onClick={() => {
                  navigate('/#contact');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-bg-primary text-text-main px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-bold hover:bg-bg-secondary hover:opacity-90 transition-all inline-block relative z-10 shadow-lg"
             >
               Contact Us Now &rarr;
             </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
