import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { getTestimonials } from '../../data/eventsData';
import { ImageWithFallback } from './figma/ImageWithFallback';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const testimonials = getTestimonials();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  }, [testimonials.length]);

  // Auto-play effect
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        paginate(1);
      }, 6000); 
      return () => clearInterval(timer);
    }
  }, [isHovered, paginate]);

  if (!testimonials || testimonials.length === 0) return null;

  // Calculates where each card should sit relative to the active index
  const getPosition = (index: number) => {
    const total = testimonials.length;
    if (index === currentIndex) return 'center';
    if (index === (currentIndex - 1 + total) % total) return 'left';
    if (index === (currentIndex + 1) % total) return 'right';
    return 'hidden';
  };

  // 3D Slider Physics
  const slideVariants = {
    center: { x: "0%", scale: 1, opacity: 1, zIndex: 30, filter: "blur(0px)" },
    left: { x: "-75%", scale: 0.85, opacity: 0.35, zIndex: 20, filter: "blur(2px)" },
    right: { x: "75%", scale: 0.85, opacity: 0.35, zIndex: 20, filter: "blur(2px)" },
    hidden: { x: "0%", scale: 0.6, opacity: 0, zIndex: 0, filter: "blur(10px)" }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-[#030712] relative overflow-hidden" ref={ref}>
      
      {/* ══════════════════════════════════════════════════════
          AMBIENT BACKGROUND ORBS
      ══════════════════════════════════════════════════════ */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[10%] w-[30%] h-[50%] rounded-full bg-cyan-600/10 blur-[120px]" 
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-gray-300 tracking-wide uppercase">Community Voices</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Words from our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Mentors</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Insights and reflections from the leaders and seniors who guide our chapter.
          </p>
        </motion.div>

        {/* 3D Carousel Container */}
        <div
          className="relative w-full flex items-center justify-center min-h-[450px] md:min-h-[500px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Glass Left Arrow - Positioned over the side cards */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 md:left-8 z-40 w-12 h-12 flex items-center justify-center bg-white/[0.05] border border-white/10 text-white rounded-full backdrop-blur-xl hover:bg-white/[0.15] hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 focus:outline-none hidden sm:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main 3D Track Area */}
          <div className="w-full relative overflow-visible h-full flex items-center justify-center">
            {testimonials.map((testi: any, index: number) => {
              const position = getPosition(index);
              const isCenter = position === 'center';

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={position}
                  variants={slideVariants}
                  transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                  // Sizing: Ensures cards are not too massive. w-[85%] for mobile, max-w-3xl for desktop limits the size cleanly.
                  className={`absolute w-[85%] md:w-[65%] lg:w-[55%] max-w-3xl ${
                    isCenter ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                  }`}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (!isCenter) return;
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) paginate(1);
                    else if (swipe > swipeConfidenceThreshold) paginate(-1);
                  }}
                  onClick={() => {
                    // Allows users to click the side cards to bring them to the center
                    if (position === 'left') paginate(-1);
                    if (position === 'right') paginate(1);
                  }}
                >
                  {/* The Glass Slab */}
                  <div className="relative bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2rem] p-6 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-2xl h-full">
                    
                    {/* Huge Ambient Quote Icon */}
                    <Quote className="absolute top-4 left-4 md:top-8 md:left-8 w-20 h-20 text-white/[0.04] rotate-180 pointer-events-none" />

                    {/* Left: Holographic Image Container */}
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full blur-xl opacity-40 animate-pulse" />
                      <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full p-1 bg-gradient-to-tr from-blue-500/50 to-cyan-400/50">
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#030712] bg-[#030712]">
                          <ImageWithFallback
                            src={testi.image}
                            alt={testi.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="flex-1 text-center md:text-left relative z-10">
                      <p className="text-lg md:text-xl lg:text-2xl text-gray-200 font-medium leading-relaxed mb-6">
                        "{testi.quote}"
                      </p>
                      
                      <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-1">
                          {testi.name}
                        </h4>
                        <p className="text-xs md:text-sm text-blue-400 uppercase tracking-widest font-semibold">
                          {testi.role}
                        </p>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Glass Right Arrow */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-2 md:right-8 z-40 w-12 h-12 flex items-center justify-center bg-white/[0.05] border border-white/10 text-white rounded-full backdrop-blur-xl hover:bg-white/[0.15] hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 focus:outline-none hidden sm:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Cyberpunk Pagination Dots */}
        <div className="flex justify-center items-center gap-3 mt-10 md:mt-16 relative z-40">
          {testimonials.map((_item: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                index === currentIndex
                  ? 'w-10 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                  : 'w-3 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;