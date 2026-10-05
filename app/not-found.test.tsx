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

  it('renders the Gaze Holdings logo', () => {
    const { getByRole } = render(<NotFound />);
    // the logo is traced artwork (paths, no <text>), exposed by its accessible name
    expect(getByRole('img', { name: 'Gaze Holdings' })).toBeInTheDocument();
  });
});
