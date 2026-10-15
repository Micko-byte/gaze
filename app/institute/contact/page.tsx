/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { gliContact } from '@/content/institute';
import { GliButton, GliLabel } from '@/components/Institute/GliBits';
import { ContactForm } from '@/components/Institute/GliForms';

export const metadata: Metadata = {
  title: 'Contact · Gaze Leadership Institute',
  description: `Gaze Leadership Institute, ${gliContact.city}. ${gliContact.info}`,
};

/* Line icons for the contact list, in the navy discs of the brand book's contact page. */
const icons: Record<string, ReactNode> = {
  pin: <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  phone: <path d="M6.6 3h3l1.5 4.5-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2L21 14.4v3a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z" />,
  globe: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c2.5 2.6 3.6 5.6 3.6 9s-1.1 6.4-3.6 9m0-18C9.5 5.6 8.4 8.6 8.4 12s1.1 6.4 3.6 9M3.6 9h16.8M3.6 15h16.8" />,
  mail: <path d="M3.5 6h17v12h-17zM3.5 6.5 12 13l8.5-6.5" />,
};

function Item({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-5 text-[clamp(16px,1.4vw,19px)] font-semibold text-gli-navy">
      <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gli-navy">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round">
          {icons[icon]}
        </svg>
      </span>
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
    </li>
  );
}

export default function InstituteContact() {
  return (
    <>
      {/* ── The brand book's contact page: red rails, "Contact us", the details, and the city ── */}
      <section className="relative overflow-hidden border-x-[10px] border-gli-red bg-white pt-[112px] md:border-x-[22px]">
        <div className="mx-auto grid max-w-[1360px] items-center gap-14 px-5 py-20 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:py-28 [&>*]:min-w-0">
          <div data-loader-target>
            <h1 className="font-gli-head text-[clamp(80px,12vw,200px)] uppercase leading-[0.9] text-gli-red">
              <span data-gli-rise className="block">Contact</span>
              <span data-gli-rise className="block">us</span>
            </h1>
            <p className="mt-8 font-gli-serif text-[22px] font-black uppercase text-gli-navy">Gaze Leadership Institute (GLI)</p>
            <p className="mt-1 text-[16px] font-semibold text-gli-ink">{gliContact.parent}</p>
            <ul className="mt-10 grid gap-5">
              <Item icon="pin">{gliContact.city}</Item>
              <Item icon="phone">
                {gliContact.phones.map((p, i) => (
                  <span key={p}>
                    {i > 0 && ' / '}
                    <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-gli-red">{p}</a>
                  </span>
                ))}
              </Item>
              <Item icon="globe">{gliContact.web}</Item>
              <Item icon="mail">
                <a href={`mailto:${gliContact.info}`} className="hover:text-gli-red">{gliContact.info}</a>
              </Item>
              <Item icon="mail">
                <a href={`mailto:${gliContact.admissions}`} className="hover:text-gli-red">{gliContact.admissions}</a>
              </Item>
            </ul>
            <div className="mt-12 flex flex-wrap gap-3">
              <GliButton href="/institute/admissions#apply">Apply now</GliButton>
              <a href="#message" className="inline-flex items-center border-2 border-gli-navy px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-gli-navy transition-colors hover:bg-gli-navy hover:text-white">
                Get in touch
              </a>
            </div>
          </div>
          <div data-gli-wipe>
            <img src="/images/institute/city.jpg" alt="A city at dusk, seen from above" className="aspect-[4/3.4] w-full object-cover" />
            <p className="mt-4 text-[14px] font-semibold text-gli-ink">
              Follow us: Instagram · YouTube · LinkedIn <span className="text-[rgba(0,11,61,0.55)]">(links to follow)</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Write to us ── */}
      <section id="message" className="scroll-mt-[76px] bg-gli-mist px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[0.8fr_1.6fr]">
          <div>
            <GliLabel className="text-gli-red">Get in touch</GliLabel>
            <h2 data-gli-rise className="mt-4 font-gli-head text-[clamp(48px,5vw,84px)] uppercase leading-none text-gli-navy">Write to us</h2>
            <p className="mt-6 max-w-[34ch] text-[17px] font-medium leading-relaxed text-gli-ink">
              Questions about a program, fees, or training for your team.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
