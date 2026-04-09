import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChatMessage } from '../chat-message';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('ChatMessage', () => {
  it('renders without crashing', () => {
    renderWithDirection(<ChatMessage role="user" content="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders user message', () => {
    renderWithDirection(<ChatMessage role="user" content="User message" />);
    expect(screen.getByText('User message')).toBeInTheDocument();
  });

  it('renders assistant message', () => {
    renderWithDirection(<ChatMessage role="assistant" content="AI response" />);
    expect(screen.getByText('AI response')).toBeInTheDocument();
  });

  it('renders system message', () => {
    renderWithDirection(<ChatMessage role="system" content="System notice" />);
    expect(screen.getByText('System notice')).toBeInTheDocument();
  });

  it('renders with name and timestamp', () => {
    renderWithDirection(
      <ChatMessage role="user" content="Hi" name="Alice" timestamp="2:30 PM" />
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('2:30 PM')).toBeInTheDocument();
  });

  it('shows error state', () => {
    renderWithDirection(
      <ChatMessage role="assistant" content="Error" state="error" />
    );
    // Error message rendered with destructive styling
    const errorDiv = document.querySelector('.text-destructive');
    expect(errorDiv).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = renderWithDirection(
      <ChatMessage role="user" content="Test" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    renderWithDirection(<ChatMessage ref={ref} role="user" content="Test" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('renders in RTL context', () => {
    renderWithDirection(
      <ChatMessage role="user" content="مرحبا" />,
      'rtl'
    );
    expect(screen.getByText('مرحبا')).toBeInTheDocument();
  });
});
