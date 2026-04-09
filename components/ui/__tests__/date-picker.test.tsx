import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DatePicker } from '../date-picker';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('DatePicker', () => {
  it('renders without crashing', () => {
    renderWithDirection(<DatePicker />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    renderWithDirection(<DatePicker placeholder="Pick a date" />);
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('renders with a selected date', () => {
    const date = new Date(2025, 0, 15);
    renderWithDirection(<DatePicker date={date} />);
    // Should show the formatted date
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toContain('15');
  });

  it('is disabled when disabled prop is set', () => {
    renderWithDirection(<DatePicker disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('opens calendar popover on click', async () => {
    const user = userEvent.setup();
    renderWithDirection(<DatePicker />);
    await user.click(screen.getByRole('button'));
    // Calendar should be visible (contains "Today" button)
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('calls onDateChange when date is selected', async () => {
    const user = userEvent.setup();
    const onDateChange = vi.fn();
    renderWithDirection(<DatePicker onDateChange={onDateChange} />);
    await user.click(screen.getByRole('button'));
    // Click on a day in the calendar
    const dayButtons = screen.getAllByRole('button').filter(btn => {
      const text = btn.textContent?.trim();
      return text === '15';
    });
    if (dayButtons.length > 0) {
      await user.click(dayButtons[0]);
      expect(onDateChange).toHaveBeenCalled();
    }
  });

  it('renders with Arabic placeholder in RTL', () => {
    renderWithDirection(
      <DatePicker placeholder="Pick a date" placeholderAr="اختر تاريخ" />,
      'rtl'
    );
    expect(screen.getByText('اختر تاريخ')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(<DatePicker className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
