import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CaseStudies from '../components/CaseStudies';
import WhatsAppButton from '../components/WhatsAppButton';
import { useCartStore } from '../store/useCartStore';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CaseStudiesPage() {
  const { items } = useCartStore();

  return (
    <div className="bg-bg-primary min-h-screen text-text-main overflow-x-hidden selection:bg-brand-accent selection:text-brand-dark relative">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <CaseStudies />
      </main>

      <Footer />
      <WhatsAppButton />
      
      {items.length > 0 && (
        <Link 
          to="/build-plan" 
          className="fixed bottom-[148px] right-6 z-50 flex items-center justify-center gap-2 bg-bg-secondary border-2 border-brand-accent text-text-main px-5 py-3 rounded-full shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:scale-105 transition-transform"
        >
          <ShoppingCart className="w-5 h-5 text-brand-accent" />
          <span className="font-bold">{items.length} item{items.length > 1 ? 's' : ''} in Plan</span>
        </Link>
      )}
    </div>
  );
}
