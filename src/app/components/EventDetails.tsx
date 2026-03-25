import { motion } from 'motion/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Video, MapPinOff, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getEventById } from '../../data/eventsData';
import { useState, useEffect } from 'react';

const EventDetails = () => {

  const eventTitle = 'ACM SOA Tech Talk 2025';
  const eventDescription =
    'Join us for an exciting tech session organized by ACM SOA Student Chapter!';
  const eventUrl = window.location.href;



  const { id } = useParams();
  const navigate = useNavigate();
  const event = getEventById(id as string);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
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

      if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle invalid event ID
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-bold text-black mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Event not found</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--acm-blue)] text-white rounded-lg hover:bg-[var(--acm-dark-blue)] transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[var(--acm-blue)] hover:text-[var(--acm-dark-blue)] transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </button>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="relative h-96 rounded-3xl overflow-hidden mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-1.5 bg-[var(--acm-blue)] text-white rounded-full text-sm">
                {event.type || event.category}
              </span>
              <span
                className={`px-4 py-1.5 rounded-full text-sm ${event.mode === 'Online'
                  ? 'bg-[var(--acm-green)] text-white'
                  : event.mode === 'Hybrid'
                    ? 'bg-[var(--acm-purple)] text-white'
                    : 'bg-[var(--acm-orange)] text-white'
                  }`}
              >
                {event.mode}
              </span>
              <span className="px-4 py-1.5 bg-white/90 text-black rounded-full text-sm capitalize">
                {event.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{event.title}</h1>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Event Details Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-[var(--acm-blue)]" />
                  <h3 className="font-semibold text-gray-900">Date</h3>
                </div>
                <p className="text-gray-600">{event.date}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-[var(--acm-blue)]" />
                  <h3 className="font-semibold text-gray-900">Time</h3>
                </div>
                <p className="text-gray-600">{event.time}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  {event.mode === 'Online' ? (
                    <Video className="w-5 h-5 text-[var(--acm-blue)]" />
                  ) : event.mode === 'Hybrid' ? (
                    <MapPin className="w-5 h-5 text-[var(--acm-blue)]" />
                  ) : (
                    <MapPinOff className="w-5 h-5 text-[var(--acm-blue)]" />
                  )}
                  <h3 className="font-semibold text-gray-900">Location</h3>
                </div>
                <p className="text-gray-600">{event.location}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-[var(--acm-blue)]" />
                  <h3 className="font-semibold text-gray-900">Participants</h3>
                </div>
                <p className="text-gray-600">{event.participants}</p>
              </div>
            </div>

            {/* About Event */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-black mb-4">About this Event</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {event.fullDescription}
              </p>
            </div>

            {/* Speaker / Speakers Section */}
            {(() => {
              const speakers = event.speakers
                ? event.speakers
                : event.speaker
                  ? [event.speaker]
                  : [];

              if (speakers.length === 0) return null;

              const isSingleSpeaker = speakers.length === 1;

              return (
                <motion.div
                  className="bg-gradient-to-br from-[var(--acm-blue)]/5 to-transparent rounded-2xl p-8 border border-[var(--acm-blue)]/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-black mb-8">
                    {isSingleSpeaker ? 'Speaker' : 'Speakers'}
                  </h2>

                  <div
                    className={`grid gap-8 ${isSingleSpeaker ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                      }`}
                  >
                    {speakers.map((speaker, index) => (
                      <motion.div
                        key={index}
                        className={`flex gap-6 items-start ${isSingleSpeaker ? 'max-w-4xl' : ''
                          }`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Speaker Image */}
                        <motion.div
                          className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ImageWithFallback
                            src={speaker.photo}
                            alt={speaker.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>

                        {/* Speaker Info */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-black mb-1">
                            {speaker.name}
                          </h3>
                          <p className="text-[var(--acm-blue)] mb-3">
                            {speaker.designation}
                          </p>
                          <p className="text-gray-600 leading-relaxed">
                            {speaker.bio}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })()}

            {/* Photo Gallery */}
            {event.gallery && event.gallery.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-black mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.gallery.map((photo, index) => (
                    <motion.div
                      key={index}
                      className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 1.05 }}
                      onClick={() => openLightbox(index)}
                    >
                      <ImageWithFallback
                        src={photo}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

           {/* Sidebar */}
          <motion.div
            className="sticky top-24 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >

            {/* Blue CTA Card */}
            <div className="bg-gradient-to-br from-[var(--acm-blue)] to-[var(--acm-dark-blue)] rounded-2xl p-8 text-white shadow-2xl">

              <h3 className="text-2xl font-bold mb-4">
                {event.status === 'upcoming' ? 'Register Now' : 'Event Concluded'}
              </h3>

              {event.status === 'upcoming' ? (
                <>
                  <p className="mb-6 text-white/90">
                    Don't miss this amazing opportunity to learn and grow!
                  </p>

                  <a
                    href="https://forms.gle/WQAiPjrhnEgzTQXy7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      className="w-full py-3 bg-white text-[var(--acm-blue)] rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Register Now
                    </motion.button>
                  </a>
                </>
              ) : (
                <p className="text-white/90">
                  This event has concluded. Stay tuned for more upcoming events!
                </p>
              )}

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-white/80">
                  Questions? Contact us at
                  <br />
                  <a
                    href="mailto:iteracm@gmail.com"
                    className="text-white underline hover:no-underline"
                  >
                    iteracm@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* ✅ Download Button BELOW blue card but still sticky */}
            {event.document && (
              <a
                href={event.document}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center py-6 bg-[var(--acm-blue)]/10 text-[var(--acm-blue)] rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300 mt-4"
              >
                Download Hangout 📜
              </a>
            )}

            {/* Share Card */}
            {/* <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-black mb-4">Share this Event</h3>
              <div className="flex gap-3">
                <motion.button
                  className="flex-1 py-2 bg-[var(--acm-blue)]/10 text-[var(--acm-blue)] rounded-lg hover:bg-[var(--acm-blue)]/20 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  LinkedIn
                </motion.button>
                <motion.button
                  className="flex-1 py-2 bg-[var(--acm-blue)]/10 text-[var(--acm-blue)] rounded-lg hover:bg-[var(--acm-blue)]/20 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Instagram
                </motion.button>
              </div>
            </div> */}
          </motion.div>
        </div>
      </div>



      {/* Lightbox */}
      {selectedImageIndex !== null && event.gallery && (
        <motion.div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <motion.button
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-300"
            onClick={closeLightbox}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>

          {/* Image Counter */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <p className="text-white text-sm">
              {selectedImageIndex + 1} / {event.gallery.length}
            </p>
          </div>

          {/* Main Image */}
          <motion.div
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ImageWithFallback
              src={event.gallery[selectedImageIndex]}
              alt={`Gallery ${selectedImageIndex + 1}`}
              className="w-full h-full object-contain rounded-2xl"
            />
          </motion.div>

          {/* Navigation Buttons */}
          <motion.button
            className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </motion.button>

          <motion.button
            className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </motion.button>

          {/* Keyboard Hint */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded">←</kbd>
              <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd>
              Close
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EventDetails;