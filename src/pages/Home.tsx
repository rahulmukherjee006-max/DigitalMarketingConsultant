import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function Home() {
  const { items } = useCartStore();

  return (
    <div className="bg-[#0c1205] min-h-screen text-white overflow-x-hidden selection:bg-brand-accent selection:text-brand-dark relative">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <TrustedBy />
        <Services />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      
      {items.length > 0 && (
        <Link 
          to="/build-plan" 
          className="fixed bottom-[148px] right-6 z-50 flex items-center justify-center gap-2 bg-[#161a20] border-2 border-brand-accent text-white px-5 py-3 rounded-full shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:scale-105 transition-transform"
        >
          <ShoppingCart className="w-5 h-5 text-brand-accent" />
          <span className="font-bold">{items.length} item{items.length > 1 ? 's' : ''} in Plan</span>
        </Link>
      )}
    </div>
  );
}
