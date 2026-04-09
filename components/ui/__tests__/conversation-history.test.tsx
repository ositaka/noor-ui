import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ConversationHistory, type Conversation } from '../conversation-history';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

const conversations: Conversation[] = [
  {
    id: '1',
    title: 'React hooks question',
    titleAr: 'سؤال عن React hooks',
    preview: 'How do I use useEffect?',
    timestamp: new Date(),
    messageCount: 5,
  },
  {
    id: '2',
    title: 'Python debugging',
    timestamp: new Date(),
    messageCount: 3,
  },
];

describe('ConversationHistory', () => {
  it('renders without crashing', () => {
    renderWithDirection(<ConversationHistory conversations={conversations} />);
    expect(screen.getByText('Conversations')).toBeInTheDocument();
  });

  it('renders conversation titles', () => {
    renderWithDirection(<ConversationHistory conversations={conversations} />);
    expect(screen.getByText('React hooks question')).toBeInTheDocument();
    expect(screen.getByText('Python debugging')).toBeInTheDocument();
  });

  it('renders new conversation button', () => {
    renderWithDirection(<ConversationHistory conversations={conversations} />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('calls onCreate when new button is clicked', async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();
    renderWithDirection(
      <ConversationHistory conversations={conversations} onCreate={onCreate} />
    );
    await user.click(screen.getByText('New'));
    expect(onCreate).toHaveBeenCalled();
  });

  it('calls onSelect when conversation is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderWithDirection(
      <ConversationHistory conversations={conversations} onSelect={onSelect} />
    );
    await user.click(screen.getByText('React hooks question'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('shows search input when showSearch is true', () => {
    renderWithDirection(
      <ConversationHistory conversations={conversations} showSearch />
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('filters conversations by search', async () => {
    const user = userEvent.setup();
    renderWithDirection(
      <ConversationHistory conversations={conversations} showSearch />
    );
    await user.type(screen.getByPlaceholderText(/search/i), 'Python');
    expect(screen.getByText('Python debugging')).toBeInTheDocument();
    expect(screen.queryByText('React hooks question')).not.toBeInTheDocument();
  });

  it('shows empty state when no conversations', () => {
    renderWithDirection(<ConversationHistory conversations={[]} />);
    expect(screen.getByText(/no conversations/i)).toBeInTheDocument();
  });

  it('shows conversation count in footer', () => {
    renderWithDirection(<ConversationHistory conversations={conversations} />);
    expect(screen.getByText(/2 conversations/i)).toBeInTheDocument();
  });

  it('renders in RTL with Arabic titles', () => {
    renderWithDirection(
      <ConversationHistory conversations={conversations} isRTL />,
      'rtl'
    );
    expect(screen.getByText('سؤال عن React hooks')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(
      <ConversationHistory conversations={conversations} className="custom-class" data-testid="history" />
    );
    expect(screen.getByTestId('history')).toHaveClass('custom-class');
  });
});
