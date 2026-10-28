import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ShopButton } from './ShopButton';
import { shopConfig } from '@/content/shop';

describe('ShopButton', () => {
  it('renders both the short and long labels', () => {
    const { container } = render(<ShopButton />);
    expect(container.textContent).toContain(shopConfig.label);
    expect(container.textContent).toContain(shopConfig.longLabel);
  });

  it('opens the Furnishings collection on this site', () => {
    render(<ShopButton />);
    const link = screen.getByRole('link', { name: shopConfig.ariaLabel });
    expect(link).toHaveAttribute('href', '/furnishings#collection');
    expect(link).not.toHaveAttribute('target');
  });
});
