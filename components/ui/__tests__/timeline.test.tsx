import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Timeline, type TimelineItem } from '../timeline';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

const items: TimelineItem[] = [
  { title: 'Step 1', titleAr: 'الخطوة ١', description: 'First step', descriptionAr: 'الخطوة الأولى', status: 'complete', date: 'Jan 1', dateAr: '١ يناير' },
  { title: 'Step 2', titleAr: 'الخطوة ٢', description: 'Second step', status: 'current', date: 'Feb 1' },
  { title: 'Step 3', titleAr: 'الخطوة ٣', status: 'upcoming' },
];

describe('Timeline', () => {
  it('renders without crashing', () => {
    renderWithDirection(<Timeline items={items} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders all items', () => {
    renderWithDirection(<Timeline items={items} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders descriptions', () => {
    renderWithDirection(<Timeline items={items} />);
    expect(screen.getByText('First step')).toBeInTheDocument();
    expect(screen.getByText('Second step')).toBeInTheDocument();
  });

  it('renders dates', () => {
    renderWithDirection(<Timeline items={items} />);
    expect(screen.getByText('Jan 1')).toBeInTheDocument();
    expect(screen.getByText('Feb 1')).toBeInTheDocument();
  });

  it('renders list items', () => {
    renderWithDirection(<Timeline items={items} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('has accessible label', () => {
    renderWithDirection(<Timeline items={items} aria-label="Project progress" />);
    expect(screen.getByRole('list', { name: 'Project progress' })).toBeInTheDocument();
  });

  it('renders status labels for screen readers', () => {
    renderWithDirection(<Timeline items={items} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
  });

  it('renders Arabic titles in RTL mode', () => {
    renderWithDirection(<Timeline items={items} />, 'rtl');
    expect(screen.getByText('الخطوة ١')).toBeInTheDocument();
    expect(screen.getByText('الخطوة ٢')).toBeInTheDocument();
    expect(screen.getByText('الخطوة ٣')).toBeInTheDocument();
  });

  it('renders Arabic descriptions in RTL mode', () => {
    renderWithDirection(<Timeline items={items} />, 'rtl');
    expect(screen.getByText('الخطوة الأولى')).toBeInTheDocument();
  });

  it('renders Arabic dates in RTL mode', () => {
    renderWithDirection(<Timeline items={items} />, 'rtl');
    expect(screen.getByText('١ يناير')).toBeInTheDocument();
  });

  it('renders alternating variant', () => {
    renderWithDirection(<Timeline items={items} variant="alternating" />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders compact mode', () => {
    renderWithDirection(<Timeline items={items} compact />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(<Timeline items={items} className="custom-timeline" />);
    expect(screen.getByRole('list')).toHaveClass('custom-timeline');
  });

  it('falls back to English title when titleAr is not provided in RTL', () => {
    const itemsWithoutAr: TimelineItem[] = [
      { title: 'English Only', status: 'current' },
    ];
    renderWithDirection(<Timeline items={itemsWithoutAr} />, 'rtl');
    expect(screen.getByText('English Only')).toBeInTheDocument();
  });

  it('renders RTL status labels in Arabic', () => {
    renderWithDirection(<Timeline items={items} />, 'rtl');
    expect(screen.getByText('مكتمل')).toBeInTheDocument();
    expect(screen.getByText('حالي')).toBeInTheDocument();
    expect(screen.getByText('قادم')).toBeInTheDocument();
  });

  it('uses default Arabic aria-label in RTL', () => {
    renderWithDirection(<Timeline items={items} />, 'rtl');
    expect(screen.getByRole('list', { name: 'الجدول الزمني' })).toBeInTheDocument();
  });

  it('complete items have success-colored node', () => {
    const { container } = renderWithDirection(<Timeline items={items} />);
    const nodes = container.querySelectorAll('[aria-hidden="true"]');
    // First item is complete — its node should have success color classes
    const firstNode = nodes[0];
    expect(firstNode).toHaveClass('border-success/40');
  });

  it('current item has primary-colored node with ring', () => {
    const { container } = renderWithDirection(<Timeline items={items} />);
    const nodes = container.querySelectorAll('[aria-hidden="true"]');
    // Second item is current
    const currentNode = nodes[2]; // nodes include lines too, item nodes at 0, 2, 4
    expect(currentNode).toHaveClass('border-primary', 'bg-primary');
  });

  it('renders with empty items array', () => {
    renderWithDirection(<Timeline items={[]} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
