import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Team', href: '#team' },
    { label: 'Connect', href: '#join' },

  ];

  const socialLinks = [
    // { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/soa-acm-students-chapter/', label: 'LinkedIn' },
    // { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/soa_acm/', label: 'Instagram' },
  ];

  return (
    <footer className="px-4 sm:px-6 lg:px-8 bg-[#0f172a] text-white pt-20 pb-8 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--acm-blue) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-[var(--acm-blue)]">SOA ACM</span>
            </h3>

            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              The premier student computing organization at SOA University. Building the next generation of technology leaders.
            </p>

            <a
              href="mailto:iteracm@gmail.com"
              className="flex items-center gap-3 text-gray-400 hover:text-[var(--acm-blue)] transition-colors duration-300 group"
            >
              <Mail className="w-5 h-5" />
              <span className="group-hover:underline">iteracm@gmail.com</span>
            </a>
          </div>


          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[var(--acm-blue)] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Follow Us</h4>
            <div className="flex flex-col gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center gap-3 text-gray-400 hover:text-[var(--acm-blue)] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[var(--acm-blue)]/20 transition-colors duration-300 group-hover:scale-110">
                    <social.icon className="w-5 h-5" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ACM SOA Student Chapter. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Powered by</span>
              <a
                href="https://www.acm.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--acm-blue)] font-semibold"
              >ACM
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Designed by</span>
              <a
                href="https://www.linkedin.com/in/ratikantabehera/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--acm-blue)] font-semibold hover:underline"
              >Ratikanta,
              </a>
              <span>Maintained by</span>
              <a
                href="https://www.linkedin.com/in/vivekranjansahoo7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--acm-blue)] font-semibold hover:underline"
              >Vivek Ranjan
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Gradient */}
        <motion.div
          className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, var(--acm-blue), transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
