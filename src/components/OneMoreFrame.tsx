import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useId, useRef } from 'react';
import { business } from '../config/business';
import { Ball, BallDefs } from './scenes/Ball';

/** Path of the cue ball: rolls in from the lower left, curves, and arrives at the red. */
const PATH = 'M 40 610 C 260 600, 430 520, 540 400 S 760 150, 1010 168';
const RED = { x: 1052, y: 170 };

function Word({ progress, range, children, className = '' }: { progress: MotionValue<number>; range: [number, number]; children: string; className?: string }) {
  const opacity = useTransform(progress, range, [0.06, 1]);
  const y = useTransform(progress, range, ['22%', '0%']);
  const blur = useTransform(progress, range, ['blur(10px)', 'blur(0px)']);
  return (
    <motion.span className={`block ${className}`} style={{ opacity, y, filter: blur }}>
      {children}
    </motion.span>
  );
}

function Scene({ progress, reduce }: { progress: MotionValue<number>; reduce: boolean }) {
  const id = useId().replace(/:/g, '');
  const pathRef = useRef<SVGPathElement>(null);
  const bx = useMotionValue(40);
  const by = useMotionValue(610);
  const travel = useTransform(progress, [0.08, 0.82], [0, 1], { clamp: true });
  const redX = useTransform(progress, [0.8, 0.95], [0, reduce ? 0 : 46]);
  const redY = useTransform(progress, [0.8, 0.95], [0, reduce ? 0 : -12]);
  const glow = useTransform(progress, [0.75, 0.9], [0, 0.6]);

  const place = (t: number) => {
    const p = pathRef.current;
    if (!p) return;
    const pt = p.getPointAtLength(t * p.getTotalLength());
    bx.set(pt.x);
    by.set(pt.y);
  };
  useMotionValueEvent(travel, 'change', place);
  useEffect(() => place(reduce ? 1 : travel.get()), [reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid meet" className="h-full w-full" aria-hidden="true">
      <BallDefs id={id} />
      <defs>
        <linearGradient id={`${id}-line`} x1="0" x2="1">
          <stop offset="0" stopColor="#C5A66A" stopOpacity="0.1" />
          <stop offset="0.6" stopColor="#C5A66A" stopOpacity="0.8" />
          <stop offset="1" stopColor="#16B57D" />
        </linearGradient>
        <radialGradient id={`${id}-halo`}>
          <stop offset="0" stopColor="#16B57D" stopOpacity="0.55" />
          <stop offset="1" stopColor="#16B57D" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* faint guide path */}
      <path d={PATH} fill="none" stroke="#F5F1E8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 9" />
      {/* drawn trail */}
      <motion.path ref={pathRef} d={PATH} fill="none" stroke={`url(#${id}-line)`} strokeWidth="2" strokeLinecap="round" style={{ pathLength: reduce ? 1 : travel }} />
      {/* pocket + target ball */}
      <ellipse cx="1112" cy="150" rx="30" ry="11" fill="#000" stroke="#C5A66A" strokeOpacity="0.25" />
      <motion.circle cx={RED.x} cy={RED.y} r="70" fill={`url(#${id}-halo)`} style={{ opacity: glow }} />
      <motion.g style={{ x: redX, y: redY }}>
        <Ball id={id} cx={RED.x} cy={RED.y} r={22} color="red" />
      </motion.g>
      {/* cue ball */}
      <motion.g style={{ x: bx, y: by }}>
        <circle r="60" fill={`url(#${id}-halo)`} opacity="0.35" />
        <Ball id={id} cx={0} cy={0} r={24} color="cue" />
      </motion.g>
    </svg>
  );
}

export default function OneMoreFrame() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const bg = useTransform(scrollYProgress, [0, 0.5, 1], ['#0A0C0B', '#102A20', '#0A0C0B']);
  const light = useTransform(scrollYProgress, [0, 1], ['20%', '80%']);
  const done = useMotionValue(1);
  const progress = reduce ? done : scrollYProgress;
  const captionOpacity = useTransform(progress, [0.6, 0.75], [0, 1]);

  return (
    <section
      ref={ref}
      aria-labelledby="frame-title"
      className={reduce ? 'relative' : 'relative h-[260vh]'}
    >
      <motion.div className={`${reduce ? 'relative py-28' : 'sticky top-0 h-[100svh]'} flex items-center overflow-hidden`} style={{ backgroundColor: reduce ? '#102A20' : bg }}>
        <motion.div
          className="pointer-events-none absolute top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/15 blur-[140px]"
          style={{ left: reduce ? '50%' : light }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <Scene progress={progress} reduce={reduce} />
        </div>

        <div className="container-x relative">
          <h2 id="frame-title" className="display text-[clamp(64px,15vw,236px)] leading-[0.85]">
            <span className="sr-only">One more frame.</span>
            <span aria-hidden="true">
              <Word progress={progress} range={[0.05, 0.25]}>One</Word>
              <Word progress={progress} range={[0.2, 0.42]} className="pl-[8vw]">More</Word>
              <Word progress={progress} range={[0.38, 0.6]} className="text-emerald-bright">Frame.</Word>
            </span>
          </h2>
          <motion.div
            className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6"
            style={{ opacity: captionOpacity }}
          >
            <p className="font-display text-lg text-ivory/85 sm:text-xl">Some nights deserve an extra frame.</p>
            <span className="label text-ivory/45">Listed closing time · {business.closingTime}</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
