import { shopConfig } from './shop';

export const navLinks = [
  { label: 'The Group', href: '#divisions', external: false },
  { label: 'Vision', href: '#vision', external: false },
  { label: 'Press', href: '#press', external: false },
  { label: 'Contact', href: '#contact', external: false },
  { label: shopConfig.label, href: `${shopConfig.storefrontUrl}${shopConfig.collectionPath}`, external: true, accent: true },
] as const;
