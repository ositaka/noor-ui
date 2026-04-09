import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TimePicker } from '../time-picker';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('TimePicker', () => {
  it('renders without crashing', () => {
    renderWithDirection(<TimePicker />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    renderWithDirection(<TimePicker placeholder="Select time" />);
    expect(screen.getByText('Select time')).toBeInTheDocument();
  });

  it('renders with a selected time', () => {
    renderWithDirection(<TimePicker time={{ hours: 14, minutes: 30 }} />);
    const btn = screen.getByRole('button');
    expect(btn.textContent).toContain('14');
    expect(btn.textContent).toContain('30');
  });

  it('is disabled when disabled prop is set', () => {
    renderWithDirection(<TimePicker disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('opens time picker popover on click', async () => {
    const user = userEvent.setup();
    renderWithDirection(<TimePicker />);
    await user.click(screen.getByRole('button'));
    // Should show time selection UI
    expect(screen.getByText('Select Time')).toBeInTheDocument();
  });

  it('renders with Arabic placeholder in RTL', () => {
    renderWithDirection(
      <TimePicker placeholder="Select time" placeholderAr="اختر الوقت" />,
      'rtl'
    );
    expect(screen.getByText('اختر الوقت')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(<TimePicker className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders in RTL context', () => {
    renderWithDirection(<TimePicker />, 'rtl');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
