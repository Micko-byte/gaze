import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Cursor } from './Cursor';

function mockMatchMedia(matches: (q: string) => boolean) {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: matches(q),
    media: q, onchange: null, addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
}

describe('Cursor', () => {
  beforeEach(() => { vi.unstubAllGlobals(); });

  it('does not render on touch devices', () => {
    mockMatchMedia(q => q === '(pointer: fine)' ? false : false);
    const { container } = render(<Cursor />);
    expect(container.querySelector('[data-testid="custom-cursor"]')).toBeNull();
  });

  it('does not render when reduced-motion is set', () => {
    mockMatchMedia(q => q === '(pointer: fine)' ? true : q === '(prefers-reduced-motion: reduce)');
    const { container } = render(<Cursor />);
    expect(container.querySelector('[data-testid="custom-cursor"]')).toBeNull();
  });

  it('renders on fine-pointer desktop with motion allowed', () => {
    mockMatchMedia(q => q === '(pointer: fine)');
    const { container } = render(<Cursor />);
    expect(container.querySelector('[data-testid="custom-cursor"]')).not.toBeNull();
  });
});
