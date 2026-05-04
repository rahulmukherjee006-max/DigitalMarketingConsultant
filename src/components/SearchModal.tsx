import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ChevronRight, FileText, Layout, Layers } from 'lucide-react';
import { useUIStore } from '../store/useUIStore';
import { useNavigate } from 'react-router-dom';

const searchData = [
  { title: 'Home', path: '/', type: 'page', icon: Layout },
  { title: 'Ad Spend Calculator', path: '/ad-spend-calculator', type: 'page', icon: Layout },
  { title: 'Case Studies', path: '/case-studies', type: 'page', icon: Layout },
  { title: 'Build Your Plan', path: '/build-plan', type: 'page', icon: Layout },
  { title: 'Login / Auth', path: '/auth', type: 'page', icon: Layout },
  
  { title: 'Google Ads', path: '/services/google-ads', type: 'service', icon: Layers },
  { title: 'Facebook & Instagram Ads (Meta)', path: '/services/facebook-instagram-ads', type: 'service', icon: Layers },
  { title: 'Search Engine Optimization (SEO)', path: '/services/search-engine-optimization', type: 'service', icon: Layers },
  { title: 'Conversion Rate Optimization', path: '/services/conversion-rate-optimization', type: 'service', icon: Layers },
  { title: 'Sales Funnel Architecture', path: '/services/sales-funnel-architecture', type: 'service', icon: Layers },
  { title: 'E-commerce Scaling', path: '/services/ecommerce-scaling', type: 'service', icon: Layers },
  { title: 'WhatsApp Marketing', path: '/services/whatsapp-marketing', type: 'service', icon: Layers },
  { title: 'Digital Strategy', path: '/services/digital-strategy', type: 'service', icon: Layers },
];

export default function SearchModal() {
  const { isSearchOpen, setSearchOpen } = useUIStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const filteredResults = searchData.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    setSearchOpen(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-primary/80 backdrop-blur-sm z-[100]"
            onClick={() => setSearchOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
          >
            <div className="bg-bg-secondary w-full rounded-2xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col max-h-[80vh]">
              <div className="relative border-b border-border-subtle flex items-center px-4">
                <Search className="w-5 h-5 text-text-muted shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search pages, services..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-text-main px-4 py-5 text-lg outline-none placeholder:text-text-muted"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-text-muted hover:text-text-main rounded-xl hover:bg-text-main/5 transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {query.trim() === '' ? (
                  <div className="p-8 text-center text-text-muted">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>Type anything to start searching...</p>
                  </div>
                ) : filteredResults.length === 0 ? (
                  <div className="p-8 text-center text-text-muted">
                    <p>No results found for "{query}"</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredResults.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelect(item.path)}
                        className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-text-main/5 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-bg-primary rounded-lg border border-border-subtle group-hover:border-brand-accent/30 transition-colors">
                            <item.icon className="w-5 h-5 text-text-muted group-hover:text-brand-accent transition-colors" />
                          </div>
                          <div>
                            <p className="font-bold text-text-main">{item.title}</p>
                            <p className="text-xs text-text-muted uppercase tracking-wider mt-0.5">
                              {item.type}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-bg-primary border-t border-border-subtle p-3 text-xs text-text-muted flex justify-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-bg-secondary border border-border-subtle rounded-md font-mono">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-bg-secondary border border-border-subtle rounded-md font-mono">↓</kbd> to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-bg-secondary border border-border-subtle rounded-md font-mono">↵</kbd> to select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-bg-secondary border border-border-subtle rounded-md font-mono">esc</kbd> to close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
