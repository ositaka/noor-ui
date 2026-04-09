import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ParameterSlider, temperaturePresets } from '../parameter-slider';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('ParameterSlider', () => {
  it('renders without crashing', () => {
    renderWithDirection(
      <ParameterSlider label="Temperature" value={0.7} onValueChange={vi.fn()} />
    );
    expect(screen.getByText('Temperature')).toBeInTheDocument();
  });

  it('shows current value', () => {
    renderWithDirection(
      <ParameterSlider label="Temp" value={0.7} onValueChange={vi.fn()} />
    );
    expect(screen.getByText('0.7')).toBeInTheDocument();
  });

  it('shows min and max labels', () => {
    renderWithDirection(
      <ParameterSlider label="Temp" value={0.5} onValueChange={vi.fn()} min={0} max={1} />
    );
    expect(screen.getByText('0.0')).toBeInTheDocument();
    expect(screen.getByText('1.0')).toBeInTheDocument();
  });

  it('renders presets', () => {
    renderWithDirection(
      <ParameterSlider
        label="Temperature"
        value={0.7}
        onValueChange={vi.fn()}
        presets={temperaturePresets}
      />
    );
    expect(screen.getByText('Precise')).toBeInTheDocument();
    expect(screen.getByText('Balanced')).toBeInTheDocument();
    expect(screen.getByText('Creative')).toBeInTheDocument();
  });

  it('calls onValueChange when preset is clicked', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithDirection(
      <ParameterSlider
        label="Temperature"
        value={0.7}
        onValueChange={onValueChange}
        presets={temperaturePresets}
      />
    );
    await user.click(screen.getByText('Creative'));
    expect(onValueChange).toHaveBeenCalledWith(1.0);
  });

  it('hides value when showValue is false', () => {
    renderWithDirection(
      <ParameterSlider label="Temp" value={0.7} onValueChange={vi.fn()} showValue={false} />
    );
    expect(screen.queryByText('0.7')).not.toBeInTheDocument();
  });

  it('renders slider', () => {
    renderWithDirection(
      <ParameterSlider label="Temp" value={0.5} onValueChange={vi.fn()} />
    );
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const ref = { current: null as HTMLDivElement | null };
    renderWithDirection(
      <ParameterSlider ref={(el) => { ref.current = el; }} label="T" value={0} onValueChange={vi.fn()} className="custom-class" />
    );
    expect(ref.current).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    renderWithDirection(
      <ParameterSlider ref={ref} label="T" value={0} onValueChange={vi.fn()} />
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('renders in RTL with Arabic label', () => {
    renderWithDirection(
      <ParameterSlider
        label="Temperature"
        labelAr="الحرارة"
        value={0.5}
        onValueChange={vi.fn()}
        isRTL
      />,
      'rtl'
    );
    expect(screen.getByText('الحرارة')).toBeInTheDocument();
  });
});
