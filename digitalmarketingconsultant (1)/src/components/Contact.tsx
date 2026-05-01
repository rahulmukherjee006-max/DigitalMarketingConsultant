import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { useState, type FormEvent, useRef } from 'react';
import { builderItems } from '../data/builderData';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const name = formData.get('name');
      const company = formData.get('company');
      const email = formData.get('email');
      const service = formData.get('service');
      const message = formData.get('message');
      
      const subject = encodeURIComponent(`New Consultation Request from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nCompany: ${company}\nEmail: ${email}\nService Needed: ${service}\n\nMessage:\n${message}`);
      
      window.location.href = `mailto:rahulmukherjee006@gmail.com?subject=${subject}&body=${body}`;
    }

    setTimeout(() => setFormState('success'), 1500);
  };

  const servicesAndPlans = builderItems.filter(item => item.type === 'plan' || item.type === 'service');

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#24272d] rounded-[48px] overflow-hidden shadow-2xl relative border border-white/5">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/20 blur-[120px] -translate-y-1/2 translate-x-1/4" />
          
          <div className="grid lg:grid-cols-2 relative z-10">
            {/* Left Column: Info */}
            <div className="p-12 md:p-20 flex flex-col justify-between text-white border-b lg:border-b-0 lg:border-r border-white/10">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                  Let’s Build Your <br />
                  <span className="text-brand-accent">Growth Story.</span>
                </h2>
                <div className="space-y-8 mt-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-[#d6dae1] font-medium mb-1 uppercase tracking-wider">Call Us</p>
                      <p className="text-xl font-bold text-white">+91 99036 86204</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-[#d6dae1] font-medium mb-1 uppercase tracking-wider">Email Us</p>
                      <p className="text-xl font-bold text-white">rahulmukherjee006@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-[#d6dae1] font-medium mb-1 uppercase tracking-wider">Visit Us</p>
                      <a href="https://maps.app.goo.gl/kJqSVzVbwD7Y1muUA" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-white hover:text-brand-accent transition-colors underline decoration-white/30 underline-offset-4">
                        Kolkata, West Bengal
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 md:mt-20">
                <p className="text-[#d6dae1] text-sm italic">
                  *We usually respond to new enquiries within 4 business hours.
                </p>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="p-12 md:p-20 bg-brand-dark">
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mb-6">
                    <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-brand-dark">
                      ✓
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 text-display">Thank you for contacting!</h3>
                  <p className="text-[#d6dae1]">We usually respond within 4 business hours.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="mt-8 text-brand-accent font-bold underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white uppercase tracking-wider">Name</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="Rahul M." 
                        className="w-full px-5 py-4 rounded-2xl bg-[#24272d] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all placeholder:text-[#d6dae1]/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white uppercase tracking-wider">Company</label>
                      <input 
                        required
                        name="company"
                        type="text" 
                        placeholder="GrowthCorp" 
                        className="w-full px-5 py-4 rounded-2xl bg-[#24272d] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all placeholder:text-[#d6dae1]/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white uppercase tracking-wider">Email</label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      placeholder="rahul@growthcorp.com" 
                      className="w-full px-5 py-4 rounded-2xl bg-[#24272d] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all placeholder:text-[#d6dae1]/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white uppercase tracking-wider">Services Needed</label>
                    <select name="service" className="w-full px-5 py-4 rounded-2xl bg-[#24272d] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all appearance-none [&>option]:bg-[#24272d] [&>option]:text-white">
                      {servicesAndPlans.map((item) => (
                        <option key={item.id} value={item.title}>{item.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white uppercase tracking-wider">Message</label>
                    <textarea 
                      required
                      name="message"
                      rows={4}
                      placeholder="Tell us about your growth goals..." 
                      className="w-full px-5 py-4 rounded-2xl bg-[#24272d] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all resize-none placeholder:text-[#d6dae1]/50"
                    />
                  </div>
                  <button 
                    disabled={formState === 'submitting'}
                    type="submit" 
                    className="w-full bg-brand-accent text-brand-dark py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-brand-accent/20 disabled:opacity-50"
                  >
                    {formState === 'submitting' ? 'Sending...' : 'Request Consultation'}
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
