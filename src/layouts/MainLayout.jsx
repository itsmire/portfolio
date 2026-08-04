import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

/**
 * MainLayout — bố cục chính với Navbar, Footer và hiệu ứng chuyển trang.
 */
export default function MainLayout({ children, isDark, toggleTheme }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Decorative background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-[-15%] right-[-5%] w-[50vw] h-[50vw] max-w-2xl bg-purple-500/5 dark:bg-purple-500/8 rounded-full glow-blur" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[50vw] h-[50vw] max-w-2xl bg-indigo-500/4 dark:bg-indigo-500/6 rounded-full glow-blur" />
      </div>

      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex-grow w-full"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
