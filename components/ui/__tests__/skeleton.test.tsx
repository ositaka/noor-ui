import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
  it('renders without crashing', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('has animate-pulse class', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse');
  });

  it('merges custom className', () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-full" />);
    const el = screen.getByTestId('skeleton');
    expect(el).toHaveClass('h-4', 'w-full');
  });

  it('renders as div element', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton').tagName).toBe('DIV');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Skeleton ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Skeleton data-testid="skeleton" className="h-8 w-32" />
      </div>
    );
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});
