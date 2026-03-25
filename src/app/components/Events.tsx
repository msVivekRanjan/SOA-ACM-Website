import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ExternalLink,
  Award,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getFeaturedEvent, getUpcomingEvents, getPastEvents } from '../../data/eventsData';

/* ─────────────────────────────────────────────
   Tiny reusable pill
───────────────────────────────────────────── */
const Pill = ({
  children,
  variant = 'blue',
}: {
  children: React.ReactNode;
  variant?: 'blue' | 'outline' | 'white' | 'amber';
}) => {
  const styles = {
    blue: 'bg-[var(--acm-blue)] text-white',
    outline: 'border border-[var(--acm-blue)]/40 text-[var(--acm-blue)] bg-[var(--acm-blue)]/8',
    white: 'bg-white/15 text-white backdrop-blur-sm border border-white/20',
    amber: 'bg-amber-400/15 text-amber-500 border border-amber-400/30',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

/* ─────────────────────────────────────────────
   Section heading with decorative rule
───────────────────────────────────────────── */
const SectionHeading = ({
  label,
  title,
  pulse = false,
}: {
  label: string;
  title: string;
  pulse?: boolean;
}) => (
  <div className="flex items-center gap-5 mb-12">
    <div className="flex items-center gap-3 shrink-0">
      {pulse ? (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--acm-blue)] opacity-70" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--acm-blue)]" />
        </span>
      ) : (
        <span className="h-3 w-3 rounded-full bg-[var(--acm-blue)]" />
      )}
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--acm-blue)]">
        {label}
      </span>
    </div>
    <div className="h-px flex-1 bg-gradient-to-r from-[var(--acm-blue)]/30 to-transparent" />
    <h3 className="text-2xl font-bold text-gray-900 shrink-0">{title}</h3>
  </div>
);

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
const Events = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const navigate = useNavigate();

  const featuredEvent = getFeaturedEvent();
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <section id="events" className="py-24 relative bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* ── Page header ──────────────────────────────────────── */}
        {/* <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--acm-blue)] mb-3">
            SOA ACM Student Chapter
          </p>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="text-6xl font-black text-gray-900 leading-none tracking-tight">
              Events &amp;<br />
              <span className="text-[var(--acm-blue)]">Programmes</span>
            </h2>
            <p className="text-gray-500 max-w-xs leading-relaxed text-sm">
              Knowledge sessions, workshops, and hands-on training curated by ACM to push
              the boundaries of what students can achieve.
            </p>
          </div>
          <div className="mt-8 h-px bg-gray-200" />
        </motion.div> */}

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-black mb-4">
            Our <span className="text-[var(--acm-blue)]">Events</span>
          </h2>
          <div className="w-24 h-1 bg-[var(--acm-blue)] mx-auto rounded-full mb-4" />
          <p className="text-xl text-black-400">Empowering students through engaging experiences</p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            FEATURED EVENT  —  Cinematic hero card
        ══════════════════════════════════════════════════════ */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <SectionHeading label="Highlight" title="Featured Event" />

          <div
            className="group relative rounded-3xl overflow-hidden cursor-pointer"
            style={{ background: '#0a0f1e' }}
            onClick={() => handleEventClick(featuredEvent.id)}
          >
            {/* Full-bleed background image */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="w-full h-full object-cover opacity-35 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e] via-[#0a0f1e]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/60 to-transparent" />
              {/* Ambient blue glow */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--acm-blue)]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative z-10 p-10 md:p-16 min-h-[420px] flex flex-col justify-between">
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex gap-2 flex-wrap">
                  <Pill variant="blue">
                    {featuredEvent.category || featuredEvent.type || 'Session'}
                  </Pill>
                  <Pill variant="white">{featuredEvent.mode}</Pill>
                </div>
                <div className="text-white/40 text-xs font-medium tracking-wider uppercase">
                  {featuredEvent.date}
                </div>
              </div>

              {/* Main content */}
              <div className="mt-auto pt-12">
                <h4 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 max-w-2xl">
                  {featuredEvent.title}
                </h4>
                <p className="text-white/60 text-base leading-relaxed max-w-xl mb-8">
                  {featuredEvent.description}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap gap-6 mb-10">
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <MapPin className="w-4 h-4 text-[var(--acm-blue)]" />
                    {featuredEvent.location}
                  </div>
                  {featuredEvent.participants && (
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Users className="w-4 h-4 text-[var(--acm-blue)]" />
                      {featuredEvent.participants} students participated
                    </div>
                  )}
                </div>

                {/* CTA */}
                {featuredEvent.status === 'upcoming' ? (
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--acm-blue)] text-white font-semibold rounded-xl hover:bg-[var(--acm-dark-blue)] transition-colors duration-200">
                    Register Now <ArrowUpRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-200">
                    View Event Details <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            UPCOMING EVENTS  —  Split accent card
        ══════════════════════════════════════════════════════ */}
        {upcomingEvents.length > 0 && (
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SectionHeading label="Coming Up" title="Upcoming Events" pulse />

            <div className="space-y-5">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div
                    className="group grid md:grid-cols-[1fr_2fr] rounded-2xl overflow-hidden border border-gray-200 hover:border-[var(--acm-blue)]/40 hover:shadow-xl hover:shadow-[var(--acm-blue)]/5 transition-all duration-300 cursor-pointer bg-white"
                    onClick={() => handleEventClick(event.id)}
                  >
                    {/* Left — Dark accent panel with large date typography */}
                    <div
                      className="relative min-h-[260px] md:min-h-0 overflow-hidden"
                      style={{ background: '#0a0f1e' }}
                    >
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-600"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--acm-blue)]/20 to-transparent" />

                      {/* Large typographic date */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                        <div className="text-[var(--acm-blue)] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                          Mark Your Calendar
                        </div>
                        <div className="text-white font-black leading-none">
                          <div className="text-6xl md:text-7xl">
                            {event.date.split(' ')[1]?.replace(',', '')}
                          </div>
                          <div className="text-lg font-semibold text-white/60 mt-1 tracking-widest uppercase">
                            {event.date.split(' ')[0]} {event.date.split(' ')[2]}
                          </div>
                        </div>
                        <div className="mt-5 flex items-center gap-2 text-white/40 text-sm">
                          <Clock className="w-3.5 h-3.5" />
                          {event.time}
                        </div>
                      </div>

                      {/* UPCOMING badge */}
                      <div className="absolute top-5 left-5">
                        <span className="flex items-center gap-2 px-3 py-1.5 bg-[var(--acm-blue)] text-white text-xs font-bold rounded-lg tracking-wide">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                          </span>
                          UPCOMING
                        </span>
                      </div>
                    </div>

                    {/* Right — Content panel */}
                    <div className="p-8 md:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2 mb-5">
                          <Pill variant="outline">{event.category}</Pill>
                          {event.certificates && (
                            <Pill variant="amber">
                              <Award className="w-3 h-3" /> Certificates
                            </Pill>
                          )}
                          <Pill variant="outline">{event.mode}</Pill>
                        </div>

                        <h4 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-3">
                          {event.title}
                        </h4>
                        <p className="text-gray-500 leading-relaxed text-sm mb-7">
                          {event.description}
                        </p>

                        <div className="space-y-2.5 mb-8">
                          <div className="flex items-center gap-3 text-gray-600 text-sm">
                            <MapPin className="w-4 h-4 text-[var(--acm-blue)] shrink-0" />
                            {event.location}
                          </div>
                          {event.speaker && (
                            <div className="flex items-center gap-3 text-gray-600 text-sm">
                              <Users className="w-4 h-4 text-[var(--acm-blue)] shrink-0" />
                              {event.speaker.name} · {event.speaker.designation}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-4 flex-wrap">
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--acm-blue)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--acm-dark-blue)] transition-colors duration-200"
                        >
                          Register Now <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event.id);
                          }}
                          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[var(--acm-blue)] font-medium transition-colors duration-200"
                        >
                          View Details <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════
            PAST EVENTS  —  Editorial archive rows
        ══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <SectionHeading label="Archive" title="Past Events" />

          <div className="grid gap-4">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.55 + index * 0.08 }}
              >
                <div
                  className="group grid md:grid-cols-[72px_180px_1fr_auto] items-stretch rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handleEventClick(event.id)}
                >
                  {/* Index number column */}
                  <div className="hidden md:flex items-center justify-center bg-gray-50 border-r border-gray-100 group-hover:bg-[var(--acm-blue)]/5 group-hover:border-[var(--acm-blue)]/15 transition-colors duration-300">
                    <span className="text-3xl font-black text-gray-200 group-hover:text-[var(--acm-blue)]/25 transition-colors duration-300 select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Image thumbnail */}
                  <div className="relative h-28 md:h-full overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    <span
                      className={`absolute bottom-3 left-3 px-2 py-0.5 rounded text-xs font-semibold ${event.mode === 'Online'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-orange-500 text-white'
                        }`}
                    >
                      {event.mode}
                    </span>
                  </div>

                  {/* Text content */}
                  <div className="p-5 md:p-7 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-[var(--acm-blue)] tracking-widest uppercase">
                        {event.category}
                      </span>
                      <span className="text-gray-300 text-xs">·</span>
                      <span className="text-xs text-gray-400">{event.date}</span>
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-gray-900 leading-snug mb-1.5 truncate">
                      {event.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                    {event.location && (
                      <div className="flex items-center gap-1.5 mt-3 text-gray-400 text-xs">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center w-14 border-l border-gray-100 group-hover:border-[var(--acm-blue)]/15 transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-[var(--acm-blue)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Events;