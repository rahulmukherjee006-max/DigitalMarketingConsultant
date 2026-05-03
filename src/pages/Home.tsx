import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import RateUs from '../components/RateUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function Home() {
  const { items } = useCartStore();

  return (
    <div className="bg-bg-primary min-h-screen text-text-main overflow-x-hidden selection:bg-brand-accent selection:text-brand-dark relative">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <TrustedBy />
        <Services />
        <Testimonials />
        <RateUs />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
