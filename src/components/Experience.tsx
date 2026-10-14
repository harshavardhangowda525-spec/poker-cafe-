import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Info, Phone } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { business } from '../config/business';
import { images } from '../config/images';
import AmbientScene from './scenes/AmbientScene';
import SnookerScene from './scenes/SnookerScene';
import Eyebrow from './ui/Eyebrow';
import Reveal from './ui/Reveal';
import SmartImage from './ui/SmartImage';
import WordReveal from './ui/WordReveal';

type CardProps = {
  index: string;
  title: string;
  tag: string;
  copy: string;
  media: ReactNode;
  aspect: string;
  className?: string;
};

function ExperienceCard({ index, title, tag, copy, media, aspect, className = '' }: CardProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', reduce ? '-6%' : '6%']);

  return (
    <article ref={ref} className={`group ${className}`}>
      <motion.div
        className={`relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-forest ${aspect}`}
        initial={reduce ? false : { clipPath: 'inset(18% 10% 18% 10% round 22px)', opacity: 0.4 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 22px)', opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Parallax wrapper (scroll) + zoom wrapper (hover) */}
        <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={{ y }}>
          <div className="h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]">{media}</div>
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
          <span className="rounded-full border border-white/15 bg-ink/40 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-ivory backdrop-blur-md transition-all duration-500 group-hover:border-emerald/60 group-hover:bg-emerald/80">
            {tag}
          </span>
          <span className="font-display text-sm text-ivory/60">{index}</span>
        </div>
      </motion.div>
      <Reveal delay={0.15} className="mt-6 max-w-md">
        <h3 className="flex items-center gap-4 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
          {title}
          <span className="h-px flex-1 origin-left scale-x-50 bg-gradient-to-r from-gold/70 to-transparent transition-transform duration-700 group-hover:scale-x-100" aria-hidden="true" />
        </h3>
        <p className="mt-3 leading-relaxed text-ivory/65">{copy}</p>
      </Reveal>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute right-[-10%] top-40 h-[480px] w-[480px] rounded-full bg-emerald/10 blur-[140px]" />
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal><Eyebrow>More than just a game</Eyebrow></Reveal>
            <WordReveal
              id="experience-title"
              className="display mt-6 text-[clamp(38px,6.4vw,96px)]"
              lines={[{ text: 'Made for the moments' }, { text: 'between the shots.', className: 'text-ivory/45' }]}
            />
          </div>
          <Reveal delay={0.2} className="lg:col-span-4 lg:pb-3">
            <p className="max-w-sm leading-relaxed text-ivory/65">
              A clean, relaxed room with well-kept tables, friendly staff and a café that keeps the evening going.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          <ExperienceCard
            className="lg:col-span-7 lg:row-span-2"
            index="01"
            title="The Table"
            tag="Play your way"
            copy="Settle in, line up your shot, and enjoy a game in a clean, well-maintained setting."
            aspect="aspect-[4/5] sm:aspect-[5/5] lg:aspect-[4/5]"
            media={
              <SmartImage
                src={images.table}
                alt="Well-maintained snooker table with green felt under overhead lighting"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-full w-full"
                fallback={<SnookerScene className="h-full w-full" align="xMidYMax slice" />}
              />
            }
          />
          <ExperienceCard
            className="lg:col-span-5 lg:mt-24"
            index="02"
            title="The Café"
            tag="Good bites. Good breaks."
            copy="Refuel between frames with tasty quick bites and refreshing beverages."
            aspect="aspect-[4/3]"
            media={
              <SmartImage
                src={images.cafeMain}
                alt="Coffee and café drinks in warm, atmospheric light"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full"
                fallback={<AmbientScene tone="cafe" className="h-full w-full" />}
              />
            }
          />
          <ExperienceCard
            className="lg:col-span-4 lg:col-start-9 lg:mt-16"
            index="03"
            title="The Crew"
            tag="Your regular spot"
            copy="Bring your friends, meet your crew, and make every visit part of the story."
            aspect="aspect-[4/5]"
            media={
              <SmartImage
                src={images.crew}
                alt="Friends enjoying a relaxed game together in a welcoming indoor lounge"
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="h-full w-full"
                fallback={<AmbientScene tone="lounge" className="h-full w-full" />}
              />
            }
          />
        </div>

        <Reveal className="mt-20 sm:mt-24">
          <div className="flex flex-col gap-5 rounded-2xl border border-gold/25 bg-gold/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-ivory/80 sm:text-[15px]">
              <Info size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              {business.busyNote}
            </p>
            <a href={business.phone.tel} className="btn-gold shrink-0">
              <Phone size={15} aria-hidden="true" /> Call {business.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
