/**
 * The client's Publishing & Literary Commission Agreement, word for word (received 7 Oct 2026). The blanks for the
 * date, the author and the title of the work are filled in from the signing form.
 */
export const agreement = {
  title: 'Publishing & Literary Commission Agreement',
  publisher:
    'Gaze Press Global, an operating division of Gaze Holdings Ltd., having its principal place of business in Nairobi, Kenya (hereinafter referred to as the "Publisher")',
  clauses: [
    {
      heading: 'Purpose & scope of engagement',
      parts: [
        'The Author engages the Publisher to provide exclusive, white-glove literary architecture, editorial curation, global registration, and promotional launch support for the manuscript tentatively titled:',
        '{title}',
        'The Publisher accepts this commission under the uncompromised standards of Gaze Press Global, ensuring the Work is elevated to an institutional, international standard.',
      ],
    },
    {
      heading: 'Financial terms & commission investment',
      parts: [
        'The Sovereign Commission: The Author agrees to pay a non-refundable base commission fee of $500 USD (equivalent to Ksh 65,000) upon the execution of this Agreement and prior to the commencement of the editorial architecture.',
        'Inclusion: This fee covers structural editing, proofreading, bespoke cover design, interior layout styling, ISBN acquisition, digital cataloging, ecosystem launch campaigns, and two (2) complimentary physical author copy samples.',
      ],
    },
    {
      heading: 'Physical production & variable printing terms',
      parts: [
        'On-Demand & Bulk Printing: Beyond the initial author copies, physical printing of the Work shall be managed through the Publisher’s designated network.',
        'Production Pricing: Printing fees shall range between Ksh 500 and Ksh 1,000 per copy, determined strictly by the final page count, paper stock quality, and binding specifications chosen for the edition. Payment for additional print runs must be rendered in full prior to production.',
      ],
    },
    {
      heading: 'Intellectual property & rights',
      parts: [
        'Copyright Retention: The Author retains full ownership of the copyright and intellectual property rights of the Work.',
        'Publishing License: The Author grants Gaze Press Global the exclusive, worldwide license to publish, distribute, market, and promote the Work across digital and physical mediums under the Gaze Press Global imprint for the duration of this agreement, or as otherwise agreed in writing.',
      ],
    },
    {
      heading: 'Publisher obligations (the atelier pipeline)',
      parts: [
        'The Publisher commits to executing the following lifecycle for the Work:',
        'Editorial Suite: Professional line editing, copyediting, and structural refinement.',
        'Bespoke Styling: Custom exterior cover art and interior typography curation.',
        'Global Registration: Formal procurement of the book’s official ISBN.',
        'Author Archive: Delivery of two (2) physical, high-grade author copy samples to the Author.',
        'Ecosystem Launch: Integration of the Work into the Gaze Press Global digital network and announcement across conglomerate marketing channels.',
      ],
    },
    {
      heading: 'Governing law',
      parts: [
        'This Agreement shall be governed by, interpreted, and construed in accordance with the laws of the Republic of Kenya.',
      ],
    },
  ],
  witness:
    'IN WITNESS WHEREOF, the parties hereto have executed this Publishing & Literary Commission Agreement as of the Effective Date written above.',
  publisherBlock: 'For: Gaze Press Global (parent: Gaze Holdings Ltd.)',
} as const;
