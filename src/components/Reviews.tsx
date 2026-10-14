import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Quote } from 'lucide-react';
import { business } from '../config/business';
import Eyebrow from './ui/Eyebrow';
import Reveal from './ui/Reveal';
import Stars from './ui/Stars';
import WordReveal from './ui/WordReveal';

const offsets = ['lg:mt-0', 'lg:mt-20', 'lg:mt-8'];

export default function Reviews() {
  const reduce = useReducedMotion();
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>What guests say</Eyebrow></Reveal>
            <WordReveal id="reviews-title" className="display mt-6 text-[clamp(38px,6vw,92px)]" lines={[{ text: 'Good games.' }, { text: 'Even better words.', className: 'text-ivory/45' }]} />
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="glass relative overflow-hidden rounded-[22px] p-7 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald/25 blur-3xl" />
              <div className="flex items-end gap-3">
                <span className="font-display text-[clamp(72px,9vw,120px)] font-semibold leading-none tracking-tightest">{business.rating.value}</span>
                <span className="mb-3 font-display text-2xl text-ivory/45">/ {business.rating.outOf}</span>
              </div>
              <Stars size={20} className="mt-4" />
              <p className="mt-3 text-sm text-ivory/70">
                Based on <strong className="font-semibold text-ivory">{business.rating.count} Google reviews</strong>
              </p>
              <a href={business.links.reviews} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-7 w-full sm:w-auto">
                Read reviews on Google <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-5 sm:mt-20 lg:grid-cols-3 lg:gap-6">
          {business.reviews.map((quote, i) => (
            <motion.li
              key={i}
              className={offsets[i]}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <figure className="group relative h-full rounded-[22px] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-7 transition-colors duration-500 hover:border-emerald/40 sm:p-8">
                <Quote size={34} className="text-emerald-bright/80 transition-transform duration-500 group-hover:-rotate-6" aria-hidden="true" />
                <blockquote className="mt-6 font-display text-[clamp(20px,1.7vw,24px)] font-medium leading-snug tracking-tight text-ivory/90">
                  “{quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                  <Stars size={13} />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-ivory/45">Google review</span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
