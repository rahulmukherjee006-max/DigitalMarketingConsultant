import { Facebook, Instagram, Linkedin, Twitter, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-brand-dark pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-full lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-8 group">
              <img src="https://lh3.googleusercontent.com/pw/AP1GczMeL8nQ-BOtc2fF7rteVLd2LgDoyeAcV9mavjs_DGghRA-IxfbnqfCH8mwoQii3qCqLv4mBPuHxbROx1BdCjX77IXEggPiqbKMnNxy0A30jkSMlkw0o=w400" alt="Logo" className="w-8 h-8 rounded-lg object-cover group-hover:scale-110 transition-transform shrink-0" referrerPolicy="no-referrer" />
              <span className="font-display font-bold text-xl tracking-tight text-white">DigitalMarketingConsultant</span>
            </a>
            <p className="text-[#d6dae1] mb-8 max-w-sm">
              Empowering Indian brands to scale with data-driven performance marketing and content excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Solutions</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-[#d6dae1] hover:text-brand-accent text-sm font-medium">Performance Marketing</a></li>
              <li><a href="#" className="text-[#d6dae1] hover:text-brand-accent text-sm font-medium">Search Engine Optimization</a></li>
              <li><a href="#" className="text-[#d6dae1] hover:text-brand-accent text-sm font-medium">Creative Production</a></li>
              <li><a href="#" className="text-[#d6dae1] hover:text-brand-accent text-sm font-medium">Market Analysis</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-[#d6dae1] hover:text-brand-accent text-sm font-medium">About Us</a></li>
              <li><a href="#" className="text-[#d6dae1] hover:text-brand-accent text-sm font-medium">Case Studies</a></li>
              <li><a href="#" className="text-[#d6dae1] hover:text-brand-accent text-sm font-medium">Testimonials</a></li>
              <li><a href="#" className="text-[#d6dae1] hover:text-brand-accent text-sm font-medium">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Get in Touch</h4>
            <div className="bg-[#24272d] p-6 rounded-3xl border border-white/5">
              <p className="text-sm font-bold text-white mb-2">Subscribe to our growth newsletter</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="flex-1 bg-brand-dark text-white rounded-xl px-4 text-sm border border-white/10 focus:outline-none focus:ring-1 focus:ring-brand-accent placeholder:text-[#d6dae1]/50"
                />
                <button className="bg-brand-accent text-brand-dark p-2 rounded-xl hover:opacity-90 transition-opacity">
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#d6dae1] text-sm">
            © 2026 DigitalMarketingConsultant. All rights reserved. Made in Mumbai.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[#d6dae1] hover:text-white text-xs font-medium">Privacy Policy</a>
            <a href="#" className="text-[#d6dae1] hover:text-white text-xs font-medium">Terms of Service</a>
          </div>
          <button 
            onClick={scrollUp}
            className="w-12 h-12 rounded-full border border-white/10 text-white flex items-center justify-center group hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all shadow-sm"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
