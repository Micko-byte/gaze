import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Hero } from './Hero';

// Force reduced-motion so SplitType doesn't mutate the DOM during tests.
function mockReducedMotion() {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: q.includes('reduce'),
    media: q, onchange: null, addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
}

describe('Hero', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    mockReducedMotion();
  });

  it('renders the eyebrow, headline text, and sub', () => {
    const { container } = render(<Hero />);
    expect(container.textContent).toContain('Gaze Holdings');
    // The headline parts are separate elements, so textContent has no space
    // between them; the gap is a margin on the accent.
    expect(container.textContent).toContain('A House');
    expect(container.textContent).toContain('Brands');
    expect(container.textContent).toContain('Four houses');
  });
});
