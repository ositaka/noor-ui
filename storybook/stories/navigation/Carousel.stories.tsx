import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import { Carousel } from '../../../components/ui/carousel';
import * as React from 'react';
import {
  Rocket,
  Shield,
  Lightning,
  Globe,
  Sparkle,
  Star,
} from '@phosphor-icons/react';

/**
 * Carousel Component Stories
 *
 * Covers all visual states of the Carousel component:
 * default, autoplay, dots-only, custom content (testimonials),
 * no-loop, large dots, no dots, single item, RTL, and dark mode.
 *
 * Features: animated slide transitions (framer-motion), swipe gestures,
 * keyboard navigation, auto-play with pause-on-hover, and full RTL support.
 */

// ---------------------------------------------------------------------------
// Shared data sets
// ---------------------------------------------------------------------------

type FeatureItem = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
};

const featureItems: FeatureItem[] = [
  {
    icon: Rocket,
    title: 'Lightning Fast',
    description: 'Optimized for performance with zero layout shift and instant transitions.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'End-to-end encryption and role-based access control built in from day one.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Full RTL support, Arabic numerals, and Hijri calendar out of the box.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: Sparkle,
    title: 'AI-Ready',
    description: 'Streaming text, thinking indicators, and prompt components pre-built.',
    color: 'from-amber-500 to-orange-600',
  },
];

type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  initials: string;
};

const testimonialItems: TestimonialItem[] = [
  {
    quote:
      'NoorUI cut our RTL implementation time in half. The components just work in both directions without any hacks.',
    author: 'Sarah Al-Rashidi',
    role: 'Senior Frontend Engineer',
    initials: 'SR',
  },
  {
    quote:
      'The Hijri calendar and Arabic number components saved us weeks of work on our fintech dashboard.',
    author: 'Omar Khalil',
    role: 'Product Lead',
    initials: 'OK',
  },
  {
    quote:
      'Finally a component library that treats Arabic as a first-class language, not an afterthought.',
    author: 'Lina Mansour',
    role: 'UI/UX Designer',
    initials: 'LM',
  },
];

type ArabicFeatureItem = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
};

const arabicFeatureItems: ArabicFeatureItem[] = [
  {
    icon: Rocket,
    title: 'سريع للغاية',
    description: 'محسّن للأداء مع انتقالات فورية ودون أي اهتزاز في التخطيط.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Shield,
    title: 'آمن افتراضياً',
    description: 'تشفير شامل وتحكم في الوصول القائم على الأدوار مدمج منذ البداية.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Globe,
    title: 'وصول عالمي',
    description: 'دعم كامل للغة العربية والأرقام الهندية والتقويم الهجري.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: Sparkle,
    title: 'جاهز للذكاء الاصطناعي',
    description: 'مكونات البث والتفكير وإدخال الأوامر جاهزة مسبقاً.',
    color: 'from-amber-500 to-orange-600',
  },
];

type ArabicTestimonialItem = {
  quote: string;
  author: string;
  role: string;
  initials: string;
};

const arabicTestimonialItems: ArabicTestimonialItem[] = [
  {
    quote:
      'قلّص NoorUI وقت تطبيق RTL لدينا إلى النصف. المكونات تعمل في كلا الاتجاهين دون أي حلول مؤقتة.',
    author: 'سارة الراشدي',
    role: 'مهندسة واجهات أمامية أولى',
    initials: 'ار',
  },
  {
    quote:
      'وفّر لنا التقويم الهجري ومكونات الأرقام العربية أسابيع من العمل في لوحة تحكم التكنولوجيا المالية.',
    author: 'عمر خليل',
    role: 'قائد المنتج',
    initials: 'عخ',
  },
  {
    quote: 'أخيراً مكتبة مكونات تتعامل مع العربية كلغة رئيسية، لا كفكرة لاحقة.',
    author: 'لينا منصور',
    role: 'مصممة واجهة المستخدم',
    initials: 'لم',
  },
];

// ---------------------------------------------------------------------------
// Render helpers
// ---------------------------------------------------------------------------

