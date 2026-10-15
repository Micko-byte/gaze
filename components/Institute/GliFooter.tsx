import Link from 'next/link';
import { gliContact, gliNav, tagline } from '@/content/institute';
import { GliContours, GliCrest } from './GliBits';

/** Navy, with the cover's gold lines running under the crest, as on the brand book's closing page. */
export function GliFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t-[6px] border-gli-red bg-gli-navy px-5 pb-10 pt-20 font-gli-text text-white md:px-10">
      <GliContours className="absolute inset-x-0 bottom-0 -z-10 h-[70%] w-full opacity-60" />
      <div className="mx-auto grid max-w-[1320px] gap-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <GliCrest plate className="h-28 w-28" />
          <p className="mt-8 font-gli-serif text-[26px] font-black uppercase leading-[1.05]">Gaze Leadership Institute</p>
          <p className="mt-3 font-gli-text text-[15px] italic tracking-[0.04em] text-[rgba(255,255,255,0.75)]">“{tagline}”</p>
        </div>
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-gli-red">The Institute</p>
          <ul className="mt-6 grid gap-3 text-[15px] font-semibold">
            {gliNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gli-red">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-gli-red">Reach us</p>
          <ul className="mt-6 grid gap-3 text-[15px] font-medium text-[rgba(255,255,255,0.85)]">
            <li>{gliContact.city}</li>
            {gliContact.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/\s/g, '')}`} className="transition-colors hover:text-white">{p}</a>
              </li>
            ))}
            <li>
              <a href={`mailto:${gliContact.info}`} className="break-all transition-colors hover:text-white">{gliContact.info}</a>
            </li>
            <li>
              <a href={`mailto:${gliContact.admissions}`} className="break-all transition-colors hover:text-white">{gliContact.admissions}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-20 flex max-w-[1320px] flex-col justify-between gap-4 border-t border-[rgba(255,255,255,0.18)] pt-6 text-[13px] text-[rgba(255,255,255,0.7)] md:flex-row">
        <p>© {new Date().getFullYear()} Gaze Leadership Institute · {gliContact.parent}</p>
        <div className="flex gap-6">
          <Link href="/" className="transition-colors hover:text-white">Gaze Holdings</Link>
          <Link href="/legal/privacy" className="transition-colors hover:text-white">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
