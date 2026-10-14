import { motion, useReducedMotion } from 'framer-motion';

/**
 * Staggered word-by-word mask reveal for headings.
 * `lines` are rendered as block lines; each word slides up from behind a mask.
 */
type Line = { text: string; className?: string };
type Props = {
  lines: Line[];
  as?: 'h1' | 'h2';
  className?: string;
  delay?: number;
  /** animate on mount (hero) instead of when scrolled into view */
  onMount?: boolean;
  id?: string;
};

export default function WordReveal({ lines, as = 'h2', className = '', delay = 0, onMount, id }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  let index = 0;
  const trigger = onMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };
  return (
    <Tag id={id} className={className} initial={reduce ? false : 'hidden'} {...trigger}>
      {lines.map((line, li) => (
        <span key={li} className={`block ${line.className ?? ''}`}>
          {line.text.split(' ').map((word, wi) => {
            const i = index++;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: '110%' },
                    show: { y: '0%', transition: { duration: 1, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {word}
                </motion.span>
                {wi < line.text.split(' ').length - 1 && ' '}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
