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
    const furnishings = screen.getByText('Gaze Furnishings').closest('a');
    expect(furnishings).toHaveAttribute('target', '_blank');
    expect(furnishings).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('keeps internal divisions in the same tab', () => {
    render(<Divisions />);
    const institute = screen.getByText('Gaze Leadership Institute').closest('a');
    expect(institute).not.toHaveAttribute('target');
    expect(institute).toHaveAttribute('href', '/institute');
  });
});
