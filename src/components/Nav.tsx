import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { business, nav } from '../config/business';
import { useActiveSection } from '../hooks/useActiveSection';

const ids = nav.map(n => n.id);

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display text-[15px] font-semibold uppercase tracking-[0.12em] ${className}`}>
      HSR <span className="mx-1 text-emerald-bright">/</span> <span className="text-ivory/80">Snooker Cafe</span>
    </span>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open ? 'border-b border-white/[0.07] bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <a href="#home" className="relative z-10 rounded-md" aria-label={`${business.name} — back to top`} onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative block rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    active === item.id ? 'text-ivory' : 'text-ivory/60 hover:text-ivory'
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-0 rounded-full border border-white/10 bg-white/[0.06]"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.phone.tel}
            className="hidden min-h-[44px] items-center gap-2 rounded-full border border-emerald/60 px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-emerald sm:inline-flex"
          >
            <Phone size={14} aria-hidden="true" /> Call to reserve
          </a>
          <button
            type="button"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(o => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 38px) 36px)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'circle(150% at calc(100% - 38px) 36px)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 38px) 36px)' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-emerald/20 blur-3xl" />
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center pt-[72px]">
              <ul className="space-y-2">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-2 font-display text-[clamp(34px,10vw,56px)] font-semibold uppercase leading-none tracking-tightest"
                    >
                      <span className="font-sans text-xs font-medium tracking-label text-gold">0{i + 1}</span>
                      <span className={active === item.id ? 'text-emerald-bright' : ''}>{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 space-y-4 border-t border-white/10 pt-8"
              >
                <a href={business.phone.tel} className="btn-primary w-full" onClick={() => setOpen(false)}>
                  <Phone size={16} aria-hidden="true" /> Call to reserve
                </a>
                <p className="text-center text-sm text-mist">{business.phone.display}</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
