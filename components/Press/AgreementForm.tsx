'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { agreement } from '@/content/pressAgreement';
import { SignaturePad } from '@/components/SignaturePad/SignaturePad';

const field = 'w-full border-b border-[rgba(17,17,17,0.35)] bg-transparent py-2 text-base outline-none transition-colors placeholder:text-[#8A847A] focus:border-press-ink';
const label = 'text-[11px] uppercase tracking-[0.22em] text-[#5A5550]';

function ordinal(n: number) {
  const s = n % 100 >= 11 && n % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[n % 10] ?? 'th';
  return `${n}${s}`;
}

/** A blank in the agreement: shows what the author has typed, or a rule waiting to be filled. */
function Blank({ value, wide }: { value: string; wide?: boolean }) {
  return value ? (
    <span className="border-b border-press-ink px-1 font-medium">{value}</span>
  ) : (
    <span className={`inline-block border-b border-press-ink align-baseline ${wide ? 'w-64' : 'w-28'}`}>&nbsp;</span>
  );
}

/* "Label: text" parts of a clause set their label in small capitals. */
function Part({ text, title }: { text: string; title: string }): ReactNode {
  if (text === '{title}') {
    return (
      <p className="py-2 text-center font-press-head text-2xl">
        &ldquo;<Blank value={title} wide />&rdquo; <span className="font-text text-sm">(the &ldquo;Work&rdquo;)</span>
      </p>
    );
  }
  const m = text.match(/^([^:]{3,40}):\s(.*)$/);
  return m ? (
    <p>
      <span className="text-[12px] font-semibold uppercase tracking-[0.16em]">{m[1]}:</span> {m[2]}
    </p>
  ) : (
    <p>{text}</p>
  );
}

/**
 * The author signs the Publishing & Literary Commission Agreement: their details fill its blanks as they type, then
 * they upload the manuscript, accept, and sign by hand. Gaze Press Global countersigns on acceptance.
 *
 * There is no backend yet: a signed agreement is thanked, not sent. Wire `submit` to storage once one is chosen.
 */
