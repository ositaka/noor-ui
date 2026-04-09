import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { UserMenu } from '../user-menu';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('UserMenu', () => {
  it('renders without crashing', () => {
    renderWithDirection(<UserMenu />);
    expect(screen.getByLabelText('User menu')).toBeInTheDocument();
  });

  it('shows user initials in avatar fallback', () => {
    renderWithDirection(<UserMenu user={{ name: 'John Doe' }} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('opens dropdown on click', async () => {
    const user = userEvent.setup();
    renderWithDirection(
      <UserMenu
        user={{ name: 'Alice', email: 'alice@test.com' }}
        onProfileClick={vi.fn()}
        onLogout={vi.fn()}
      />
    );
    await user.click(screen.getByLabelText('User menu'));
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@test.com')).toBeInTheDocument();
  });

  it('shows menu items based on callbacks', async () => {
    const user = userEvent.setup();
    renderWithDirection(
      <UserMenu
        user={{ name: 'Test' }}
        onProfileClick={vi.fn()}
        onSettingsClick={vi.fn()}
        onLogout={vi.fn()}
      />
    );
    await user.click(screen.getByLabelText('User menu'));
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  it('calls onLogout when logout is clicked', async () => {
    const user = userEvent.setup();
    const onLogout = vi.fn();
    renderWithDirection(
      <UserMenu user={{ name: 'Test' }} onLogout={onLogout} />
    );
    await user.click(screen.getByLabelText('User menu'));
    await user.click(screen.getByText('Log out'));
    expect(onLogout).toHaveBeenCalled();
  });

  it('renders in RTL with Arabic text', async () => {
    const user = userEvent.setup();
    renderWithDirection(
      <UserMenu user={{ name: 'Test' }} onProfileClick={vi.fn()} onLogout={vi.fn()} />,
      'rtl'
    );
    await user.click(screen.getByLabelText('User menu'));
    expect(screen.getByText('الملف الشخصي')).toBeInTheDocument();
    expect(screen.getByText('تسجيل الخروج')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(<UserMenu className="custom-class" />);
    expect(screen.getByLabelText('User menu')).toHaveClass('custom-class');
  });
});
