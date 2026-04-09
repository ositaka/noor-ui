import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from '../empty-state';

describe('EmptyState', () => {
  it('renders without crashing', () => {
    render(<EmptyState title="No results" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders title and description', () => {
    render(<EmptyState title="Empty" description="Nothing to show here" />);
    expect(screen.getByText('Empty')).toBeInTheDocument();
    expect(screen.getByText('Nothing to show here')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<EmptyState title="Empty" icon={<svg data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders action', () => {
    render(
      <EmptyState
        title="No items"
        action={<button>Add Item</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument();
  });

  it('has status role for accessibility', () => {
    render(<EmptyState title="Empty" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<EmptyState title="Empty" className="custom-class" />);
    expect(screen.getByRole('status')).toHaveClass('custom-class');
  });

  it('does not render description when not provided', () => {
    const { container } = render(<EmptyState title="Empty" />);
    expect(container.querySelectorAll('p')).toHaveLength(0);
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <EmptyState title="لا توجد نتائج" description="لا يوجد شيء لعرضه" />
      </div>
    );
    expect(screen.getByText('لا توجد نتائج')).toBeInTheDocument();
    expect(screen.getByText('لا يوجد شيء لعرضه')).toBeInTheDocument();
  });
});
