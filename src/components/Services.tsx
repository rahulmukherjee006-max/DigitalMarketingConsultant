import { motion } from 'motion/react';
import { 
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { SiGoogleads, SiMeta, SiWhatsapp } from 'react-icons/si';
import { BiSearchAlt2 } from 'react-icons/bi';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
import { FaFilter, FaShoppingCart } from 'react-icons/fa';
import { GiBullseye } from 'react-icons/gi';

import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { builderItems } from '../data/builderData';

const services = [
  {
    num: "01",
    id: 'srv-google-ads',
    slug: 'google-ads-management',
    title: 'Google Ads Management',
    price: '₹12,000 / month',
    description: 'Get high-quality leads and sales with optimized Google Search, Display, and YouTube ads.',
    icon: SiGoogleads,
    color: '#F4B400',
    bg: 'bg-[#F4B400]/10',
  },
  {
    num: "02",
    id: 'srv-meta-ads',
    slug: 'facebook-instagram-ads',
    title: 'Facebook & Instagram Ads',
    price: '₹10,000 / month',
    description: 'Reach the right audience and grow your business with high-converting Meta ad campaigns.',
    icon: SiMeta,
    color: '#0668E1',
    bg: 'bg-[#0668E1]/10',
  },
  {
    num: "03",
    id: 'srv-seo',
    slug: 'search-engine-optimization',
    title: 'Search Engine Optimization',
    price: '₹15,000 / month',
    description: 'Rank higher on Google and get free organic traffic that brings consistent customers.',
    icon: BiSearchAlt2,
    color: '#34A853',
    bg: 'bg-[#34A853]/10',
  },
  {
    num: "04",
    id: 'srv-cro',
    slug: 'website-conversion-optimization',
    title: 'Website Conversion Optimization',
    price: '₹8,000 / month',
    description: 'Turn website visitors into paying customers with better design and user experience.',
    icon: TbDeviceDesktopAnalytics,
    color: '#EA4335',
    bg: 'bg-[#EA4335]/10',
  },
  {
    num: "05",
    id: 'srv-funnel',
    slug: 'sales-funnel-setup',
    title: 'Sales Funnel Setup',
    price: '₹15,000 (one-time)',
    description: 'Create a complete system to capture leads and convert them into customers automatically.',
    icon: FaFilter,
    color: '#F97316',
    bg: 'bg-[#F97316]/10',
  },
  {
    num: "06",
    id: 'srv-ecom',
    slug: 'e-commerce-marketing',
    title: 'E-commerce Marketing',
    price: '₹18,000 / month',
    description: 'Scale your online store with targeted ads and performance-driven strategies.',
    icon: FaShoppingCart,
    color: '#A855F7',
    bg: 'bg-[#A855F7]/10',
  },
  {
    num: "07",
    id: 'srv-whatsapp',
    slug: 'whatsapp-marketing-setup',
    title: 'WhatsApp Marketing Setup',
    price: '₹7,000 (one-time)',
    description: 'Convert leads faster using automated WhatsApp chat funnels and follow-ups.',
    icon: SiWhatsapp,
    color: '#25D366',
    bg: 'bg-[#25D366]/10',
  },
  {
    num: "08",
    id: 'srv-strategy',
    slug: 'digital-marketing-strategy',
    title: 'Digital Marketing Strategy',
    price: '₹7,000 (one-time)',
    description: 'Get a clear plan on what to do, where to spend, and how to grow your business online.',
    icon: GiBullseye,
    color: '#EF4444',
    bg: 'bg-[#EF4444]/10',
  }
];

export default function Services() {
  const { addItem, removeItem, isInCart } = useCartStore();

  return (
    <section id="services" className="py-24 px-6 border-t border-border-subtle relative bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center px-6 py-2 rounded-full border border-brand-accent text-brand-accent text-xs font-bold uppercase tracking-[0.2em] mb-8">
            WHAT I DO
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 text-text-main max-w-4xl tracking-tight leading-tight">
            Services That Drive <span className="text-brand-accent">Real Growth</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl">
            Result-driven digital marketing solutions to help your business get more traffic, leads, and customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, index) => {
            const inCart = isInCart(service.id);
            return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className="glass-card p-6 md:p-8 flex flex-col h-full hover:bg-border-subtle/20 group shadow-xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div className={`w-[60px] h-[60px] rounded-[16px] ${service.bg} flex items-center justify-center shrink-0`}>
                  {/* @ts-ignore */}
                  <service.icon className="w-8 h-8" style={{ color: service.color }} />
                </div>
                <div className="text-[56px] font-bold text-text-main/5 leading-none">
                  {service.num}
                </div>
              </div>
              <h3 className="text-[22px] font-bold mb-3 text-text-main leading-snug pr-4">{service.title}</h3>
              <div className="mb-4">
                 <span className="text-brand-accent font-mono text-sm font-bold bg-brand-accent/10 px-3 py-1 rounded-md inline-block">
                   {service.price}
                 </span>
              </div>
              <p className="text-text-muted text-[15px] leading-relaxed mb-8 flex-grow pr-2">
                {service.description}
              </p>
              
              <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                <button 
                  onClick={() => {
                    const item = builderItems.find(i => i.id === service.id);
                    if (item) {
                      inCart ? removeItem(item.id) : addItem(item);
                    }
                  }}
                  className={`flex-grow h-10 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-all ${
                    inCart ? 'bg-brand-accent/20 text-brand-accent hover:bg-red-500/20 hover:text-red-400 border border-brand-accent/30 hover:border-red-500/30' : 'bg-text-main/10 text-text-main hover:bg-text-main/10'
                  }`}
                >
                  {inCart ? 'Remove' : 'Add To Plan'}
                </button>
                <Link to={`/services/${service.slug}`} className="w-10 h-10 rounded-full border border-brand-accent/50 text-brand-accent flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-colors shrink-0">
                   <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-3 text-text-main text-[17px] font-semibold">
             <div className="w-[34px] h-[34px] rounded-full bg-brand-accent text-brand-dark flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-4 h-4" strokeWidth={3} />
             </div>
             Want to grow your business?
          </div>
          <a href="#contact" className="px-6 py-3 md:px-8 md:py-3.5 rounded-full bg-brand-accent text-brand-dark font-bold text-lg hover:opacity-90 transition-opacity">
            Get Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
