import { SiWhatsapp } from 'react-icons/si';
import { motion } from 'motion/react';
import { Calendar, ShoppingCart } from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';
import { useCartStore } from '../store/useCartStore';
import { Link, useLocation } from 'react-router-dom';

export default function WhatsAppButton() {
  const { openBooking } = useBookingStore();
  const { items } = useCartStore();
  const location = useLocation();

  // Hide cart button if we're exactly on the build-plan page
  const showCartButton = items.length > 0 && location.pathname !== '/build-plan';

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-3 items-end">
      {/* Floating Plan/Cart Option */}
      {showCartButton && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <Link 
            to="/build-plan" 
            className="flex items-center gap-2 bg-bg-secondary border-2 border-brand-accent text-text-main px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:scale-105 transition-transform"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent" />
            <span className="font-bold text-sm sm:text-base whitespace-nowrap">{items.length} item{items.length > 1 ? 's' : ''} in Plan</span>
          </Link>
        </motion.div>
      )}

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
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="font-bold text-sm sm:text-base pr-1 whitespace-nowrap">Book a call</span>
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
