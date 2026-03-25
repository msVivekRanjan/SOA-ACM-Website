import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const minMQL = window.matchMedia('(min-width: 1024px)');
    if (!minMQL.matches) return; // Only show on desktop

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(mousePosition.x, springConfig);
  const cursorYSpring = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    cursorXSpring.set(mousePosition.x);
    cursorYSpring.set(mousePosition.y);
  }, [mousePosition, cursorXSpring, cursorYSpring]);

  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--acm-blue)]/50 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--acm-blue)] rounded-full pointer-events-none z-[9999]"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%)`,
        }}
      />
    </>
  );
};

export default CustomCursor;
