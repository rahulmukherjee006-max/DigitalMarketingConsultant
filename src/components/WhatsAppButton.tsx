import { SiWhatsapp } from 'react-icons/si';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';

export default function WhatsAppButton() {
  const { openBooking } = useBookingStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Book a Call Option */}
      <motion.button
        onClick={openBooking}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-text-main text-bg-primary px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        aria-label="Book a call"
      >
        <Calendar className="w-5 h-5" />
        <span className="font-bold pr-1">Book a call</span>
      </motion.button>

      {/* WhatsApp Option */}
      <motion.a
        href="https://wa.me/919903686204"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-[52px] h-[52px] bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:bg-[#20bd5a] transition-colors"
        aria-label="Contact us on WhatsApp"
      >
        {/* @ts-ignore */}
        <SiWhatsapp className="w-6 h-6" />
        
        {/* Optional Ping Animation behind the button */}
        <span className="absolute flex h-full w-full left-0 top-0 -z-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40"></span>
        </span>
      </motion.a>
    </div>
  );
}
