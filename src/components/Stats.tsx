import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Stats() {
  const [roas, setRoas] = useState(2.5);
  const [retention, setRetention] = useState(85);

  useEffect(() => {
    // Fluctuations for ROAS between 2.3 and 2.9
    const roasInterval = setInterval(() => {
      setRoas(prev => {
        const change = (Math.random() * 0.2) - 0.1; // -0.1 to +0.1
        let newValue = prev + change;
        if (newValue < 2.3) newValue = 2.3;
        if (newValue > 2.9) newValue = 2.9;
        return Number(newValue.toFixed(1));
      });
    }, 3000);

    // Fluctuations for Retention between 82 and 89
    const retentionInterval = setInterval(() => {
      setRetention(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
        let newValue = prev + change;
        if (newValue < 82) newValue = 82;
        if (newValue > 89) newValue = 89;
        return newValue;
      });
    }, 4500);

    return () => {
      clearInterval(roasInterval);
      clearInterval(retentionInterval);
    };
  }, []);

  const stats = [
    { label: 'Managed Ad Spend', value: '₹20L+' },
    { label: 'Clients Served', value: '25+' },
    { label: 'Avg ROAS Growth', value: `${roas.toFixed(1)}x`, isDynamic: true },
    { label: 'Retention Rate', value: `${retention}%`, isDynamic: true },
  ];

  return (
    <section className="py-20 px-6 bg-bg-secondary text-text-main overflow-hidden relative border-y border-border-subtle">
      {/* Decorative BG element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-brand-accent/20 blur-[100px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`text-4xl md:text-6xl font-bold font-display text-brand-accent mb-2 ${stat.isDynamic ? 'transition-all duration-500' : ''}`}>
                {stat.value}
              </div>
              <div className="text-text-muted text-sm uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