function renderFeatureSlide(item: FeatureItem) {
  const Icon = item.icon;
  return (
    <div className={`bg-gradient-to-br ${item.color} rounded-lg p-8 text-white min-h-[200px] flex flex-col justify-between`}>
      <Icon className="h-10 w-10 opacity-90" weight="duotone" />
      <div>
        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
        <p className="text-sm opacity-80 leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

function renderTestimonialSlide(item: TestimonialItem | ArabicTestimonialItem) {
  return (
    <div className="bg-card border border-border rounded-lg p-8 min-h-[200px] flex flex-col justify-between">
      <blockquote className="text-muted-foreground leading-relaxed italic">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 mt-6">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold shrink-0">
          {item.initials}
        </div>
        <div>
          <p className="font-medium text-sm">{item.author}</p>
          <p className="text-muted-foreground text-xs">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

function renderArabicFeatureSlide(item: ArabicFeatureItem) {
  const Icon = item.icon;
  return (
    <div className={`bg-gradient-to-bl ${item.color} rounded-lg p-8 text-white min-h-[200px] flex flex-col justify-between`}>
      <Icon className="h-10 w-10 opacity-90" weight="duotone" />
      <div>
        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
        <p className="text-sm opacity-80 leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Navigation/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['!autodocs'],
  argTypes: {
    items: { control: false },
    renderItem: { control: false },
    autoPlay: {
      control: { type: 'number' },
      description: 'Auto-advance interval in ms, or false to disable',
    },
    showDots: { control: { type: 'boolean' } },
    showArrows: { control: { type: 'boolean' } },
    loop: { control: { type: 'boolean' } },
    dotSize: {
      control: 'select',
      options: ['sm', 'lg'],
    },
    className: { control: false },
    slideClassName: { control: false },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// LTR stories
// ---------------------------------------------------------------------------

/**
 * Default carousel with four feature cards.
 * Arrows and small dots are visible; looping is enabled.
 */
export const Default: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        aria-label="Feature highlights"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Default carousel with arrows and small dot indicators. Loops back to the first slide after the last.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders first slide content', async () => {
      await expect(canvas.getByText('Lightning Fast')).toBeVisible();
    });

    await step('Renders prev and next arrow buttons', async () => {
      await expect(canvas.getByRole('button', { name: /previous slide/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /next slide/i })).toBeInTheDocument();
    });

    await step('Renders dot indicators', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs).toHaveLength(4);
      await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    });

    await step('Carousel has accessible region role', async () => {
      await expect(
        canvasElement.querySelector('[role="region"]'),
      ).toBeInTheDocument();
    });
  },
};

/**
 * Auto-play advances slides every 4 seconds.
 * Hovering over the carousel pauses auto-play.
 */
export const AutoPlay: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        autoPlay={4000}
        aria-label="Auto-playing feature highlights"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Carousel with autoPlay={4000}. Slides advance every 4 seconds. Hovering pauses auto-play.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders first slide on mount', async () => {
      await expect(canvas.getByText('Lightning Fast')).toBeVisible();
    });

    await step('Shows navigation controls', async () => {
      await expect(canvas.getByRole('button', { name: /previous slide/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /next slide/i })).toBeInTheDocument();
    });
  },
};

/**
 * Dots-only mode: arrows are hidden, large dots are used as the sole navigation.
 */
export const DotsOnly: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        showArrows={false}
        dotSize="lg"
        aria-label="Feature highlights — dots only"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'showArrows={false} with dotSize="lg". Navigation relies entirely on large touch-friendly dot indicators.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders first slide', async () => {
      await expect(canvas.getByText('Lightning Fast')).toBeVisible();
    });

    await step('Arrow buttons are not rendered', async () => {
      await expect(canvas.queryByRole('button', { name: /previous slide/i })).not.toBeInTheDocument();
      await expect(canvas.queryByRole('button', { name: /next slide/i })).not.toBeInTheDocument();
    });

    await step('Large dot indicators are present', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs).toHaveLength(4);
    });
  },
};

