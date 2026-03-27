import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Users, Sparkles, Network, Zap } from 'lucide-react';

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const JoinCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Subtle parallax effect for floating nodes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="join" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex flex-col justify-center" ref={ref}>
      
      {/* ══════════════════════════════════════════════════════
          RESTORED: ANIMATED GRADIENT BACKGROUND
      ══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #030712 0%, #0a1930 50%, #030712 100%)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Holographic Grid Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03]" />
      </div>

      {/* Floating Data Nodes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 2 === 0 ? 'bg-cyan-400/30' : 'bg-blue-500/30'}`}
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -500],
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 1],
              x: `+=${mousePosition.x}`
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center w-full">
        
        {/* ══════════════════════════════════════════════════════
            THE COMMAND CENTER (Compact Glass Slab)
        ══════════════════════════════════════════════════════ */}
        <motion.div
          className="w-full relative bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Internal Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 text-center flex flex-col items-center">
            
            {/* Status Pill */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-[10px] md:text-xs font-bold text-cyan-300 uppercase tracking-widest">
                Network Active
              </span>
            </motion.div>

            {/* Viewport-Optimized Heading */}
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
              Ready to Initiate
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-lg"> Your Journey?</span>
            </h2>

            <motion.p
              className="text-sm md:text-base text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Integrate into a collective of computing professionals. Access exclusive protocols and architect the future of technology.
            </motion.p>

            {/* ══════════════════════════════════════════════════════
                ACTION CONSOLE (Buttons)
            ══════════════════════════════════════════════════════ */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {/* Primary Action - WhatsApp */}
              <a
                href="https://chat.whatsapp.com/JJEcTSG5qPrJZLo92SJvtk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto relative group/btn"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur opacity-40 group-hover/btn:opacity-80 transition duration-500" />
                <button className="relative w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#030712] rounded-lg font-black text-sm md:text-base tracking-wide hover:scale-[1.02] transition-transform duration-300">
                  <Zap className="w-4 h-4" /> Join The Collective
                </button>
              </a>

              {/* Secondary Action - Instagram */}
              <a
                href="https://www.instagram.com/soa_acm/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 border border-white/10 bg-white/5 text-white rounded-lg hover:bg-white/10 hover:border-cyan-500/30 font-bold text-sm md:text-base tracking-wide backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 group/sec"
              >
                <Network className="w-4 h-4 group-hover/sec:text-cyan-400 transition-colors" /> Establish Link
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            HARD METRICS (Moved OUTSIDE the card to save vertical space)
        ══════════════════════════════════════════════════════ */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-12 w-full mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {[
            { value: "350+", label: "Members", icon: Users },
            { value: "12+", label: "Events", icon: Sparkles },
            { value: "5+", label: "Partners", icon: Network }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center group/stat">
              <div className="text-2xl md:text-4xl font-black text-white mb-1 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-cyan-400/80 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <stat.icon className="w-3 h-3" /> {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default JoinCTA;