import { organization } from '@/content/organization';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    legalName: organization.legalName,
    url: organization.url,
    logo: organization.logo,
    founder: { '@type': 'Person', name: organization.founder.name, jobTitle: organization.founder.jobTitle },
    address: {
      '@type': 'PostalAddress',
      addressLocality: organization.address.addressLocality,
      addressCountry: organization.address.addressCountry,
    },
    subOrganization: organization.divisions.map(d => ({
      '@type': 'Organization', name: d.name, url: d.url,
    })),
  };
}