/**
 * Testimonial carousel — custom slide content with quotes, author names, and avatars.
 */
export const CustomContent: Story = {
  render: () => (
    <div className="w-[520px] max-w-full">
      <Carousel
        items={testimonialItems}
        renderItem={renderTestimonialSlide}
        aria-label="Customer testimonials"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Testimonial carousel demonstrating arbitrary custom slide content — blockquotes with author info.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders first testimonial quote', async () => {
      await expect(canvas.getByText('Sarah Al-Rashidi')).toBeVisible();
    });

    await step('Shows navigation controls', async () => {
      await expect(canvas.getByRole('button', { name: /previous slide/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /next slide/i })).toBeInTheDocument();
    });

    await step('Dot count matches item count', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs).toHaveLength(3);
    });
  },
};

/**
 * No-loop mode: arrows are disabled (opacity-40) when the carousel is at either end.
 */
export const NoLoop: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        loop={false}
        aria-label="Non-looping feature carousel"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'loop={false}. The Previous arrow is disabled on the first slide and the Next arrow is disabled on the last slide.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders first slide', async () => {
      await expect(canvas.getByText('Lightning Fast')).toBeVisible();
    });

    await step('Previous arrow is disabled at the first slide', async () => {
      const prevBtn = canvas.getByRole('button', { name: /previous slide/i });
      await expect(prevBtn).toBeDisabled();
    });

    await step('Next arrow is enabled at the first slide', async () => {
      const nextBtn = canvas.getByRole('button', { name: /next slide/i });
      await expect(nextBtn).not.toBeDisabled();
    });
  },
};

/**
 * Large dots variant: dotSize="lg" produces wider pill-shaped active dots (8×32px).
 */
export const LargeDots: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        dotSize="lg"
        aria-label="Feature highlights — large dots"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'dotSize="lg" renders larger, touch-friendly 24px dot targets. The active dot expands to a pill shape.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with dot indicators', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs).toHaveLength(4);
      await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    });
  },
};

/**
 * No dots: showDots={false} hides the dot indicator row entirely.
 */
export const NoDots: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        showDots={false}
        aria-label="Feature highlights — arrows only"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'showDots={false} removes the dot indicator row. Navigation relies solely on the arrow buttons.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders first slide', async () => {
      await expect(canvas.getByText('Lightning Fast')).toBeVisible();
    });

    await step('Dot indicators are not rendered', async () => {
      await expect(canvas.queryByRole('tab')).not.toBeInTheDocument();
    });

    await step('Arrow buttons are still present', async () => {
      await expect(canvas.getByRole('button', { name: /previous slide/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /next slide/i })).toBeInTheDocument();
    });
  },
};

/**
 * Single item: when items has only one entry, dots and arrows are both hidden.
 */
export const SingleItem: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={[featureItems[0]]}
        renderItem={renderFeatureSlide}
        aria-label="Single feature highlight"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'With a single item, arrows and dots are both suppressed — there is nothing to navigate to.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders the only slide', async () => {
      await expect(canvas.getByText('Lightning Fast')).toBeVisible();
    });

    await step('No arrows rendered for single item', async () => {
      await expect(canvas.queryByRole('button', { name: /previous slide/i })).not.toBeInTheDocument();
      await expect(canvas.queryByRole('button', { name: /next slide/i })).not.toBeInTheDocument();
    });

    await step('No dots rendered for single item', async () => {
      await expect(canvas.queryByRole('tab')).not.toBeInTheDocument();
    });
  },
};

// ---------------------------------------------------------------------------
// Interaction test stories
// ---------------------------------------------------------------------------

/**
 * Arrow navigation: clicking Next advances the slide, clicking Previous goes back.
 * Verifies the aria-live region updates with the new slide position.
 */
