import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Users, Clock, ArrowLeft, Video, 
  MapPinOff, X, ChevronLeft, ChevronRight, Sparkles, Download, Ticket
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getEventById } from '../../data/eventsData';
import { useState, useEffect } from 'react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = getEventById(id as string);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset'; 
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null || !event?.gallery) return;
    if (direction === 'prev') {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? event.gallery.length - 1 : selectedImageIndex - 1
      );
    } else {
      setSelectedImageIndex(
        selectedImageIndex === event.gallery.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowLeft') navigateImage('prev');
      else if (e.key === 'ArrowRight') navigateImage('next');
      else if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // ══════════════════════════════════════════════════════
  // 404 STATE (Dark Mode)
  // ══════════════════════════════════════════════════════
  if (!event) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-cyan-400 mb-4 opacity-20">404</h1>
          <p className="text-2xl text-gray-300 mb-8 font-semibold">Event classification not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" /> Return to Database
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030712] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* ══════════════════════════════════════════════════════
          AMBIENT BACKGROUND
      ══════════════════════════════════════════════════════ */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.02]" />
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[150px]" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[150px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 font-medium transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Arena
          </button>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            HERO BANNER
        ══════════════════════════════════════════════════════ */}
        <motion.div
          className="relative h-[250px] md:h-[350px] lg:h-[400px] rounded-[2rem] overflow-hidden mb-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
          
          <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 right-6 md:right-12">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                {event.type || event.category}
              </span>
              <span className={`px-4 py-1.5 border rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                  event.mode === 'Online' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' : 
                  event.mode === 'Hybrid' ? 'bg-purple-500/20 border-purple-500/30 text-purple-300' : 
                  'bg-orange-500/20 border-orange-500/30 text-orange-300'
                }`}
              >
                {event.mode}
              </span>
              <span className={`px-4 py-1.5 border rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                  event.status === 'upcoming' ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300' : 'bg-gray-500/20 border-gray-500/30 text-gray-300'
                }`}
              >
                {event.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
              {event.title}
            </h1>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* ══════════════════════════════════════════════════════
              MAIN CONTENT COLUMN
          ══════════════════════════════════════════════════════ */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Liquid Glass Detail Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Calendar, title: "Date", value: event.date },
                { icon: Clock, title: "Time", value: event.time },
                { icon: event.mode === 'Online' ? Video : event.mode === 'Hybrid' ? MapPin : MapPinOff, title: "Location", value: event.location },
                { icon: Users, title: "Capacity", value: event.participants }
              ].map((detail, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <detail.icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-200 uppercase tracking-widest text-xs">{detail.title}</h3>
                  </div>
                  <p className="text-gray-400 font-medium text-sm md:text-base">{detail.value}</p>
                </div>
              ))}
            </div>

            {/* About Event */}
            <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" /> Executive Summary
              </h2>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line text-base md:text-lg">
                {event.fullDescription}
              </p>
            </div>

            {/* Holographic Speaker Section */}
            {(() => {
              const speakers = event.speakers ? event.speakers : event.speaker ? [event.speaker] : [];
              if (speakers.length === 0) return null;
              const isSingleSpeaker = speakers.length === 1;

              return (
                <motion.div
                  className="bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20 backdrop-blur-xl rounded-[2rem] p-8 md:p-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-8">
                    {isSingleSpeaker ? 'Keynote Speaker' : 'Speakers Panel'}
                  </h2>

                  <div className={`grid gap-8 ${isSingleSpeaker ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                    {speakers.map((speaker, index) => (
                      <div key={index} className={`flex flex-col sm:flex-row gap-6 items-start group ${isSingleSpeaker ? 'max-w-4xl' : ''}`}>
                        
                        {/* Glowing Avatar */}
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-blue-500/40 to-cyan-400/40">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#030712] bg-[#030712]">
                              <ImageWithFallback src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 mt-2">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                            {speaker.name}
                          </h3>
                          <p className="text-cyan-400 text-sm font-semibold tracking-wide mb-3 uppercase">
                            {speaker.designation}
                          </p>
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
                            {speaker.bio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })()}

            {/* Photo Gallery Grid */}
            {event.gallery && event.gallery.length > 0 && (
              <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-8">Event Archive</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.gallery.map((photo, index) => (
                    <motion.div
                      key={index}
                      className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer border border-white/5 bg-[#0a0f1e]"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      onClick={() => openLightbox(index)}
                    >
                      <ImageWithFallback
                        src={photo}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-xl transition-colors duration-300 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* ══════════════════════════════════════════════════════
              SIDEBAR & CTA
          ══════════════════════════════════════════════════════ */}
          <motion.div
            className="lg:sticky lg:top-28 space-y-6 self-start"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Main Action Card */}
            <div className="relative bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden group">
              
              {/* Dynamic Glow Based on Status */}
              <div className={`absolute inset-0 opacity-20 blur-2xl transition-opacity duration-500 ${event.status === 'upcoming' ? 'bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:opacity-40' : 'bg-gray-700'}`} />

              <div className="relative z-10">
                {event.status === 'upcoming' ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                      </span>
                      <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Registrations Open</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-3">Secure Your Spot</h3>
                    <p className="mb-8 text-gray-400 text-sm leading-relaxed">
                      Capacity is limited. Initialize your registration protocol to guarantee entry.
                    </p>

                    <a href={event.registrationLink || "https://forms.gle/WQAiPjrhnEgzTQXy7"} target="_blank" rel="noopener noreferrer" className="block w-full">
                      <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                        <Ticket className="w-5 h-5" /> Initialize Registration
                      </button>
                    </a>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-3">Protocol Concluded</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      This event has successfully finished. Access the archive or download resources below.
                    </p>
                  </>
                )}

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Direct Comms</p>
                  <a href="mailto:iteracm@gmail.com" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">
                    iteracm@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Document Download Card */}
            {event.document && (
              <a
                href={event.document}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-5 bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 rounded-[1.5rem] font-semibold hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-md group"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
                Download Hangout 📜
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          LIGHTBOX MODAL (Gallery)
      ══════════════════════════════════════════════════════ */}
      {selectedImageIndex !== null && event.gallery && (
        <motion.div
          className="fixed inset-0 bg-[#030712]/95 backdrop-blur-xl flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Counter */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-widest">
            {selectedImageIndex + 1} / {event.gallery.length}
          </div>

          {/* Main Image */}
          <motion.div
            className="relative max-w-6xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <ImageWithFallback
              src={event.gallery[selectedImageIndex]}
              alt={`Gallery ${selectedImageIndex + 1}`}
              className="w-full h-full object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            />
          </motion.div>

          {/* Navigation */}
          <button
            className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-x-2"
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
          <button
            className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 hover:translate-x-2"
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Keyboard Hints */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6 text-gray-500 text-xs font-semibold tracking-wider uppercase hidden sm:flex">
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md">←</kbd>
              <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md">→</kbd> Navigate
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md">Esc</kbd> Close
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EventDetails;