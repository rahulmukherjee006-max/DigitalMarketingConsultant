import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-bg-primary text-text-main flex flex-col font-sans selection:bg-brand-accent selection:text-brand-dark">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Visual/Marketing */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col gap-8"
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Scale Your <span className="text-brand-accent">Business</span>
                <br />With Precision.
              </h1>
              <p className="text-text-muted text-lg mb-8 max-w-md">
                Join hundreds of businesses scaling their revenue efficiently with our data-driven marketing frameworks.
              </p>
            </div>
            
            {/* Testimonial Card */}
            <div className="glass-card p-8 border-l-4 border-l-brand-accent relative">
              <div className="absolute -top-6 -left-4 text-7xl text-brand-accent/20">"</div>
              <p className="text-text-main text-lg italic relative z-10 mb-6">
                "Since joining, our cost per acquisition dropped by 40% while lead volume doubled. The transparency and results are unmatched."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-border-subtle rounded-full flex items-center justify-center font-bold text-xl text-text-main">
                  JS
                </div>
                <div>
                  <div className="font-bold">John Smith</div>
                  <div className="text-text-muted text-sm">CEO, TechScale</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Auth Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="glass-card p-8 shadow-2xl relative overflow-hidden">
              {/* Tab Switcher */}
              <div className="flex p-1 bg-bg-secondary rounded-xl mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                    isLogin ? 'bg-text-main text-bg-primary shadow-md' : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                    !isLogin ? 'bg-text-main text-bg-primary shadow-md' : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login' : 'signup'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                      {isLogin ? 'Welcome back' : 'Create an account'}
                    </h2>
                    <p className="text-text-muted text-sm">
                      {isLogin 
                        ? 'Enter your details to access your dashboard.' 
                        : 'Fill in your details to get started.'}
                    </p>
                  </div>

                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    {!isLogin && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold mb-2 text-text-muted">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                            <input 
                              type="text" 
                              placeholder="John Doe"
                              className="w-full bg-bg-secondary border border-border-subtle rounded-xl py-3 pl-12 pr-4 text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 text-text-muted">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                            <input 
                              type="tel" 
                              placeholder="+91 98765 43210"
                              className="w-full bg-bg-secondary border border-border-subtle rounded-xl py-3 pl-12 pr-4 text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-bold mb-2 text-text-muted">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                        <input 
                          type="email" 
                          placeholder="john@example.com"
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl py-3 pl-12 pr-4 text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-text-muted">Password</label>
                        {isLogin && (
                          <a href="#" className="text-xs font-bold text-brand-accent hover:underline">
                            Forgot password?
                          </a>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl py-3 pl-12 pr-4 text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                        />
                      </div>
                    </div>

                    <button className="w-full bg-brand-accent text-brand-dark py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all flex justify-center items-center gap-2 mt-6">
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>

                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border-subtle"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-bg-primary text-text-muted">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <button className="flex justify-center items-center gap-3 bg-bg-secondary border border-border-subtle rounded-xl py-3 hover:bg-border-subtle/30 transition-colors">
                        <FcGoogle className="w-5 h-5" />
                        <span className="font-bold text-sm">Google</span>
                      </button>
                      <button className="flex justify-center items-center gap-3 bg-[#1877F2] text-white rounded-xl py-3 hover:opacity-90 transition-opacity">
                        <FaFacebook className="w-5 h-5" />
                        <span className="font-bold text-sm">Facebook</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>
      
      <BackToTopButton />
      <Footer />
    </div>
  );
}
