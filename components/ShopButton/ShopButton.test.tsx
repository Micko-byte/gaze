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

  it('points at the Shopify storefront in a new tab', () => {
    render(<ShopButton />);
    const link = screen.getByRole('link', { name: shopConfig.ariaLabel });
    expect(link).toHaveAttribute('href', `${shopConfig.storefrontUrl}${shopConfig.collectionPath}`);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
