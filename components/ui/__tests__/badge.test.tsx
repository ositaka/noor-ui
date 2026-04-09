import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '../badge';

describe('Badge', () => {
  it('renders without crashing', () => {
    render(<Badge>Badge</Badge>);
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  it('applies correct classes for each variant', () => {
    const variantClasses: Record<string, string> = {
      default: 'bg-primary',
      secondary: 'bg-secondary',
      destructive: 'bg-destructive',
      outline: 'text-foreground',
    };
    for (const [variant, expectedClass] of Object.entries(variantClasses)) {
      const { unmount } = render(<Badge variant={variant as any}>Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass(expectedClass);
      unmount();
    }
  });

  it('defaults to default variant with bg-primary', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toHaveClass('bg-primary');
  });

  it('merges custom className', () => {
    render(<Badge className="custom-class">Test</Badge>);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });

  it('accepts role prop for accessibility', () => {
    render(<Badge role="status">Active</Badge>);
    expect(screen.getByRole('status')).toHaveTextContent('Active');
  });

  it('renders as a span element', () => {
    render(<Badge data-testid="badge">Test</Badge>);
    expect(screen.getByTestId('badge').tagName).toBe('SPAN');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Badge>نشط</Badge>
      </div>
    );
    expect(screen.getByText('نشط')).toBeInTheDocument();
  });

  it('passes through additional HTML attributes', () => {
    render(<Badge data-testid="badge" aria-label="status badge">Test</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('aria-label', 'status badge');
  });
});
