import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ListingCard } from '../listing-card';

describe('ListingCard', () => {
  it('renders without crashing', () => {
    render(<ListingCard title="Test Listing" />);
    expect(screen.getByText('Test Listing')).toBeInTheDocument();
  });

  it('renders title and subtitle', () => {
    render(<ListingCard title="Luxury Villa" subtitle="Dubai Marina" />);
    expect(screen.getByText('Luxury Villa')).toBeInTheDocument();
    expect(screen.getByText('Dubai Marina')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ListingCard title="Villa" description="Beautiful property" />);
    expect(screen.getByText('Beautiful property')).toBeInTheDocument();
  });

  it('renders price', () => {
    render(<ListingCard title="Villa" price="$500,000" />);
    expect(screen.getByText('$500,000')).toBeInTheDocument();
  });

  it('renders image', () => {
    render(<ListingCard title="Villa" image="/villa.jpg" />);
    expect(screen.getByRole('img', { name: 'Villa' })).toHaveAttribute('src', '/villa.jpg');
  });

  it('renders badges', () => {
    render(
      <ListingCard
        title="Villa"
        badges={[
          { label: 'New' },
          { label: 'Featured', variant: 'secondary' },
        ]}
      />
    );
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('renders type badge', () => {
    render(<ListingCard title="Villa" typeBadge="For Sale" />);
    expect(screen.getByText('For Sale')).toBeInTheDocument();
  });

  it('renders CTA button and handles click', async () => {
    const user = userEvent.setup();
    const onCtaClick = vi.fn();
    render(<ListingCard title="Villa" ctaText="Book Now" onCtaClick={onCtaClick} />);
    await user.click(screen.getByRole('button', { name: 'Book Now' }));
    expect(onCtaClick).toHaveBeenCalled();
  });

  it('handles card click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ListingCard title="Villa" onClick={onClick} />);
    await user.click(screen.getByText('Villa'));
    expect(onClick).toHaveBeenCalled();
  });

  it('limits visible tags and shows +N more', () => {
    const tags = [
      { label: 'Pool' },
      { label: 'Gym' },
      { label: 'Parking' },
      { label: 'Garden' },
      { label: 'Security' },
    ];
    render(<ListingCard title="Villa" tags={tags} maxTags={3} />);
    expect(screen.getByText('Pool')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();
    expect(screen.getByText('Parking')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = render(<ListingCard title="Test" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <ListingCard title="فيلا فاخرة" subtitle="دبي مارينا" price="٥٠٠٬٠٠٠ درهم" />
      </div>
    );
    expect(screen.getByText('فيلا فاخرة')).toBeInTheDocument();
  });
});
