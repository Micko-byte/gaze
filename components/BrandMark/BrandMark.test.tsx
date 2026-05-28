import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrandMark } from './BrandMark';

describe('BrandMark', () => {
  it('renders the GAZE and HOLDINGS wordmarks in inline variant', () => {
    const { container } = render(<BrandMark />);
    expect(container.textContent).toContain('GAZE');
    expect(container.textContent).toContain('HOLDINGS');
  });

  it('renders the stacked variant with same wordmarks', () => {
    const { container } = render(<BrandMark variant="stacked" />);
    expect(container.textContent).toContain('GAZE');
    expect(container.textContent).toContain('HOLDINGS');
  });

  it('exposes an accessible label', () => {
    render(<BrandMark ariaLabel="Test label" />);
    expect(screen.getByRole('img', { name: 'Test label' })).toBeInTheDocument();
  });

  it('defaults aria-label to "Gaze Holdings"', () => {
    render(<BrandMark />);
    expect(screen.getByRole('img', { name: 'Gaze Holdings' })).toBeInTheDocument();
  });
});
