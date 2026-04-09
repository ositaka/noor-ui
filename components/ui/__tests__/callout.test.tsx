import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Callout, InfoCallout, WarningCallout, ErrorCallout, SuccessCallout } from '../callout';

describe('Callout', () => {
  it('renders without crashing', () => {
    render(<Callout>Content</Callout>);
    expect(screen.getByRole('note')).toBeInTheDocument();
  });

  it('renders with title and content', () => {
    render(<Callout title="Important">Details here</Callout>);
    expect(screen.getByText('Important')).toBeInTheDocument();
    expect(screen.getByText('Details here')).toBeInTheDocument();
  });

  it('renders all types', () => {
    const types = ['info', 'warning', 'error', 'success', 'note'] as const;
    for (const type of types) {
      const { unmount } = render(<Callout type={type}>Content</Callout>);
      expect(screen.getByRole('note')).toBeInTheDocument();
      unmount();
    }
  });

  it('defaults to info type', () => {
    render(<Callout>Default</Callout>);
    expect(screen.getByRole('note')).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    render(<Callout>No title</Callout>);
    expect(screen.getByText('No title')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<Callout className="custom-callout">Content</Callout>);
    expect(screen.getByRole('note')).toHaveClass('custom-callout');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Callout title="ملاحظة">تفاصيل</Callout>
      </div>
    );
    expect(screen.getByText('ملاحظة')).toBeInTheDocument();
    expect(screen.getByText('تفاصيل')).toBeInTheDocument();
  });
});

describe('Convenience callout components', () => {
  it('InfoCallout renders', () => {
    render(<InfoCallout>Info content</InfoCallout>);
    expect(screen.getByRole('note')).toBeInTheDocument();
  });

  it('WarningCallout renders', () => {
    render(<WarningCallout>Warning content</WarningCallout>);
    expect(screen.getByRole('note')).toBeInTheDocument();
  });

  it('ErrorCallout renders', () => {
    render(<ErrorCallout>Error content</ErrorCallout>);
    expect(screen.getByRole('note')).toBeInTheDocument();
  });

  it('SuccessCallout renders', () => {
    render(<SuccessCallout>Success content</SuccessCallout>);
    expect(screen.getByRole('note')).toBeInTheDocument();
  });
});
