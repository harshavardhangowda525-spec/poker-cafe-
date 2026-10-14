import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Coffee, CupSoda, Phone, Sandwich } from 'lucide-react';
import { useRef } from 'react';
import { business } from '../config/business';
import { images } from '../config/images';
import AmbientScene from './scenes/AmbientScene';
import Eyebrow from './ui/Eyebrow';
import Magnetic from './ui/Magnetic';
import Reveal from './ui/Reveal';
import SmartImage from './ui/SmartImage';
import WordReveal from './ui/WordReveal';

// General categories only — no verified menu has been supplied, so no dishes or prices are listed.
const moments = [
  { icon: Sandwich, label: 'Quick bites' },
  { icon: CupSoda, label: 'Refreshing beverages' },
  { icon: Coffee, label: 'Breaks between frames' },
];

export default function Cafe() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const slow = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);
  const fast = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 110, reduce ? 0 : -110]);

  return (
    <section ref={ref} id="cafe" aria-labelledby="cafe-title" className="relative overflow-hidden bg-[#0d0f0e] py-24 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-gold/10 blur-[150px]" />
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal><Eyebrow>Café &amp; quick bites</Eyebrow></Reveal>
          <WordReveal id="cafe-title" className="display mt-6 text-[clamp(44px,7vw,108px)]" lines={[{ text: 'The perfect' }, { text: 'break.', className: 'text-gold' }]} />
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-md text-[17px] leading-relaxed text-ivory/70">
              From refreshing drinks to quick bites, take a break, recharge, and get back to the table.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <ul className="mt-9 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {moments.map(({ icon: Icon, label }) => (
                <li key={label} className="group flex items-center gap-4 py-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gold transition-colors duration-500 group-hover:border-gold/50 group-hover:bg-gold/10">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="font-display text-lg uppercase tracking-tight">{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.35} className="mt-10">
            <Magnetic href={business.phone.tel} className="btn-primary">
              <Phone size={15} aria-hidden="true" /> Call to ask about the menu
            </Magnetic>
            <p className="mt-4 text-sm text-mist">Ask the team what's available today.</p>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative mx-auto grid max-w-[640px] grid-cols-6 gap-4 sm:gap-5">
            <motion.div style={{ y: slow }} className="col-span-4 row-span-2">
              <Reveal y={50}>
                <SmartImage
                  src={images.cafeMain}
                  alt="Freshly made coffee on a café table in warm light"
                  sizes="(min-width: 1024px) 34vw, 66vw"
                  className="aspect-[3/4] rounded-[22px] border border-white/[0.08]"
                  imgClassName="transition-transform duration-[1400ms] ease-out hover:scale-105"
                  fallback={<AmbientScene tone="cafe" variant="cup" className="h-full w-full" />}
                />
              </Reveal>
            </motion.div>
            <motion.div style={{ y: fast }} className="col-span-2 mt-16">
              <Reveal y={50} delay={0.1}>
                <SmartImage
                  src={images.cafeDrink}
                  alt="A café beverage served at the counter"
                  sizes="(min-width: 1024px) 17vw, 33vw"
                  className="aspect-[3/4] rounded-[18px] border border-white/[0.08]"
                  imgClassName="transition-transform duration-[1400ms] ease-out hover:scale-105"
                  fallback={<AmbientScene tone="cafe" variant="glass" className="h-full w-full" />}
                />
              </Reveal>
            </motion.div>
            <motion.div style={{ y: fast }} className="col-span-2 -mt-2">
              <Reveal y={50} delay={0.2}>
                <SmartImage
                  src={images.cafeBite}
                  alt="A quick bite to share between games"
                  sizes="(min-width: 1024px) 17vw, 33vw"
                  className="aspect-square rounded-[18px] border border-white/[0.08]"
                  imgClassName="transition-transform duration-[1400ms] ease-out hover:scale-105"
                  fallback={<AmbientScene tone="cafe" variant="plate" className="h-full w-full" />}
                />
              </Reveal>
            </motion.div>
          </div>
          <p className="mt-6 text-center text-xs text-ivory/35 lg:text-right">Imagery is illustrative. Call for today's menu.</p>
        </div>
      </div>
    </section>
  );
}
