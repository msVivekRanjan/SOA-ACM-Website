import { motion } from 'motion/react';
import { Mail, Linkedin, Instagram, ArrowRight, Sparkles } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Team', href: '#team' },
    { label: 'Connect', href: '#join' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/soa-acm-students-chapter/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/soa_acm/', label: 'Instagram' },
  ];

  return (
    <footer className="relative bg-[#030712] pt-24 pb-12 overflow-hidden border-t border-white/5">
      
      {/* ══════════════════════════════════════════════════════
          AMBIENT BACKGROUND ORBS & GRID
      ══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0))] opacity-[0.02]" />
        
        {/* Bottom Ambient Glows */}
        <motion.div 
          animate={{ x: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[30%] -left-[10%] w-[50%] h-[60%] rounded-full bg-blue-600/10 blur-[150px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[30%] -right-[10%] w-[40%] h-[70%] rounded-full bg-cyan-600/10 blur-[150px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* ══════════════════════════════════════════════════════
              BRAND SECTION
          ══════════════════════════════════════════════════════ */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter">
              <span className="text-white">SOA</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                ACM
              </span>
            </h3>

            <p className="text-gray-400 mb-8 leading-relaxed max-w-md text-sm md:text-base">
              The premier student computing organization at SOA University. We architect the next generation of technology leaders through code, collaboration, and relentless innovation.
            </p>

            <a
              href="mailto:iteracm@gmail.com"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-gray-300 font-medium tracking-wide">iteracm@gmail.com</span>
            </a>
          </div>

          {/* ══════════════════════════════════════════════════════
              QUICK LINKS
          ══════════════════════════════════════════════════════ */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Index
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base font-medium"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-cyan-400" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ══════════════════════════════════════════════════════
              SOCIAL MEDIA
          ══════════════════════════════════════════════════════ */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" /> Network
            </h4>
            <div className="flex flex-col gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-400 hover:text-white transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300">
                    <social.icon className="w-5 h-5 group-hover:scale-110 group-hover:text-cyan-400 transition-transform duration-300" />
                  </div>
                  <span className="font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════
            BOTTOM BAR (Credits & Copyright)
        ══════════════════════════════════════════════════════ */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <p className="text-gray-500 text-xs md:text-sm font-medium">
            © {new Date().getFullYear()} SOA ACM Student Chapter. All systems operational.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium">
              <span>Powered by</span>
              <a
                href="https://www.acm.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors duration-300 font-bold tracking-wide"
              >
                ACM
              </a>
            </div>

            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />

            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium">
              <span>Designed & Developed by</span>
              <a
                href="https://www.linkedin.com/in/vivekranjansahoo7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 hover:opacity-80 transition-opacity duration-300 font-bold tracking-wide"
              >
                vivekrs.in
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;