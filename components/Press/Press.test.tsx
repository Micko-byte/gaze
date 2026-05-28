import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Press } from './Press';

describe('Press', () => {
  it('renders the heading and the She Millionaire award', () => {
    const { container } = render(<Press />);
    expect(container.textContent).toContain('As seen in');
    expect(container.textContent).toContain('Businesswoman of the Year');
    expect(container.textContent).toContain('She Millionaire');
    expect(container.textContent).toContain('Limpopo');
    expect(container.textContent).toContain('2024');
  });

  it('renders at least 7 press logos', () => {
    const { container } = render(<Press />);
    ['Capital FM', 'Business Daily', 'Nation Media', 'KTN News', 'African Leadership', 'Forbes Africa', 'CNBC Africa'].forEach(name => {
      expect(container.textContent).toContain(name);
    });
  });
});
