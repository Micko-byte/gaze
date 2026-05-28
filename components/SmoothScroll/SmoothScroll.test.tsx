import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SmoothScroll } from './SmoothScroll';

describe('SmoothScroll', () => {
  it('renders children', () => {
    render(<SmoothScroll><div>child</div></SmoothScroll>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });
});
