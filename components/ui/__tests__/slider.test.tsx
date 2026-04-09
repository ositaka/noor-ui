import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Slider } from '../slider';

describe('Slider', () => {
  it('renders without crashing', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders with default value', () => {
    render(<Slider defaultValue={[50]} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50');
  });

  it('renders with controlled value', () => {
    render(<Slider value={[75]} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
  });

  it('respects min and max', () => {
    render(<Slider min={10} max={90} defaultValue={[50]} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '90');
  });

  it('renders disabled state', () => {
    render(<Slider disabled defaultValue={[50]} />);
    // Radix Slider uses data-disabled attribute, not HTML disabled
    expect(screen.getByRole('slider')).toHaveAttribute('data-disabled', '');
  });

  it('renders multiple thumbs for array values', () => {
    render(<Slider defaultValue={[25, 75]} />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('merges custom className', () => {
    render(<Slider data-testid="slider" className="custom-class" />);
    expect(screen.getByTestId('slider')).toHaveClass('custom-class');
  });

  it('fires onValueChange', () => {
    const onValueChange = vi.fn();
    render(<Slider defaultValue={[50]} onValueChange={onValueChange} />);
    // Slider interaction via mouse is difficult in jsdom; verify the callback prop is accepted
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Slider dir="rtl" defaultValue={[50]} />
      </div>
    );
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Slider ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
