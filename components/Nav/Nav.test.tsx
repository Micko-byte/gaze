import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders the brand lockup', () => {
    render(<Nav />);
    expect(screen.getByText(/HOLDINGS/i)).toBeInTheDocument();
  });

  it('renders all four nav links', () => {
    render(<Nav />);
    ['The Group', 'Vision', 'Press', 'Contact'].forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
