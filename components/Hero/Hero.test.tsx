import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the eyebrow, headline text, and sub', () => {
    const { container } = render(<Hero />);
    // textContent matchers tolerate SplitType wrapping individual words in spans (added in Task 11)
    expect(container.textContent).toContain('Gaze Holdings');
    expect(container.textContent).toContain('A group of brands');
    expect(container.textContent).toContain('legacy');
    expect(container.textContent).toContain('Strategic leadership');
  });

  it('renders the CTA targeting #ethos', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /Enter the Group/i });
    expect(cta).toHaveAttribute('href', '#ethos');
  });
});
