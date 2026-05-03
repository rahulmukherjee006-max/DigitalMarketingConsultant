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
    </div>
  );
}
