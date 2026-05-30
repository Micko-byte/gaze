import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SocialLinks } from './SocialLinks';
import { socialLinks } from '@/content/social';

describe('SocialLinks', () => {
  it('renders a link for every configured platform', () => {
    render(<SocialLinks />);
    socialLinks.forEach(link => {
      const a = screen.getByRole('link', { name: link.label });
      expect(a).toHaveAttribute('href', link.href);
    });
  });

  it('opens every social link safely in a new tab', () => {
    render(<SocialLinks />);
    screen.getAllByRole('link').forEach(a => {
      expect(a).toHaveAttribute('target', '_blank');
      expect(a).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders an SVG glyph (not an emoji) inside each link', () => {
    const { container } = render(<SocialLinks />);
    expect(container.querySelectorAll('svg').length).toBe(socialLinks.length);
  });
});
