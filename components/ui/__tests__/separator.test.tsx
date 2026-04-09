import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Separator } from '../separator';

describe('Separator', () => {
  it('renders without crashing', () => {
    render(<Separator />);
    expect(screen.getByRole('none')).toBeInTheDocument();
  });

  it('renders horizontal by default', () => {
    render(<Separator data-testid="sep" />);
    const sep = screen.getByTestId('sep');
    expect(sep).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renders vertical orientation', () => {
    render(<Separator data-testid="sep" orientation="vertical" />);
    const sep = screen.getByTestId('sep');
    expect(sep).toHaveAttribute('data-orientation', 'vertical');
  });

  it('is decorative by default', () => {
    render(<Separator />);
    // Decorative separators have role="none"
    expect(screen.getByRole('none')).toBeInTheDocument();
  });

  it('renders as non-decorative separator', () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<Separator data-testid="sep" className="custom-class" />);
    expect(screen.getByTestId('sep')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Separator ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Separator data-testid="sep" />
      </div>
    );
    expect(screen.getByTestId('sep')).toBeInTheDocument();
  });
});
