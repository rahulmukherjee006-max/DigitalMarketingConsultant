/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import ExitIntentPopup from './components/ExitIntentPopup';
import BookingModal from './components/BookingModal';
import { ThemeProvider } from './components/ThemeProvider';
import CursorGlow from './components/CursorGlow';
import SkeletonLoader from './components/SkeletonLoader';

const Home = lazy(() => import('./pages/Home'));
const PlanBuilder = lazy(() => import('./pages/PlanBuilder'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const AdSpendCalculator = lazy(() => import('./pages/AdSpendCalculator'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CursorGlow />
        <ScrollToTop />
        <ProgressBar />
        <BackToTopButton />
        <ExitIntentPopup />
        <BookingModal />
        <Suspense fallback={<SkeletonLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/build-plan" element={<PlanBuilder />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/ad-spend-calculator" element={<AdSpendCalculator />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
