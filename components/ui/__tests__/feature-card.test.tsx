import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeatureCard } from '../feature-card';

const TestIcon = ({ className }: { className?: string }) => (
  <svg data-testid="icon" className={className} />
);

describe('FeatureCard', () => {
  it('renders without crashing', () => {
    render(<FeatureCard title="Feature" description="Description" icon={TestIcon} />);
    expect(screen.getByText('Feature')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<FeatureCard title="Feature" description="Desc" icon={TestIcon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders as link when href is provided', () => {
    render(<FeatureCard title="Feature" description="Desc" icon={TestIcon} href="/test" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });

  it('renders without link when no href', () => {
    render(<FeatureCard title="Feature" description="Desc" icon={TestIcon} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = render(
      <FeatureCard title="F" description="D" icon={TestIcon} className="custom-class" />
    );
    // The Card element should have the custom class
    const card = container.querySelector('.custom-class');
    expect(card).toBeInTheDocument();
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <FeatureCard title="ميزة" description="الوصف" icon={TestIcon} />
      </div>
    );
    expect(screen.getByText('ميزة')).toBeInTheDocument();
    expect(screen.getByText('الوصف')).toBeInTheDocument();
  });
});
