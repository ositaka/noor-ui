import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Carousel } from '../carousel';
import { DirectionProvider } from '../../providers/direction-provider';

// Mock framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
}));

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

const items = ['Slide 1', 'Slide 2', 'Slide 3'];

describe('Carousel', () => {
  it('renders without crashing', () => {
    renderWithDirection(
      <Carousel items={items} renderItem={(item) => <div>{item}</div>} />
    );
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders first slide', () => {
    renderWithDirection(
      <Carousel items={items} renderItem={(item) => <div>{item}</div>} />
    );
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('renders arrow buttons', () => {
    renderWithDirection(
      <Carousel items={items} renderItem={(item) => <div>{item}</div>} showArrows />
    );
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
  });

  it('renders dot indicators', () => {
    renderWithDirection(
      <Carousel items={items} renderItem={(item) => <div>{item}</div>} showDots />
    );
    expect(screen.getByRole('tablist', { name: 'Slides' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('navigates to next slide on arrow click', async () => {
    const user = userEvent.setup();
    renderWithDirection(
      <Carousel items={items} renderItem={(item) => <div>{item}</div>} showArrows />
    );
    await user.click(screen.getByLabelText('Next slide'));
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('navigates via dot click', async () => {
    const user = userEvent.setup();
    renderWithDirection(
      <Carousel items={items} renderItem={(item) => <div>{item}</div>} showDots />
    );
    const dots = screen.getAllByRole('tab');
    await user.click(dots[2]);
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('returns null for empty items', () => {
    const { container } = renderWithDirection(
      <Carousel items={[]} renderItem={() => <div>Nothing</div>} />
    );
    expect(container.querySelector('[role="region"]')).not.toBeInTheDocument();
  });

  it('has accessible label', () => {
    renderWithDirection(
      <Carousel items={items} renderItem={(item) => <div>{item}</div>} aria-label="Image gallery" />
    );
    expect(screen.getByRole('region', { name: 'Image gallery' })).toBeInTheDocument();
  });

  it('renders in RTL with Arabic labels', () => {
    renderWithDirection(
      <Carousel items={items} renderItem={(item) => <div>{item}</div>} showArrows />,
      'rtl'
    );
    expect(screen.getByLabelText('الشريحة السابقة')).toBeInTheDocument();
    expect(screen.getByLabelText('الشريحة التالية')).toBeInTheDocument();
  });

  it('marks active dot with aria-selected=true', () => {
    renderWithDirection(
      <Carousel items={items} renderItem={(item) => <div>{item}</div>} showDots />
    );
    const dots = screen.getAllByRole('tab');
    expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    expect(dots[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('navigates backward via previous arrow', async () => {
    const user = userEvent.setup();
    renderWithDirection(
      <Carousel items={items} renderItem={(item) => <div>{item}</div>} showArrows />
    );
    // Go to slide 2
    await user.click(screen.getByLabelText('Next slide'));
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    // Go back to slide 1
    await user.click(screen.getByLabelText('Previous slide'));
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('loops from last to first slide', async () => {
    const user = userEvent.setup();
    renderWithDirection(
      <Carousel items={items} renderItem={(item) => <div>{item}</div>} showArrows loop />
    );
    // Navigate to last slide
    await user.click(screen.getByLabelText('Next slide'));
    await user.click(screen.getByLabelText('Next slide'));
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
    // Next should loop back to first
    await user.click(screen.getByLabelText('Next slide'));
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('announces slide changes via live region', () => {
    renderWithDirection(
      <Carousel items={items} renderItem={(item) => <div>{item}</div>} />
    );
    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion?.textContent).toContain('Slide 1 of 3');
  });

  it('does not render arrows for single-item carousel', () => {
    renderWithDirection(
      <Carousel items={['Only one']} renderItem={(item) => <div>{item}</div>} showArrows />
    );
    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
  });

  it('does not render dots for single-item carousel', () => {
    renderWithDirection(
      <Carousel items={['Only one']} renderItem={(item) => <div>{item}</div>} showDots />
    );
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });
});
