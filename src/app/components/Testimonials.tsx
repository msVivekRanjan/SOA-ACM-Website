import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { getTestimonials } from '../../data/eventsData';
import { ImageWithFallback } from './figma/ImageWithFallback';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const testimonials = getTestimonials();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.90,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
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
      }, 5000); // 5 seconds
      return () => clearInterval(timer);
    }
  }, [isHovered, paginate]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-1 bg-[var(--acm-blue)] mx-auto rounded-full mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-gray-500">See what authorities are saying.</p>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative flex items-center justify-center min-h-[400px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* Left Arrow */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 md:-left-8 z-10 w-12 h-12 flex items-center justify-center bg-[var(--acm-blue)] text-white rounded-full shadow-lg hover:bg-[var(--acm-dark-blue)] hover:scale-105 transition-all focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Content Area */}
          <div className="w-full max-w-5xl relative overflow-hidden px-4 md:px-12 h-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="w-full flex items-center gap-12 md:gap-16 relative"
              >
                {/* Left: Interactive Image with Blue Shapes (Smaller Size) */}
                <div className="hidden md:flex relative shrink-0 items-center justify-center w-40 h-40 md:w-56 md:h-56">
                  <motion.div
                    className="absolute w-[90%] h-[90%] bg-[var(--acm-blue)] rounded-full opacity-80"
                    initial={{ x: -10, y: -10 }}
                    animate={{ x: 0, y: 0 }}
                    transition={{ type: 'spring', delay: 0.4 }}
                  />
                  <motion.div
                    className="absolute w-[80%] h-[80%] bg-[#0085C3] rounded-full opacity-60 mix-blend-multiply"
                    initial={{ x: 10, y: 10 }}
                    animate={{ x: -5, y: -5 }}
                    transition={{ type: 'spring', delay: 0.4 }}
                  />
                  <ImageWithFallback
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-[85%] h-[85%] rounded-full object-cover relative z-10 border-4 border-white shadow-xl"
                  />
                </div>

                {/* Right: Text Content (Larger Size) */}
                <div className="flex-1 text-center md:text-left relative">
                  <Quote className="absolute -top-6 -left-8 w-16 h-16 text-[var(--acm-blue)] opacity-10 hidden md:block" />
                  <p className="text-2xl md:text-3xl lg:text-2.4xl text-gray-800 font-medium italic mb-10 leading-relaxed md:leading-snug">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                    {/* Fallback image for mobile layout */}
                    <div className="md:hidden w-16 h-16 shrink-0 relative">
                      <ImageWithFallback
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full rounded-full object-cover border-2 border-[var(--acm-blue)]/20 shadow-sm"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-[var(--acm-blue)] mb-1">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest font-semibold">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 md:-right-8 z-10 w-12 h-12 flex items-center justify-center bg-[var(--acm-blue)] text-white rounded-full shadow-lg hover:bg-[var(--acm-dark-blue)] hover:scale-105 transition-all focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {testimonials.map((_item: any, index: number) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 transition-all duration-300 rounded-full ${index === currentIndex
                ? 'w-8 bg-[var(--acm-blue)]'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
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
