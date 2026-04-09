import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PromptInput } from '../prompt-input';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('PromptInput', () => {
  it('renders without crashing', () => {
    renderWithDirection(<PromptInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    renderWithDirection(<PromptInput placeholder="Ask a question..." />);
    expect(screen.getByPlaceholderText('Ask a question...')).toBeInTheDocument();
  });

  it('renders send button', () => {
    renderWithDirection(<PromptInput />);
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('send button is disabled when empty', () => {
    renderWithDirection(<PromptInput />);
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('calls onSend when send is clicked', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    renderWithDirection(<PromptInput onSend={onSend} />);
    await user.type(screen.getByRole('textbox'), 'Hello');
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSend).toHaveBeenCalledWith('Hello');
  });

  it('shows attachment button when showAttachment is true', () => {
    renderWithDirection(<PromptInput showAttachment />);
    expect(screen.getByRole('button', { name: 'Attach file' })).toBeInTheDocument();
  });

  it('shows voice button when showVoice is true', () => {
    renderWithDirection(<PromptInput showVoice />);
    expect(screen.getByRole('button', { name: 'Voice input' })).toBeInTheDocument();
  });

  it('shows character counter when showCounter is true', async () => {
    const user = userEvent.setup();
    renderWithDirection(<PromptInput showCounter maxLength={100} />);
    await user.type(screen.getByRole('textbox'), 'Hello');
    expect(screen.getByText('5 / 100')).toBeInTheDocument();
  });

  it('disables input when loading', () => {
    renderWithDirection(<PromptInput isLoading />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders in RTL context with Arabic placeholder', () => {
    renderWithDirection(
      <PromptInput placeholder="Ask..." placeholderAr="اسأل..." isRTL />,
      'rtl'
    );
    expect(screen.getByPlaceholderText('اسأل...')).toBeInTheDocument();
  });
});
