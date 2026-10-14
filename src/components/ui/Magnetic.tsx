import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';

/**
 * Link with a subtle magnetic pull toward the pointer.
 * Desktop (fine pointer) only, and disabled for reduced motion.
 */
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; strength?: number };

export default function Magnetic({ children, strength = 0.28, className, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  useEffect(() => {
    setEnabled(!reduce && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, [reduce]);

  return (
    <motion.a
      ref={ref}
      className={className}
      style={enabled ? { x, y } : undefined}
      onPointerMove={e => {
        if (!enabled || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      {...(rest as object)}
    >
      {children}
    </motion.a>
  );
}
