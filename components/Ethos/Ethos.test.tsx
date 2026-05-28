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
    expect(container.textContent).toContain('Founding Ethos');
    expect(container.textContent).toContain('We started in interiors');
    expect(container.textContent).toContain('Five disciplines');
    expect(container.textContent).toContain('African enterprise');
  });

  it('renders the pullquote with the accented word', () => {
    const { container } = render(<Ethos />);
    expect(container.textContent).toContain('We build companies that');
    expect(container.textContent).toContain('outlive');
    expect(container.textContent).toContain('us.');
  });
});
