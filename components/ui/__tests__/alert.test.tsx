import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Alert, AlertTitle, AlertDescription } from '../alert';

describe('Alert', () => {
  it('renders without crashing', () => {
    render(<Alert>Alert content</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders with title and description', () => {
    render(
      <Alert>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Something happened</AlertDescription>
      </Alert>
    );
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('applies correct classes for each variant', () => {
    const variantClasses: Record<string, string> = {
      default: 'bg-background',
      destructive: 'border-destructive/50',
      success: 'border-success/50',
      warning: 'border-warning/50',
    };
    for (const [variant, expectedClass] of Object.entries(variantClasses)) {
      const { unmount } = render(<Alert variant={variant as any}>Alert</Alert>);
      expect(screen.getByRole('alert')).toHaveClass(expectedClass);
      unmount();
    }
  });

  it('defaults to default variant', () => {
    render(<Alert>Content</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-background');
  });

  it('has role="alert"', () => {
    render(<Alert>Content</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders AlertTitle as h5', () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
      </Alert>
    );
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent('Title');
  });

  it('merges custom className', () => {
    render(<Alert className="custom-alert">Content</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom-alert');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Alert ref={ref}>Content</Alert>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Alert>
          <AlertTitle>تحذير</AlertTitle>
          <AlertDescription>حدث خطأ</AlertDescription>
        </Alert>
      </div>
    );
    expect(screen.getByText('تحذير')).toBeInTheDocument();
    expect(screen.getByText('حدث خطأ')).toBeInTheDocument();
  });
});
