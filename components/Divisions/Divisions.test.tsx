import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Divisions } from './Divisions';

function mockReducedMotion() {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: q.includes('reduce'),
    media: q, onchange: null, addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
}

describe('Divisions', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    mockReducedMotion();
  });

  it('renders the section heading and all 5 division names', () => {
    render(<Divisions />);
    expect(screen.getAllByText(/The Group/i)[0]).toBeInTheDocument();
    ['Gaze Furnishings', 'Gaze Press Global', 'Gaze Leadership Institute', 'The Gaze Manor', 'HerGaze Global'].forEach(name => {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    });
  });

  it('renders clickable linked cards in the marquee', () => {
    render(<Divisions />);
    ['Gaze Furnishings', 'Gaze Press Global', 'Gaze Leadership Institute', 'The Gaze Manor', 'HerGaze Global'].forEach(name => {
      const links = screen.getAllByRole('link', { name });
      expect(links.length).toBeGreaterThan(0);
      expect(links[0]).toHaveAttribute('href', expect.stringContaining('/'));
    });
  });
});
