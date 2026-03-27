import { motion, useInView } from 'motion/react';
import { useRef, MouseEvent } from 'react';
import { Target, Lightbulb, Code, Sparkles } from 'lucide-react';

/* ─────────────────────────────────────────────
   About Data Setup
───────────────────────────────────────────── */
const cards = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To advance computing as a science and profession by nurturing technical excellence, research curiosity, and unyielding innovation among students.',
    color: '#3b82f6', // blue-500
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'bg-blue-500/20',
  },
  {
    icon: Lightbulb,
    title: 'Our Vision',
    description: 'To construct a vibrant, elite community of future computing professionals driving technological progress, collaboration, and systemic societal impact.',
    color: '#6366f1', // indigo-500
    gradient: 'from-indigo-500 to-blue-400',
    glow: 'bg-indigo-500/20',
  },
  {
    icon: Code,
    title: 'Our Execution',
    description: 'We orchestrate high-octane hackathons, specialized workshops, research symposiums, and industry-academia summits to accelerate career trajectories.',
    color: '#0ea5e9', // sky-500
    gradient: 'from-sky-500 to-blue-500',
    glow: 'bg-sky-500/20',
  },
];

/* ─────────────────────────────────────────────
   Interactive Glass Card Component
───────────────────────────────────────────── */
const GlassCard = ({ card, index, isInView }: any) => {
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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative flex flex-col p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 overflow-hidden backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] h-full"
    >
      {/* The Spotlight Effect (Cursor Tracking) */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
        }}
      />
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 mix-blend-overlay"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${card.color}30, transparent 40%)`
        }}
      />

      {/* Holographic Icon Block */}
      <div className="relative z-10 mb-8">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/[0.03] shadow-lg relative group-hover:scale-110 transition-transform duration-500">
          {/* Internal Glowing Core */}
          <div className={`absolute inset-0 blur-xl ${card.glow} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
          <card.icon className="w-8 h-8 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex-grow flex flex-col">
        <h3 className={`text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${card.gradient}`}>
          {card.title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed flex-grow">
          {card.description}
        </p>
      </div>

      {/* Abstract Animated Border Line */}
      <motion.div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────── */
const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="about" className="px-4 sm:px-6 lg:px-8 py-24 bg-[#030712] relative overflow-hidden" ref={ref}>
  {/* Ambient Background Glows */}
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* ══════════════════════════════════════════════════════
          AMBIENT BACKGROUND ORBS
      ══════════════════════════════════════════════════════ */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[150px]" 
        />
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[10%] w-[30%] h-[50%] rounded-full bg-cyan-600/10 blur-[150px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-gray-300 tracking-wide uppercase">Core Identity</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">SOA ACM</span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are not just a student chapter. We are a nexus of innovation, engineering excellence, and technological leadership.
          </p>
        </motion.div>

        {/* 3-Column Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <GlassCard key={card.title} card={card} index={index} isInView={isInView} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;