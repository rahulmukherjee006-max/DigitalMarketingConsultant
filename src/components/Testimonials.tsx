import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Anish Kapur',
    role: 'Founder, Mumbai Eats',
    text: 'Moving our digital strategy to this team was the best decision we made. Our acquisition costs dropped by 40% in just two months.',
    avatar: 'AK',
  },
  {
    name: 'Priyanka Sharma',
    role: 'CMO, TechFlow Solutions',
    text: 'Their understanding of the Indian market is unparalleled. They don’t just deliver traffic; they deliver revenue.',
    avatar: 'PS',
  },
  {
    name: 'Vikram Singh',
    role: 'Director, Heritage Hotels',
    text: 'Professional, transparent, and results-oriented. The live dashboards make tracking ROI incredibly simple.',
    avatar: 'VS',
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Loved by Indian Founders</h2>
          <p className="text-[#d6dae1] max-w-2xl mx-auto">
            Join 100+ businesses who have trusted us with their digital growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#24272d] p-8 rounded-[32px] border border-white/5 relative shadow-sm hover:shadow-md transition-all"
            >
              <Quote className="w-10 h-10 text-brand-accent/20 absolute top-8 right-8" />
              <p className="text-[#d6dae1] mb-8 italic relative z-10 leading-relaxed text-lg">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-brand-dark font-bold">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-[#d6dae1] font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
