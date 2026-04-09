import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatsCard } from '../stats-card';

const TestIcon = () => <svg data-testid="icon" />;

describe('StatsCard', () => {
  it('renders without crashing', () => {
    render(<StatsCard icon={<TestIcon />} label="Revenue" value="$10,000" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$10,000')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<StatsCard icon={<TestIcon />} label="Sales" value={42} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders numeric value', () => {
    render(<StatsCard icon={<TestIcon />} label="Users" value={1500} />);
    expect(screen.getByText('1500')).toBeInTheDocument();
  });

  it('shows positive trend', () => {
    render(
      <StatsCard icon={<TestIcon />} label="Growth" value="$5K" trend={12} trendLabel="from last month" />
    );
    expect(screen.getByText('+12%')).toBeInTheDocument();
    expect(screen.getByText('from last month')).toBeInTheDocument();
  });

  it('shows negative trend', () => {
    render(
      <StatsCard icon={<TestIcon />} label="Churn" value="5%" trend={-3} trendLabel="from last week" />
    );
    expect(screen.getByText('-3%')).toBeInTheDocument();
  });

  it('does not show trend when not provided', () => {
    render(<StatsCard icon={<TestIcon />} label="Items" value={99} />);
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = render(
      <StatsCard icon={<TestIcon />} label="Test" value="1" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <StatsCard icon={<TestIcon />} label="الإيرادات" value="١٠٬٠٠٠" />
      </div>
    );
    expect(screen.getByText('الإيرادات')).toBeInTheDocument();
  });
});
