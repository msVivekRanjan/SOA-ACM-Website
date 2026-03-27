import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  ExternalLink,
  Award,
  ArrowUpRight,
  Clock,
  Ticket,
  Sparkles
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getFeaturedEvent, getUpcomingEvents, getPastEvents } from '../../data/eventsData';

/* ─────────────────────────────────────────────
   Premium Glass Pills
───────────────────────────────────────────── */
const Pill = ({
  children,
  variant = 'gray',
}: {
  children: React.ReactNode;
  variant?: 'blue' | 'gray' | 'outline' | 'amber';
}) => {
  const styles = {
    blue: 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]',
    gray: 'bg-white/[0.05] border border-white/10 text-gray-300',
    outline: 'border border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase backdrop-blur-md ${styles[variant]}`}>
      {children}
    </span>
  );
};

/* ─────────────────────────────────────────────
   Apple-style Section Heading (Dark)
───────────────────────────────────────────── */
const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8 md:mb-12 flex flex-col items-start">
    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
      <Sparkles className="w-6 h-6 text-cyan-400" />
      {title}
    </h3>
    {subtitle && <p className="text-gray-400 mt-2 text-sm md:text-base">{subtitle}</p>}
  </div>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const Events = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const navigate = useNavigate();

  const featuredEvent = getFeaturedEvent();
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  
  // Show max 4 events initially to maintain a clean 2x2 grid on desktop
  const INITIAL_VISIBLE_COUNT = 4;
  const [showAll, setShowAll] = useState(false);
  const visiblePastEvents = showAll ? pastEvents : pastEvents.slice(0, INITIAL_VISIBLE_COUNT);

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <section id="events" className="px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative bg-[#030712] overflow-hidden" ref={ref}>
      
      {/* ══════════════════════════════════════════════════════
          AMBIENT BACKGROUND ORBS & GRID
      ══════════════════════════════════════════════════════ */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.02]" />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[150px]" 
        />
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[5%] w-[30%] h-[50%] rounded-full bg-cyan-600/10 blur-[150px]" 
        />
      </div>

      <div className="max-w-6xl mx-auto space-y-24 md:space-y-32 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6 backdrop-blur-md">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-gray-300 tracking-wide uppercase">The Arena</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">ACM</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover high-octane technical workshops, engaging seminars, and collaborative hackathons designed to elevate your skills.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            FEATURED EVENT — Glass Banner
        ══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div
            className="group relative flex flex-col md:flex-row bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl hover:bg-white/[0.04] transition-all duration-500"
            onClick={() => handleEventClick(featuredEvent.id)}
          >
            {/* Animated Hover Border */}
            <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] border-2 border-transparent group-hover:border-cyan-500/30 pointer-events-none transition-colors duration-500 z-20" />

            {/* Image Section */}
            <div className="relative h-64 md:h-auto md:w-2/5 overflow-hidden bg-[#0a0f1e]">
              <ImageWithFallback
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#030712] via-[#030712]/50 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="relative p-8 md:p-12 md:w-3/5 flex flex-col justify-center z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
                  Highlight Event
                </span>
              </div>
              
              <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {featuredEvent.title}
              </h4>
              <p className="text-gray-400 text-base md:text-lg line-clamp-2 md:line-clamp-3 mb-8 leading-relaxed">
                {featuredEvent.description}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                  </div>
                  {featuredEvent.date}
                </div>
                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 text-white text-sm font-semibold group-hover:bg-cyan-500 group-hover:text-[#030712] transition-all duration-300">
                  Read Story <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            UPCOMING EVENT — Premium Spotlight
        ══════════════════════════════════════════════════════ */}
        {upcomingEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionHeading title="Initiating Next" subtitle="Secure your spot in our upcoming protocols." />
            
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="group relative bg-white/[0.02] border border-cyan-500/30 backdrop-blur-xl rounded-[2rem] hover:bg-white/[0.04] shadow-[0_0_30px_rgba(34,211,238,0.05)] hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-500 overflow-hidden flex flex-col md:flex-row"
                >
                  {/* Subtle Background Accent */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                  {/* Date Block - Left Side */}
                  <div className="bg-[#0a0f1e]/80 md:w-56 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center justify-center text-center relative z-10">
                    <div className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
                      Upcoming
                    </div>
                    <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">
                      {event.date.split(' ')[1]?.replace(',', '')}
                    </div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                      {event.date.split(' ')[0]} {event.date.split(' ')[2]}
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-cyan-300 text-xs font-semibold bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full backdrop-blur-md">
                      <Clock className="w-3.5 h-3.5" />
                      {event.time}
                    </div>
                  </div>

                  {/* Content - Right Side */}
                  <div className="p-6 md:p-10 flex-1 flex flex-col justify-center relative z-10">
                    <div className="flex flex-wrap gap-3 mb-6">
                      <Pill variant="blue">{event.category}</Pill>
                      <Pill variant="outline">{event.mode}</Pill>
                      {event.certificates && (
                        <Pill variant="amber"><Award className="w-3.5 h-3.5" /> Certificates</Pill>
                      )}
                    </div>

                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {event.title}
                    </h4>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-2 text-gray-300 text-sm mb-8 font-medium">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      {event.location}
                    </div>

                    {/* Explicit Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <a
                        href={event.registrationLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                      >
                        <Ticket className="w-4 h-4" /> Register Now
                      </a>
                      <button
                        onClick={() => handleEventClick(event.id)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 border border-white/10 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════
            PAST EVENTS — Glass Grid Archive
        ══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SectionHeading title="Event Archive" subtitle="Explore our past sessions, workshops, and milestones." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {visiblePastEvents.map((event, index) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                className="group cursor-pointer bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-500 flex flex-col h-full backdrop-blur-xl"
              >
                {/* Image Area */}
                <div className="relative h-56 overflow-hidden bg-[#0a0f1e] p-1">
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90" />
                  </div>
                  
                  {/* Category Float */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 bg-[#030712]/60 backdrop-blur-md border border-white/10 text-cyan-300 text-[10px] font-bold uppercase tracking-widest rounded-lg">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {event.title}
                  </h4>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-8 flex-grow leading-relaxed">
                    {event.description}
                  </p>

                  {/* Explicit Click Affordance Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-auto">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold tracking-wide">
                      <Calendar className="w-4 h-4 text-cyan-500/50" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-cyan-400 text-sm font-bold opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                      View Recap <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* High-Visibility Action Button */}
{!showAll && pastEvents.length > INITIAL_VISIBLE_COUNT && (
  <div className="flex justify-center mt-16 md:mt-24 relative">
    {/* Ambient Glow behind the button */}
    <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <button
      onClick={() => setShowAll(true)}
      className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#0a0f1e] text-white font-bold rounded-2xl border border-white/10 transition-all duration-300 hover:scale-105 active:scale-95 w-full md:w-auto overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]"
    >
      {/* Animated Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-20 group-hover:opacity-100 transition-opacity duration-500 p-[1px] [mask-image:linear-gradient(white,white)_content-box,linear-gradient(white,white)]" />
      
      <span className="relative z-10 flex items-center gap-2 tracking-wide uppercase text-sm">
        Access Full Archive 
        <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
      </span>

      {/* Subtle Shine Sweep on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
    </button>
  </div>
)}
        </motion.div>

      </div>
    </section>
  );
};

export default Events;