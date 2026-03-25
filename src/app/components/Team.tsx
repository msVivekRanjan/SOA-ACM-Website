import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Linkedin, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // const seniorAdvisors = [
  //   {
  //     name: 'Debajyoti Bhakta',
  //     role: 'Chairman',
  //     batch: 'Class of 2023',
  //     currentRole: 'Software Engineer @ Google',
  //     image:
  //       'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjY1OTQ3MTZ8MA&ixlib=rb-4.1.0&q=80&w=400',
  //     linkedin: '#',
  //   },
  //   {
  //     name: 'Priya Mehta',
  //     role: 'Senior Advisor',
  //     batch: 'Class of 2023',
  //     currentRole: 'Product Manager @ Microsoft',
  //     image:
  //       'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  //     linkedin: '#',
  //   },
  //   {
  //     name: 'Karthik Reddy',
  //     role: 'Senior Advisor',
  //     batch: 'Class of 2022',
  //     currentRole: 'Tech Lead @ Amazon',
  //     image:
  //       'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  //     linkedin: '#',
  //   },
  // ];

  const coreTeam = [
    {
      name: 'Debajyoti Bhakta',
      role: 'Chair',
      image:
        '/Images/1.webp',
      linkedin: 'https://www.linkedin.com/in/debajyoti-bhakta/',
    },
    {
      name: 'Anshuman Barik',
      role: 'Vice Chair',
      image:
        '/Images/2.webp',
      linkedin: 'https://www.linkedin.com/in/anshuman-barik',
    },
    {
      name: 'Ariba Shakil',
      role: 'Secretary',
      image:
        '/Images/3.webp',
      linkedin: 'https://www.linkedin.com/in/ariba-shakil-b19a89314/',
    },
    {
      name: 'Guru Prasad Panda',
      role: 'Treasurer',
      image:
        '/Images/4.webp',
      linkedin: 'https://www.linkedin.com/in/guruprasadpanda/',
    },
    {
      name: 'Vivek Ranjan Sahoo',
      role: 'Webmaster',
      image:
        '/Images/7.webp',
      linkedin: 'https://www.linkedin.com/in/vivekranjansahoo7/',
    },
    {
      name: 'Biswajit Baral',
      role: 'Research & Innovation Team',
      image:
        '/Images/5.webp',
      linkedin: 'https://www.linkedin.com/in/biswajit-baral-540991367/',
    },
    {
      name: 'Sallouni Mandal',
      role: 'Research & Innovation Team',
      image:
        '/Images/10.webp',
      linkedin: 'https://www.linkedin.com/in/sallouni-mandal-3812532b7/',
    },
    {
      name: 'Soumyasri Mohapatra',
      role: 'Technical Team',
      image:
        '/Images/9.webp',
      linkedin: 'https://www.linkedin.com/in/soumyasri-mohapatra-99211625b',
    },
    {
      name: 'Pratyush Sahoo',
      role: 'Technical Team',
      image:
        '/Images/12.webp',
      linkedin: 'https://www.linkedin.com/in/pratyush-s-926984276/',
    },
    {
      name: 'Sanat Sinha',
      role: 'Technical Team',
      image:
        '/Images/16.webp',
      linkedin: 'https://www.linkedin.com/in/sanatsinhaa/',
    },
    {
      name: 'Rohan Kumar Sahoo',
      role: 'Event & Operations Team',
      image:
        '/Images/13.webp',
      linkedin: 'https://www.linkedin.com/in/rohankumarsahoo',
    },
    {
      name: 'Aditya Priyadarshan',
      role: 'Event & Operations Team',
      image:
        '/Images/6.webp',
      linkedin: 'https://www.linkedin.com/in/aditya-priyadarshan-b1ba9126b/',
    },
    {
      name: 'Nayanika Debnath',
      role: 'Design & Media Team',
      image:
        '/Images/8.webp',
      linkedin: 'http://www.linkedin.com/in/nayanika-debnath-164633315',
    },
    {
      name: 'Ishan Sinha',
      role: 'Design & Media Team',
      image:
        '/Images/11.webp',
      linkedin: 'https://github.com/IshanDevz',
    },
    {
      name: 'Raj Sahasransu Biswal',
      role: 'Public Relations Team',
      image:
        '/Images/14.webp',
      linkedin: 'https://www.linkedin.com/in/raj-sahasransu-biswal/',
    },
    {
      name: 'Ayush Ranjan Pradhan',
      role: 'Public Relations Team',
      image:
        '/Images/15.webp',
      linkedin: 'https://www.linkedin.com/in/ayush-ranjan-pradhan-008468309/',
    },



  ];

  return (
    <section id="team" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--acm-blue)] mb-3">
            SOA ACM Student Chapter
          </p>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="text-6xl font-black text-gray-900 leading-none tracking-tight">
              Meet the<br />
              <span className="text-[var(--acm-blue)]">Team</span>
            </h2>
            <p className="text-gray-500 max-w-xs leading-relaxed text-sm">
              Passionate students driving innovation, research, and excellence across computing.
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
            Meet Our <span className="text-[var(--acm-blue)]">Team</span>
          </h2>
          <div className="w-24 h-1 bg-[var(--acm-blue)] mx-auto rounded-full mb-4" />
          <p className="text-xl text-black-400">Passionate students driving innovation and excellence</p>
        </motion.div>



        {/* Core Team */}
        <div className="mb-16">
          <motion.div
            className="flex items-center gap-5 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 shrink-0">
              <span className="h-3 w-3 rounded-full bg-[var(--acm-blue)]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--acm-blue)]">
                Members
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--acm-blue)]/30 to-transparent" />
            <h3 className="text-2xl font-bold text-gray-900 shrink-0">Core Team</h3>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {coreTeam.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* Senior Advisors */}
        {/* <div className="mb-16">
          <motion.h3
            className="text-3xl font-semibold text-black mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[var(--acm-blue)]">●</span>
            Senior Advisors
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seniorAdvisors.map((advisor, index) => (
              <AdvisorCard key={advisor.name} advisor={advisor} index={index} isInView={isInView} />
            ))}
          </div>
        </div> */}

        {/* Join CTA */}
        <motion.div
          className="text-center mt-16 p-12 rounded-3xl border border-[var(--acm-blue)]/20 
                    bg-gradient-to-br from-white via-[var(--acm-blue)]/5 to-[var(--acm-blue)]/10
                    shadow-lg shadow-[var(--acm-blue)]/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
            Want to Join Our Team?
          </h3>

          <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            We’re currently not recruiting core members. Stay tuned for future opportunities
            and upcoming recruitment drives.
          </p>

          <button
            disabled
            className="px-8 py-3 rounded-lg cursor-not-allowed
                      bg-gradient-to-r from-gray-200 to-gray-300
                      text-gray-500 font-medium
                      border border-gray-300
                      shadow-inner"
          >
            Recruitment Currently Closed
          </button>
        </motion.div>

      </div>
    </section>
  );
};

