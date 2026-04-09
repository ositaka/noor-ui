import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Blockquote, PullQuote } from '../blockquote';

describe('Blockquote', () => {
  it('renders without crashing', () => {
    render(<Blockquote>A wise quote</Blockquote>);
    expect(screen.getByText('A wise quote')).toBeInTheDocument();
  });

  it('renders with author', () => {
    render(<Blockquote author="Ibn Arabi">The self is an ocean.</Blockquote>);
    expect(screen.getByText(/Ibn Arabi/)).toBeInTheDocument();
  });

  it('renders with source', () => {
    render(<Blockquote source="Fusus al-Hikam">Quote text</Blockquote>);
    expect(screen.getByText('Fusus al-Hikam')).toBeInTheDocument();
  });

  it('renders source as link when cite is provided', () => {
    render(
      <Blockquote source="Book" cite="https://example.com">
        Quote
      </Blockquote>
    );
    const link = screen.getByText('Book').closest('a');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders all variants', () => {
    const variants = ['default', 'accent', 'subtle'] as const;
    for (const variant of variants) {
      const { unmount } = render(
        <Blockquote variant={variant}>Quote</Blockquote>
      );
      expect(screen.getByText('Quote')).toBeInTheDocument();
      unmount();
    }
  });

  it('merges custom className', () => {
    const { container } = render(
      <Blockquote className="custom-class">Quote</Blockquote>
    );
    expect(container.querySelector('figure')).toHaveClass('custom-class');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Blockquote author="ابن عربي">النفس بحر بلا شاطئ</Blockquote>
      </div>
    );
    expect(screen.getByText('النفس بحر بلا شاطئ')).toBeInTheDocument();
    expect(screen.getByText(/ابن عربي/)).toBeInTheDocument();
  });
});

describe('PullQuote', () => {
  it('renders without crashing', () => {
    render(<PullQuote>Important quote</PullQuote>);
    expect(screen.getByText('Important quote')).toBeInTheDocument();
  });

  it('renders as aside element', () => {
    render(<PullQuote>Quote text</PullQuote>);
    const aside = screen.getByText('Quote text').closest('aside');
    expect(aside).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<PullQuote className="custom-class">Quote</PullQuote>);
    const aside = screen.getByText('Quote').closest('aside');
    expect(aside).toHaveClass('custom-class');
  });
});