export function AgreementForm() {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [manuscript, setManuscript] = useState<File | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [signError, setSignError] = useState(false);
  const [done, setDone] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const onSign = useCallback((png: string | null) => {
    setSignature(png);
    if (png) setSignError(false);
  }, []);

  const now = new Date();
  const month = now.toLocaleDateString('en-GB', { month: 'long' });
  const today = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  if (done) {
    return (
      <div ref={top} className="mx-auto max-w-2xl py-16 text-center" role="status">
        <p className="font-press-script text-[clamp(40px,4vw,64px)] leading-none text-press-rose">Thank you</p>
        <h2 className="mt-6 font-press-head text-[clamp(36px,4vw,64px)] leading-[1.02]">Your agreement is signed.</h2>
        <p className="mx-auto mt-6 max-w-lg text-lg font-light leading-relaxed">
          {author.split(' ')[0]}, your signed agreement and the manuscript of &ldquo;{title}&rdquo; are with Gaze Press Global. Our
          team will contact you to arrange the Sovereign Commission and countersign the agreement.
        </p>
        <Link href="/press" data-no-transition className="mt-10 inline-block bg-press-ink px-8 py-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-press-paper transition-colors hover:bg-press-rose">
          Back to Gaze Press Global
        </Link>
      </div>
    );
  }

  return (
    <div ref={top}>
      <form
        className="flex flex-col gap-16"
        onSubmit={(e) => {
          e.preventDefault();
          if (!signature) {
            setSignError(true);
            document.getElementById('signature')?.scrollIntoView({ block: 'center' });
            return;
          }
          setDone(true);
          top.current?.scrollIntoView({ block: 'start' });
        }}
      >
        {/* ── the author and the work ── */}
        <fieldset className="grid gap-x-10 gap-y-8 border-t border-press-ink pt-8 md:grid-cols-2">
          <legend className="mb-6 font-press-head text-3xl">The author &amp; the work</legend>
          <label className="flex flex-col gap-1">
            <span className={label}>Author&apos;s full name*</span>
            <input name="author" required autoComplete="name" value={author} onChange={(e) => setAuthor(e.target.value)} className={field} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={label}>Working title of the manuscript*</span>
            <input name="title" required value={title} onChange={(e) => setTitle(e.target.value)} className={field} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={label}>Email*</span>
            <input name="email" type="email" required autoComplete="email" className={field} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={label}>Phone or WhatsApp*</span>
            <input name="phone" type="tel" required autoComplete="tel" className={field} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={label}>Country*</span>
            <input name="country" required autoComplete="country-name" className={field} />
          </label>
          <label className="flex cursor-pointer flex-col gap-1">
            <span className={label}>Your manuscript* · PDF or Word</span>
            <span className={`${field} flex items-center justify-between gap-4`}>
              <span className={manuscript ? '' : 'text-[#8A847A]'}>{manuscript ? manuscript.name : 'choose a file'}</span>
              <span className="text-[11px] uppercase tracking-[0.22em]">upload</span>
            </span>
            <input
              type="file"
              name="manuscript"
              required
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => setManuscript(e.target.files?.[0] ?? null)}
              className="sr-only"
            />
          </label>
        </fieldset>

        {/* ── the agreement ── */}
        <article
          aria-label={agreement.title}
          className="bg-white px-6 py-10 shadow-[0_30px_60px_-40px_rgba(17,17,17,0.5)] ring-1 ring-[rgba(17,17,17,0.08)] md:px-16 md:py-16"
        >
          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-press-rose">Gaze Press Global</p>
          <h2 className="mt-3 text-center font-press-head text-[clamp(28px,3vw,44px)] leading-tight">{agreement.title}</h2>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-5 text-[15px] leading-[1.75]">
            <p>
              THIS AGREEMENT is entered into on this <Blank value={ordinal(now.getDate())} /> day of <Blank value={month} />,{' '}
              {now.getFullYear()} (the &ldquo;Effective Date&rdquo;), by and between:
            </p>
            <p>{agreement.publisher}, and</p>
            <p>
              <Blank value={author} wide /> (hereinafter referred to as the &ldquo;Author&rdquo;).
            </p>
            <ol className="mt-4 flex flex-col gap-8">
              {agreement.clauses.map((c, i) => (
                <li key={c.heading}>
                  <h3 className="font-press-head text-xl">
                    {i + 1}. {c.heading}
                  </h3>
                  <div className="mt-3 flex flex-col gap-3">
                    {c.parts.map((p) => (
                      <Part key={p} text={p} title={title} />
                    ))}
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4">{agreement.witness}</p>
            <div className="mt-6 grid gap-10 border-t border-[rgba(17,17,17,0.15)] pt-8 md:grid-cols-2">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em]">{agreement.publisherBlock}</p>
                <p className="mt-6 text-sm text-[#5A5550]">Authorized signature and date: countersigned by Gaze Press Global on acceptance of the manuscript.</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em]">For: the Author</p>
                <dl className="mt-6 grid gap-2 text-sm">
                  <div className="flex gap-2"><dt className="text-[#5A5550]">Signature:</dt><dd>{signature ? 'signed below' : <Blank value="" />}</dd></div>
                  <div className="flex gap-2"><dt className="text-[#5A5550]">Name:</dt><dd><Blank value={author} /></dd></div>
                  <div className="flex gap-2"><dt className="text-[#5A5550]">Date:</dt><dd>{today}</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </article>

        {/* ── accept and sign ── */}
        <fieldset className="border-t border-press-ink pt-8">
          <legend className="mb-6 font-press-head text-3xl">Accept &amp; sign</legend>
          <label className="flex max-w-3xl cursor-pointer items-start gap-3 text-[15px] leading-relaxed">
            <input type="checkbox" name="agree" required className="mt-1.5 accent-[#111111]" />
            I have read and understood this Publishing &amp; Literary Commission Agreement, and agree to be legally bound by its
            terms, including the non-refundable Sovereign Commission of $500 USD (Ksh 65,000).
          </label>
          <div className="mt-10 grid max-w-3xl gap-8 md:grid-cols-[1fr_14rem]">
            <div>
              <span className={label}>Author&apos;s signature*</span>
              <div className="mt-2">
                <SignaturePad id="signature" onChange={onSign} />
              </div>
              {signError && <p className="mt-2 text-[13px] text-[#9B2C2C]" role="alert">Please sign in the box above to complete the agreement.</p>}
            </div>
            <div className="flex flex-col gap-6">
              <p className="flex flex-col gap-1">
                <span className={label}>Name</span>
                <span className="border-b border-[rgba(17,17,17,0.35)] py-2">{author || '—'}</span>
              </p>
              <p className="flex flex-col gap-1">
                <span className={label}>Date</span>
                <span className="border-b border-[rgba(17,17,17,0.35)] py-2">{today}</span>
              </p>
            </div>
          </div>
          <button type="submit" className="mt-12 bg-press-ink px-9 py-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-press-paper transition-colors hover:bg-press-rose">
            Sign &amp; submit the agreement
          </button>
        </fieldset>
      </form>
    </div>
  );
}
