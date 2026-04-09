import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ZakatCalculator } from '../zakat-calculator';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('ZakatCalculator', () => {
  it('renders without crashing', () => {
    renderWithDirection(<ZakatCalculator />);
    expect(screen.getByText('Nisab Information')).toBeInTheDocument();
    expect(screen.getByText('Your Assets')).toBeInTheDocument();
  });

  it('renders all input fields', () => {
    renderWithDirection(<ZakatCalculator />);
    // Labels include descriptive text like "Cash (In hand & bank accounts)"
    expect(screen.getByLabelText(/Cash/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gold/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Silver/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Investments/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Other/)).toBeInTheDocument();
  });

  it('shows "Below Nisab" when wealth is zero', () => {
    renderWithDirection(<ZakatCalculator />);
    expect(screen.getByText('Below Nisab')).toBeInTheDocument();
  });

  it('calculates zakat when above nisab', async () => {
    const user = userEvent.setup();
    renderWithDirection(<ZakatCalculator />);
    const cashInput = screen.getByLabelText(/Cash/);
    await user.type(cashInput, '100000');
    // 100000 > nisab (85 * 250 = 21250), so zakat should be due
    expect(screen.getByText('Zakat Due')).toBeInTheDocument();
  });

  it('calls onCalculate callback', async () => {
    const user = userEvent.setup();
    const onCalculate = vi.fn();
    renderWithDirection(<ZakatCalculator onCalculate={onCalculate} />);
    const cashInput = screen.getByLabelText(/Cash/);
    await user.type(cashInput, '50000');
    expect(onCalculate).toHaveBeenCalled();
    const lastCall = onCalculate.mock.calls[onCalculate.mock.calls.length - 1][0];
    expect(lastCall.totalWealth).toBeGreaterThan(0);
  });

  it('renders with default values', () => {
    renderWithDirection(
      <ZakatCalculator defaultValues={{ cash: 5000, gold: 10 }} />
    );
    // Number inputs show values; type="number" inputs use numeric value
    expect(screen.getByLabelText(/Cash/)).toHaveValue(5000);
    expect(screen.getByLabelText(/Gold/)).toHaveValue(10);
  });

  it('shows export buttons', () => {
    renderWithDirection(<ZakatCalculator />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('Print')).toBeInTheDocument();
  });

  it('renders in RTL with Arabic text', () => {
    renderWithDirection(<ZakatCalculator />, 'rtl');
    expect(screen.getByText('معلومات النصاب')).toBeInTheDocument();
    expect(screen.getByText('أصولك')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(<ZakatCalculator className="custom-calc" data-testid="calc" />);
    expect(screen.getByTestId('calc')).toHaveClass('custom-calc');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    renderWithDirection(<ZakatCalculator ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});
