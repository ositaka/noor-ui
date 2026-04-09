import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Progress } from '../progress';

describe('Progress', () => {
  it('renders without crashing', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with value', () => {
    render(<Progress value={75} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '75');
  });

  it('renders with zero value', () => {
    render(<Progress value={0} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('renders with 100 value', () => {
    render(<Progress value={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('merges custom className', () => {
    render(<Progress value={50} className="custom-progress" />);
    expect(screen.getByRole('progressbar')).toHaveClass('custom-progress');
  });

  it('supports indicatorClassName', () => {
    const { container } = render(<Progress value={50} indicatorClassName="custom-indicator" />);
    const indicator = container.querySelector('.custom-indicator');
    expect(indicator).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Progress ref={ref} value={50} />);
    expect(ref).toHaveBeenCalled();
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Progress value={60} />
      </div>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
