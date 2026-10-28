/*
 * The Master Terms & Conditions of Gaze Furnishings Kenya Limited, as the client issued them in "Gaze Forms"
 * (27 Oct 2026). Transcribed word for word, apart from the company's name, which the form spells "Gaze Furnishing";
 * change nothing here without her.
 */
export type TermsSection = { title: string; paragraphs?: string[]; points?: string[]; after?: string[] };

export const masterTerms: ReadonlyArray<TermsSection> = [
  {
    title: 'Application',
    paragraphs: [
      'These Terms and Conditions apply to all quotations, sales, manufacture, supply, delivery, and installation of goods and services provided by Gaze Furnishings Kenya Limited (the Company).',
      'By confirming an order or making any payment, the Client is deemed to have accepted these Terms and Conditions.',
    ],
  },
  {
    title: 'Pricing & VAT',
    points: [
      'All prices quoted are inclusive of VAT unless otherwise stated.',
      'The Company reserves the right to amend prices prior to receipt of the required deposit where costs of materials or inputs materially change.',
      'Once the deposit is received, the quoted price is locked for that order.',
    ],
  },
  {
    title: 'Payment Terms',
    points: [
      'Standard payment structure: 75% deposit and 25% balance upon completion prior to delivery.',
      'Production shall only commence after the required deposit is received in full.',
      'Goods paid by cheque shall only be released after full bank clearance.',
      'The Company reserves the right to charge for any dishonored cheques and associated recovery costs.',
    ],
  },
  {
    title: 'Ownership of Goods',
    paragraphs: [
      'Ownership (title) of all goods remains with the Company until full payment has been received and cleared.',
      'The Company reserves the right to withhold delivery or recover goods where payment obligations are not met.',
    ],
  },
  {
    title: 'Delivery & Transport',
    points: [
      'Delivery fees shall be borne by the Client and are calculated based on distance and logistics.',
      'Delivery scheduling occurs only after full balance payment.',
      'The Client must ensure safe access and site readiness.',
    ],
    after: [
      'Risk in Transit: risk in the goods passes to the Client upon dispatch from the Company’s warehouse, whether transportation is arranged by the Company or by the Client.',
    ],
  },
  {
    title: 'Inspection Prior to Final Payment',
    paragraphs: ['Clients are encouraged to verify the quality and accuracy of goods prior to making final payment by either:'],
    points: [
      'Physical inspection at the Company premises; or',
      'Receiving clear photos or video confirmation from the Company (especially for remote or international clients).',
    ],
    after: ['Approval via photo, video, email, or written confirmation shall constitute acceptance of the goods.'],
  },
  {
    title: 'Client Responsibilities',
    paragraphs: ['The Client shall:'],
    points: [
      'Confirm that items will fit through doorways, staircases, lifts, and access points.',
      'Ensure the site is ready for delivery and installation.',
      'Provide accurate measurements where supplied by the Client.',
      'Arrange adequate manpower for unloading where agreed.',
    ],
    after: ['Any additional on-site work requested shall be charged separately.'],
  },
  {
    title: 'Unloading',
    paragraphs: [
      'Unless expressly agreed in writing, unloading at the delivery site is the Client’s responsibility.',
      'Where the Company assists with unloading, it is done on a best-effort basis and at the Client’s risk.',
    ],
  },
  {
    title: 'Handcrafted Variation',
    paragraphs: ['All products are handcrafted and custom-made.', 'Minor variations in:'],
    points: ['wood grain', 'fabric shade', 'stitching', 'finish', 'dimensions within reasonable tolerance'],
    after: ['are inherent in handmade furniture and shall not be considered defects.'],
  },
  {
    title: 'Warranty (Limited)',
    paragraphs: ['The Company provides a limited workmanship warranty of 1 month covering manufacturing defects only.', 'The warranty does NOT cover:'],
    points: ['Normal wear and tear', 'Misuse or negligence', 'Water or environmental damage', 'Customer-supplied materials', 'Third-party alterations or handling after delivery'],
    after: ['The Company shall be given one opportunity to rectify any verified manufacturing defect.'],
  },
  {
    title: 'Communication & Electronic Records',
    paragraphs: ['Official project communications may occur via:'],
    points: ['Email', 'Written correspondence', 'WhatsApp messaging'],
    after: ['Where the Client provides instructions, approvals, or confirmations via WhatsApp or email, such communications shall be deemed valid and binding.'],
  },
  {
    title: 'Documentation',
    paragraphs: ['Clients must obtain and safely keep:'],
    points: ['Official invoice', 'Payment receipts', 'Deposit confirmations'],
    after: [
      'The original invoice or authorized written instruction may be required for collection.',
      'Where a representative is sent, written authorization and identification shall be mandatory.',
    ],
  },
  {
    title: 'Storage',
    paragraphs: [
      'If goods are not collected or delivery is not accepted within 10 days after completion notice, storage charges shall apply at:',
      'KES 2,500 per day until collection or delivery.',
    ],
  },
  {
    title: 'Delays',
    paragraphs: ['The Company shall not be liable for delays caused by:'],
    points: ['Client actions or inactions', 'Site unreadiness', 'Material shortages', 'Power interruptions', 'Supplier delays', 'Transport disruptions', 'Force majeure events'],
    after: ['Where delays occur beyond the Company’s control, written notice shall be issued to the Client and timelines reasonably extended.'],
  },
  {
    title: 'Returns & Refunds',
    paragraphs: [
      'Custom-made goods are non-refundable once production has commenced.',
      'In exceptional circumstances where the Company, at its sole discretion, approves a refund supported by documented evidence, processing shall take fourteen (14) working days.',
    ],
  },
  {
    title: 'Right to Decline',
    paragraphs: ['The Company reserves the right to decline or reverse any payment method that does not meet its verification or compliance requirements.'],
  },
  {
    title: 'Governing Law',
    paragraphs: ['These Terms and Conditions shall be governed by the laws of Kenya.'],
  },
];
