import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingSpinner } from '../loading-spinner';

describe('LoadingSpinner', () => {
  it('renders without crashing', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default aria-label', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading...');
  });

  it('renders with custom text', () => {
    render(<LoadingSpinner text="Please wait" />);
    // Text appears both visually and in sr-only span
    expect(screen.getAllByText('Please wait').length).toBeGreaterThanOrEqual(1);
  });

  it('uses text as aria-label when provided', () => {
    render(<LoadingSpinner text="Saving..." />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving...');
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      const { unmount } = render(<LoadingSpinner size={size} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      unmount();
    }
  });

  it('merges custom className', () => {
    render(<LoadingSpinner className="custom-spinner" />);
    expect(screen.getByRole('status')).toHaveClass('custom-spinner');
  });

  it('has sr-only text for screen readers', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toHaveClass('sr-only');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <LoadingSpinner text="جاري التحميل" />
      </div>
    );
    expect(screen.getAllByText('جاري التحميل').length).toBeGreaterThanOrEqual(1);
  });
});
