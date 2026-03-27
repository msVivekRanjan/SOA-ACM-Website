import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { title: 'About', href: '#about' },
  { title: 'Faculty', href: '#faculty' },
  { title: 'Events', href: '#events' },
  { title: 'Team', href: '#team' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll for the "Dynamic Glass Pill" effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          MAIN NAVBAR ARCHITECTURE
      ══════════════════════════════════════════════════════ */}
      <header
        className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out ${
          isScrolled ? 'top-4 px-4' : 'top-0 px-4 sm:px-6 lg:px-8 py-6'
        }`}
      >
        <div
          className={`w-full flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? 'max-w-5xl bg-[#0a0f1e]/70 backdrop-blur-2xl border border-white/10 rounded-full px-6 md:px-8 py-3.5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
              : 'max-w-7xl mx-auto px-2'
          }`}
        >
          {/* Logo - Gradient Text */}
          <div
            className="text-2xl md:text-3xl font-black tracking-tighter cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-white">SOA</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              ACM
            </span>
          </div>

          {/* ══════════════════════════════════════════════════════
              DESKTOP NAVIGATION
          ══════════════════════════════════════════════════════ */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.title}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-semibold tracking-wide text-gray-300 hover:text-cyan-400 transition-colors duration-300 drop-shadow-sm"
              >
                {link.title}
              </button>
            ))}
            
            {/* Premium Glass CTA Button */}
            <button
              onClick={() => scrollToSection('#join')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" /> Join Us
            </button>
          </nav>

          {/* ══════════════════════════════════════════════════════
              MOBILE MENU TOGGLE
          ══════════════════════════════════════════════════════ */}
          <button
            className={`md:hidden p-2 rounded-full transition-all duration-300 active:scale-90 ${
              isMobileMenuOpen 
                ? 'bg-white/10 text-white rotate-90' 
                : 'bg-transparent text-gray-300 hover:text-cyan-400'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════
          HOLOGRAPHIC MOBILE MENU OVERLAY
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#030712]/95 md:hidden overflow-hidden flex flex-col items-center justify-center overscroll-none"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[10%] w-64 h-64 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-sm px-8 flex flex-col gap-8 text-center relative z-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.title}
                  onClick={() => scrollToSection(link.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.4, type: 'spring', bounce: 0.4 }}
                  className="text-4xl sm:text-5xl font-black text-white hover:text-cyan-400 tracking-tight transition-colors duration-300"
                >
                  {link.title}
                </motion.button>
              ))}
              
              {/* Animated Divider */}
              <motion.div
                className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto my-6 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
              
              {/* Massive Mobile CTA */}
              <motion.button
                onClick={() => scrollToSection('#join')}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="w-full py-5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xl font-bold rounded-2xl shadow-[0_10px_30px_rgba(56,189,248,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-6 h-6" /> Join the Chapter
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;