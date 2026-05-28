import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CookieBanner } from './CookieBanner';

describe('CookieBanner', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders on first visit (no stored consent)', () => {
    render(<CookieBanner />);
    expect(screen.getByRole('dialog', { name: /cookie/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /accept all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /decline/i })).toBeInTheDocument();
  });

  it('persists choice and disappears after Accept all', () => {
    render(<CookieBanner />);
    fireEvent.click(screen.getByRole('button', { name: /accept all/i }));
    expect(screen.queryByRole('dialog')).toBeNull();
    const stored = window.localStorage.getItem('gaze.cookieConsent.v1');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.analytics).toBe(true);
    expect(parsed.marketing).toBe(true);
    expect(parsed.essential).toBe(true);
  });

  it('persists choice and disappears after Decline', () => {
    render(<CookieBanner />);
    fireEvent.click(screen.getByRole('button', { name: /decline/i }));
    const stored = JSON.parse(window.localStorage.getItem('gaze.cookieConsent.v1')!);
    expect(stored.analytics).toBe(false);
    expect(stored.marketing).toBe(false);
    expect(stored.essential).toBe(true);
  });

  it('does not render if consent was previously stored', () => {
    window.localStorage.setItem(
      'gaze.cookieConsent.v1',
      JSON.stringify({ essential: true, analytics: true, marketing: false, decidedAt: '2026-01-01T00:00:00Z' }),
    );
    render(<CookieBanner />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
