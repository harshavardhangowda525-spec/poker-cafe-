import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Clock, MapPin, Navigation, Phone, PhoneCall } from 'lucide-react';
import { useRef } from 'react';
import { business } from '../config/business';
import Eyebrow from './ui/Eyebrow';
import Magnetic from './ui/Magnetic';
import Reveal from './ui/Reveal';
import WordReveal from './ui/WordReveal';

/** Google Map, loaded only when the section is close to the viewport. */
function MapPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: '400px 0px' });
  return (
    <div ref={ref} className="relative h-full min-h-[340px] overflow-hidden rounded-[22px] border border-white/[0.08] bg-forest">
      {/* Designed backdrop shown while the map loads (or if it is blocked) */}
      <div className="absolute inset-0" aria-hidden="true">
        <svg viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="600" height="500" fill="#0c1f18" />
          {[60, 150, 240, 330, 420, 510].map(x => <line key={x} x1={x} y1="0" x2={x - 40} y2="500" stroke="#F5F1E8" strokeOpacity="0.05" strokeWidth="10" />)}
          {[80, 200, 320, 440].map(y => <line key={y} x1="0" y1={y} x2="600" y2={y + 30} stroke="#F5F1E8" strokeOpacity="0.05" strokeWidth="8" />)}
          <circle cx="300" cy="250" r="70" fill="#0E8F61" opacity="0.18" />
          <circle cx="300" cy="250" r="10" fill="#16B57D" />
        </svg>
      </div>
      {near && (
        <iframe
          title={`Map showing ${business.name}`}
          src={business.links.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 opacity-90 [filter:grayscale(0.6)_invert(0.92)_hue-rotate(160deg)_contrast(0.9)]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/10" />
    </div>
  );
}

export default function FindUs() {
  const reduce = useReducedMotion();
  const actions = [
    { href: business.links.directions, label: 'Get directions', note: 'Opens Google Maps', icon: Navigation, external: true, primary: true },
    { href: business.phone.tel, label: 'Call the café', note: business.phone.display, icon: Phone },
    { href: business.phone.tel, label: 'Check availability', note: 'Call to confirm a table before you visit', icon: PhoneCall },
  ];

  return (
    <section id="find-us" aria-labelledby="find-us-title" className="relative overflow-hidden border-t border-white/[0.06] bg-gradient-to-b from-forest/60 to-ink py-24 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-emerald/15 blur-[150px]" />
      <div className="container-x relative">
        <Reveal><Eyebrow>Find us</Eyebrow></Reveal>
        <WordReveal id="find-us-title" className="display mt-6 max-w-[16ch] text-[clamp(40px,7vw,110px)]" lines={[{ text: 'Your next game' }, { text: 'starts here.', className: 'text-emerald-bright' }]} />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <div className="glass h-full rounded-[22px] p-7 sm:p-9">
              <p className="font-display text-xl font-semibold uppercase tracking-[0.08em]">{business.name}</p>
              <address className="mt-5 flex gap-3 not-italic leading-relaxed text-ivory/75">
                <MapPin size={18} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                <span>{business.address.lines.map(l => <span key={l} className="block">{l}</span>)}</span>
              </address>
              <dl className="mt-6 space-y-3 border-t border-white/[0.07] pt-6 text-sm">
                <div className="flex items-center gap-3">
                  <dt className="flex items-center gap-3 text-ivory/50"><Phone size={16} className="text-gold" aria-hidden="true" /> Phone</dt>
                  <dd><a href={business.phone.tel} className="font-medium text-ivory underline-offset-4 hover:underline">{business.phone.display}</a></dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="flex items-center gap-3 text-ivory/50"><Clock size={16} className="text-gold" aria-hidden="true" /> Listed closing time</dt>
                  <dd className="font-medium">{business.closingTime}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="flex items-center gap-3 text-ivory/50"><MapPin size={16} className="text-gold" aria-hidden="true" /> Plus Code</dt>
                  <dd className="font-medium">{business.address.plusCode}</dd>
                </div>
              </dl>
              <p className="mt-6 rounded-xl border border-gold/20 bg-gold/[0.05] p-4 text-sm leading-relaxed text-ivory/75">{business.busyNote}</p>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-7">
            <MapPanel />
          </Reveal>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-3 lg:mt-8">
          {actions.map(({ href, label, note, icon: Icon, external, primary }, i) => (
            <motion.li
              key={label}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Magnetic
                href={href}
                strength={0.12}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group flex min-h-[96px] items-center justify-between gap-4 rounded-[18px] border p-5 transition-colors duration-500 ${
                  primary ? 'border-emerald bg-emerald text-ivory hover:bg-emerald-bright' : 'border-white/10 bg-white/[0.03] hover:border-emerald/60'
                }`}
              >
                <span>
                  <span className="block font-display text-lg font-semibold uppercase tracking-tight">{label}</span>
                  <span className={`mt-1 block text-sm ${primary ? 'text-ivory/80' : 'text-ivory/55'}`}>
                    {note}
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </span>
                </span>
                <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-[-12deg] ${primary ? 'bg-ink/20' : 'bg-white/[0.06] text-emerald-bright'}`}>
                  <Icon size={18} aria-hidden="true" />
                </span>
              </Magnetic>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
