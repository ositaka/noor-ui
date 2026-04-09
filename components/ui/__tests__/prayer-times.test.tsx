import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PrayerTimes, type Prayer } from '../prayer-times';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

const prayers: Prayer[] = [
  { name: 'Fajr', nameAr: 'الفجر', time: '04:45 AM' },
  { name: 'Dhuhr', nameAr: 'الظهر', time: '12:15 PM' },
  { name: 'Asr', nameAr: 'العصر', time: '03:30 PM' },
  { name: 'Maghrib', nameAr: 'المغرب', time: '06:00 PM' },
  { name: 'Isha', nameAr: 'العشاء', time: '07:30 PM' },
];

describe('PrayerTimes', () => {
  it('renders without crashing', () => {
    renderWithDirection(<PrayerTimes prayers={prayers} />);
    expect(screen.getByText('Fajr')).toBeInTheDocument();
  });

  it('renders all prayers', () => {
    renderWithDirection(<PrayerTimes prayers={prayers} />);
    expect(screen.getByText('Fajr')).toBeInTheDocument();
    expect(screen.getByText('Dhuhr')).toBeInTheDocument();
    expect(screen.getByText('Asr')).toBeInTheDocument();
    expect(screen.getByText('Maghrib')).toBeInTheDocument();
    expect(screen.getByText('Isha')).toBeInTheDocument();
  });

  it('renders prayer times', () => {
    renderWithDirection(<PrayerTimes prayers={prayers} />);
    expect(screen.getByText('04:45 AM')).toBeInTheDocument();
    expect(screen.getByText('12:15 PM')).toBeInTheDocument();
  });

  it('highlights next prayer', () => {
    renderWithDirection(<PrayerTimes prayers={prayers} nextPrayer="Dhuhr" />);
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('shows countdown when provided', () => {
    renderWithDirection(
      <PrayerTimes prayers={prayers} nextPrayer="Dhuhr" countdown="2:30:15" />
    );
    expect(screen.getByText('2:30:15')).toBeInTheDocument();
  });

  it('renders location', () => {
    renderWithDirection(<PrayerTimes prayers={prayers} location="Dubai" />);
    expect(screen.getByText('Dubai')).toBeInTheDocument();
  });

  it('renders date', () => {
    renderWithDirection(<PrayerTimes prayers={prayers} date="Nov 6, 2025" />);
    expect(screen.getByText('Nov 6, 2025')).toBeInTheDocument();
  });

  it('renders Arabic prayer names in RTL', () => {
    renderWithDirection(<PrayerTimes prayers={prayers} />, 'rtl');
    expect(screen.getByText('الفجر')).toBeInTheDocument();
    expect(screen.getByText('الظهر')).toBeInTheDocument();
    expect(screen.getByText('العصر')).toBeInTheDocument();
    expect(screen.getByText('المغرب')).toBeInTheDocument();
    expect(screen.getByText('العشاء')).toBeInTheDocument();
  });

  it('renders Arabic location in RTL', () => {
    renderWithDirection(
      <PrayerTimes prayers={prayers} location="Dubai" locationAr="دبي" />,
      'rtl'
    );
    expect(screen.getByText('دبي')).toBeInTheDocument();
  });

  it('renders notification variant', () => {
    const onDismiss = vi.fn();
    renderWithDirection(
      <PrayerTimes
        prayers={prayers}
        nextPrayer="Dhuhr"
        variant="notification"
        onDismiss={onDismiss}
      />
    );
    expect(screen.getByText('Prayer Time')).toBeInTheDocument();
    expect(screen.getByText('Dhuhr')).toBeInTheDocument();
  });

  it('calls onDismiss in notification variant', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    renderWithDirection(
      <PrayerTimes
        prayers={prayers}
        nextPrayer="Fajr"
        variant="notification"
        onDismiss={onDismiss}
      />
    );
    await user.click(screen.getByText('Dismiss'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('highlights only the next prayer with "Next" badge', () => {
    renderWithDirection(<PrayerTimes prayers={prayers} nextPrayer="Asr" />);
    // Only Asr should have the "Next" badge
    const nextBadges = screen.getAllByText('Next');
    expect(nextBadges).toHaveLength(1);
  });

  it('renders without nextPrayer (no highlight)', () => {
    renderWithDirection(<PrayerTimes prayers={prayers} />);
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });

  it('renders all variants without crashing', () => {
    const variants = ['default', 'compact', 'detailed'] as const;
    for (const variant of variants) {
      const { unmount } = renderWithDirection(
        <PrayerTimes prayers={prayers} variant={variant} />
      );
      expect(screen.getByText('Fajr')).toBeInTheDocument();
      unmount();
    }
  });

  it('shows play adhan button in notification variant when enabled', () => {
    const onPlayAdhan = vi.fn();
    renderWithDirection(
      <PrayerTimes
        prayers={prayers}
        nextPrayer="Fajr"
        variant="notification"
        showPlayAdhan
        onPlayAdhan={onPlayAdhan}
        onDismiss={vi.fn()}
      />
    );
    expect(screen.getByText('Play Adhan')).toBeInTheDocument();
  });

  it('renders with empty prayers array', () => {
    renderWithDirection(<PrayerTimes prayers={[]} />);
    // Should render the card without crashing
    expect(screen.getByText('Prayer Times')).toBeInTheDocument();
  });

  it('renders date in Arabic in RTL', () => {
    renderWithDirection(
      <PrayerTimes prayers={prayers} date="Nov 6, 2025" dateAr="٦ نوفمبر ٢٠٢٥" />,
      'rtl'
    );
    expect(screen.getByText('٦ نوفمبر ٢٠٢٥')).toBeInTheDocument();
  });
});
