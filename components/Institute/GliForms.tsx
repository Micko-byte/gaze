'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { corporate, gliContact, prophetic, schools, whoCanApply } from '@/content/institute';

/*
 * The Institute's three forms: apply, request corporate training, and write to us. Like the Holdings contact form,
 * they confirm on the page for now; delivery to the GLI inboxes is wired in with the back end.
 */

const field =
  'w-full border-0 border-b-2 border-[rgba(0,11,61,0.25)] bg-transparent px-0 py-3 font-gli-text text-[16px] font-medium text-gli-navy placeholder:text-[rgba(0,11,61,0.45)] focus:border-gli-red focus:outline-none focus:ring-0 transition-colors';

function Label({ children, htmlFor }: { children: ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="font-gli-text text-[12px] font-bold uppercase tracking-[0.2em] text-gli-navy">
      {children}
    </label>
  );
}

function Row({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

function Submit({ children }: { children: ReactNode }) {
  return (
    <button type="submit" className="mt-4 self-start bg-gli-red px-8 py-4 font-gli-text text-[13px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-gli-navy">
      {children}
    </button>
  );
}

function Thanks({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="border-l-[6px] border-gli-red bg-white p-8 md:p-10">
      <p className="font-gli-head text-[clamp(32px,3.4vw,48px)] uppercase leading-[1.02] text-gli-navy">{title}</p>
      <p className="mt-4 max-w-[52ch] font-gli-text text-[17px] font-medium leading-relaxed text-gli-ink">{children}</p>
    </div>
  );
}

function useSubmit(kind: string) {
  const [sent, setSent] = useState<Record<string, FormDataEntryValue> | null>(null);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // eslint-disable-next-line no-console
    console.log(`[GLI] ${kind}:`, data);
    setSent(data);
  };
  return { sent, onSubmit };
}

export function ApplicationForm() {
  const { sent, onSubmit } = useSubmit('application');
  if (sent)
    return (
      <Thanks title="Your application is in.">
        Thank you, {String(sent.name).split(' ')[0]}. Our admissions team will review it and write to you at {String(sent.email)} with
        the outcome and how to secure your seat. Questions in the meantime go to {gliContact.admissions}.
      </Thanks>
    );

  return (
    <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2">
      <Row id="ap-name" label="Full name">
        <input id="ap-name" name="name" required autoComplete="name" className={field} />
      </Row>
      <Row id="ap-email" label="Email">
        <input id="ap-email" name="email" type="email" required autoComplete="email" className={field} />
      </Row>
      <Row id="ap-phone" label="Phone (M-Pesa number if paying by M-Pesa)">
        <input id="ap-phone" name="phone" type="tel" required autoComplete="tel" className={field} />
      </Row>
      <Row id="ap-city" label="City & country">
        <input id="ap-city" name="city" autoComplete="address-level2" className={field} />
      </Row>
      <Row id="ap-programme" label="Program">
        <select id="ap-programme" name="programme" required defaultValue="" className={field}>
          <option value="" disabled>Choose a program</option>
          {schools.map((s) => (
            <optgroup key={s.id} label={`School of ${s.name}`}>
              {s.programmes.map((p) => (
                <option key={p.title} value={p.title}>{p.title} · {p.weeks} weeks</option>
              ))}
            </optgroup>
          ))}
        </select>
      </Row>
      <Row id="ap-who" label="You are applying as">
        <select id="ap-who" name="applicant" required defaultValue="" className={field}>
          <option value="" disabled>Choose one</option>
          {whoCanApply.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </Row>
      <div className="md:col-span-2">
        <Row id="ap-why" label="What do you want this program to change for you?">
          <textarea id="ap-why" name="why" required rows={4} className={`${field} resize-none`} />
        </Row>
      </div>
      <label className="flex items-start gap-3 font-gli-text text-[14px] font-medium leading-relaxed text-gli-ink md:col-span-2">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#DC0E20]" />
        I agree that GLI may contact me about this application, and that my place is confirmed only once it is approved and paid for.
      </label>
      <div className="md:col-span-2">
        <Submit>Submit application</Submit>
      </div>
    </form>
  );
}

export function CorporateForm() {
  const { sent, onSubmit } = useSubmit('corporate request');
  if (sent)
    return (
      <Thanks title="Request received.">
        Thank you. A GLI corporate lead will contact {String(sent.name).split(' ')[0]} at {String(sent.email)} to scope the training for{' '}
        {String(sent.organisation)}.
      </Thanks>
    );

  return (
    <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2">
      <Row id="co-org" label="Organization">
        <input id="co-org" name="organisation" required autoComplete="organization" className={field} />
      </Row>
      <Row id="co-name" label="Your name & role">
        <input id="co-name" name="name" required autoComplete="name" className={field} />
      </Row>
      <Row id="co-email" label="Work email">
        <input id="co-email" name="email" type="email" required autoComplete="email" className={field} />
      </Row>
      <Row id="co-phone" label="Phone">
        <input id="co-phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </Row>
      <Row id="co-size" label="People to train">
        <select id="co-size" name="size" required defaultValue="" className={field}>
          <option value="" disabled>Choose a range</option>
          {['Up to 10', '11–25', '26–50', '51–100', 'More than 100'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Row>
      <Row id="co-format" label="Where">
        <select id="co-format" name="format" required defaultValue="" className={field}>
          <option value="" disabled>Choose a format</option>
          {['At our offices', 'At GLI in Nairobi', 'Live virtual sessions', 'A mix'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Row>
      <fieldset className="md:col-span-2">
        <legend className="font-gli-text text-[12px] font-bold uppercase tracking-[0.2em] text-gli-navy">Training needed</legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {corporate.solutions.map((s) => (
            <label key={s} className="flex items-center gap-3 font-gli-text text-[15px] font-semibold text-gli-ink">
              <input type="checkbox" name="training" value={s} className="h-4 w-4 accent-[#DC0E20]" />
              {s}
            </label>
          ))}
          <label className="flex items-center gap-3 font-gli-text text-[15px] font-semibold text-gli-ink">
            <input type="checkbox" name="faith" value="Faith-friendly approach" className="h-4 w-4 accent-[#DC0E20]" />
            Faith-friendly approach
          </label>
        </div>
      </fieldset>
      <div className="md:col-span-2">
        <Row id="co-msg" label="What should change in your team?">
          <textarea id="co-msg" name="message" rows={4} className={`${field} resize-none`} />
        </Row>
      </div>
      <div className="md:col-span-2">
        <Submit>Request corporate training</Submit>
      </div>
    </form>
  );
}

export function ContactForm() {
  const { sent, onSubmit } = useSubmit('message');
  if (sent)
    return (
      <Thanks title="Message sent.">
        Thank you, {String(sent.name).split(' ')[0]}. We will reply to {String(sent.email)} shortly.
      </Thanks>
    );

  return (
    <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2">
      <Row id="ct-name" label="Name">
        <input id="ct-name" name="name" required autoComplete="name" className={field} />
      </Row>
      <Row id="ct-email" label="Email">
        <input id="ct-email" name="email" type="email" required autoComplete="email" className={field} />
      </Row>
      <Row id="ct-phone" label="Phone">
        <input id="ct-phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </Row>
      <Row id="ct-about" label="About">
        <select id="ct-about" name="about" required defaultValue="" className={field}>
          <option value="" disabled>Choose a topic</option>
          {['A program', 'Admissions & fees', 'Corporate training', 'Partnership', 'Something else'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Row>
      <div className="md:col-span-2">
        <Row id="ct-msg" label="Message">
          <textarea id="ct-msg" name="message" required rows={5} className={`${field} resize-none`} />
        </Row>
      </div>
      <div className="md:col-span-2">
        <Submit>Send message</Submit>
      </div>
    </form>
  );
}

/**
 * Intake for the School of Prophetic Intelligence: the fields the client set out (name, organisation / designation,
 * sector, statement of intent, intake term), with email and phone so the Institute can answer. Arriving through
 * #assessment preselects an assessment call instead of an application.
 */
export function PropheticIntakeForm() {
  const { sent, onSubmit } = useSubmit('prophetic intake');
  const [kind, setKind] = useState<'apply' | 'call'>('apply');

  useEffect(() => {
    const pick = () => setKind(location.hash === '#assessment' ? 'call' : 'apply');
    pick();
    window.addEventListener('hashchange', pick);
    return () => window.removeEventListener('hashchange', pick);
  }, []);

  if (sent)
    return (
      <Thanks title={sent.request === 'Reserve an assessment call' ? 'Your call is requested.' : 'Your application is in.'}>
        Thank you, {String(sent.name).split(' ')[0]}. The Faculty will write to {String(sent.email)} to{' '}
        {sent.request === 'Reserve an assessment call' ? 'arrange your assessment call.' : 'confirm your place in the cohort.'}
      </Thanks>
    );

  return (
    <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2">
      <fieldset className="md:col-span-2">
        <legend className="font-gli-text text-[12px] font-bold uppercase tracking-[0.2em] text-gli-navy">I would like to</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {(['apply', 'call'] as const).map((k) => (
            <label key={k} className={`cursor-pointer border-2 px-5 py-3 font-gli-text text-[14px] font-bold transition-colors ${kind === k ? 'border-gli-navy bg-gli-navy text-white' : 'border-[rgba(0,11,61,0.25)] text-gli-navy'}`}>
              <input type="radio" name="request" value={k === 'apply' ? 'Apply for the next cohort' : 'Reserve an assessment call'} checked={kind === k} onChange={() => setKind(k)} className="sr-only" />
              {k === 'apply' ? 'Apply for the next cohort' : 'Reserve an assessment call'}
            </label>
          ))}
        </div>
      </fieldset>
      <Row id="pi-name" label="Full name">
        <input id="pi-name" name="name" required autoComplete="name" className={field} />
      </Row>
      <Row id="pi-org" label="Organization / designation">
        <input id="pi-org" name="organization" required autoComplete="organization-title" className={field} />
      </Row>
      <Row id="pi-email" label="Email">
        <input id="pi-email" name="email" type="email" required autoComplete="email" className={field} />
      </Row>
      <Row id="pi-phone" label="Phone">
        <input id="pi-phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </Row>
      <Row id="pi-sector" label="Primary sector">
        <select id="pi-sector" name="sector" required defaultValue="" className={field}>
          <option value="" disabled>Choose a sector</option>
          {prophetic.sectors.map((x) => (
            <option key={x} value={x}>{x}</option>
          ))}
        </select>
      </Row>
      <Row id="pi-track" label="Track">
        <select id="pi-track" name="track" required defaultValue={prophetic.tracks[0]} className={field}>
          {prophetic.tracks.map((x) => (
            <option key={x} value={x}>{x}</option>
          ))}
        </select>
      </Row>
      <div className="md:col-span-2">
        <Row id="pi-term" label="Preferred intake term">
          <select id="pi-term" name="term" required defaultValue={prophetic.terms[0]} className={field}>
            {prophetic.terms.map((x) => (
              <option key={x} value={x}>{x}</option>
            ))}
          </select>
        </Row>
      </div>
      <div className="md:col-span-2">
        <Row id="pi-intent" label="Statement of intent: what primary transition or vision are you seeking divine alignment on?">
          <textarea id="pi-intent" name="intent" required rows={5} className={`${field} resize-none`} />
        </Row>
      </div>
      <div className="md:col-span-2">
        <Submit>{kind === 'apply' ? 'Apply for the next cohort' : 'Reserve an assessment call'}</Submit>
      </div>
    </form>
  );
}
