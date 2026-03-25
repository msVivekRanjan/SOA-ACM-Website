import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code, Users, TrendingUp, Award } from 'lucide-react';

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const benefits = [
    {
      icon: Code,
      title: 'Skill Development',
      description:
        'Participate in technical workshops, hackathons, seminars, and research discussions to strengthen core computing and problem-solving skills.',
      color: 'var(--acm-blue)',
    },
    {
      icon: Users,
      title: 'Networking',
      description:
        'Connect with fellow students, faculty mentors, ACM members, and industry professionals through events, conferences, and collaborations.',
      color: 'var(--acm-orange)',
    },
    {
      icon: TrendingUp,
      title: 'Industry Exposure',
      description:
        'Gain exposure to real-world technologies and practices via ACM Distinguished Speaker sessions, and collaborative projects.',
      color: 'var(--acm-green)',
    },
    {
      icon: Award,
      title: 'Leadership Experience',
      description:
        'Take up organizational roles, lead initiatives, and contribute to chapter activities to build strong leadership and teamwork skills.',
      color: 'var(--acm-purple)',
    },
  ];

  return (
    <section id="benefits" className="px-4 sm:px-6 lg:px-8 py-24 bg-blue-90 relative overflow-hidden" ref={ref}>

      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--acm-blue)]/10 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-black mb-4">
            What You <span className="text-[var(--acm-blue)]">Gain</span>
          </h2>
          <div className="w-24 h-1 bg-[var(--acm-blue)] mx-auto rounded-full mb-4" />
          <p className="text-xl text-gray-600">By joining the ACM SOA Student Chapter</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="group relative bg-white/80 backdrop-blur rounded-2xl p-8 
              border border-gray-200 hover:border-transparent 
              hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] 
              transition-all duration-500 overflow-hidden"

              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
              }}

              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ y: -4 }}
            >
              {/* Background Glow Effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(600px circle at var(--x) var(--y), ${benefit.color}20, transparent 40%)`
                }}
              />

              {/* Icon */}
              <motion.div
                className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  backgroundColor: `${benefit.color}20`,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, -5, 0],
                }}
                whileTap={{
                  scale: 1.1,
                  rotate: [0, -5, 5, -5, 0],
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  rotate: {
                    duration: 0.5,
                    ease: 'easeInOut',
                  },
                }}
              >
                <benefit.icon className="w-10 h-10 relative z-10" style={{ color: benefit.color }} />

                {/* Animated Ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100"
                  style={{ borderColor: benefit.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              </motion.div>

              <h3 className="text-2xl font-semibold text-black mb-4 relative z-10">
                {benefit.title}
              </h3>

              <p className="text-gray-600 leading-relaxed relative z-10">
                {benefit.description}
              </p>

              {/* Decorative Line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 rounded-full"
                style={{ backgroundColor: benefit.color }}
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
              />

              {/* Corner Accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-5 transition-opacity duration-500 group-hover:opacity-10"
                style={{
                  background: `radial-gradient(circle at top right, ${benefit.color}, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join a community of over 350+ students who are learning, building, and growing together.
            Your journey to becoming a computing professional starts here.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
export default Benefits;