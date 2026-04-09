import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Kbd } from '../kbd';

describe('Kbd', () => {
  it('renders without crashing', () => {
    render(<Kbd keys={['esc']} />);
    expect(screen.getByText('Esc')).toBeInTheDocument();
  });

  it('renders single key', () => {
    render(<Kbd keys={['k']} />);
    expect(screen.getByText('K')).toBeInTheDocument();
  });

  it('renders key combination', () => {
    render(<Kbd keys={['shift', 'k']} />);
    // jsdom doesn't detect Mac, so uses non-Mac mappings
    expect(screen.getByText('Shift')).toBeInTheDocument();
    expect(screen.getByText('K')).toBeInTheDocument();
  });

  it('renders enter key symbol', () => {
    render(<Kbd keys={['enter']} />);
    expect(screen.getByText('↵')).toBeInTheDocument();
  });

  it('renders escape key', () => {
    render(<Kbd keys={['escape']} />);
    expect(screen.getByText('Esc')).toBeInTheDocument();
  });

  it('renders mod key as Ctrl on non-Mac', () => {
    render(<Kbd keys={['mod']} />);
    expect(screen.getByText('Ctrl')).toBeInTheDocument();
  });

  it('renders children as fallback', () => {
    render(<Kbd>?</Kbd>);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('renders as kbd element', () => {
    const { container } = render(<Kbd keys={['k']} />);
    expect(container.querySelector('kbd')).toBeInTheDocument();
  });

  it('has dir="ltr" (shortcuts always LTR)', () => {
    const { container } = render(<Kbd keys={['k']} />);
    expect(container.querySelector('kbd')).toHaveAttribute('dir', 'ltr');
  });

  it('renders all variants', () => {
    const variants = ['default', 'outline', 'ghost'] as const;
    for (const variant of variants) {
      const { unmount } = render(<Kbd keys={['k']} variant={variant} />);
      expect(screen.getByText('K')).toBeInTheDocument();
      unmount();
    }
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      const { unmount } = render(<Kbd keys={['k']} size={size} />);
      expect(screen.getByText('K')).toBeInTheDocument();
      unmount();
    }
  });

  it('merges custom className', () => {
    const { container } = render(<Kbd keys={['k']} className="custom-kbd" />);
    expect(container.querySelector('kbd')).toHaveClass('custom-kbd');
  });
});
