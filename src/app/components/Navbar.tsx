import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { title: 'About', href: '#about' },
  { title: 'Faculty', href: '#faculty' },
  { title: 'Events', href: '#events' },
  { title: 'Team', href: '#team' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-5 lg:py-6'
          }`}
      >
        <div className="w-full max-w-7xl mx-auto px-5 lg:px-12 flex items-center justify-between">
          <div
            className={`text-2xl md:text-3xl font-black tracking-tighter cursor-pointer transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-[var(--acm-blue)]' : 'text-white drop-shadow-md'
              }`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            SOA ACM
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.title}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-semibold tracking-wide hover:text-[var(--acm-blue)] transition-colors ${isScrolled ? 'text-gray-600' : 'text-white/90 hover:text-white drop-shadow-sm'
                  }`}
              >
                {link.title}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#join')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 ${isScrolled
                ? 'bg-[var(--acm-blue)] text-white hover:bg-[var(--acm-dark-blue)] shadow-[0_4px_14px_0_rgba(0,133,195,0.39)] hover:shadow-[0_6px_20px_rgba(0,133,195,0.23)]'
                : 'bg-white text-[var(--acm-blue)] hover:bg-gray-50 shadow-lg'
                }`}
            >
              Join Us
            </button>
          </nav>

          {/* Mobile UI Toggle */}
          <button
            className={`md:hidden p-2 rounded-xl transition-all active:scale-95 ${isScrolled || isMobileMenuOpen ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7 drop-shadow-md" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl md:hidden overflow-hidden flex flex-col items-center justify-center overscroll-none pt-12"
          >
            <div className="w-full max-w-sm px-8 flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.title}
                  onClick={() => scrollToSection(link.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.4, type: 'spring', bounce: 0.4 }}
                  className="text-4xl sm:text-5xl font-black text-gray-900 hover:text-[var(--acm-blue)] tracking-tight transition-colors"
                >
                  {link.title}
                </motion.button>
              ))}
              <motion.div
                className="w-16 h-1 bg-[var(--acm-blue)] mx-auto my-6 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
              <motion.button
                onClick={() => scrollToSection('#join')}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="w-full py-5 bg-[var(--acm-blue)] text-white text-xl font-bold rounded-2xl shadow-[0_10px_20px_rgba(0,133,195,0.2)] hover:shadow-[0_15px_30px_rgba(0,133,195,0.3)] active:scale-95 transition-all"
              >
                Join the Chapter
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
