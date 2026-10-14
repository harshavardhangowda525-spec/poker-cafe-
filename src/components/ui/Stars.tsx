import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';

/** Five stars that pop in one after another, with a gentle shimmer. */
export default function Stars({ size = 18, className = '' }: { size?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`inline-flex gap-1 text-gold ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -40 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.09, type: 'spring', stiffness: 320, damping: 16 }}
          style={reduce ? undefined : { animation: `twinkle 3.6s ease-in-out ${1.2 + i * 0.25}s infinite` }}
          className="inline-flex"
        >
          <Star size={size} fill="currentColor" strokeWidth={0} />
        </motion.span>
      ))}
    </span>
  );
}
