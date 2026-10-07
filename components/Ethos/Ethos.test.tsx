import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Ethos } from './Ethos';

function mockReducedMotion() {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: q.includes('reduce'),
    media: q, onchange: null, addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
}

describe('Ethos', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    mockReducedMotion();
  });

  it('renders the eyebrow and manifesto sentences', () => {
    const { container } = render(<Ethos />);
    expect(container.textContent).toMatch(/The Architecture of Influence/);
    expect(container.textContent).toContain('apex parent enterprise rooted in Nairobi');
    expect(container.textContent).toContain('anchor institutions of enduring power');
    expect(container.textContent).toContain('the ultimate ecosystem');
  });

  it('renders the pullquote with the accented word', () => {
    const { container } = render(<Ethos />);
    expect(container.textContent).toContain('Excellence is not an aspiration');
    expect(container.textContent).toContain('native standard');
  });
});
