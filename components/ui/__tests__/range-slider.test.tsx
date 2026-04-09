import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RangeSlider } from '../range-slider';

describe('RangeSlider', () => {
  it('renders without crashing', () => {
    render(<RangeSlider />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('renders with default value', () => {
    render(<RangeSlider defaultValue={[20, 80]} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '20');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '80');
  });

  it('renders with controlled value', () => {
    render(<RangeSlider value={[30, 70]} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '30');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '70');
  });

  it('respects min and max', () => {
    render(<RangeSlider min={10} max={200} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveAttribute('aria-valuemin', '10');
    expect(sliders[1]).toHaveAttribute('aria-valuemax', '200');
  });

  it('renders disabled state', () => {
    render(<RangeSlider disabled />);
    // Radix Slider uses data-disabled attribute, not HTML disabled
    screen.getAllByRole('slider').forEach(slider => {
      expect(slider).toHaveAttribute('data-disabled', '');
    });
  });

  it('shows labels when showLabels is true', () => {
    render(<RangeSlider showLabels defaultValue={[25, 75]} />);
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('shows min/max labels when showMinMax is true', () => {
    render(<RangeSlider showMinMax min={0} max={100} />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('uses custom formatLabel', () => {
    render(
      <RangeSlider
        showLabels
        defaultValue={[50, 100]}
        formatLabel={(val) => `$${val}`}
      />
    );
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<RangeSlider ref={ref} className="custom-class" />);
    expect(ref.current).toHaveClass('custom-class');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <RangeSlider dir="rtl" defaultValue={[20, 80]} />
      </div>
    );
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<RangeSlider ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});
