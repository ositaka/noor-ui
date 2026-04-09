import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MessageActions } from '../message-actions';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('MessageActions', () => {
  it('renders without crashing', () => {
    renderWithDirection(<MessageActions />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('shows copy button by default', () => {
    renderWithDirection(<MessageActions />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('calls onCopy when copy is clicked', async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    renderWithDirection(<MessageActions onCopy={onCopy} />);
    await user.click(screen.getByText('Copy'));
    expect(onCopy).toHaveBeenCalled();
  });

  it('shows regenerate button when enabled', () => {
    renderWithDirection(<MessageActions showRegenerate />);
    expect(screen.getByText('Regenerate')).toBeInTheDocument();
  });

  it('shows edit button when enabled', () => {
    renderWithDirection(<MessageActions showEdit />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('shows share button when enabled', () => {
    renderWithDirection(<MessageActions showShare />);
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('shows feedback buttons when enabled', () => {
    renderWithDirection(<MessageActions showFeedback />);
    expect(screen.getByRole('button', { name: 'Like' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dislike' })).toBeInTheDocument();
  });

  it('calls onThumbsUp when like is clicked', async () => {
    const user = userEvent.setup();
    const onThumbsUp = vi.fn();
    renderWithDirection(<MessageActions showFeedback onThumbsUp={onThumbsUp} />);
    await user.click(screen.getByRole('button', { name: 'Like' }));
    expect(onThumbsUp).toHaveBeenCalled();
  });

  it('shows flag button when enabled', () => {
    renderWithDirection(<MessageActions showFlag />);
    expect(screen.getByRole('button', { name: 'Report' })).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(<MessageActions className="custom-class" data-testid="actions" />);
    expect(screen.getByTestId('actions')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    renderWithDirection(<MessageActions ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('renders in RTL context', () => {
    renderWithDirection(<MessageActions />, 'rtl');
    expect(screen.getByText('نسخ')).toBeInTheDocument();
  });
});
