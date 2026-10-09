import { motion, useReducedMotion } from 'framer-motion';

/**
 * Simple, tasteful fade/slide-in for every route.
 * Automatically disabled when the user prefers reduced motion.
 */
export default function PageTransition({ children }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}