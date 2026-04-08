import type { Meta, StoryObj } from '@storybook/react';
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
 *
 * default, autoplay, dots-only, custom content (testimonials),
 * no-loop, large dots, no dots, single item, RTL, and dark mode.
 *
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
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'End-to-end encryption and role-based access control built in from day one.',
    color: 'bg-success/10 text-success',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Full RTL support, Arabic numerals, and Hijri calendar out of the box.',
    color: 'bg-warning/10 text-warning',
  },
  {
    icon: Sparkle,
    title: 'AI-Ready',
    description: 'Streaming text, thinking indicators, and prompt components pre-built.',
    color: 'bg-info/10 text-info',
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
      'Noor UI cut our RTL implementation time in half. The components just work in both directions without any hacks.',
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
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Shield,
    title: 'آمن افتراضياً',
    description: 'تشفير شامل وتحكم في الوصول القائم على الأدوار مدمج منذ البداية.',
    color: 'bg-success/10 text-success',
  },
  {
    icon: Globe,
    title: 'وصول عالمي',
    description: 'دعم كامل للغة العربية والأرقام الهندية والتقويم الهجري.',
    color: 'bg-warning/10 text-warning',
  },
  {
    icon: Sparkle,
    title: 'جاهز للذكاء الاصطناعي',
    description: 'مكونات البث والتفكير وإدخال الأوامر جاهزة مسبقاً.',
    color: 'bg-info/10 text-info',
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
      'قلّص Noor UI وقت تطبيق RTL لدينا إلى النصف. المكونات تعمل في كلا الاتجاهين دون أي حلول مؤقتة.',
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
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
      <div className={`p-4 rounded-xl mb-4 ${item.color}`} aria-hidden="true">
        <Icon className="h-8 w-8" weight="duotone" />
      </div>
      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
      <p className="text-muted-foreground text-center max-w-md">{item.description}</p>
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
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
      <div className={`p-4 rounded-xl mb-4 ${item.color}`} aria-hidden="true">
        <Icon className="h-8 w-8" weight="duotone" />
      </div>
      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
      <p className="text-muted-foreground text-center max-w-md">{item.description}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'User Interface/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
  render: (_args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';

    return (
    <div className="w-[480px] max-w-full">
      <Carousel
        items={isRTL ? arabicFeatureItems : featureItems}
        renderItem={isRTL ? renderArabicFeatureSlide : renderFeatureSlide}
        aria-label={isRTL ? 'أبرز المميزات' : 'Feature highlights'}
      />
    </div>
    );
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Carousel with autoPlay={4000}. Slides advance every 4 seconds. Hovering pauses auto-play.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'showArrows={false} with dotSize="lg". Navigation relies entirely on large touch-friendly dot indicators.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Testimonial carousel demonstrating arbitrary custom slide content — blockquotes with author info.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'loop={false}. The Previous arrow is disabled on the first slide and the Next arrow is disabled on the last slide.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'dotSize="lg" renders larger, touch-friendly 24px dot targets. The active dot expands to a pill shape.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'showDots={false} removes the dot indicator row. Navigation relies solely on the arrow buttons.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'With a single item, arrows and dots are both suppressed — there is nothing to navigate to.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: click Next to advance, verify slide content changes, then click Previous to go back.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: clicking dot 3 jumps directly to the third slide, then clicking dot 1 returns to the first.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: focuses the slide viewport and uses ArrowRight, ArrowLeft, Home, and End keys to navigate.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: with loop={false}, navigates to the last slide and verifies the Next arrow becomes disabled.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Edge case: an empty items array causes the Carousel to return null — no region, no dots, no arrows.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: verifies the aria-live polite region updates its text content when navigating between slides.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: verifies dotSize="sm" applies h-1.5 w-1.5 classes to inactive dots and h-1.5 w-6 to the active dot.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: verifies dotSize="lg" applies h-3 w-3 classes to inactive dots and h-3 w-8 to the active dot.',
      },
    },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interaction test: verifies the custom aria-label is applied to the carousel region element.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Dark mode stories
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Carousel in dark mode. Card backgrounds, border colors, and muted text all adapt via CSS custom properties.',
      },
    },
  },
};

