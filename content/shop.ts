/**
 * Shopify storefront configuration.
 *
 * The storefront URL is the single source of truth for both the product
 * catalogue and the payment gateway. Shopify handles both natively —
 * Visa / Mastercard / Amex, M-Pesa STK Push (via Safaricom Kenya), Apple Pay,
 * Google Pay, Shop Pay, and PayPal — once configured in the Shopify admin.
 *
 * To switch to a real store later:
 *   1. Update `storefrontUrl` below to your live Shopify domain
 *      (e.g. https://gaze-furnishings.myshopify.com or https://furnishings.gaze.co).
 *   2. Optionally point `collectionPath` at a specific collection slug
 *      (e.g. "/collections/luxury-living") so the button lands users on
 *      products rather than the storefront homepage.
 */

export const shopConfig = {
  /** Final domain per the brief. Will resolve when DNS + Shopify are connected. */
  storefrontUrl: 'https://furnishings.gaze.co',
  /** Default collection path to land the user on the catalogue. */
  collectionPath: '/collections/all',
  /** Label used across Nav, floating pill, and Hero CTA. */
  label: 'Shop',
  /** Longer label for the floating pill on desktop. */
  longLabel: 'Shop the collection',
  /** ARIA description for screen readers. */
  ariaLabel: 'Shop Gaze Furnishings — opens the storefront in a new tab',
} as const;

/** Convenience: full URL to send shoppers to. */
export const shopHref = `${shopConfig.storefrontUrl}${shopConfig.collectionPath}`;
