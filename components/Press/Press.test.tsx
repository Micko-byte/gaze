import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Press } from './Press';

function mockReducedMotion() {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: q.includes('reduce'),
    media: q, onchange: null, addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
}

describe('Press', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    mockReducedMotion();
  });

  it('renders the recognition heading and the real award', () => {
    const { container } = render(<Press />);
    expect(container.textContent).toContain('Recognition');
    expect(container.textContent).toContain('The work,');
    expect(container.textContent).toContain('Businesswoman of the Year');
    expect(container.textContent).toContain('She Millionaire');
    expect(container.textContent).toContain('Muthoni Ngugi');
  });

  it('does NOT render fabricated press logos', () => {
    const { container } = render(<Press />);
    ['Forbes Africa', 'CNBC Africa', 'Capital FM', 'Nation Media', 'KTN News'].forEach(fake => {
      expect(container.textContent).not.toContain(fake);
    });
  });

  it('offers a media enquiry route to contact', () => {
    const { container } = render(<Press />);
    const link = container.querySelector('a[href="#contact"]');
    expect(link).not.toBeNull();
    expect(container.textContent).toContain('Media & press enquiries');
  });
});
