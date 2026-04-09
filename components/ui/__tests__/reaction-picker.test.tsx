import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ReactionPicker, type Reaction } from '../reaction-picker';

const reactions: Reaction[] = [
  { emoji: '👍', count: 12, hasReacted: false },
  { emoji: '❤️', count: 5, hasReacted: true },
  { emoji: '💡', count: 3, hasReacted: false },
];

describe('ReactionPicker', () => {
  it('renders without crashing (compact)', () => {
    render(<ReactionPicker reactions={reactions} onReact={vi.fn()} variant="compact" />);
    // Total count should show
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('shows total reaction count in compact mode', () => {
    render(<ReactionPicker reactions={reactions} onReact={vi.fn()} variant="compact" />);
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('shows "React" text when no reactions', () => {
    render(<ReactionPicker reactions={[]} onReact={vi.fn()} variant="compact" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders expanded variant with individual counts', () => {
    render(<ReactionPicker reactions={reactions} onReact={vi.fn()} variant="expanded" />);
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onReact in expanded mode', async () => {
    const user = userEvent.setup();
    const onReact = vi.fn();
    render(<ReactionPicker reactions={reactions} onReact={onReact} variant="expanded" />);
    // Click on the thumbs up reaction button
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]); // First reaction button (👍)
    expect(onReact).toHaveBeenCalledWith('👍');
  });

  it('shows add reaction button in expanded mode', () => {
    render(<ReactionPicker reactions={reactions} onReact={vi.fn()} variant="expanded" />);
    expect(screen.getByLabelText('Add reaction')).toBeInTheDocument();
  });

  it('opens picker popover on click (compact)', async () => {
    const user = userEvent.setup();
    render(<ReactionPicker reactions={reactions} onReact={vi.fn()} variant="compact" />);
    await user.click(screen.getByLabelText('React to comment'));
    // Should show available reaction emojis
    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByText('🎉')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = render(
      <ReactionPicker reactions={reactions} onReact={vi.fn()} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
