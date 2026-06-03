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
    expect(container.textContent).toMatch(/Philosophy/);
    expect(container.textContent).toContain('great brands do not merely sell');
    expect(container.textContent).toContain('spaces where people live, learn, lead');
    expect(container.textContent).toContain('architects of influence');
  });

  it('renders the pullquote with the accented word', () => {
    const { container } = render(<Ethos />);
    expect(container.textContent).toContain('We build companies that');
    expect(container.textContent).toContain('outlive');
    expect(container.textContent).toContain('us.');
  });
});
