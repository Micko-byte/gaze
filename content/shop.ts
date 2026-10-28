/**
 * Where "Shop" goes. Since 28 Oct 2026 Gaze Furnishings sells on this site (a bag and a one-page checkout under
 * /furnishings), so Shop opens its collection here instead of a separate Shopify storefront.
 */

export const shopConfig = {
  storefrontUrl: '/furnishings',
  /** Lands shoppers on the collection. */
  collectionPath: '#collection',
  /** Label used across Nav, floating pill, and Hero CTA. */
  label: 'Shop',
  /** Longer label for the floating pill on desktop. */
  longLabel: 'Shop the collection',
  /** ARIA description for screen readers. */
  ariaLabel: 'Shop the Gaze Furnishings collection',
} as const;

/** Convenience: full URL to send shoppers to. */
export const shopHref = `${shopConfig.storefrontUrl}${shopConfig.collectionPath}`;
