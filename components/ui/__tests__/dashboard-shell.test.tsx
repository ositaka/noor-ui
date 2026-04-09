import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DashboardShell, type NavItem } from '../dashboard-shell';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

const navItems: NavItem[] = [
  { title: 'Dashboard', titleAr: 'لوحة القيادة', href: '/' },
  { title: 'Settings', titleAr: 'الإعدادات', href: '/settings' },
];

describe('DashboardShell', () => {
  it('renders without crashing', () => {
    renderWithDirection(
      <DashboardShell>
        <div>Page content</div>
      </DashboardShell>
    );
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders children', () => {
    renderWithDirection(
      <DashboardShell>
        <h1>Dashboard Page</h1>
      </DashboardShell>
    );
    expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
  });

  it('renders nav items', () => {
    renderWithDirection(
      <DashboardShell navItems={navItems}>
        <div>Content</div>
      </DashboardShell>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders user menu when user is provided', () => {
    renderWithDirection(
      <DashboardShell user={{ name: 'John', email: 'john@test.com' }}>
        <div>Content</div>
      </DashboardShell>
    );
    expect(screen.getByLabelText('User menu')).toBeInTheDocument();
  });

  it('renders logo', () => {
    renderWithDirection(
      <DashboardShell logo={<span>MyLogo</span>}>
        <div>Content</div>
      </DashboardShell>
    );
    expect(screen.getByText('MyLogo')).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    renderWithDirection(
      <DashboardShell navItems={navItems}>
        <div>Content</div>
      </DashboardShell>
    );
    expect(screen.getByLabelText('Menu')).toBeInTheDocument();
  });

  it('renders header actions', () => {
    renderWithDirection(
      <DashboardShell headerActions={<button>Custom Action</button>}>
        <div>Content</div>
      </DashboardShell>
    );
    expect(screen.getByText('Custom Action')).toBeInTheDocument();
  });

  it('renders in RTL with Arabic nav items', () => {
    renderWithDirection(
      <DashboardShell navItems={navItems}>
        <div>Content</div>
      </DashboardShell>,
      'rtl'
    );
    expect(screen.getByText('لوحة القيادة')).toBeInTheDocument();
    expect(screen.getByText('الإعدادات')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = renderWithDirection(
      <DashboardShell className="custom-shell">
        <div>Content</div>
      </DashboardShell>
    );
    expect(container.firstChild).toHaveClass('custom-shell');
  });
});
