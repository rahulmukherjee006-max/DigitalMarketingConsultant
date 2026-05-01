import { CartItem } from '../store/useCartStore';

export const builderItems: CartItem[] = [
  // Packages
  { id: 'plan-starter', title: 'Starter Plan', type: 'plan', minPrice: 15000, maxPrice: 15000, isMonthly: true },
  { id: 'plan-growth', title: 'Growth Plan', type: 'plan', minPrice: 30000, maxPrice: 30000, isMonthly: true },
  { id: 'plan-scale', title: 'Scale Plan', type: 'plan', minPrice: 60000, maxPrice: 60000, isMonthly: true },
  
  // Services
  { id: 'srv-google-ads', title: 'Google Ads Management', type: 'service', minPrice: 12000, maxPrice: 12000, isMonthly: true },
  { id: 'srv-meta-ads', title: 'Facebook & Instagram Ads', type: 'service', minPrice: 10000, maxPrice: 10000, isMonthly: true },
  { id: 'srv-seo', title: 'Search Engine Optimization', type: 'service', minPrice: 15000, maxPrice: 15000, isMonthly: true },
  { id: 'srv-cro', title: 'Website Conversion Optimization', type: 'service', minPrice: 8000, maxPrice: 8000, isMonthly: true },
  { id: 'srv-funnel', title: 'Sales Funnel Setup', type: 'service', minPrice: 15000, maxPrice: 15000, isMonthly: false },
  { id: 'srv-ecom', title: 'E-commerce Marketing', type: 'service', minPrice: 18000, maxPrice: 18000, isMonthly: true },
  { id: 'srv-whatsapp', title: 'WhatsApp Marketing Setup', type: 'service', minPrice: 7000, maxPrice: 7000, isMonthly: false },
  { id: 'srv-strategy', title: 'Digital Marketing Strategy', type: 'service', minPrice: 7000, maxPrice: 7000, isMonthly: false },

  // Addons
  { id: 'add-lp-basic', title: 'Landing Page Design - Basic', type: 'addon', minPrice: 5000, maxPrice: 5000, isMonthly: false },
  { id: 'add-lp-std', title: 'Landing Page Design - Standard', type: 'addon', minPrice: 10000, maxPrice: 10000, isMonthly: false },
  { id: 'add-lp-adv', title: 'Landing Page Design - Advanced', type: 'addon', minPrice: 15000, maxPrice: 15000, isMonthly: false },
  { id: 'add-web-basic', title: 'Website Development - Basic', type: 'addon', minPrice: 10000, maxPrice: 10000, isMonthly: false },
  { id: 'add-web-std', title: 'Website Development - Standard', type: 'addon', minPrice: 20000, maxPrice: 20000, isMonthly: false },
  { id: 'add-web-adv', title: 'Website Development - Advanced', type: 'addon', minPrice: 30000, maxPrice: 30000, isMonthly: false },
  { id: 'add-creative-basic', title: 'Creative Ads - Basic', type: 'addon', minPrice: 3000, maxPrice: 3000, isMonthly: false },
  { id: 'add-creative-std', title: 'Creative Ads - Standard', type: 'addon', minPrice: 6000, maxPrice: 6000, isMonthly: false },
  { id: 'add-creative-adv', title: 'Creative Ads - Advanced', type: 'addon', minPrice: 10000, maxPrice: 10000, isMonthly: false },
  { id: 'add-gmb-setup', title: 'Google My Business Optimization - Complete Setup', type: 'addon', minPrice: 3000, maxPrice: 3000, isMonthly: false },
];
