import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divisions } from './Divisions';

describe('Divisions', () => {
  it('renders the section heading and all 5 division names', () => {
    render(<Divisions />);
    expect(screen.getByText(/The Group/i)).toBeInTheDocument();
    ['Gaze Furnishings', 'Gaze Press Global', 'Gaze Leadership Institute', 'The Gaze Manor', 'HerGaze Global'].forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('opens external divisions in new tab', () => {
    render(<Divisions />);
    const furnishings = screen.getByLabelText(/Step inside Gaze Furnishings/i);
    expect(furnishings).toHaveAttribute('target', '_blank');
    expect(furnishings).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('keeps internal divisions in the same tab', () => {
    render(<Divisions />);
    const institute = screen.getByLabelText(/Step inside Gaze Leadership Institute/i);
    expect(institute).not.toHaveAttribute('target');
    expect(institute).toHaveAttribute('href', '/institute');
  });

  it('renders a dedicated Shop link only on the Furnishings card', () => {
    render(<Divisions />);
    const shopLinks = screen.queryAllByRole('link', { name: /Shop Gaze Furnishings on Shopify/i });
    expect(shopLinks).toHaveLength(1);
    expect(shopLinks[0]).toHaveAttribute('target', '_blank');
    expect(shopLinks[0]).toHaveAttribute('href', expect.stringContaining('furnishings.gaze.co'));

    // No other division gets a Shop chip
    expect(screen.queryByLabelText(/Shop Gaze Press Global/i)).toBeNull();
    expect(screen.queryByLabelText(/Shop HerGaze Global/i)).toBeNull();
  });
});
