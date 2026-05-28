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
    expect(container.textContent).toContain('Divisions');
    expect(container.textContent).toContain('Countries');
    expect(container.textContent).toContain('Years in market');
  });
});