export const ArrowNavigation: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        aria-label="Arrow navigation test"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: click Next to advance, verify slide content changes, then click Previous to go back.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Starts on slide 1', async () => {
      await expect(canvas.getByText('Lightning Fast')).toBeVisible();
    });

    await step('Click Next → advances to slide 2', async () => {
      const nextBtn = canvas.getByRole('button', { name: /next slide/i });
      await userEvent.click(nextBtn);
      await waitFor(() => {
        expect(canvas.getByText('Secure by Default')).toBeVisible();
      });
    });

    await step('Aria-live region updates to "Slide 2 of 4"', async () => {
      const liveRegion = canvasElement.querySelector('[aria-live="polite"]');
      await expect(liveRegion).toHaveTextContent('Slide 2 of 4');
    });

    await step('Dot 2 is now selected', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      await expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    });

    await step('Click Previous → goes back to slide 1', async () => {
      const prevBtn = canvas.getByRole('button', { name: /previous slide/i });
      await userEvent.click(prevBtn);
      await waitFor(() => {
        expect(canvas.getByText('Lightning Fast')).toBeVisible();
      });
    });

    await step('Aria-live region updates back to "Slide 1 of 4"', async () => {
      const liveRegion = canvasElement.querySelector('[aria-live="polite"]');
      await expect(liveRegion).toHaveTextContent('Slide 1 of 4');
    });
  },
};

/**
 * Dot navigation: clicking a dot jumps directly to that slide.
 */
export const DotNavigation: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        aria-label="Dot navigation test"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: clicking dot 3 jumps directly to the third slide, then clicking dot 1 returns to the first.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Starts on slide 1', async () => {
      await expect(canvas.getByText('Lightning Fast')).toBeVisible();
    });

    await step('Click dot 3 → jumps to slide 3', async () => {
      const tabs = canvas.getAllByRole('tab');
      await userEvent.click(tabs[2]);
      await waitFor(() => {
        expect(canvas.getByText('Global Reach')).toBeVisible();
      });
    });

    await step('Dot 3 is now aria-selected', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
    });

    await step('Click dot 1 → jumps back to slide 1', async () => {
      const tabs = canvas.getAllByRole('tab');
      await userEvent.click(tabs[0]);
      await waitFor(() => {
        expect(canvas.getByText('Lightning Fast')).toBeVisible();
      });
    });

    await step('Dot 1 is now aria-selected again', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    });
  },
};

/**
 * Keyboard navigation: ArrowRight, ArrowLeft, Home, and End keys navigate slides.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        aria-label="Keyboard navigation test"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: focuses the slide viewport and uses ArrowRight, ArrowLeft, Home, and End keys to navigate.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Focus the slide viewport', async () => {
      const viewport = canvas.getByRole('group', { name: /slide viewport/i });
      viewport.focus();
      await expect(viewport).toHaveFocus();
    });

    await step('ArrowRight → advances to slide 2', async () => {
      await userEvent.keyboard('{ArrowRight}');
      await waitFor(() => {
        expect(canvas.getByText('Secure by Default')).toBeVisible();
      });
    });

    await step('ArrowRight → advances to slide 3', async () => {
      await userEvent.keyboard('{ArrowRight}');
      await waitFor(() => {
        expect(canvas.getByText('Global Reach')).toBeVisible();
      });
    });

    await step('ArrowLeft → goes back to slide 2', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      await waitFor(() => {
        expect(canvas.getByText('Secure by Default')).toBeVisible();
      });
    });

    await step('Home → jumps to first slide', async () => {
      await userEvent.keyboard('{Home}');
      await waitFor(() => {
        expect(canvas.getByText('Lightning Fast')).toBeVisible();
      });
    });

    await step('End → jumps to last slide', async () => {
      await userEvent.keyboard('{End}');
      await waitFor(() => {
        expect(canvas.getByText('AI-Ready')).toBeVisible();
      });
    });
  },
};

/**
 * Loop false boundary: advances to the last slide and verifies the Next button is disabled,
 * then goes back to the first and verifies Previous is disabled.
 */
