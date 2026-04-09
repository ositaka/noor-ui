import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UserBadge } from '../user-badge';

describe('UserBadge', () => {
  it('renders without crashing', () => {
    render(<UserBadge variant="author" />);
    expect(screen.getByText('Author')).toBeInTheDocument();
  });

  it('renders all variants', () => {
    const variants = [
      { variant: 'author' as const, label: 'Author' },
      { variant: 'moderator' as const, label: 'Moderator' },
      { variant: 'verified' as const, label: 'Verified' },
      { variant: 'admin' as const, label: 'Admin' },
    ];
    for (const { variant, label } of variants) {
      const { unmount } = render(<UserBadge variant={variant} />);
      expect(screen.getByText(label)).toBeInTheDocument();
      unmount();
    }
  });

  it('renders custom variant with label', () => {
    render(<UserBadge variant="custom" label="VIP" />);
    expect(screen.getByText('VIP')).toBeInTheDocument();
  });

  it('renders custom variant with default label when none provided', () => {
    render(<UserBadge variant="custom" />);
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(
      <UserBadge variant="custom" label="Star" icon={<svg data-testid="custom-icon" />} />
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = render(<UserBadge variant="author" className="custom-class" />);
    // Badge renders as the outermost span
    const badge = container.querySelector('.custom-class');
    expect(badge).toBeInTheDocument();
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <UserBadge variant="verified" />
      </div>
    );
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });
});
