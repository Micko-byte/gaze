import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InstagramGrid, type GalleryTile } from './InstagramGrid';

const tiles: GalleryTile[] = [
  { key: 'a', image: '/a.jpg', href: 'https://instagram.com/p/a', alt: 'A' },
  { key: 'b', image: '/b.jpg', href: 'https://instagram.com/p/b', alt: 'B' },
];

describe('InstagramGrid', () => {
  it('renders a tile per item with an image and a safe outbound link', () => {
    render(<InstagramGrid tiles={tiles} profileUrl="https://instagram.com/gazeholdings" />);
    const links = screen.getAllByRole('link').filter(a => a.getAttribute('href')?.includes('/p/'));
    expect(links).toHaveLength(2);
    links.forEach(a => {
      expect(a).toHaveAttribute('target', '_blank');
      expect(a).toHaveAttribute('rel', 'noopener noreferrer');
    });
    expect(document.querySelectorAll('img')).toHaveLength(2);
  });
});