export const LoopFalseBoundary: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        loop={false}
        aria-label="Loop boundary test"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: with loop={false}, navigates to the last slide and verifies the Next arrow becomes disabled.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const nextBtn = canvas.getByRole('button', { name: /next slide/i });
    const prevBtn = canvas.getByRole('button', { name: /previous slide/i });

    await step('Previous is disabled at slide 1', async () => {
      await expect(prevBtn).toBeDisabled();
      await expect(nextBtn).not.toBeDisabled();
    });

    await step('Advance to slide 2', async () => {
      await userEvent.click(nextBtn);
      await waitFor(() => {
        expect(canvas.getByText('Secure by Default')).toBeVisible();
      });
    });

    await step('Both arrows are enabled on a middle slide', async () => {
      await expect(prevBtn).not.toBeDisabled();
      await expect(nextBtn).not.toBeDisabled();
    });

    await step('Advance to slide 3', async () => {
      await userEvent.click(nextBtn);
      await waitFor(() => {
        expect(canvas.getByText('Global Reach')).toBeVisible();
      });
    });

    await step('Advance to slide 4 (last)', async () => {
      await userEvent.click(nextBtn);
      await waitFor(() => {
        expect(canvas.getByText('AI-Ready')).toBeVisible();
      });
    });

    await step('Next is disabled at the last slide', async () => {
      await expect(nextBtn).toBeDisabled();
      await expect(prevBtn).not.toBeDisabled();
    });
  },
};

/**
 * Empty items: the carousel returns null when given an empty array.
 */
export const EmptyItems: Story = {
  render: () => (
    <div className="w-[480px] max-w-full" data-testid="empty-wrapper">
      <Carousel
        items={[]}
        renderItem={() => <div>Should not render</div>}
        aria-label="Empty carousel"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Edge case: an empty items array causes the Carousel to return null — no region, no dots, no arrows.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step('No carousel region is rendered', async () => {
      await expect(canvasElement.querySelector('[role="region"]')).toBeNull();
    });

    await step('No slide content is rendered', async () => {
      const canvas = within(canvasElement);
      await expect(canvas.queryByText('Should not render')).not.toBeInTheDocument();
    });
  },
};

/**
 * Aria-live region: verifies the hidden live region announces slide changes.
 */
export const AriaLiveRegion: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        aria-label="Aria live region test"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: verifies the aria-live polite region updates its text content when navigating between slides.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const liveRegion = canvasElement.querySelector('[aria-live="polite"]');

    await step('Live region starts with "Slide 1 of 4"', async () => {
      await expect(liveRegion).toHaveTextContent('Slide 1 of 4');
    });

    await step('Navigate to slide 2 → live region updates', async () => {
      const nextBtn = canvas.getByRole('button', { name: /next slide/i });
      await userEvent.click(nextBtn);
      await waitFor(() => {
        expect(liveRegion).toHaveTextContent('Slide 2 of 4');
      });
    });

    await step('Navigate to slide 3 → live region updates', async () => {
      const nextBtn = canvas.getByRole('button', { name: /next slide/i });
      await userEvent.click(nextBtn);
      await waitFor(() => {
        expect(liveRegion).toHaveTextContent('Slide 3 of 4');
      });
    });
  },
};

/**
 * Dot size classes: verifies that dotSize="sm" and dotSize="lg" apply the correct CSS classes.
 */
export const DotSizeSmClasses: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        dotSize="sm"
        aria-label="Small dot size test"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: verifies dotSize="sm" applies h-1.5 w-1.5 classes to inactive dots and h-1.5 w-6 to the active dot.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole('tab');

    await step('Active dot (first) has small pill classes', async () => {
      await expect(tabs[0]).toHaveClass('h-1.5');
      await expect(tabs[0]).toHaveClass('w-6');
    });

    await step('Inactive dots have small circle classes', async () => {
      await expect(tabs[1]).toHaveClass('h-1.5');
      await expect(tabs[1]).toHaveClass('w-1.5');
    });
  },
};

export const DotSizeLgClasses: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        dotSize="lg"
        aria-label="Large dot size test"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: verifies dotSize="lg" applies h-3 w-3 classes to inactive dots and h-3 w-8 to the active dot.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole('tab');

    await step('Active dot (first) has large pill classes', async () => {
      await expect(tabs[0]).toHaveClass('h-3');
      await expect(tabs[0]).toHaveClass('w-8');
    });

    await step('Inactive dots have large circle classes', async () => {
      await expect(tabs[1]).toHaveClass('h-3');
      await expect(tabs[1]).toHaveClass('w-3');
    });
  },
};

