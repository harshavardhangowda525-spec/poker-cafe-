import { ArrowUpRight, Instagram, MapPin, Phone } from 'lucide-react';
import { business, nav } from '../config/business';
import { Wordmark } from './Nav';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#070908] pt-20">
      <div className="container-x">
        <div className="grid gap-12 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark className="text-lg" />
            <p className="mt-5 max-w-xs font-display text-2xl leading-tight tracking-tight text-ivory/85">A good game is always better together.</p>
            {business.links.instagram && (
              <a href={business.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)" className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-gold hover:text-gold">
                <Instagram size={18} aria-hidden="true" />
              </a>
            )}
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="label text-ivory/40">Explore</p>
            <ul className="mt-5 space-y-3">
              {nav.map(n => (
                <li key={n.id}><a href={`#${n.id}`} className="text-ivory/70 transition-colors hover:text-ivory">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="label text-ivory/40">Visit</p>
            <ul className="mt-5 space-y-4 text-ivory/70">
              <li className="flex gap-3"><MapPin size={17} className="mt-1 shrink-0 text-gold" aria-hidden="true" /><span>{business.address.singleLine}</span></li>
              <li className="flex gap-3"><Phone size={17} className="mt-1 shrink-0 text-gold" aria-hidden="true" /><a href={business.phone.tel} className="hover:text-ivory">{business.phone.display}</a></li>
              <li>
                <a href={business.links.directions} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-bright hover:underline">
                  Get directions on Google Maps <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={business.links.playo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ivory/55 hover:text-ivory">
                  Also listed on Playo <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/[0.06] py-7 text-xs text-ivory/40 sm:flex-row sm:justify-between">
          <p>© {year} {business.name}. All rights reserved.</p>
          <p>Snooker · Pool · Café — HSR Layout, Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}
