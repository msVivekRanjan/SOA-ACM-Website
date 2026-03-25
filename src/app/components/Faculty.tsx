import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const facultyData = [
  {
    name: 'Dr. Anukampa Behera',
    designation: 'Associate Professor, Department of CSE | SOADU',
    role: 'Faculty Sponsor | SOA ACM Students Chapter',
    image:
      '/Images/f1.webp',
    quote:
      "Research is not reserved for a chosen few; it begins the moment a student learns to ask meaningful questions. As engineering undergraduates, you already stand at the edge of discovery. I encourage each of you to explore, experiment, and contribute because today’s curiosity becomes tomorrow’s innovation.",
  },
  {
    name: 'Mr. Prakash Kumar Jha',
    designation: 'Assistant Professor, Department of CSE | SOADU',
    role: 'Faculty Co-sponsor | SOA ACM Students Chapter',
    image:
      '/Images/f2.webp',
    quote:
      'Research does not begin in laboratories, it begins in curious minds. The moment you start questioning how and why things work, you step into the world of discovery. As engineering students, your ideas today can become tomorrow’s breakthroughs.',
  },
];

const Faculty = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faculty" className="px-4 sm:px-6 lg:px-8 py-24 bg-gray-50 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-black mb-4">
            Faculty <span className="text-[var(--acm-blue)]">Sponsors</span>
          </h2>
          <div className="w-24 h-1 bg-[var(--acm-blue)] mx-auto rounded-full" />
        </motion.div>

        {/* Faculty Cards */}
        <div className="space-y-16">
          {facultyData.map((faculty, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-12 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 group relative overflow-hidden`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                y: -8,
                boxShadow: '0 25px 50px -12px rgba(0, 133, 195, 0.25)',
              }}
              whileTap={{
                scale: 0.98,
                boxShadow: '0 25px 50px -12px rgba(0, 133, 195, 0.25)',
              }}
            >
              {/* Animated Background Gradient on Hover/Active */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(0, 133, 195, 0.05), transparent 70%)',
                }}
              />

              {/* Decorative Corner Accent */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(0, 133, 195, 0.1), transparent 70%)',
                }}
              />

              {/* Image */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                whileTap={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              >
                {/* Animated Background Rotate */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[var(--acm-blue)] to-[var(--acm-dark-blue)] rounded-2xl"
                  initial={{ rotate: 3 }}
                  whileHover={{
                    rotate: index % 2 === 0 ? 6 : -6,
                    scale: 1.05,
                  }}
                  whileTap={{
                    rotate: index % 2 === 0 ? 6 : -6,
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Image Container with Hover Effect */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                  <ImageWithFallback
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-active:scale-110"
                  />

                  {/* Overlay on Hover/Active */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[var(--acm-blue)]/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                className="flex-1 relative z-10"
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.h3
                  className="text-3xl font-bold text-black mb-2 transition-colors duration-300 group-hover:text-[var(--acm-blue)] group-active:text-[var(--acm-blue)]"
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 5 }}
                >
                  {faculty.name}
                </motion.h3>
                <motion.p
                  className="text-xl text-[var(--acm-blue)] mb-4"
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 5 }}
                >
                  {faculty.designation}
                </motion.p>
                <motion.p
                  className="text-gray-600 mb-8"
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 5 }}
                >
                  {faculty.role}
                </motion.p>

                {/* Quote */}
                <motion.div
                  className="relative bg-gradient-to-br from-[var(--acm-blue)]/5 to-transparent rounded-2xl p-6 border-l-4 border-[var(--acm-blue)] overflow-hidden"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(0, 133, 195, 0.08)',
                  }}
                  whileTap={{
                    scale: 1.02,
                    backgroundColor: 'rgba(0, 133, 195, 0.08)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated Quote Icon */}
                  <motion.div
                    initial={{ opacity: 0.2, rotate: 0 }}
                    whileHover={{ opacity: 0.3, rotate: 10, scale: 1.2 }}
                    whileTap={{ opacity: 0.3, rotate: 10, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Quote className="w-10 h-10 text-[var(--acm-blue)] absolute top-4 right-4" />
                  </motion.div>

                  {/* Shine Effect on Hover/Tap */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-active:opacity-20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    whileTap={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />

                  <p className="text-lg text-gray-700 italic leading-relaxed relative z-10">
                    "{faculty.quote}"
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faculty;