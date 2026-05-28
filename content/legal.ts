/**
 * Legal copy. Editorial-grade placeholder until reviewed by counsel.
 * Drop-in editable. References Kenya Data Protection Act 2019 + GDPR.
 */

export const legalContent = {
  effectiveDate: 'May 28, 2026',
  entity: 'Gaze Holdings Limited',
  address: 'Nairobi, Kenya',
  contactEmail: 'legal@gazeholdings.com',
  privacy: {
    title: 'Privacy Notice',
    summary:
      'We collect what we need to do the work. We do not sell your information. Our practices comply with the Kenya Data Protection Act, 2019, and the EU General Data Protection Regulation where applicable.',
    sections: [
      {
        heading: 'What we collect',
        body: 'Name, email address, phone number, and any context you choose to share with us through enquiry forms, newsletter sign-ups, or correspondence. We also collect analytics data — page views, sessions, referrers — through Google Analytics 4 and Plausible.',
      },
      {
        heading: 'Why we collect it',
        body: 'To respond to your enquiry. To send you the work you asked to receive. To understand which parts of the site land and which do not. We do not use your data to train models or sell it to third parties.',
      },
      {
        heading: 'Where it lives',
        body: 'Form submissions are delivered to a Gaze Holdings inbox and a CRM (HubSpot or ActiveCampaign). Analytics is held by Google and Plausible per their privacy policies. We retain enquiry records for up to twenty-four months unless you request earlier deletion.',
      },
      {
        heading: 'Your rights',
        body: 'You may request a copy of the data we hold on you, ask for corrections, or request deletion at any time. Email legal@gazeholdings.com and we will respond within twenty working days.',
      },
      {
        heading: 'Children',
        body: 'This site is not directed at children under sixteen. We do not knowingly collect information from minors.',
      },
      {
        heading: 'Changes',
        body: 'We update this notice when our practices change. The effective date above will reflect the most recent revision.',
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    summary:
      'Plain terms for visiting and interacting with gazeholdings.com. By using this site you agree to what follows.',
    sections: [
      {
        heading: 'Ownership',
        body: 'All content, branding, photography, written work, and code on this site is owned by Gaze Holdings Limited or licensed for our use. You may share links and short quotations with attribution. You may not republish, mirror, or build derivative commercial works without written permission.',
      },
      {
        heading: 'Accuracy',
        body: 'We work to keep the information here accurate and current. Some statements concern future plans and may change. Nothing on this site constitutes an investment offer, a contract, or professional advice.',
      },
      {
        heading: 'Third-party links',
        body: 'Outbound links to division sites (Furnishings, Press, HerGaze) and to media coverage are provided for your convenience. We do not control those properties and are not responsible for their content.',
      },
      {
        heading: 'Liability',
        body: 'To the extent allowed by law, Gaze Holdings is not liable for losses arising from use of this site. Use is at your own risk.',
      },
      {
        heading: 'Governing law',
        body: 'These terms are governed by the laws of Kenya. Disputes will be resolved in the courts of Nairobi.',
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    summary:
      'A short list of the cookies and similar technologies this site uses, and why. You can decline non-essential cookies at any time using the banner that appears on first visit.',
    sections: [
      {
        heading: 'Essential',
        body: 'Required for the site to function — remembering your cookie preference, smooth-scroll session, and form state. These cannot be disabled because the site would not work without them.',
      },
      {
        heading: 'Analytics',
        body: 'Google Analytics 4 and Plausible record anonymised page views, sessions, and referrers so we can understand what works. You can decline these in the banner and refresh to opt out.',
      },
      {
        heading: 'Marketing',
        body: 'When campaigns are running, we may use Meta and Google pixels for retargeting. These only fire after you opt in.',
      },
      {
        heading: 'Controlling cookies',
        body: 'Most browsers let you block or delete cookies directly. Disabling essential cookies will break parts of the site. Disabling analytics and marketing cookies will not.',
      },
    ],
  },
} as const;
