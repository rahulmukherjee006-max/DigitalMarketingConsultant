import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useBookingStore } from '../store/useBookingStore';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const { openBooking } = useBookingStore();

  useEffect(() => {
    let pushed = false;

    // Only push state on mount, not every time hasShown changes
    if (!hasShown) {
      window.history.pushState(null, '', window.location.href);
      pushed = true;
    }

    const handlePopState = () => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
        // Push the state again so they stay on the page until they click back again
        window.history.pushState(null, '', window.location.href);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Ignore mouseleave on touch devices where scrolling can trigger it
      if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
      
      // Check if mouse leaves through the top of the window (exit intent)
      if (e.clientY <= 20 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm"
          onClick={() => setIsVisible(false)}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative z-10 w-full max-w-lg bg-bg-secondary border border-border-subtle p-8 md:p-10 rounded-3xl shadow-2xl text-center"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-main transition-colors bg-text-main/5 hover:bg-text-main/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🎁</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-main mb-4 leading-tight">
            Wait! Get a <span className="text-brand-accent">Free</span> Consultation
          </h2>
          <p className="text-text-muted mb-8 text-lg">
            Before you go, let's discuss how we can grow your business. Schedule a free 30-minute strategy call with our experts today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setIsVisible(false);
                openBooking();
              }}
              className="flex items-center justify-center gap-2 bg-brand-accent text-brand-dark px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20"
            >
              <Calendar className="w-5 h-5" />
              Book a Call
            </button>
            <a 
              href="https://wa.me/919903686204"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsVisible(false)}
              className="flex items-center justify-center gap-2 bg-text-main text-bg-primary px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
