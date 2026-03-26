import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Code2, Cpu, Network, Zap, Box, Hexagon } from 'lucide-react';
import soaLogo from '/Images/soa.webp';
import acmLogo from '/Images/acm.webp';

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Smooth spring animations for mouse movement
  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), springConfig);

  // Parallax effects for different layers
  const parallaxX1 = useSpring(useTransform(mouseX, [-500, 500], [-30, 30]), springConfig);
  const parallaxY1 = useSpring(useTransform(mouseY, [-500, 500], [-30, 30]), springConfig);
  const parallaxX2 = useSpring(useTransform(mouseX, [-500, 500], [-50, 50]), springConfig);
  const parallaxY2 = useSpring(useTransform(mouseY, [-500, 500], [-50, 50]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3D Geometric shapes data
  const geometricShapes = [
    { Icon: Box, size: 120, x: '15%', y: '20%', delay: 0, color: 'var(--acm-blue)' },
    { Icon: Hexagon, size: 100, x: '80%', y: '25%', delay: 0.5, color: 'var(--acm-purple)' },
    { Icon: Box, size: 80, x: '70%', y: '70%', delay: 1, color: 'var(--acm-light-blue)' },
    { Icon: Hexagon, size: 90, x: '25%', y: '75%', delay: 1.5, color: 'var(--acm-yellow)' },
    { Icon: Box, size: 60, x: '90%', y: '50%', delay: 2, color: 'var(--acm-orange)' },
    { Icon: Hexagon, size: 70, x: '10%', y: '50%', delay: 2.5, color: 'var(--acm-green)' },
  ];

  // Floating tech orbs data
  const techOrbs = [
    { icon: Code2, color: 'var(--acm-blue)', delay: 0 },
    { icon: Cpu, color: 'var(--acm-light-blue)', delay: 0.5 },
    { icon: Network, color: 'var(--acm-purple)', delay: 1 },
    { icon: Zap, color: 'var(--acm-yellow)', delay: 1.5 },
  ];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
    >
      {/* 3D Grid Background with Mouse Interaction */}
      <motion.div
        className="absolute inset-0"
        style={{
          perspective: '1200px',
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-60"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Primary 3D Grid */}
          <div
            className="absolute inset-0 transform-gpu"
            style={{
              // backgroundImage: `
              //   linear-gradient(var(--acm-blue) 2px, transparent 2px),
              //   linear-gradient(90deg, var(--acm-blue) 2px, transparent 2px)
              // `,
              backgroundSize: '80px 80px',
              transform: 'rotateX(60deg) translateZ(-300px) scale(2)',
              transformStyle: 'preserve-3d',
              backgroundPosition: 'center center',
            }}
          />

          {/* Secondary Grid Layer */}
          <div
            className="absolute inset-0 transform-gpu opacity-40"
            style={{
              // backgroundImage: `
              //   linear-gradient(var(--acm-purple) 1px, transparent 1px),
              //   linear-gradient(90deg, var(--acm-purple) 1px, transparent 1px)
              // `,
              backgroundSize: '40px 40px',
              transform: 'rotateX(60deg) translateZ(-150px) scale(2)',
              transformStyle: 'preserve-3d',
              backgroundPosition: 'center center',
            }}
          />
        </motion.div>
      </motion.div>

      {/* 3D Geometric Shapes with Parallax */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          x: parallaxX1,
          y: parallaxY1,
        }}
      >
        {geometricShapes.map((shape, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: shape.x,
              top: shape.y,
            }}
            initial={{ opacity: 0, scale: 0, rotateZ: 0 }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: 1,
              rotateZ: 360,
            }}
            transition={{
              opacity: { duration: 4, repeat: Infinity, delay: shape.delay },
              scale: { duration: 1, delay: shape.delay },
              rotateZ: { duration: 20, repeat: Infinity, ease: 'linear', delay: shape.delay },
            }}
            whileHover={{
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateX: [0, 360, 0],
              }}
              transition={{
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                rotateX: { duration: 10, repeat: Infinity, ease: 'linear' },
              }}
              style={{
                filter: `drop-shadow(0 0 12px ${shape.color})`,
              }}
            >
              <shape.Icon
                size={shape.size}
                style={{
                  color: shape.color,
                  strokeWidth: 1,
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Tech Orbs with Mouse Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: parallaxX2,
          y: parallaxY2,
        }}
      >
        {techOrbs.map((orb, index) => (
          <motion.div
            key={index}
            className="absolute hidden lg:block cursor-pointer"
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + (index % 2) * 30}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: 1,
              y: [0, -30, 0],
            }}
            transition={{
              opacity: { duration: 3, repeat: Infinity, delay: orb.delay },
              scale: { duration: 0.5, delay: orb.delay },
              y: { duration: 5, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' },
            }}
            whileHover={{
              scale: 1.3,
              rotate: 360,
              transition: { duration: 0.5 }
            }}
            whileTap={{
              scale: 1.3,
              rotate: 360,
              transition: { duration: 0.5 }
            }}
          >
            <motion.div
              className="w-20 h-20 rounded-xl backdrop-blur-md border flex items-center justify-center relative"
              style={{
                borderColor: orb.color,
                background: `radial-gradient(circle at 30% 30%, ${orb.color}30, ${orb.color}10)`,
                boxShadow: `0 0 20px ${orb.color}40`,
              }}
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
              }}
            >
              <orb.icon className="w-8 h-8" style={{ color: orb.color }} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Particle System with Mouse Interaction */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: useTransform(mouseX, [-500, 500], [-20, 20]),
          y: useTransform(mouseY, [-500, 500], [-20, 20]),
        }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: i % 3 === 0 ? 'var(--acm-blue)' : i % 3 === 1 ? 'var(--acm-light-blue)' : 'var(--acm-purple)',
              boxShadow: `0 0 4px currentColor`,
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.6, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>


      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <img
              src={soaLogo}
              alt="SOA University Logo"
              className="h-14 md:h-16 object-contain opacity-90"
            />
            <div className="h-10 w-px bg-gray-600/50" />
            <img
              src={acmLogo}
              alt="ACM Logo"
              className="h-14 md:h-16 object-contain opacity-90"
            />
          </motion.div>

          {/* Holographic Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 relative group cursor-pointer"
            style={{
              background: 'rgba(0,133,195,0.15)',
              border: '1px solid rgba(0,133,195,0.4)',
              backdropFilter: 'blur(10px)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{
              scale: 1.05,
              background: 'rgba(0,133,195,0.25)',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-4 h-4 text-[var(--acm-blue)]" />
            </motion.div>
            <span className="text-sm text-white relative z-10">Official SOA University Student Chapter</span>
          </motion.div>

          {/* Title with Character Split Animation */}
          <div className="mb-6">
            <motion.h1
              className="text-6xl md:text-8xl tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                SOA ACM
              </motion.span>
              <motion.span
                className="block text-[var(--acm-blue)] relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Student Chapter
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Fostering technical excellence, research curiosity, interdisciplinary innovation, and career development through strong academic-industry collaboration.
          </motion.p>

          {/* Enhanced CTAs with Magnetic Effect */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              onClick={() => scrollToSection('join')}
              className="group relative px-8 py-4 rounded-lg overflow-hidden backdrop-blur-sm"
              style={{
                border: '2px solid var(--acm-blue)',
                background: 'rgba(0,133,195,0.08)',
              }}
              whileHover={{
                scale: 1.05,
                background: 'rgba(0,133,195,0.15)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 text-white">Join the Community</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.2 },
            y: { delay: 1.2, duration: 2, repeat: Infinity }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('about')}
        >
          <div
            className="w-7 h-11 rounded-full p-1.5 backdrop-blur-sm relative"
            style={{
              border: '2px solid var(--acm-blue)',
              background: 'rgba(0,133,195,0.15)',
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full mx-auto"
              style={{ background: 'var(--acm-blue)' }}
              animate={{
                y: [0, 18, 0],
                opacity: [1, 0.4, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;