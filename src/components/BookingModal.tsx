import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Phone, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useBookingStore } from '../store/useBookingStore';

export default function BookingModal() {
  const { isOpen, closeBooking } = useBookingStore();
  const [isBooked, setIsBooked] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [timeRange, setTimeRange] = useState('');
  const [phone, setPhone] = useState('');

  const timeRanges = [
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && timeRange && phone) {
      // In a real app, send this to backend
      setIsBooked(true);
      // Reset form fields
      setDate(null);
      setTimeRange('');
      setPhone('');
    }
  };

  const handleClose = () => {
    closeBooking();
    setTimeout(() => setIsBooked(false), 300); // Reset state after animation
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm"
          onClick={handleClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative z-10 w-full max-w-md bg-bg-secondary border border-border-subtle p-6 md:p-8 rounded-3xl shadow-2xl"
        >
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-main transition-colors bg-text-main/5 hover:bg-text-main/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          {isBooked ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-display font-bold text-text-main mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-text-muted text-lg">
                You have booked a call. Now wait for our representative to call you.
              </p>
              <button 
                onClick={handleClose}
                className="mt-8 btn-glass px-8 py-3 rounded-xl font-bold"
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-accent/20 shadow-inner">
                  <Calendar className="w-8 h-8 text-brand-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-text-main mb-2">Schedule Consultation</h2>
                <p className="text-text-muted">Pick a time that works for you. We'll handle the rest.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <label className="flex items-center gap-2 text-sm font-bold text-text-main mb-2">
                    <Calendar className="w-4 h-4 text-brand-accent" />
                    Select Date
                  </label>
                  <DatePicker 
                    selected={date} 
                    onChange={(date) => setDate(date)} 
                    minDate={new Date()}
                    placeholderText="dd-mm-yyyy"
                    dateFormat="dd-MM-yyyy"
                    required
                    className="w-full bg-bg-primary border border-border-subtle rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-brand-accent transition-colors"
                    calendarClassName="bg-bg-secondary border-border-subtle shadow-xl font-sans"
                    dayClassName={(date) => "hover:bg-brand-accent/20 rounded-full"}
                  />
                  <Calendar className="w-5 h-5 text-text-muted absolute right-4 top-10 pointer-events-none" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-text-main mb-2">
                    <Clock className="w-4 h-4 text-brand-accent" />
                    Preferred Time Range
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {timeRanges.map(range => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setTimeRange(range)}
                        className={`p-3 rounded-xl border text-sm transition-all ${timeRange === range ? 'border-brand-accent bg-brand-accent/10 text-text-main font-bold' : 'border-border-subtle text-text-muted hover:border-brand-accent/50'}`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-text-main mb-2 mt-4">
                    <Phone className="w-4 h-4 text-brand-accent" />
                    Phone Number
                  </label>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                    maxLength={15}
                    placeholder="9903686204"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\\D/g, ''))}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/\\D/g, '');
                    }}
                    className="w-full bg-bg-primary border border-border-subtle rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={!date || !timeRange || !phone}
                  className="w-full mt-6 btn-glass py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <CheckCircle className="w-5 h-5" />
                  Confirm Booking
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
