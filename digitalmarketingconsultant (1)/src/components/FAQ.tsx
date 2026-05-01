import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import React, { useState } from 'react';

const faqs = [
  {
    question: "Why do your prices vary?",
    answer: "Our pricing depends on your business needs, goals, and the level of work required. Every business is different, so we customize our approach accordingly."
  },
  {
    question: "What factors affect the pricing?",
    answer: "Pricing mainly depends on:\n• Your business size and competition\n• Number of campaigns required\n• Ad budget size\n• Level of strategy and setup\n• Customization and complexity"
  },
  {
    question: "Does a bigger business cost more?",
    answer: "Yes. Businesses in competitive industries or larger markets require more strategy, testing, and optimization, which increases the cost."
  },
  {
    question: "Is ad budget included in your pricing?",
    answer: "No.\n👉 Ad spend is separate and paid directly to platforms like Google and Meta."
  },
  {
    question: "Why does higher ad budget increase your service cost?",
    answer: "Higher budgets require more monitoring, testing, and scaling to ensure the best results, which increases the workload."
  },
  {
    question: "Can I choose only one service instead of a full package?",
    answer: "Yes, you can choose individual services based on your needs. However, combining services usually delivers better results."
  },
  {
    question: "How do I know which plan or service is right for me?",
    answer: "👉 We recommend starting with a free consultation where we understand your business and suggest the best plan for you."
  },
  {
    question: "Do you provide customized plans?",
    answer: "Yes. We can create a custom strategy based on your goals, budget, and business type."
  },
  {
    question: "How soon can I expect results?",
    answer: "It depends on the service:\n• Ads → faster results (within days/weeks)\n• SEO → long-term results (2–3 months+)"
  },
  {
    question: "Why should I invest in digital marketing?",
    answer: "Digital marketing helps you reach the right audience, generate leads, and grow your business consistently online."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-6 border-t border-white/5 relative bg-[#0c1205]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center px-6 py-2 rounded-full border border-brand-accent text-brand-accent text-xs font-bold uppercase tracking-[0.2em] mb-8">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Frequently Asked <span className="text-brand-accent">Questions</span>
          </h2>
          <p className="text-[#d6dae1] text-lg max-w-2xl">
            Everything you need to know about our services and pricing.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center bg-[#161a20] rounded-2xl p-8 border border-white/5">
          <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-[#8997a7] mb-8">Get a free consultation and we'll guide you step-by-step.</p>
          <a
            href="#contact"
            className="inline-block px-8 py-3.5 rounded-full bg-brand-accent text-[#0c1205] font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Get Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}

const FAQItem: React.FC<{ faq: typeof faqs[0], index: number }> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-[#161a20] border border-white/5 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-6 text-left hover:bg-[#1a1e24] transition-colors"
      >
        <span className="text-lg font-bold text-white pr-8">{faq.question}</span>
        <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-brand-accent">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-[#8997a7] leading-relaxed whitespace-pre-line">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