interface TeamCardProps {
  member: {
    name: string;
    role: string;
    image: string;
    linkedin: string;
    batch?: string;
    currentRole?: string;
  };
  index: number;
  isInView: boolean;
}

const TeamCard = ({ member, index, isInView }: TeamCardProps) => {
  return (
    <motion.div
      className="group relative h-full flex"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
    >
      <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col">
        {/* Image Container - Fixed Aspect Ratio */}
        <div className="relative aspect-[4/5] w-full overflow-hidden shrink-0">
          <ImageWithFallback
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* LinkedIn Icon */}
          <motion.a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--acm-blue)]" />
          </motion.a>
        </div>

        {/* Info Box - Flexible Height */}
        <div className="p-4 sm:p-5 relative flex-1 flex flex-col justify-center bg-white z-10">
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight">{member.name}</h4>
          <p className="text-sm font-semibold text-[var(--acm-blue)]">{member.role}</p>

          {/* Animated Border */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[var(--acm-blue)] to-[var(--acm-light-blue)]"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

interface AdvisorCardProps {
  advisor: {
    name: string;
    role: string;
    image: string;
    linkedin: string;
    batch?: string;
    currentRole?: string;
  };
  index: number;
  isInView: boolean;
}

const AdvisorCard = ({ advisor, index, isInView }: AdvisorCardProps) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--acm-blue)]/5 to-white shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-[var(--acm-blue)]/20">
        {/* Senior Advisor Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--acm-blue)] text-white rounded-full text-xs shadow-lg">
            <Award className="w-3.5 h-3.5" />
            <span>Senior Advisor</span>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative h-72 overflow-hidden">
          <ImageWithFallback
            src={advisor.image}
            alt={advisor.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* LinkedIn Icon - Always visible for advisors */}
          <motion.a
            href={advisor.linkedin}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="w-5 h-5 text-[var(--acm-blue)]" />
          </motion.a>
        </div>

        {/* Info */}
        <div className="p-6 relative bg-white">
          <h4 className="text-xl font-semibold text-black mb-1">{advisor.name}</h4>
          {advisor.batch && (
            <p className="text-sm text-gray-500 mb-3">{advisor.batch}</p>
          )}
          {advisor.currentRole && (
            <div className="flex items-start gap-2 mt-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-[var(--acm-green)] mt-1.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">{advisor.currentRole}</p>
            </div>
          )}

          {/* Animated Border */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[var(--acm-blue)] via-[var(--acm-purple)] to-[var(--acm-blue)]"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
          />
        </div>

        {/* Tilt Effect Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[var(--acm-blue)] transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default Team;