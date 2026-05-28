import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from './not-found';

describe('NotFound', () => {
  it('renders the editorial 404 copy and CTAs', () => {
    const { container } = render(<NotFound />);
    expect(container.textContent).toContain('Error 404');
    expect(container.textContent).toContain('Not in the');
    expect(container.textContent).toContain('catalogue');
    expect(container.textContent).toContain('Back to the group');
    expect(container.textContent).toContain('Or get in touch');
  });

  it('renders the BrandMark', () => {
    const { container } = render(<NotFound />);
    // BrandMark SVG contains GAZE + HOLDINGS as <text> nodes
    expect(container.textContent).toContain('GAZE');
    expect(container.textContent).toContain('HOLDINGS');
  });
});
