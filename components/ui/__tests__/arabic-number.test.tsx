import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ArabicNumber } from '../arabic-number';

describe('ArabicNumber', () => {
  it('renders without crashing', () => {
    render(<ArabicNumber value={1234} />);
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('formats with Eastern Arabic numerals when locale is ar', () => {
    render(<ArabicNumber value={1234} locale="ar" />);
    expect(screen.getByText('١٬٢٣٤')).toBeInTheDocument();
  });

  it('formats with Eastern Arabic numerals when useArabicNumerals is true', () => {
    render(<ArabicNumber value={5678} useArabicNumerals />);
    expect(screen.getByText('٥,٦٧٨')).toBeInTheDocument();
  });

  it('formats currency (SAR)', () => {
    render(<ArabicNumber value={1000} format="currency" locale="en" />);
    const el = screen.getByText(/1,000/);
    expect(el).toBeInTheDocument();
  });

  it('formats percentage', () => {
    // formatPercentage multiplies by 100 (75.5 -> 7550.0%)
    render(<ArabicNumber value={0.755} format="percentage" locale="en" />);
    const el = screen.getByText(/75\.5%/);
    expect(el).toBeInTheDocument();
  });

  it('formats compact numbers', () => {
    render(<ArabicNumber value={1500000} format="compact" locale="en" />);
    const el = screen.getByText(/1\.5M/);
    expect(el).toBeInTheDocument();
  });

  it('respects decimals prop', () => {
    render(<ArabicNumber value={3.14159} decimals={2} />);
    expect(screen.getByText('3.14')).toBeInTheDocument();
  });

  it('renders all variants', () => {
    const variants = ['default', 'inline', 'badge'] as const;
    for (const variant of variants) {
      const { unmount } = render(<ArabicNumber value={42} variant={variant} />);
      expect(screen.getByText('42')).toBeInTheDocument();
      unmount();
    }
  });

  it('merges custom className', () => {
    render(<ArabicNumber value={1} className="custom-class" data-testid="num" />);
    expect(screen.getByTestId('num')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<ArabicNumber ref={ref} value={1} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it('renders as span element', () => {
    render(<ArabicNumber value={99} data-testid="num" />);
    expect(screen.getByTestId('num').tagName).toBe('SPAN');
  });

  it('formats zero correctly', () => {
    render(<ArabicNumber value={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('formats zero in Arabic locale', () => {
    render(<ArabicNumber value={0} locale="ar" />);
    expect(screen.getByText('٠')).toBeInTheDocument();
  });

  it('formats negative numbers', () => {
    render(<ArabicNumber value={-1500} />);
    expect(screen.getByText('-1,500')).toBeInTheDocument();
  });

  it('formats large numbers with grouping', () => {
    render(<ArabicNumber value={1000000} />);
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
  });

  it('applies tabular-nums class for consistent digit width', () => {
    render(<ArabicNumber value={42} data-testid="num" />);
    expect(screen.getByTestId('num')).toHaveClass('tabular-nums');
  });

  it('applies correct variant classes', () => {
    const { unmount } = render(<ArabicNumber value={1} variant="default" data-testid="n" />);
    expect(screen.getByTestId('n')).toHaveClass('font-semibold');
    unmount();

    const { unmount: u2 } = render(<ArabicNumber value={1} variant="inline" data-testid="n" />);
    expect(screen.getByTestId('n')).toHaveClass('font-medium');
    u2();

    render(<ArabicNumber value={1} variant="badge" data-testid="n" />);
    expect(screen.getByTestId('n')).toHaveClass('rounded-full');
  });

  it('formats currency with SAR suffix', () => {
    render(<ArabicNumber value={250} format="currency" locale="en" data-testid="curr" />);
    const text = screen.getByTestId('curr').textContent;
    expect(text).toContain('250');
    expect(text).toContain('SAR');
  });

  it('formats currency in Arabic with ر.س', () => {
    render(<ArabicNumber value={250} format="currency" locale="ar" data-testid="curr" />);
    const text = screen.getByTestId('curr').textContent;
    expect(text).toContain('ر.س');
  });
});
