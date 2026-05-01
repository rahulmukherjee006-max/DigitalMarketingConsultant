import { motion } from 'motion/react';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

const caseStudies = [
  {
    category: "Local Service Business",
    client: "Local Home Service Business",
    goal: "Get more leads at lower cost",
    whatWeDid: [
      "Set up Google Search Ads",
      "Optimized keywords for high intent",
      "Improved landing page conversion"
    ],
    results: [
      "📈 Leads increased by **3X in 45 days**",
      "💰 Cost per lead reduced by **40%**",
      "📞 **Consistent** daily inquiries"
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000"
  },
  {
    category: "E-commerce Brand",
    client: "D2C E-commerce Brand",
    goal: "Increase sales and ROAS",
    whatWeDid: [
      "Launched Meta Ads campaigns",
      "Tested multiple creatives (AI-generated)",
      "Retargeted website visitors"
    ],
    results: [
      "📈 Revenue grew by **2.8X in 60 days**",
      "🔁 ROAS improved from **1.5x to 3.2x**",
      "🛒 Increased **repeat** customers"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
  },
  {
    category: "New Business (Beginner)",
    client: "New Startup (0 online presence)",
    goal: "Start getting leads",
    whatWeDid: [
      "Created landing page",
      "Set up Google + WhatsApp funnel",
      "Ran targeted ads"
    ],
    results: [
      "📈 Generated **50+ leads** in first month",
      "📲 Direct WhatsApp inquiries **daily**",
      "🚀 Built **strong online presence**"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
  }
];

const BoldResult = ({ text }: { text: string }) => {
  const parts = text.split(/\*\*(.*?)\*\*/);
  return (
    <span className="text-[#d6dae1]">
      {parts.map((part, index) => {
        if (index % 2 !== 0) {
          return <strong key={index} className="text-white font-bold text-[16px]">{part}</strong>;
        }
        return part;
      })}
    </span>
  );
};

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 px-6 relative z-10 bg-[#0c1205]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-display">Real Results, Not Just Promises</h2>
          <p className="text-[#8997a7] max-w-2xl mx-auto text-lg">
            This is where you actually win clients. See how we've helped Indian businesses scale predictably.
          </p>
        </div>

        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center bg-[#161a20] p-6 lg:p-10 rounded-[32px] border border-white/5 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-xl relative group">
                <div className="absolute inset-0 bg-[#0c1205]/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                <img 
                  src={study.image} 
                  alt={study.category} 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full lg:w-1/2 space-y-8 relative z-20">
                <div>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-bold text-xs uppercase tracking-wider mb-4">
                    Case Study {index + 1} — {study.category}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{study.client}</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-white font-bold mb-2">
                      <Target className="w-5 h-5 text-brand-accent" /> Goal
                    </h4>
                    <p className="text-[#8997a7] leading-relaxed">{study.goal}</p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-white font-bold mb-3">
                      <Lightbulb className="w-5 h-5 text-brand-accent" /> What We Did
                    </h4>
                    <ul className="space-y-2.5">
                       {study.whatWeDid.map((item, i) => (
                         <li key={i} className="flex items-start gap-3 text-[#d6dae1] leading-relaxed">
                           <span className="text-brand-accent mt-1 text-xs shrink-0">◆</span>
                           <span className="text-[15px]">{item}</span>
                         </li>
                       ))}
                    </ul>
                  </div>

                  <div className="bg-[#0c1205]/60 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent" />
                    <h4 className="flex items-center gap-2 text-white font-bold mb-4 text-lg">
                      <TrendingUp className="w-5 h-5 text-brand-accent" /> Results
                    </h4>
                    <div className="space-y-3.5">
                      {study.results.map((result, i) => (
                         <div key={i} className="font-medium text-[15px]">
                           <BoldResult text={result} />
                         </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center flex flex-col items-center">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-brand-accent p-8 md:p-12 rounded-[32px] max-w-3xl w-full relative overflow-hidden shadow-[0_0_40px_-10px_rgba(204,255,0,0.3)]"
            >
               <h3 className="text-2xl md:text-4xl font-display font-bold text-[#0c1205] mb-6 relative z-10 tracking-tight leading-tight">
                 Want results like this for your business? Get a free consultation.
               </h3>
               <button 
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#0c1205] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1a260b] transition-colors inline-block relative z-10 shadow-lg"
               >
                 Request Free Consultation &rarr;
               </button>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
