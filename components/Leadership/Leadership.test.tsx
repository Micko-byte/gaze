import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Leadership } from './Leadership';

function mockReducedMotion() {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: q.includes('reduce'),
    media: q, onchange: null, addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
}

describe('Leadership', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    mockReducedMotion();
  });

  it('renders founder name, role, bio, and stats', () => {
    const { container } = render(<Leadership />);
    expect(container.textContent).toContain('Muthoni');
    expect(container.textContent).toContain('Ngugi');
    expect(container.textContent).toContain('Founder & Director');
    expect(container.textContent).toContain('African enterprise');
    expect(container.textContent).toContain('Businesswoman of the Year');
    expect(container.textContent).toContain('Years Experience');
    expect(container.textContent).toContain('Furnitures Delivered');
    expect(container.textContent).toContain('Countries Served');
    expect(container.textContent).toContain('Leaders Trained');
  });

  it('keeps the leadership eyebrow at its requested small size', () => {
    const { container } = render(<Leadership />);
    const eyebrow = container.querySelector('h2 > span');

    expect(eyebrow?.className).toContain('text-[12px]');
    expect(eyebrow?.className).not.toContain('text-[clamp');
  });
});
