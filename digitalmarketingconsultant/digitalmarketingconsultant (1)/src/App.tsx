/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import Home from './pages/Home';
import PlanBuilder from './pages/PlanBuilder';
import ServicePage from './pages/ServicePage';
import AdSpendCalculator from './pages/AdSpendCalculator';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ScrollToTop from './components/ScrollToTop';

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
    <BrowserRouter>
      <ScrollToTop />
      <ProgressBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build-plan" element={<PlanBuilder />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/ad-spend-calculator" element={<AdSpendCalculator />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
