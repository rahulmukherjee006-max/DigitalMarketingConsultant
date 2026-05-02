import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock } from 'lucide-react';

export default function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const CYCLE_DURATION = 96 * 60 * 60 * 1000; // 4 days (96 hours)
    const ACTIVE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
    
    // Get or set the start time in localStorage
    const storedStart = localStorage.getItem('urgencyTimerStart');
    let startTime = storedStart ? parseInt(storedStart, 10) : Date.now();
    
    if (!storedStart) {
      localStorage.setItem('urgencyTimerStart', startTime.toString());
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const relativeTime = elapsed % CYCLE_DURATION;
      
      if (relativeTime < ACTIVE_DURATION) {
        setIsActive(true);
        const remaining = ACTIVE_DURATION - relativeTime;
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setIsActive(false);
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isActive && timeLeft && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="flex items-center justify-center flex-wrap gap-2 mt-4 text-xs md:text-sm font-medium text-text-muted text-center"
        >
          <div className="flex items-center gap-1.5 shrink-0">
            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-accent animate-pulse" />
            <span>Free consultation ends in</span>
          </div>
          <span className="text-text-main font-mono tabular-nums shrink-0">{String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
