import { motion } from 'motion/react';
import { ArrowRight, Play, Star } from 'lucide-react';

import UrgencyTimer from './UrgencyTimer';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 w-full max-w-2xl mx-auto"
        >
          <div className="bg-brand-accent/10 border border-brand-accent/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-left relative overflow-hidden group hover:border-brand-accent/60 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="w-12 h-12 shrink-0 bg-bg-primary border border-brand-accent/20 rounded-full flex items-center justify-center shadow-lg">
               <Star className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <h3 className="font-bold text-text-main text-lg flex flex-wrap items-center gap-2">
                Starting a business? 
                <span className="bg-brand-accent text-brand-dark px-2 py-0.5 rounded font-black text-sm uppercase tracking-wide">30% OFF</span>
              </h3>
              <p className="text-text-muted text-sm mt-1">
                Women entrepreneurs get an exclusive <strong>30% discount</strong> on all services, plans, and add-ons.
              </p>
              <p className="text-text-muted text-xs mt-2 font-mono">
                * We will verify this later with proper documents.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-subtle text-xs font-semibold text-text-main mb-8"
        >
          <Star className="w-3 h-3 fill-brand-accent text-brand-accent" />
          <span>India's Leading ROI-Driven Agency</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8 text-text-main"
        >
          Grow Your Business Online <br />
          <span className="text-brand-accent italic">with Digital Marketing.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg text-text-muted mb-12"
        >
          We help Indian businesses get more customers through Google Ads, Facebook Ads, and SEO — using simple, data-driven strategies that deliver real results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4"
        >
          <div className="flex flex-col items-center w-full sm:w-auto">
            <a
              href="#contact"
              className="w-full sm:w-auto bg-brand-accent text-brand-dark px-6 py-3.5 md:px-8 md:py-5 rounded-full font-bold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 hover:opacity-90 transition-all shadow-xl shadow-brand-accent/20"
            >
              Start Your Growth Journey
              <ArrowRight className="w-5 h-5" />
            </a>
            <UrgencyTimer />
          </div>
          <button className="w-full sm:w-auto group flex items-center justify-center gap-2 md:gap-3 px-6 py-3.5 md:px-8 md:py-5 rounded-full font-bold text-base md:text-lg text-text-main hover:bg-text-main/5 transition-all">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-text-main/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-bg-secondary shrink-0">
              <Play className="w-4 h-4 fill-brand-accent text-brand-accent" />
            </div>
            See Results
          </button>
        </motion.div>

        {/* Hero Image Mockup Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="relative z-10 rounded-[40px] border-8 border-border-subtle overflow-hidden shadow-2xl">
            <img 
              src="https://lh3.googleusercontent.com/pw/AP1GczPFDZPh4dc7DbJJaegpbW8ralBfGrnGk_XZpS8DQUyVY_qG78waxG5_Aaui4hLUccH2y6qhhAXK0iaQcrpMTSrfoNk_mITLH34WVitMrg58QzVpROqo=w2400" 
              alt="Dashboard Analytics"
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-accent/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-secondary/20 rounded-full blur-2xl animate-pulse delay-700" />
        </motion.div>
      </div>
    </section>
  );
}
