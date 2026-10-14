import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Phone, Star } from 'lucide-react';
import { useRef } from 'react';
import { business } from '../config/business';
import { images } from '../config/images';
import SnookerScene from './scenes/SnookerScene';
import Magnetic from './ui/Magnetic';
import SmartImage from './ui/SmartImage';
import WordReveal from './ui/WordReveal';

const ease = [0.16, 1, 0.3, 1] as const;

/** Decorative curved line with a small ball travelling along it. */
function Trajectory({ reduce }: { reduce: boolean | null }) {
  const d = 'M 10 230 C 120 40, 300 20, 420 120 S 600 300, 690 80';
  return (
    <svg viewBox="0 0 700 260" className="h-full w-full overflow-visible" aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke="url(#traj)"
        strokeWidth="1.2"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.6, delay: 1.2, ease: 'easeInOut' }}
      />
      <defs>
        <linearGradient id="traj" x1="0" x2="1">
          <stop offset="0" stopColor="#C5A66A" stopOpacity="0" />
          <stop offset="0.5" stopColor="#C5A66A" stopOpacity="0.7" />
          <stop offset="1" stopColor="#16B57D" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="trajBall" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.45" stopColor="#EFEADF" />
          <stop offset="1" stopColor="#8d877b" />
        </radialGradient>
      </defs>
      {!reduce && (
        <g>
          <circle r="7" fill="url(#trajBall)">
            <animateMotion dur="9s" begin="3s" repeatCount="indefinite" path={d} keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="spline" keySplines="0.45 0 0.2 1;0 0 1 1" />
          </circle>
          <circle r="16" fill="#16B57D" opacity="0.18">
            <animateMotion dur="9s" begin="3s" repeatCount="indefinite" path={d} keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="spline" keySplines="0.45 0 0.2 1;0 0 1 1" />
          </circle>
        </g>
      )}
      {reduce && <circle cx="690" cy="80" r="7" fill="url(#trajBall)" />}
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%']);
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '30%']);
  const fgX = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '6%']);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  const hasPhoto = Boolean(images.hero);

  return (
    <section ref={ref} id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-ink pb-16 pt-28 sm:pb-20 lg:min-h-[100svh] lg:items-center lg:pb-24" style={{ minHeight: '100svh' }}>
      {/* Background: cinematic zoom-in on load, then a very slow drift */}
      <motion.div className="absolute inset-y-0 left-0 right-0 -z-20 lg:left-[24%] lg:-right-[4%] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]" style={{ y: bgY }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.18, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease }}
        >
          <div className="absolute inset-0" style={reduce ? undefined : { animation: 'slowzoom 26s ease-in-out 2.8s infinite alternate' }}>
            {hasPhoto ? (
              <SmartImage
                src={images.hero}
                alt="Snooker table with cue and balls under low overhead light"
                priority
                className="h-full w-full"
                fallback={<SnookerScene className="h-full w-full" align="xMidYMax slice" />}
              />
            ) : (
              <SnookerScene layer="back" className="h-full w-full" align="xMidYMax slice" />
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Foreground: cue + cue ball, moving faster for depth */}
      {!hasPhoto && (
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 right-0 -z-10 lg:left-[24%] lg:-right-[4%] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]"
          style={{ y: fgY, x: fgX }}
          initial={reduce ? false : { opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2.2, delay: 0.6, ease }}
        >
          <SnookerScene layer="front" className="h-full w-full" align="xMidYMax slice" />
        </motion.div>
      )}

      {/* Legibility overlays */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-transparent lg:via-ink/40" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-transparent to-ink/50" />
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-emerald/10 blur-[120px]" />

      {/* Decorative trajectory */}
      <div className="pointer-events-none absolute right-[4%] top-[16%] -z-10 hidden h-[200px] w-[520px] opacity-80 md:block lg:right-[8%]">
        <Trajectory reduce={reduce} />
      </div>

      <motion.div className="container-x relative" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.p
          className="label mb-6 flex items-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-bright opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-bright" />
          </span>
          HSR Layout, Bengaluru · Open late
        </motion.p>

        <WordReveal
          id="hero-title"
          as="h1"
          onMount
          delay={0.45}
          className="display text-[clamp(36px,10.4vw,150px)]"
          lines={[{ text: 'Your game.' }, { text: 'Your people.' }, { text: 'Your night.', className: 'text-emerald-bright' }]}
        />

        <motion.p
          className="mt-7 max-w-[34rem] text-[clamp(15px,1.25vw,18px)] leading-relaxed text-ivory/75"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease }}
        >
          Good games, great bites, and even better company. Your neighbourhood spot for snooker, pool, and laid-back café vibes.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.55, ease }}
        >
          <Magnetic href="#experience" className="btn-primary">
            Explore the space <ArrowDownRight size={16} aria-hidden="true" />
          </Magnetic>
          <Magnetic href={business.phone.tel} className="btn-ghost">
            <Phone size={15} aria-hidden="true" /> Call to check availability
          </Magnetic>
        </motion.div>

        <motion.a
          href="#reviews"
          className="glass mt-8 inline-flex items-center gap-3 rounded-full px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-ivory/85 transition-colors hover:border-gold/40"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
          aria-label={`Rated ${business.rating.value} out of ${business.rating.outOf} from ${business.rating.count} Google reviews`}
        >
          <Star size={14} className="text-gold" fill="currentColor" strokeWidth={0} aria-hidden="true" />
          <span>
            <span className="text-ivory">{business.rating.value}</span> / {business.rating.outOf} · {business.rating.count} Google reviews
          </span>
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#experience"
        aria-label="Scroll to The Experience"
        className="absolute bottom-8 right-4 hidden flex-col items-center gap-3 text-[10px] font-medium uppercase tracking-label text-ivory/50 sm:right-6 md:flex lg:right-10"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-16 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-1/3 bg-emerald-bright" style={reduce ? undefined : { animation: 'scrollcue 2.2s cubic-bezier(0.16,1,0.3,1) infinite' }} />
        </span>
      </motion.a>
    </section>
  );
}
