import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Users, Calendar, TrendingUp, Award } from 'lucide-react';

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const Impact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const stats = [
        {
            icon: Users,
            value: 350,
            suffix: '+',
            label: 'Active Members',
            description: 'Passionate students building the future of computing.',
            color: '#3b82f6', // acm-blue
            gradient: 'from-blue-400 to-blue-600'
        },
        {
            icon: Calendar,
            value: 12,
            suffix: '+',
            label: 'Major Events',
            description: 'High-impact technical workshops and hackathons.',
            color: '#f59e0b', // acm-orange/amber
            gradient: 'from-amber-400 to-amber-600'
        },
        {
            icon: TrendingUp,
            value: 10,
            suffix: '+',
            label: 'Years of Legacy',
            description: 'A decade of empowering tech enthusiasts.',
            color: '#10b981', // acm-green
            gradient: 'from-emerald-400 to-emerald-600'
        },
        {
            icon: Award,
            value: 5,
            suffix: '+',
            label: 'Collaborations',
            description: 'Partnering with industry leaders and communities.',
            color: '#8b5cf6', // acm-purple
            gradient: 'from-purple-400 to-purple-600'
        },
    ];

    return (
        <section id="impact" className="py-24 px-4 bg-[#030712] relative overflow-hidden" ref={ref}>
  {/* Ambient Space Glows */}
  <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
  <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Impact</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        We don't just host events; we cultivate an ecosystem. Here is the tangible difference our chapter has made in the computing community.
                    </p>
                </motion.div>

                {/* Engineered Grid Layout */}
                <motion.div 
                    className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-px overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
                        {stats.map((stat, index) => (
                            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
                            
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────────
   Individual Stat Card Component
───────────────────────────────────────────── */
interface StatCardProps {
    stat: {
        icon: React.ElementType;
        value: number;
        suffix: string;
        label: string;
        description: string;
        color: string;
        gradient: string;
    };
    index: number;
    isInView: boolean;
}

const StatCard = ({ stat, index, isInView }: StatCardProps) => {
    const [count, setCount] = useState(0);

    // Smooth counting physics using requestAnimationFrame
    useEffect(() => {
        if (!isInView) return;

        let startTime: number | null = null;
        const duration = 2000; // 2 seconds

        const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            
            // Ease-out expo function for natural deceleration
            const percentage = Math.min(progress / duration, 1);
            const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
            
            setCount(Math.floor(easeOut * stat.value));

            if (progress < duration) {
                requestAnimationFrame(animateCount);
            } else {
                setCount(stat.value); // Ensure it ends exactly on the value
            }
        };

        requestAnimationFrame(animateCount);
    }, [isInView, stat.value]);

    return (
        <div className="group relative bg-[#0a0f1e] p-8 lg:p-10 hover:bg-white/[0.02] transition-colors duration-500 flex flex-col items-center text-center">
            {/* Top Glow on Hover */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Icon Box */}
            <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/[0.03] border border-white/5 group-hover:scale-110 transition-transform duration-500"
            >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>

            {/* Value */}
            <div className="text-5xl md:text-6xl font-black mb-3 tracking-tighter text-white">
                {count}
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}>
                    {stat.suffix}
                </span>
            </div>

            {/* Labels */}
            <div className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-3">
                {stat.label}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                {stat.description}
            </p>
        </div>
    );
};

export default Impact;