/**
 * Custom aria-label: verifies a custom label is applied to the carousel region.
 */
export const CustomAriaLabel: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={featureItems}
        renderItem={renderFeatureSlide}
        aria-label="Product showcase gallery"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: verifies the custom aria-label is applied to the carousel region element.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step('Region has the custom aria-label', async () => {
      const region = canvasElement.querySelector('[role="region"]');
      await expect(region).toHaveAttribute('aria-label', 'Product showcase gallery');
    });

    await step('Region has carousel roledescription', async () => {
      const region = canvasElement.querySelector('[role="region"]');
      await expect(region).toHaveAttribute('aria-roledescription', 'carousel');
    });
  },
};

// ---------------------------------------------------------------------------
// RTL stories
// ---------------------------------------------------------------------------

/**
 * RTL default: Arabic feature cards with arrow icons and dot direction mirrored.
 */
export const RTLExample: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={arabicFeatureItems}
        renderItem={renderArabicFeatureSlide}
        aria-label="أبرز الميزات"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'RTL carousel with Arabic content. Arrow icons swap sides, swipe direction inverts, and slide announcements use Eastern Arabic numerals.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders first Arabic slide', async () => {
      await expect(canvas.getByText('سريع للغاية')).toBeVisible();
    });

    await step('RTL arrow buttons are present', async () => {
      await expect(canvas.getByRole('button', { name: /الشريحة السابقة/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /الشريحة التالية/i })).toBeInTheDocument();
    });

    await step('Dot indicators reflect Arabic item count', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs).toHaveLength(4);
      await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    });
  },
};

/**
 * RTL testimonials with Arabic quotes and author names.
 */
export const RTLCustomContent: Story = {
  render: () => (
    <div className="w-[520px] max-w-full">
      <Carousel
        items={arabicTestimonialItems}
        renderItem={renderTestimonialSlide}
        aria-label="آراء العملاء"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'RTL testimonial carousel with Arabic quotes. Content and navigation flow right-to-left.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders first Arabic testimonial', async () => {
      await expect(canvas.getByText('سارة الراشدي')).toBeVisible();
    });

    await step('Shows three dot indicators', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs).toHaveLength(3);
    });
  },
};

/**
 * RTL no-loop: Previous/Next arrows respect RTL semantics and disable at the correct ends.
 */
export const RTLNoLoop: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={arabicFeatureItems}
        renderItem={renderArabicFeatureSlide}
        loop={false}
        aria-label="عرض دوّار بدون تكرار"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'RTL + loop={false}. The "previous" arrow (right side in RTL) is disabled on the first slide.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders first Arabic slide', async () => {
      await expect(canvas.getByText('سريع للغاية')).toBeVisible();
    });

    await step('Previous arrow is disabled at the first slide in RTL', async () => {
      const prevBtn = canvas.getByRole('button', { name: /الشريحة السابقة/i });
      await expect(prevBtn).toBeDisabled();
    });
  },
};

/**
 * RTL dots-only with large indicators.
 */
export const RTLDotsOnly: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={arabicFeatureItems}
        renderItem={renderArabicFeatureSlide}
        showArrows={false}
        dotSize="lg"
        aria-label="أبرز الميزات — نقاط فقط"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'RTL carousel with showArrows={false} and dotSize="lg". Touch-friendly large dots in RTL layout.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders first Arabic slide', async () => {
      await expect(canvas.getByText('سريع للغاية')).toBeVisible();
    });

    await step('No arrow buttons in RTL dots-only mode', async () => {
      await expect(canvas.queryByRole('button', { name: /الشريحة السابقة/i })).not.toBeInTheDocument();
      await expect(canvas.queryByRole('button', { name: /الشريحة التالية/i })).not.toBeInTheDocument();
    });

    await step('Large dot indicators present', async () => {
      const tabs = canvas.getAllByRole('tab');
      await expect(tabs).toHaveLength(4);
    });
  },
};

