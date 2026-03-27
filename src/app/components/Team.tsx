import { motion, useInView } from 'motion/react';
import { useRef, MouseEvent } from 'react';
import { Linkedin, Sparkles, Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

/* ─────────────────────────────────────────────
   Team Data Setup
───────────────────────────────────────────── */
const coreTeam = [
  { name: 'Debajyoti Bhakta', role: 'Chair', image: '/Images/1.webp', linkedin: 'https://www.linkedin.com/in/debajyoti-bhakta/' },
  { name: 'Anshuman Barik', role: 'Vice Chair', image: '/Images/2.webp', linkedin: 'https://www.linkedin.com/in/anshuman-barik' },
  { name: 'Ariba Shakil', role: 'Secretary', image: '/Images/3.webp', linkedin: 'https://www.linkedin.com/in/ariba-shakil-b19a89314/' },
  { name: 'Guru Prasad Panda', role: 'Treasurer', image: '/Images/4.webp', linkedin: 'https://www.linkedin.com/in/guruprasadpanda/' },
  { name: 'Vivek Ranjan Sahoo', role: 'Webmaster', image: '/Images/7.webp', linkedin: 'https://www.linkedin.com/in/vivekranjansahoo7/' },
  { name: 'Biswajit Baral', role: 'Research & Innovation', image: '/Images/5.webp', linkedin: 'https://www.linkedin.com/in/biswajit-baral-540991367/' },
  { name: 'Sallouni Mandal', role: 'Research & Innovation', image: '/Images/10.webp', linkedin: 'https://www.linkedin.com/in/sallouni-mandal-3812532b7/' },
  { name: 'Soumyasri Mohapatra', role: 'Technical Team', image: '/Images/9.webp', linkedin: 'https://www.linkedin.com/in/soumyasri-mohapatra-99211625b' },
  { name: 'Pratyush Sahoo', role: 'Technical Team', image: '/Images/12.webp', linkedin: 'https://www.linkedin.com/in/pratyush-s-926984276/' },
  { name: 'Sanat Sinha', role: 'Technical Team', image: '/Images/16.webp', linkedin: 'https://www.linkedin.com/in/sanatsinhaa/' },
  { name: 'Rohan Kumar Sahoo', role: 'Event & Operations', image: '/Images/13.webp', linkedin: 'https://www.linkedin.com/in/rohankumarsahoo' },
  { name: 'Aditya Priyadarshan', role: 'Event & Operations', image: '/Images/6.webp', linkedin: 'https://www.linkedin.com/in/aditya-priyadarshan-b1ba9126b/' },
  { name: 'Nayanika Debnath', role: 'Design & Media', image: '/Images/8.webp', linkedin: 'http://www.linkedin.com/in/nayanika-debnath-164633315' },
  { name: 'Ishan Sinha', role: 'Design & Media', image: '/Images/11.webp', linkedin: 'https://github.com/IshanDevz' },
  { name: 'Raj Sahasransu Biswal', role: 'Public Relations', image: '/Images/14.webp', linkedin: 'https://www.linkedin.com/in/raj-sahasransu-biswal/' },
  { name: 'Ayush Ranjan Pradhan', role: 'Public Relations', image: '/Images/15.webp', linkedin: 'https://www.linkedin.com/in/ayush-ranjan-pradhan-008468309/' },
];

/* ─────────────────────────────────────────────
   Interactive Glass Team Card
───────────────────────────────────────────── */
interface TeamCardProps {
  member: { name: string; role: string; image: string; linkedin: string; };
  index: number;
  isInView: boolean;
}

const TeamCard = ({ member, index, isInView }: TeamCardProps) => {
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
      transition={{ duration: 0.7, delay: 0.1 + index * 0.05 }}
      className="group relative flex flex-col rounded-[2rem] bg-white/[0.02] border border-white/10 overflow-hidden backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Interactive Spotlight Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 mix-blend-overlay"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 40%)`
        }}
      />

      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden shrink-0 bg-[#0a0f1e]">
        <ImageWithFallback
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent opacity-90" />

        {/* Floating LinkedIn Button */}
        <motion.a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 z-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + index * 0.05 }}
        >
          <Linkedin className="w-4 h-4 text-white" />
        </motion.a>
      </div>

      {/* Info Section - Integrated directly over the image gradient */}
      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-30 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h4 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight drop-shadow-md">
          {member.name}
        </h4>
        <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          {member.role}
        </p>

        {/* Animated Bottom Glow Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────── */
const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="team" className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-[#030712] overflow-hidden" ref={ref}>
      
      {/* ══════════════════════════════════════════════════════
          AMBIENT BACKGROUND ORBS
      ══════════════════════════════════════════════════════ */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[150px]" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] left-[5%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[150px]" 
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
            <span className="text-sm font-semibold text-gray-300 tracking-wide uppercase">The Architects</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Core Team</span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The passionate students driving innovation, engineering excellence, and community growth within our chapter.
          </p>
        </motion.div>

        {/* Core Team Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 mb-24">
          {coreTeam.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Sleek, High-Energy CTA Banner */}
        <motion.div
          className="relative max-w-5xl mx-auto mt-8 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-transparent blur-xl rounded-[2rem]" />

          <div className="relative bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden group hover:bg-white/[0.03] transition-colors duration-500">
            
            {/* Animated Top Border Glow */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 group-hover:opacity-100 group-hover:via-cyan-400 transition-all duration-700" />

            {/* Left Side: Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                Do you have what it takes?
              </h3>
              <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
                Our core team is currently operating at full capacity. However, excellence never sleeps. Stay connected with us to be the first to know when the next recruitment protocol initiates.
              </p>
            </div>

            {/* Right Side: Action & Status */}
            <div className="shrink-0 w-full md:w-auto flex flex-col items-center md:items-end gap-4">
              
              {/* Status Indicator */}
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  Recruitment Full
                </span>
              </div>

              {/* Active CTA Button */}
              <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:-translate-y-1">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Stay Updated
              </button>
              
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Team;