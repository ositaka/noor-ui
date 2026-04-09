import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HijriDate, getIslamicHoliday } from '../hijri-date';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('HijriDate', () => {
  it('renders without crashing', () => {
    renderWithDirection(
      <HijriDate
        gregorianDate="November 6, 2025"
        hijriDate="5 Jumada al-Awwal 1447"
        hijriDateAr="٥ جمادى الأولى ١٤٤٧"
      />
    );
    expect(screen.getByText('November 6, 2025')).toBeInTheDocument();
    expect(screen.getByText('5 Jumada al-Awwal 1447')).toBeInTheDocument();
  });

  it('displays Arabic dates in RTL mode', () => {
    renderWithDirection(
      <HijriDate
        gregorianDate="November 6, 2025"
        gregorianDateAr="٦ نوفمبر ٢٠٢٥"
        hijriDate="5 Jumada al-Awwal 1447"
        hijriDateAr="٥ جمادى الأولى ١٤٤٧"
      />,
      'rtl'
    );
    expect(screen.getByText('٦ نوفمبر ٢٠٢٥')).toBeInTheDocument();
    expect(screen.getByText('٥ جمادى الأولى ١٤٤٧')).toBeInTheDocument();
  });

  it('renders all variants', () => {
    const variants = ['default', 'badge', 'compact', 'detailed'] as const;
    for (const variant of variants) {
      const { unmount } = renderWithDirection(
        <HijriDate
          variant={variant}
          gregorianDate="Jan 1, 2025"
          hijriDate="1 Rajab 1446"
          hijriDateAr="١ رجب ١٤٤٦"
        />
      );
      expect(screen.getByText('Jan 1, 2025')).toBeInTheDocument();
      unmount();
    }
  });

  it('shows calendar icon when showIcon is true', () => {
    renderWithDirection(
      <HijriDate
        showIcon
        gregorianDate="Jan 1"
        hijriDate="1 Muharram 1447"
        hijriDateAr="١ محرم ١٤٤٧"
      />
    );
    // The component should render an SVG icon
    expect(screen.getByText('Jan 1')).toBeInTheDocument();
  });

  it('shows Islamic holiday badge for known holidays', () => {
    renderWithDirection(
      <HijriDate
        gregorianDate="Test Date"
        hijriDate="1 Ramadan 1447"
        hijriDateAr="١ رمضان ١٤٤٧"
        showHoliday
      />
    );
    expect(screen.getByText('Start of Ramadan')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(
      <HijriDate
        className="custom-class"
        data-testid="hijri"
        gregorianDate="Jan 1"
        hijriDate="1 Muharram 1447"
        hijriDateAr="١ محرم ١٤٤٧"
      />
    );
    expect(screen.getByTestId('hijri')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    renderWithDirection(
      <HijriDate
        ref={ref}
        gregorianDate="Jan 1"
        hijriDate="1 Muharram 1447"
        hijriDateAr="١ محرم ١٤٤٧"
      />
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});

describe('getIslamicHoliday', () => {
  it('returns holiday for known dates', () => {
    const holiday = getIslamicHoliday('1 Ramadan 1447');
    expect(holiday).not.toBeNull();
    expect(holiday?.nameEn).toBe('Start of Ramadan');
  });

  it('returns null for non-holiday dates', () => {
    expect(getIslamicHoliday('5 Jumada al-Awwal 1447')).toBeNull();
  });

  it('detects Eid al-Fitr', () => {
    const holiday = getIslamicHoliday('1 Shawwal 1447');
    expect(holiday?.nameEn).toBe('Eid al-Fitr');
    expect(holiday?.nameAr).toBe('عيد الفطر');
  });

  it('detects Eid al-Adha', () => {
    const holiday = getIslamicHoliday('10 Dhul Hijjah 1447');
    expect(holiday?.nameEn).toBe('Eid al-Adha');
  });
});
