export type PressItem = {
  id: string;
  type: 'logo' | 'award';
  primary: string;
  secondary?: string;
};

export const pressItems: ReadonlyArray<PressItem> = [
  { id: 'she-millionaire', type: 'award', primary: 'Businesswoman of the Year', secondary: 'She Millionaire Summit · Limpopo · 2024' },
  { id: 'logo-01', type: 'logo', primary: 'Capital FM' },
  { id: 'logo-02', type: 'logo', primary: 'Business Daily' },
  { id: 'logo-03', type: 'logo', primary: 'Nation Media' },
  { id: 'logo-04', type: 'logo', primary: 'KTN News' },
  { id: 'logo-05', type: 'logo', primary: 'African Leadership' },
  { id: 'logo-06', type: 'logo', primary: 'Forbes Africa' },
  { id: 'logo-07', type: 'logo', primary: 'CNBC Africa' },
];

export const pressContent = {
  eyebrow: '06 · Press & Recognition',
  heading: 'As seen in.',
} as const;
