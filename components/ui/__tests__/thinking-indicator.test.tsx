import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThinkingIndicator } from '../thinking-indicator';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('ThinkingIndicator', () => {
  it('renders without crashing', () => {
    renderWithDirection(<ThinkingIndicator />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default aria-label', () => {
    renderWithDirection(<ThinkingIndicator />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Thinking');
  });

  it('renders custom message', () => {
    renderWithDirection(<ThinkingIndicator message="Processing..." />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('uses custom message as aria-label', () => {
    renderWithDirection(<ThinkingIndicator message="Analyzing" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Analyzing');
  });

  it('renders all variants', () => {
    const variants = ['dots', 'pulse', 'wave', 'typing'] as const;
    for (const variant of variants) {
      const { unmount } = renderWithDirection(<ThinkingIndicator variant={variant} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      unmount();
    }
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'default', 'lg'] as const;
    for (const size of sizes) {
      const { unmount } = renderWithDirection(<ThinkingIndicator size={size} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      unmount();
    }
  });

  it('merges custom className', () => {
    renderWithDirection(<ThinkingIndicator className="custom-class" />);
    expect(screen.getByRole('status')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    renderWithDirection(<ThinkingIndicator ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('renders in RTL with Arabic default', () => {
    renderWithDirection(<ThinkingIndicator />, 'rtl');
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'جاري التفكير');
  });
});
