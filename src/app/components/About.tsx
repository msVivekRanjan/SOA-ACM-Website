import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Target, Lightbulb, Code } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const cards = [
    {
      icon: Target,
      title: 'Our Mission',
      description:
        'To advance computing as a science and profession by nurturing technical excellence, research curiosity, and innovation among students.',
      color: 'var(--acm-blue)',
    },
    {
      icon: Lightbulb,
      title: 'Our Vision',
      description:
        'To build a vibrant community of future computing professionals driving technological progress, collaboration, and positive societal impact.',
      color: 'var(--acm-orange)',
    },
    {
      icon: Code,
      title: 'What We Do',
      description:
        'We organize seminars, hackathons, workshops, research discussions, and industry-academia events to support learning and career growth.',
      color: 'var(--acm-green)',
    },
  ];

  return (
    <section id="about" className="px-4 sm:px-6 lg:px-8 py-24 bg-white relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-black mb-4">
            About <span className="text-[var(--acm-blue)]">@SOA </span>ACM
          </h2>
          <div className="w-24 h-1 bg-[var(--acm-blue)] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-[var(--acm-blue)] transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Icon Container */}
              <motion.div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden"
                style={{
                  backgroundColor: `${card.color}15`,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <card.icon
                  className="w-8 h-8 relative z-10"
                  style={{ color: card.color }}
                />
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}30, ${card.color}10)`,
                  }}
                />
              </motion.div>

              <h3 className="text-2xl font-semibold text-black mb-4">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{card.description}</p>

              {/* Decorative Corner */}
              <div
                className="absolute top-0 right-0 w-20 h-20 opacity-5 transition-opacity duration-300 group-hover:opacity-10"
                style={{
                  background: `radial-gradient(circle at top right, ${card.color}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;