/**
 * RTL single item: same suppression of arrows/dots applies in RTL.
 */
export const RTLSingleItem: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={[arabicFeatureItems[0]]}
        renderItem={renderArabicFeatureSlide}
        aria-label="ميزة واحدة"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'RTL carousel with a single item. Neither arrows nor dots are rendered.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders the only Arabic slide', async () => {
      await expect(canvas.getByText('سريع للغاية')).toBeVisible();
    });

    await step('No arrows or dots for a single item in RTL', async () => {
      await expect(canvas.queryByRole('button', { name: /الشريحة/i })).not.toBeInTheDocument();
      await expect(canvas.queryByRole('tab')).not.toBeInTheDocument();
    });
  },
};

/**
 * RTL keyboard navigation: ArrowLeft advances (next) and ArrowRight goes back (previous) in RTL.
 */
export const RTLKeyboardNavigation: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={arabicFeatureItems}
        renderItem={renderArabicFeatureSlide}
        aria-label="اختبار لوحة المفاتيح"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'RTL interaction test: ArrowLeft advances to the next slide (inverted from LTR). ArrowRight goes to the previous slide.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Focus the slide viewport', async () => {
      const viewport = canvas.getByRole('group', { name: /منطقة الشرائح/i });
      viewport.focus();
      await expect(viewport).toHaveFocus();
    });

    await step('ArrowLeft → advances to next slide in RTL', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      await waitFor(() => {
        expect(canvas.getByText('آمن افتراضياً')).toBeVisible();
      });
    });

    await step('ArrowRight → goes back to previous slide in RTL', async () => {
      await userEvent.keyboard('{ArrowRight}');
      await waitFor(() => {
        expect(canvas.getByText('سريع للغاية')).toBeVisible();
      });
    });

    await step('End → jumps to last slide', async () => {
      await userEvent.keyboard('{End}');
      await waitFor(() => {
        expect(canvas.getByText('جاهز للذكاء الاصطناعي')).toBeVisible();
      });
    });

    await step('Home → jumps to first slide', async () => {
      await userEvent.keyboard('{Home}');
      await waitFor(() => {
        expect(canvas.getByText('سريع للغاية')).toBeVisible();
      });
    });
  },
};

// ---------------------------------------------------------------------------
// Dark mode stories (LTR + RTL)
// ---------------------------------------------------------------------------

/**
 * Dark mode default: verifies the carousel renders correctly on a dark background.
 * Arrow buttons use bg-background/80, which adapts to the dark theme automatically.
 */
export const DarkMode: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={testimonialItems}
        renderItem={renderTestimonialSlide}
        aria-label="Testimonials — dark mode"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
    theme: 'dark',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Carousel in dark mode. Card backgrounds, border colors, and muted text all adapt via CSS custom properties.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in dark mode with first testimonial', async () => {
      await expect(canvas.getByText('Sarah Al-Rashidi')).toBeVisible();
    });

    await step('Navigation controls are present in dark mode', async () => {
      await expect(canvas.getByRole('button', { name: /previous slide/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /next slide/i })).toBeInTheDocument();
    });
  },
};

/**
 * RTL dark mode: Arabic content carousel in dark mode.
 */
export const RTLDarkMode: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={arabicTestimonialItems}
        renderItem={renderTestimonialSlide}
        aria-label="آراء العملاء — الوضع الداكن"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
    theme: 'dark',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'RTL carousel in dark mode with Arabic testimonials. Direction, color tokens, and dark-mode styles all compose correctly.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders first Arabic testimonial in RTL dark mode', async () => {
      await expect(canvas.getByText('سارة الراشدي')).toBeVisible();
    });

    await step('RTL arrow buttons present in dark mode', async () => {
      await expect(canvas.getByRole('button', { name: /الشريحة السابقة/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /الشريحة التالية/i })).toBeInTheDocument();
    });
  },
};
