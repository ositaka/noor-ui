import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NotificationCenter, type Notification } from '../notification-center';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

const notifications: Notification[] = [
  { id: '1', title: 'New message', description: 'You have a new message', time: new Date().toISOString(), read: false },
  { id: '2', title: 'Update complete', description: 'System updated', time: new Date().toISOString(), read: true },
];

describe('NotificationCenter', () => {
  it('renders bell button', () => {
    renderWithDirection(<NotificationCenter notifications={[]} />);
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
  });

  it('shows unread count badge', () => {
    renderWithDirection(<NotificationCenter notifications={notifications} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('opens popover on click', async () => {
    const user = userEvent.setup();
    renderWithDirection(<NotificationCenter notifications={notifications} />);
    await user.click(screen.getByLabelText('Notifications'));
    expect(screen.getByText('New message')).toBeInTheDocument();
    expect(screen.getByText('Update complete')).toBeInTheDocument();
  });

  it('shows empty state when no notifications', async () => {
    const user = userEvent.setup();
    renderWithDirection(<NotificationCenter notifications={[]} />);
    await user.click(screen.getByLabelText('Notifications'));
    expect(screen.getByText('No notifications')).toBeInTheDocument();
  });

  it('shows mark all as read button', async () => {
    const user = userEvent.setup();
    const onMarkAllAsRead = vi.fn();
    renderWithDirection(
      <NotificationCenter notifications={notifications} onMarkAllAsRead={onMarkAllAsRead} />
    );
    await user.click(screen.getByLabelText('Notifications'));
    expect(screen.getByText('Mark all as read')).toBeInTheDocument();
  });

  it('shows clear all button', async () => {
    const user = userEvent.setup();
    const onClearAll = vi.fn();
    renderWithDirection(
      <NotificationCenter notifications={notifications} onClearAll={onClearAll} />
    );
    await user.click(screen.getByLabelText('Notifications'));
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('renders in RTL with Arabic text', async () => {
    const user = userEvent.setup();
    renderWithDirection(<NotificationCenter notifications={[]} />, 'rtl');
    await user.click(screen.getByLabelText('الإشعارات'));
    expect(screen.getByText('لا توجد إشعارات')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(<NotificationCenter notifications={[]} className="custom-class" />);
    expect(screen.getByLabelText('Notifications')).toHaveClass('custom-class');
  });
});
