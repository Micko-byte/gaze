import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the brand lockup, tagline, and copyright', () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toContain('HOLDINGS');
    expect(container.textContent).toContain('Nairobi');
    expect(container.textContent).toContain('Global scale');
    expect(container.textContent).toContain('© 2026 Gaze Holdings Ltd.');
  });

  it('renders newsletter and legal links', () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toContain('Quarterly. No noise.');
    ['Privacy', 'Terms', 'Cookies'].forEach(link => {
      expect(container.textContent).toContain(link);
    });
  });

  it('renders all 5 division mark links', () => {
    const { container } = render(<Footer />);
    ['Furnishings', 'Press', 'Institute', 'Manor', 'HerGaze'].forEach(d => {
      expect(container.textContent).toContain(d);
    });
  });
});
