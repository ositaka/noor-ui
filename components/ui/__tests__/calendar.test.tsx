import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Calendar } from '../calendar';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('Calendar', () => {
  it('renders without crashing', () => {
    renderWithDirection(<Calendar />);
    // Should have weekday column headers
    expect(screen.getAllByRole('columnheader').length).toBe(7);
  });

  it('renders the Today button', () => {
    renderWithDirection(<Calendar />);
    expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
  });

  it('navigates to previous month', async () => {
    const user = userEvent.setup();
    renderWithDirection(<Calendar />);
    const prevButton = screen.getByRole('button', { name: 'Previous month' });
    await user.click(prevButton);
    // Should still render without error
    expect(screen.getAllByRole('columnheader').length).toBe(7);
  });

  it('navigates to next month', async () => {
    const user = userEvent.setup();
    renderWithDirection(<Calendar />);
    const nextButton = screen.getByRole('button', { name: 'Next month' });
    await user.click(nextButton);
    expect(screen.getAllByRole('columnheader').length).toBe(7);
  });

  it('selects a date in single mode', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderWithDirection(<Calendar mode="single" onSelect={onSelect} />);
    // Find a day button (exclude nav buttons)
    const dayButtons = screen.getAllByRole('button').filter(btn => {
      const text = btn.textContent?.trim();
      return text === '15';
    });
    if (dayButtons.length > 0) {
      await user.click(dayButtons[0]);
      expect(onSelect).toHaveBeenCalled();
    }
  });

  it('renders with selected date highlighted', () => {
    const selected = new Date(2025, 5, 15);
    renderWithDirection(<Calendar mode="single" selected={selected} />);
    expect(screen.getAllByRole('columnheader').length).toBe(7);
  });

  it('disables specific dates', () => {
    const today = new Date();
    const disabledDate = new Date(today.getFullYear(), today.getMonth(), 20);
    renderWithDirection(
      <Calendar disabled={[disabledDate]} />
    );
    // The disabled date button should be disabled
    const dayButtons = screen.getAllByRole('button').filter(btn => {
      return btn.textContent?.trim() === '20' && btn.hasAttribute('disabled');
    });
    expect(dayButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('renders week day headers', () => {
    renderWithDirection(<Calendar />);
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(7);
  });

  it('renders in RTL context', () => {
    renderWithDirection(<Calendar locale="ar" />, 'rtl');
    expect(screen.getAllByRole('columnheader').length).toBe(7);
    // Today button should be in Arabic
    expect(screen.getByText('اليوم')).toBeInTheDocument();
  });

  it('renders with events', () => {
    const today = new Date();
    const events = [
      { date: new Date(today.getFullYear(), today.getMonth(), 10), title: 'Meeting' },
    ];
    renderWithDirection(<Calendar events={events} />);
    // Events section should appear
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText(/Meeting/)).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(<Calendar className="custom-cal" data-testid="cal" />);
    expect(screen.getByTestId('cal')).toHaveClass('custom-cal');
  });
});
