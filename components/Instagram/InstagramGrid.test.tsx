import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InstagramGrid, type GalleryTile } from './InstagramGrid';

const tiles: GalleryTile[] = [
  { key: 'a', image: '/a.jpg', alt: 'A' },
  { key: 'b', image: '/b.jpg', alt: 'B' },
];

describe('InstagramGrid', () => {
  it('renders a tile per item with an image and a safe outbound link', () => {
    render(<InstagramGrid tiles={tiles} profileUrl="https://instagram.com/gazeholdings" />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    links.forEach(a => {
      expect(a).toHaveAttribute('href', 'https://instagram.com/gazeholdings');
      expect(a).toHaveAttribute('target', '_blank');
      expect(a).toHaveAttribute('rel', 'noopener noreferrer');
    });
    expect(document.querySelectorAll('img')).toHaveLength(4);
  });
});
