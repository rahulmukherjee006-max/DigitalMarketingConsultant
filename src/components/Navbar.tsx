import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navLinks = [
    { name: 'Ad Spend Calculator', href: '/ad-spend-calculator' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
  ];

  const servicesList = [
    { name: 'Google Ads', href: '/services/google-ads-management' },
    { name: 'Meta Ads', href: '/services/facebook-instagram-ads' },
    { name: 'SEO', href: '/services/search-engine-optimization' },
    { name: 'CRO', href: '/services/website-conversion-optimization' },
    { name: 'Sales Funnel', href: '/services/sales-funnel-setup' },
    { name: 'E-commerce', href: '/services/e-commerce-marketing' },
    { name: 'WhatsApp Marketing', href: '/services/whatsapp-marketing-setup' },
    { name: 'Digital Strategy', href: '/services/digital-marketing-strategy' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-2 lg:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-4 lg:px-6 py-3 shadow-lg">
        <a href="/" className="flex items-center gap-2 group shrink min-w-0 mr-2 xl:mr-4">
          <img src="https://lh3.googleusercontent.com/pw/AP1GczMeL8nQ-BOtc2fF7rteVLd2LgDoyeAcV9mavjs_DGghRA-IxfbnqfCH8mwoQii3qCqLv4mBPuHxbROx1BdCjX77IXEggPiqbKMnNxy0A30jkSMlkw0o=w400" alt="Logo" className="w-8 h-8 rounded-lg object-cover group-hover:scale-110 transition-transform shrink-0" referrerPolicy="no-referrer" />
          <span className="font-display font-bold text-base md:text-sm lg:text-base xl:text-xl tracking-tight text-white truncate block">DigitalMarketingConsultant</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-3 lg:gap-5 shrink-0">
          <li>
            <a 
              href="/ad-spend-calculator" 
              className="text-xs lg:text-sm font-medium text-[#d6dae1] hover:text-brand-accent transition-colors whitespace-nowrap"
            >
              Ad Spend Calculator
            </a>
          </li>
          
          {/* Services Dropdown */}
          <li 
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-xs lg:text-sm font-medium text-[#d6dae1] hover:text-brand-accent transition-colors py-2">
              Services <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#161a20] border border-white/10 rounded-2xl shadow-xl overflow-hidden py-2"
                >
                  {servicesList.map((service) => (
                    <a
                      key={service.name}
                      href={service.href}
                      className="block px-4 py-2.5 text-sm text-[#d6dae1] hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {service.name}
                    </a>
                  ))}
                  <div className="border-t border-white/5 mt-2 pt-2">
                    <a href="/#services" className="block px-4 py-2 shadow-sm text-sm font-bold text-brand-accent hover:bg-white/5 transition-colors">
                      View All Services →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {navLinks.slice(1).map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="text-xs lg:text-sm font-medium text-[#d6dae1] hover:text-brand-accent transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block shrink-0 ml-2 lg:ml-4">
          <a
            href="/build-plan"
            className="group flex flex-nowrap items-center gap-1 lg:gap-2 bg-brand-accent text-brand-dark px-3 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-bold hover:opacity-90 transition-all whitespace-nowrap"
          >
            Build Your Plan
            <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-white shrink-0 ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-4 right-4 bg-[#24272d] rounded-3xl p-6 shadow-2xl border border-white/10 overflow-y-auto max-h-[80vh]"
          >
            <ul className="flex flex-col gap-4">
              <li>
                <a href="/ad-spend-calculator" className="text-lg font-bold text-white block py-2" onClick={() => setIsOpen(false)}>
                  Ad Spend Calculator
                </a>
              </li>
              <li>
                <div className="text-lg font-bold text-white py-2 mb-2 border-b border-white/10">Services</div>
                <div className="flex flex-col gap-3 pl-4">
                  {servicesList.map((service) => (
                    <a
                      key={service.name}
                      href={service.href}
                      className="text-base font-medium text-[#8997a7] hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {service.name}
                    </a>
                  ))}
                  <a href="/#services" className="text-base font-bold text-brand-accent" onClick={() => setIsOpen(false)}>
                    View All Services
                  </a>
                </div>
              </li>
              {navLinks.slice(1).map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-lg font-bold text-white block py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="mt-4">
                <a
                  href="/build-plan"
                  className="w-full inline-block text-center bg-brand-accent text-brand-dark py-3.5 rounded-full font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Build Your Plan
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
