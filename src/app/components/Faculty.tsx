import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

/* ─────────────────────────────────────────────
   Faculty Data Setup
───────────────────────────────────────────── */
const facultyData = [
  {
    name: 'Dr. Anukampa Behera',
    designation: 'Associate Professor, Department of CSE | SOADU',
    role: 'Faculty Sponsor | SOA ACM Students Chapter',
    image: '/Images/f1.webp',
    quote: "Research is not reserved for a chosen few; it begins the moment a student learns to ask meaningful questions. As engineering undergraduates, you already stand at the edge of discovery. I encourage each of you to explore, experiment, and contribute because today’s curiosity becomes tomorrow’s innovation.",
    accent: 'from-blue-500 to-cyan-400',
    borderColor: 'group-hover:border-blue-500/50'
  },
  {
    name: 'Mr. Prakash Kumar Jha',
    designation: 'Assistant Professor, Department of CSE | SOADU',
    role: 'Faculty Co-sponsor | SOA ACM Students Chapter',
    image: '/Images/f2.webp',
    quote: 'Research does not begin in laboratories, it begins in curious minds. The moment you start questioning how and why things work, you step into the world of discovery. As engineering students, your ideas today can become tomorrow’s breakthroughs.',
    accent: 'from-cyan-400 to-blue-500',
    borderColor: 'group-hover:border-cyan-400/50'
  },
];

/* ─────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────── */
const Faculty = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="faculty" className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#030712] overflow-hidden" ref={ref}>
      
      {/* ══════════════════════════════════════════════════════
          AMBIENT BACKGROUND ORBS & GRID
      ══════════════════════════════════════════════════════ */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.02]" />
        
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[10%] w-[20%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px]" 
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-gray-300 tracking-wide uppercase">Leadership</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
            Faculty <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Sponsors</span>
          </h2>
          
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The guiding forces behind our chapter, bridging the gap between academic rigor and student-led innovation.
          </p>
        </motion.div>

        {/* Faculty Cinematic Cards */}
        <div className="space-y-10 md:space-y-16">
          {facultyData.map((faculty, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className={`group relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:items-stretch gap-8 md:gap-12 p-8 md:p-10 lg:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.03] ${faculty.borderColor}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.2 }}
              >
                
                {/* ══════════════════════════════════════════════════════
                    LEFT: PORTRAIT CONTAINER
                ══════════════════════════════════════════════════════ */}
                <div className="relative shrink-0 flex items-center justify-center">
                  {/* Subtle Glow Behind Image */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${faculty.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl rounded-full`} />
                  
                  {/* Image Wrapper - Properly scaled for presence and readability */}
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl md:rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0f1e] z-10">
                    <ImageWithFallback
                      src={faculty.image}
                      alt={faculty.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Dark gradient at the bottom for sleekness */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#030712]/80 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* ══════════════════════════════════════════════════════
                    RIGHT: CONTENT & QUOTE
                ══════════════════════════════════════════════════════ */}
                <div className={`flex-1 flex flex-col justify-center text-center ${isEven ? 'md:text-left' : 'md:text-right'} relative z-10`}>
                  
                  {/* Name & Titles */}
                  <div className="mb-6 md:mb-8">
                    <h3 className={`text-3xl sm:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${faculty.accent}`}>
                      {faculty.name}
                    </h3>
                    <p className="text-white text-base md:text-lg font-medium tracking-tight mb-1">
                      {faculty.role}
                    </p>
                    <p className="text-gray-500 text-sm md:text-base uppercase tracking-widest font-semibold">
                      {faculty.designation}
                    </p>
                  </div>

                  {/* Integrated Quote Block */}
                  <div className={`relative ${isEven ? 'md:pl-8 md:border-l-2' : 'md:pr-8 md:border-r-2'} border-white/10 group-hover:border-blue-500/30 transition-colors duration-500`}>
                    <Quote className={`hidden md:block absolute top-0 ${isEven ? '-left-5' : '-right-5'} w-10 h-10 text-white/5`} />
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed italic">
                      "{faculty.quote}"
                    </p>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faculty;