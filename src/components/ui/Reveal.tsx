import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

/** Fades and lifts content into view once, when it scrolls into the viewport. */
type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number };

export default function Reveal({ delay = 0, y = 28, children, ...rest }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
