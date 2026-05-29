import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Reveal } from './Reveal';

function mockReducedMotion() {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: q.includes('reduce'),
    media: q, onchange: null, addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
}

describe('Reveal', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    mockReducedMotion();
  });

  it('renders its children', () => {
    render(<Reveal><p>visible content</p></Reveal>);
    expect(screen.getByText('visible content')).toBeInTheDocument();
  });

  it('passes through className', () => {
    const { container } = render(<Reveal className="test-class"><span>x</span></Reveal>);
    expect(container.querySelector('.test-class')).not.toBeNull();
  });
});
