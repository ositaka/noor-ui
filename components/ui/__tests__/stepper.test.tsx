import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Stepper, type Step } from '../stepper';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

const steps: Step[] = [
  { id: '1', title: 'Account', titleAr: 'الحساب', description: 'Create account', descriptionAr: 'إنشاء حساب' },
  { id: '2', title: 'Details', titleAr: 'التفاصيل' },
  { id: '3', title: 'Review', titleAr: 'المراجعة', optional: true },
];

describe('Stepper', () => {
  it('renders without crashing', () => {
    renderWithDirection(<Stepper steps={steps} currentStep={0} />);
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('renders all step titles', () => {
    renderWithDirection(<Stepper steps={steps} currentStep={0} />);
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
  });

  it('marks current step', () => {
    renderWithDirection(<Stepper steps={steps} currentStep={1} />);
    const currentButtons = screen.getAllByRole('button').filter(
      btn => btn.getAttribute('aria-current') === 'step'
    );
    expect(currentButtons.length).toBe(1);
  });

  it('shows step numbers', () => {
    renderWithDirection(<Stepper steps={steps} currentStep={0} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onStepClick for completed steps', async () => {
    const user = userEvent.setup();
    const onStepClick = vi.fn();
    renderWithDirection(<Stepper steps={steps} currentStep={2} onStepClick={onStepClick} />);
    // Step 1 (index 0) is completed, should be clickable
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(onStepClick).toHaveBeenCalledWith(0);
  });

  it('shows optional label', () => {
    renderWithDirection(<Stepper steps={steps} currentStep={0} />);
    expect(screen.getByText(/Optional/i)).toBeInTheDocument();
  });

  it('renders vertical orientation', () => {
    renderWithDirection(<Stepper steps={steps} currentStep={1} orientation="vertical" />);
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('renders simple variant', () => {
    renderWithDirection(<Stepper steps={steps} currentStep={1} variant="simple" />);
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('renders circles variant', () => {
    renderWithDirection(<Stepper steps={steps} currentStep={1} variant="circles" />);
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('renders in RTL with Arabic titles', () => {
    renderWithDirection(<Stepper steps={steps} currentStep={0} />, 'rtl');
    expect(screen.getByText('الحساب')).toBeInTheDocument();
    expect(screen.getByText('التفاصيل')).toBeInTheDocument();
    expect(screen.getByText('المراجعة')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(
      <Stepper steps={steps} currentStep={0} className="custom-stepper" />
    );
    expect(screen.getByLabelText('Progress')).toHaveClass('custom-stepper');
  });

  it('does not allow clicking future steps without allowSkip', async () => {
    const user = userEvent.setup();
    const onStepClick = vi.fn();
    renderWithDirection(<Stepper steps={steps} currentStep={0} onStepClick={onStepClick} />);
    // Step 3 (index 2) is upcoming and should be disabled
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[2]); // Third step button
    expect(onStepClick).not.toHaveBeenCalled();
  });

  it('allows clicking future steps with allowSkip', async () => {
    const user = userEvent.setup();
    const onStepClick = vi.fn();
    renderWithDirection(<Stepper steps={steps} currentStep={0} onStepClick={onStepClick} allowSkip />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[2]);
    expect(onStepClick).toHaveBeenCalledWith(2);
  });

  it('shows check icon for completed steps', () => {
    const { container } = renderWithDirection(<Stepper steps={steps} currentStep={2} />);
    // Steps 0 and 1 are complete — they should have Check SVG icons
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it('renders description for vertical steps', () => {
    renderWithDirection(<Stepper steps={steps} currentStep={0} orientation="vertical" />);
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

  it('renders Arabic description in RTL vertical', () => {
    renderWithDirection(<Stepper steps={steps} currentStep={0} orientation="vertical" />, 'rtl');
    expect(screen.getByText('إنشاء حساب')).toBeInTheDocument();
  });
});
