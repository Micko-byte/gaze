import Link from 'next/link';
import { houses, type House } from '@/content/houses';
import { HouseLogo } from '@/components/Logo/HouseLogo';

/** Division footer: the house sign-off, the other houses, and the group. */
export function HouseFooter({ house, textFont = 'font-text' }: { house: House; textFont?: string }) {
  const others = houses.filter((h) => h.id !== house.id);
  return (
    <footer className={`${textFont} px-5 pb-10 pt-20 md:px-10`} style={{ background: house.ink, color: house.ground }}>
      <div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <HouseLogo id={house.logo} tone="mono" knock={house.ink} className="h-14 w-auto max-w-[260px] self-start" />
          <p className="max-w-sm text-sm leading-relaxed opacity-70">{house.line}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] opacity-60">The other houses</p>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {others.map((h) => (
              <li key={h.id}>
                <Link href={h.href} className="opacity-80 transition-opacity hover:opacity-100">{h.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] opacity-60">The group</p>
          <Link href="/" className="mt-5 flex items-center gap-3 text-sm opacity-80 transition-opacity hover:opacity-100">
            <HouseLogo id="holdings" tone="mono" className="h-7 w-auto" />
            A Gaze Holdings house
          </Link>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            <li><Link href="/#contact" className="opacity-80 hover:opacity-100">Contact</Link></li>
            <li><Link href="/legal/privacy" className="opacity-80 hover:opacity-100">Privacy</Link></li>
            <li><Link href="/legal/terms" className="opacity-80 hover:opacity-100">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1440px] justify-between border-t pt-6 text-[11px] uppercase tracking-[0.24em] opacity-50" style={{ borderColor: 'currentColor' }}>
        <span>© {new Date().getFullYear()} {house.name}</span>
        <span>Nairobi · Worldwide</span>
      </div>
    </footer>
  );
}
