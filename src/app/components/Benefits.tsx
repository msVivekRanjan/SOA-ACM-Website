import { motion, useInView } from 'motion/react';
import { useRef, MouseEvent } from 'react';
import { Code, Users, TrendingUp, Award, Sparkles, ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   Benefit Data Setup
───────────────────────────────────────────── */
const benefits = [
  {
    icon: Code,
    title: 'Skill Development',
    description: 'Participate in high-octane technical workshops, hackathons, and research discussions to harden your core computing skills.',
    color: '#3b82f6', // blue-500
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'bg-blue-500/20',
  },
  {
    icon: Users,
    title: 'Elite Networking',
    description: 'Connect with driven students, faculty mentors, and industry veterans through exclusive events and collaborative conferences.',
    color: '#f59e0b', // amber-500
    gradient: 'from-orange-500 to-amber-400',
    glow: 'bg-orange-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Industry Exposure',
    description: 'Bridge the gap between academia and industry via ACM Distinguished Speaker sessions and real-world project builds.',
    color: '#10b981', // emerald-500
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'bg-emerald-500/20',
  },
  {
    icon: Award,
    title: 'Leadership Crucible',
    description: 'Step up. Take organizational roles, architect initiatives, and build the soft skills required to lead tech teams.',
    color: '#8b5cf6', // purple-500
    gradient: 'from-purple-500 to-fuchsia-400',
    glow: 'bg-purple-500/20',
  },
];

/* ─────────────────────────────────────────────
   Interactive Glass Card Component
───────────────────────────────────────────── */
const BenefitCard = ({ benefit, index, isInView }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative flex flex-col p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 overflow-hidden backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2"
    >
      {/* The Spotlight Effect 
        Uses a pseudo-element mask for the border glow and a background radial gradient for the inner glow 
      */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
        }}
      />
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 mix-blend-overlay"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${benefit.color}30, transparent 40%)`
        }}
      />

      {/* Icon Architecture */}
      <div className="relative z-10 mb-8 flex items-center justify-between">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/[0.03] shadow-lg relative group-hover:scale-110 transition-transform duration-500`}>
          {/* Internal Icon Glow */}
          <div className={`absolute inset-0 blur-xl ${benefit.glow} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
          <benefit.icon className="w-8 h-8 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
        
        {/* Abstract Corner Numbering */}
        <span className="text-white/10 font-black text-6xl tracking-tighter pointer-events-none select-none group-hover:text-white/20 transition-colors duration-500">
          0{index + 1}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow">
        <h3 className={`text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${benefit.gradient}`}>
          {benefit.title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          {benefit.description}
        </p>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────── */
const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="benefits" className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-[#030712] overflow-hidden" ref={ref}>
      
      {/* ══════════════════════════════════════════════════════
          AMBIENT BACKGROUND ORBS (Abstract Glows)
      ══════════════════════════════════════════════════════ */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-600/20 blur-[150px]" 
        />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-emerald-600/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-gray-300 tracking-wide uppercase">Why Join Us</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Trajectory</span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Membership isn't just a line on your resume. It's an immersive ecosystem designed to accelerate your growth as a technologist.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Floating CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative rounded-3xl p-px bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-500/30 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 bg-[#0a0f1e]/90 backdrop-blur-2xl p-8 md:p-10 rounded-3xl">
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">Ready to initiate?</h4>
              <p className="text-gray-400 max-w-xl">
                Join a collective of 350+ driven students. Your journey to becoming a computing professional starts the moment you engage.
              </p>
            </div>
            
            <button className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300">
              Become a Member <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Benefits;