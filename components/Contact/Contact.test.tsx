import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Contact } from './Contact';

describe('Contact', () => {
  it('renders the heading and lede', () => {
    const { container } = render(<Contact />);
    expect(container.textContent).toContain('Step into the');
    expect(container.textContent).toContain('conversation');
    expect(container.textContent).toContain('respond to every enquiry');
  });

  it('renders all expected form fields by name', () => {
    render(<Contact />);
    ['name', 'email', 'phone', 'division', 'message'].forEach(fieldName => {
      const field = document.querySelector(`[name="${fieldName}"]`);
      expect(field, `field ${fieldName} should exist`).not.toBeNull();
    });
    expect(screen.getByRole('button', { name: /Send enquiry/i })).toBeInTheDocument();
  });
});
