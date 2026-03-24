import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Users, Calendar, TrendingUp, Award } from 'lucide-react';

const Impact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    {
      icon: Users,
      value: 350,
      suffix: '+',
      label: 'Active Members',
      color: 'var(--acm-blue)',
    },
    {
      icon: Calendar,
      value: 12,
      suffix: '+',
      label: 'Events Conducted',
      color: 'var(--acm-orange)',
    },
    {
      icon: TrendingUp,
      value: 10,
      suffix: '+',
      label: 'Years Active',
      color: 'var(--acm-green)',
    },
    {
      icon: Award,
      value: 5,
      suffix: '+',
      label: 'Collaborations',
      color: 'var(--acm-purple)',
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black via-[#050505] to-black relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--acm-blue) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Our <span className="text-[var(--acm-blue)]">Impact</span>
          </h2>
          <div className="w-24 h-1 bg-[var(--acm-blue)] mx-auto rounded-full mb-4" />
          <p className="text-xl text-gray-400">Making a difference in the computing community</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  stat: {
    icon: React.ElementType;
    value: number;
    suffix: string;
    label: string;
    color: string;
  };
  index: number;
  isInView: boolean;
}

const StatCard = ({ stat, index, isInView }: StatCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCount(Math.min(Math.floor(increment * currentStep), stat.value));
        } else {
          clearInterval(timer);
          setCount(stat.value);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-2 text-center"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${stat.color}20, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <motion.div
        className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto"
        style={{
          backgroundColor: `${stat.color}20`,
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
      </motion.div>

      {/* Counter */}
      <div className="relative">
        <div className="text-5xl font-bold text-white mb-2">
          {count}
          <span style={{ color: stat.color }}>{stat.suffix}</span>
        </div>
        <div className="text-gray-400">{stat.label}</div>
      </div>

      {/* Decorative Corner */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-5 transition-opacity duration-300 group-hover:opacity-10 rounded-2xl"
        style={{
          background: `radial-gradient(circle at top right, ${stat.color}, transparent)`,
        }}
      />
    </motion.div>
  );
};

export default Impact;