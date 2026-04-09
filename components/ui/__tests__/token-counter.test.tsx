import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TokenCounter } from '../token-counter';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('TokenCounter', () => {
  it('renders without crashing', () => {
    renderWithDirection(<TokenCounter inputTokens={100} outputTokens={50} />);
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('displays total token count', () => {
    renderWithDirection(<TokenCounter inputTokens={500} outputTokens={300} />);
    expect(screen.getByText('800')).toBeInTheDocument();
  });

  it('shows token breakdown', () => {
    renderWithDirection(
      <TokenCounter inputTokens={200} outputTokens={100} showBreakdown />
    );
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('shows warning state at threshold', () => {
    renderWithDirection(
      <TokenCounter inputTokens={3000} outputTokens={0} maxTokens={4096} warningThreshold={70} />
    );
    // 3000/4096 = ~73%, should be in warning state
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });

  it('shows danger state at threshold', () => {
    renderWithDirection(
      <TokenCounter inputTokens={3800} outputTokens={0} maxTokens={4096} dangerThreshold={90} />
    );
    // 3800/4096 = ~92%, should be in danger state
    expect(screen.getByText('Near Limit')).toBeInTheDocument();
  });

  it('shows max tokens', () => {
    renderWithDirection(
      <TokenCounter inputTokens={100} outputTokens={50} maxTokens={4096} />
    );
    expect(screen.getByText(/4,096/)).toBeInTheDocument();
  });

  it('displays percentage', () => {
    renderWithDirection(
      <TokenCounter inputTokens={2048} outputTokens={0} maxTokens={4096} />
    );
    expect(screen.getByText('50.0%')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(
      <TokenCounter inputTokens={0} outputTokens={0} className="custom-class" data-testid="counter" />
    );
    expect(screen.getByTestId('counter')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    renderWithDirection(<TokenCounter ref={ref} inputTokens={0} outputTokens={0} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('renders in RTL context', () => {
    renderWithDirection(
      <TokenCounter inputTokens={100} outputTokens={50} />,
      'rtl'
    );
    // Should render with Arabic formatted numbers
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
