'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'gaze.cookieConsent.v1';

type Consent = {
  essential: true; // always on, cannot be declined
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    // Notify the rest of the app (analytics loaders etc.)
    window.dispatchEvent(new CustomEvent('gaze:cookie-consent', { detail: consent }));
  } catch {
    /* localStorage blocked — fail silent */
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) setVisible(true);
  }, []);

  function decide(analytics: boolean, marketing: boolean) {
    const consent: Consent = {
      essential: true,
      analytics,
      marketing,
      decidedAt: new Date().toISOString(),
    };
    writeConsent(consent);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 bg-obsidian/95 backdrop-blur-md border-t border-rose"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="flex-1">
          <div className="font-display text-[0.6rem] tracking-[0.35em] uppercase text-rose font-medium mb-2">
            Cookie preferences
          </div>
          <p className="text-ivory/75 text-sm leading-relaxed max-w-2xl">
            We use essential cookies to run the site. Analytics and marketing cookies help us understand what works and reach the right people &mdash; only with your consent.{' '}
            <a href="/legal/cookies" className="text-rose hover:text-champagne transition-colors underline-offset-4 hover:underline">
              Read the cookie policy
            </a>
            .
          </p>

          {expanded && (
            <div className="mt-4 space-y-3 max-w-2xl">
              <ConsentRow label="Essential" description="Required for the site to function. Always on." locked />
              <ConsentRow label="Analytics" description="GA4 + Plausible. Anonymised page views." />
              <ConsentRow label="Marketing" description="Meta + Google pixels for retargeting." />
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {!expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="font-display text-[0.6rem] tracking-[0.3em] uppercase text-ivory/65 hover:text-rose transition-colors px-3 py-2"
            >
              Customise
            </button>
          )}
          <button
            type="button"
            onClick={() => decide(false, false)}
            className="font-display text-[0.6rem] tracking-[0.3em] uppercase text-ivory/65 hover:text-rose transition-colors px-3 py-2"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide(true, true)}
            className="font-display text-[0.6rem] tracking-[0.3em] uppercase text-obsidian font-medium bg-rose hover:bg-champagne transition-colors px-4 py-2"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsentRow({ label, description, locked }: { label: string; description: string; locked?: boolean }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className={`mt-0.5 inline-block w-3 h-3 border ${locked ? 'bg-rose border-rose' : 'border-hairline'}`} aria-hidden="true" />
      <div>
        <div className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-ivory">{label}{locked && <span className="text-rose ml-2">always on</span>}</div>
        <div className="text-ivory/55 text-xs mt-1">{description}</div>
      </div>
    </div>
  );
}
