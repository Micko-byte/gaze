import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Synergy } from './Synergy';

function mockReducedMotion() {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: q.includes('reduce'),
    media: q, onchange: null, addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
}

describe('Synergy', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    mockReducedMotion();
  });

  it('renders the heading and all 5 division labels', () => {
    const { container } = render(<Synergy />);
    expect(container.textContent).toContain('Cross-Division Synergy');
    expect(container.textContent).toContain('One');
    ['Furnishings', 'Press', 'Institute', 'Manor', 'HerGaze'].forEach(label => {
      // labels appear in both mobile stack and desktop SVG — at least once is enough
      expect(container.textContent).toContain(label);
    });
  });
});
