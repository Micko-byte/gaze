/**
 * Social profiles. Replace the placeholder handles below with the real
 * Gaze Holdings accounts. Order here = display order in the footer.
 */

export type SocialId = 'instagram' | 'insta' | 'tiktok' | 'linkedin' | 'facebook' | 'youtube' | 'x';

export type SocialLink = {
  id: SocialId;
  label: string;
  href: string;
};

export const socialLinks: ReadonlyArray<SocialLink> = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/gazeholdings' },
  { id: 'insta', label: 'Insta', href: 'https://www.instagram.com/gaze_furnishings_ke/?hl=en' },
  { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@gazefurnishingske' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/gaze-holdings' },
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/gazeholdings' },
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/@gazeholdings' },
  { id: 'x', label: 'X', href: 'https://x.com/gazeholdings' },
];

export const instagram = {
  handle: '@gazeholdings',
  profileUrl: 'https://instagram.com/gazeholdings',
} as const;
