import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LegalPage } from './LegalPage';

describe('LegalPage', () => {
  it('renders the privacy document', () => {
    const { container } = render(<LegalPage doc="privacy" />);
    expect(container.textContent).toContain('Privacy Notice');
    expect(container.textContent).toContain('What we collect');
    expect(container.textContent).toContain('Kenya Data Protection Act');
  });

  it('renders the terms document', () => {
    const { container } = render(<LegalPage doc="terms" />);
    expect(container.textContent).toContain('Terms of Use');
    expect(container.textContent).toContain('Governing law');
    expect(container.textContent).toContain('Nairobi');
  });

  it('renders the cookies document', () => {
    const { container } = render(<LegalPage doc="cookies" />);
    expect(container.textContent).toContain('Cookie Policy');
    expect(container.textContent).toContain('Essential');
    expect(container.textContent).toContain('Analytics');
  });
});
