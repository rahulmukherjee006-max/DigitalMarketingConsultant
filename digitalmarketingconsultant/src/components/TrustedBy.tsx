import { motion } from 'motion/react';

const clients = [
  { 
    name: 'Apex Builders', 
    logo: (
      <svg className="w-full h-full text-[#d6dae1] group-hover:text-white transition-colors" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 35H20L30 15L40 35ZM30 5L10 45H50L30 5Z" fill="currentColor"/>
        <text x="60" y="32" fill="currentColor" fontSize="22" fontWeight="bold" fontFamily="sans-serif">APEX BUILDERS</text>
      </svg>
    )
  },
  { 
    name: 'Urban Cafe', 
    logo: (
      <svg className="w-full h-full text-[#d6dae1] group-hover:text-white transition-colors" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="15" stroke="currentColor" strokeWidth="4"/>
        <path d="M25 15V25H35" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <text x="55" y="32" fill="currentColor" fontSize="22" fontWeight="bold" fontFamily="serif">Urban Cafe</text>
      </svg>
    )
  },
  { 
    name: 'NextGen Tech', 
    logo: (
      <svg className="w-full h-full text-[#d6dae1] group-hover:text-white transition-colors" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="15" width="20" height="20" rx="4" fill="currentColor"/>
        <circle cx="45" cy="25" r="10" fill="currentColor"/>
        <text x="65" y="32" fill="currentColor" fontSize="20" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">NEXTGEN</text>
      </svg>
    )
  },
  { 
    name: 'Pure Wellness', 
    logo: (
      <svg className="w-full h-full text-[#d6dae1] group-hover:text-white transition-colors" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 10C25 10 35 20 35 30C35 35.5228 30.5228 40 25 40C19.4772 40 15 35.5228 15 30C15 20 25 10 25 10Z" stroke="currentColor" strokeWidth="3"/>
        <text x="50" y="30" fill="currentColor" fontSize="18" fontWeight="300" fontFamily="sans-serif">pure wellness</text>
      </svg>
    )
  },
  { 
    name: 'Luxe Interiors', 
    logo: (
      <svg className="w-full h-full text-[#d6dae1] group-hover:text-white transition-colors" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 25L25 10L40 25L25 40L10 25Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M18 25L25 18L32 25L25 32L18 25Z" fill="currentColor"/>
        <text x="50" y="32" fill="currentColor" fontSize="22" fontWeight="normal" fontFamily="serif" letterSpacing="2">LUXE</text>
      </svg>
    )
  }
];

export default function TrustedBy() {
  return (
    <section className="py-16 px-6 bg-[#0c1205] border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-[#8997a7] text-sm font-bold uppercase tracking-widest mb-8">
          Trusted by ambitious growing businesses
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center w-40 h-16 md:w-48 md:h-20 relative group"
            >
              {client.logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
