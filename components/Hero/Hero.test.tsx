import { render, screen } from '@testing-library/react';
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
    expect(container.textContent).toContain('A House of Brands');
    expect(container.textContent).toContain('A group of brands');
    expect(container.textContent).toContain('legacy');
    expect(container.textContent).toContain('Five companies');
  });

  it('renders the CTA targeting #ethos', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /Enter the Group/i });
    expect(cta).toHaveAttribute('href', '#ethos');
  });
});
