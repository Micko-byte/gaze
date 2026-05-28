import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders the brand lockup', () => {
    render(<Nav />);
    // Brand appears in both desktop bar and (hidden) mobile overlay header
    const brands = screen.getAllByText(/HOLDINGS/i);
    expect(brands.length).toBeGreaterThan(0);
  });

  it('renders all five nav links (desktop bar)', () => {
    render(<Nav />);
    // Desktop links exist (note: nav has 5 items now including Shop)
    ['The Group', 'Vision', 'Press', 'Contact', 'Shop'].forEach(label => {
      const matches = screen.getAllByText(label);
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  it('exposes a hamburger button to open the mobile menu', () => {
    render(<Nav />);
    const open = screen.getByRole('button', { name: /open menu/i });
    expect(open).toBeInTheDocument();
    expect(open).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the mobile menu on hamburger click and closes via the close button', () => {
    render(<Nav />);
    const open = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(open);
    expect(open).toHaveAttribute('aria-expanded', 'true');

    const close = screen.getByRole('button', { name: /close menu/i });
    fireEvent.click(close);
    expect(open).toHaveAttribute('aria-expanded', 'false');
  });
});
