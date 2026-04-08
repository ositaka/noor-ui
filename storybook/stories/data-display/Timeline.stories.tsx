import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Timeline, type TimelineItem } from '../../../components/ui/timeline';
import * as React from 'react';
import {
  CheckCircle,
  Clock,
  Seal,
  ShieldCheck,
  Package,
  Truck,
  MapPin,
  Flag,
  Code,
  Bug,
  Rocket,
  Sparkle,
  Wrench,
  Tag,
  Star,
  ChatCircle,
  GearSix,
} from '@phosphor-icons/react';

const meta = {
  title: 'User Interface/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: false,
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'alternating'],
    },
    compact: {
      control: { type: 'boolean' },
    },
    cards: {
      control: { type: 'boolean' },
    },
    className: {
      control: false,
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Shared data sets — taken verbatim from the docs page
// ---------------------------------------------------------------------------

const applicationSteps: TimelineItem[] = [
  {
    icon: <CheckCircle className="h-5 w-5" weight="fill" />,
    title: 'Submitted',
    titleAr: 'تم التقديم',
    description: 'Application received and logged into the system',
    descriptionAr: 'تم استلام الطلب وتسجيله في النظام',
    date: 'Mar 10, 2026',
    dateAr: '١٠ مارس ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" weight="fill" />,
    title: 'Document Verified',
    titleAr: 'تم التحقق من المستندات',
    description: 'All required documents have been verified',
    descriptionAr: 'تم التحقق من جميع المستندات المطلوبة',
    date: 'Mar 11, 2026',
    dateAr: '١١ مارس ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <Clock className="h-5 w-5" weight="fill" />,
    title: 'Under Review',
    titleAr: 'قيد المراجعة',
    description: 'Your application is being reviewed by the team',
    descriptionAr: 'يتم مراجعة طلبك من قبل الفريق',
    date: 'Mar 12, 2026',
    dateAr: '١٢ مارس ٢٠٢٦',
    status: 'current',
  },
  {
    icon: <Seal className="h-5 w-5" />,
    title: 'Approved',
    titleAr: 'تمت الموافقة',
    description: 'Final approval pending',
    descriptionAr: 'في انتظار الموافقة النهائية',
    status: 'upcoming',
  },
];

const orderTracking: TimelineItem[] = [
  {
    icon: <Package className="h-3.5 w-3.5" weight="fill" />,
    title: 'Order Placed',
    titleAr: 'تم تأكيد الطلب',
    description: 'Order #1234 confirmed',
    descriptionAr: 'تم تأكيد الطلب رقم #١٢٣٤',
    status: 'complete',
  },
  {
    icon: <Truck className="h-3.5 w-3.5" weight="fill" />,
    title: 'Shipped',
    titleAr: 'تم الشحن',
    description: 'Package is on its way',
    descriptionAr: 'الطرد في الطريق',
    status: 'complete',
  },
  {
    icon: <MapPin className="h-3.5 w-3.5" weight="fill" />,
    title: 'Out for Delivery',
    titleAr: 'في طريقه للتسليم',
    description: 'Expected by end of day',
    descriptionAr: 'متوقع الوصول بنهاية اليوم',
    status: 'current',
  },
  {
    title: 'Delivered',
    titleAr: 'تم التسليم',
    status: 'upcoming',
  },
];

const projectMilestones: TimelineItem[] = [
  {
    icon: <Flag className="h-5 w-5" weight="fill" />,
    title: 'Project Kickoff',
    titleAr: 'انطلاق المشروع',
    description: 'Requirements gathered, team assembled, and sprint planning completed',
    descriptionAr: 'تم جمع المتطلبات وتشكيل الفريق واستكمال تخطيط السبرنت',
    date: 'Jan 15, 2026',
    dateAr: '١٥ يناير ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <Code className="h-5 w-5" weight="bold" />,
    title: 'Alpha Release',
    titleAr: 'إصدار ألفا',
    description: 'Core features implemented and internal testing started',
    descriptionAr: 'تم تنفيذ الميزات الأساسية وبدأ الاختبار الداخلي',
    date: 'Feb 28, 2026',
    dateAr: '٢٨ فبراير ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <Bug className="h-5 w-5" weight="fill" />,
    title: 'Beta Testing',
    titleAr: 'اختبار بيتا',
    description: 'Public beta with 500 users, collecting feedback and fixing issues',
    descriptionAr: 'بيتا عامة مع ٥٠٠ مستخدم، جمع الملاحظات وإصلاح المشكلات',
    date: 'Mar 13, 2026',
    dateAr: '١٣ مارس ٢٠٢٦',
    status: 'current',
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: 'Public Launch',
    titleAr: 'الإطلاق العام',
    description: 'Production release with marketing campaign',
    descriptionAr: 'إصدار الإنتاج مع حملة تسويقية',
    date: 'Apr 15, 2026',
    dateAr: '١٥ أبريل ٢٠٢٦',
    status: 'upcoming',
  },
];

const changelog: TimelineItem[] = [
  {
    icon: <Sparkle className="h-5 w-5" weight="fill" />,
    title: 'v2.5.0 — Dashboard Redesign',
    titleAr: 'v2.5.0 — إعادة تصميم لوحة التحكم',
    description:
      'New analytics dashboard with real-time charts, customizable widgets, and dark mode support. Performance improved by 40% with virtualized lists.',
    descriptionAr:
      'لوحة تحليلات جديدة مع رسوم بيانية فورية وعناصر قابلة للتخصيص ودعم الوضع الداكن. تحسين الأداء بنسبة ٤٠٪ مع القوائم الافتراضية.',
    date: 'Mar 12, 2026',
    dateAr: '١٢ مارس ٢٠٢٦',
    status: 'current',
  },
  {
    icon: <Wrench className="h-5 w-5" weight="fill" />,
    title: 'v2.4.2 — Bug Fixes',
    titleAr: 'v2.4.2 — إصلاح الأخطاء',
    description:
      'Fixed PDF export timeout for large datasets. Resolved calendar date picker not respecting RTL layout in Safari.',
    descriptionAr:
      'إصلاح انتهاء مهلة تصدير PDF للبيانات الكبيرة. حل مشكلة منتقي التاريخ في التقويم الذي لا يحترم تخطيط RTL في Safari.',
    date: 'Mar 5, 2026',
    dateAr: '٥ مارس ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <Tag className="h-5 w-5" weight="fill" />,
    title: 'v2.4.0 — Timeline Component',
    titleAr: 'v2.4.0 — مكوّن الجدول الزمني',
    description:
      'Introduced the Timeline component with default and alternating layouts, compact mode, card wrapping, and full RTL support.',
    descriptionAr:
      'إضافة مكوّن الجدول الزمني مع تخطيط افتراضي ومتناوب ووضع مضغوط ودعم البطاقات ودعم كامل لـ RTL.',
    date: 'Feb 20, 2026',
    dateAr: '٢٠ فبراير ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <Rocket className="h-5 w-5" weight="fill" />,
    title: 'v2.3.0 — Initial Release',
    titleAr: 'v2.3.0 — الإصدار الأول',
    description:
      'First public release with 25 components, 5 themes, and bilingual support for English and Arabic.',
    descriptionAr:
      'أول إصدار عام مع ٢٥ مكوّناً و٥ سمات ودعم ثنائي اللغة للإنجليزية والعربية.',
    date: 'Jan 10, 2026',
    dateAr: '١٠ يناير ٢٠٢٦',
    status: 'complete',
  },
];

// ---------------------------------------------------------------------------
// 1. Default — LTR, all three statuses visible
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    items: applicationSteps,
    variant: 'default',
    compact: false,
    cards: false,
    'aria-label': 'Application process',
  },

  render: (args, { globals }) => {
    return (
    <div className="w-full max-w-lg">
      <Timeline {...args} />
    </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default timeline showing all three status states: complete, current, and upcoming. Uses custom icons from the icon slot.',
      },
    },
    ar: {
      args: {
        'aria-label': 'مسار الطلب',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 2. AllStatuses — isolates the three node styles
// ---------------------------------------------------------------------------

const singleStatusItems: TimelineItem[] = [
  {
    icon: <CheckCircle className="h-5 w-5" weight="fill" />,
    title: 'Completed step',
    description: 'This event has finished',
    date: 'Jan 1, 2026',
    status: 'complete',
  },
  {
    icon: <Clock className="h-5 w-5" weight="fill" />,
    title: 'Current step',
    description: 'This event is in progress',
    date: 'Jan 15, 2026',
    status: 'current',
  },
  {
    icon: <Seal className="h-5 w-5" />,
    title: 'Upcoming step',
    description: 'This event has not started yet',
    date: 'Feb 1, 2026',
    status: 'upcoming',
  },
];

export const AllStatuses: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Timeline items={singleStatusItems} aria-label="Status showcase" />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'One item per status to compare node styles: success-tinted for complete, primary-filled for current, and muted for upcoming.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all three status variants', async () => {
      await expect(canvas.getByText('Completed step')).toBeVisible();
      await expect(canvas.getByText('Current step')).toBeVisible();
      await expect(canvas.getByText('Upcoming step')).toBeVisible();
    });

    await step('Correct SR-only status labels are present', async () => {
      const srLabels = canvasElement.querySelectorAll('.sr-only');
      const texts = Array.from(srLabels).map((el) => el.textContent);
      await expect(texts).toContain('Completed');
      await expect(texts).toContain('Current');
      await expect(texts).toContain('Upcoming');
    });
  },
};

// ---------------------------------------------------------------------------
// 3. DefaultIcons — no custom icon prop, exercises the fallback icons
// ---------------------------------------------------------------------------

const defaultIconItems: TimelineItem[] = [
  {
    title: 'Complete event',
    description: 'Uses Check icon by default',
    status: 'complete',
  },
  {
    title: 'Current event',
    description: 'Uses Circle (fill) icon by default',
    status: 'current',
  },
  {
    title: 'Upcoming event',
    description: 'Uses DotsThree icon by default',
    status: 'upcoming',
  },
];

export const DefaultIcons: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Timeline items={defaultIconItems} aria-label="Default icon showcase" />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'When no icon prop is supplied, the component renders default icons: Check (complete), Circle fill (current), DotsThree (upcoming).',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders three items without custom icons', async () => {
      const items = canvas.getAllByRole('listitem');
      await expect(items).toHaveLength(3);
    });

    await step('Each node still contains an SVG icon', async () => {
      const items = canvas.getAllByRole('listitem');
      for (const item of items) {
        const iconNode = item.querySelector('[aria-hidden="true"] svg');
        await expect(iconNode).toBeInTheDocument();
      }
    });
  },
};

// ---------------------------------------------------------------------------
// 4. AlternatingLayout
// ---------------------------------------------------------------------------

export const AlternatingLayout: Story = {
  render: () => (
    <div className="w-full" style={{ minWidth: '560px' }}>
      <Timeline
        items={projectMilestones}
        variant="alternating"
        aria-label="Project milestones"
      />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Alternating variant places even-indexed items on the left and odd-indexed items on the right, with dates on the opposing side.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders alternating timeline as a list', async () => {
      const list = canvas.getByRole('list', { name: /project milestones/i });
      await expect(list).toBeInTheDocument();
    });

    await step('Renders all four items as list items', async () => {
      const items = canvas.getAllByRole('listitem');
      await expect(items).toHaveLength(4);
    });

    await step('Displays all milestone titles', async () => {
      await expect(canvas.getByText('Project Kickoff')).toBeVisible();
      await expect(canvas.getByText('Alpha Release')).toBeVisible();
      await expect(canvas.getByText('Beta Testing')).toBeVisible();
      await expect(canvas.getByText('Public Launch')).toBeVisible();
    });

    await step('Displays dates in the alternating layout', async () => {
      await expect(canvas.getByText('Jan 15, 2026')).toBeVisible();
      await expect(canvas.getByText('Feb 28, 2026')).toBeVisible();
      await expect(canvas.getByText('Mar 13, 2026')).toBeVisible();
      await expect(canvas.getByText('Apr 15, 2026')).toBeVisible();
    });

    await step('Screen-reader status labels present in alternating variant', async () => {
      const srLabels = canvasElement.querySelectorAll('.sr-only');
      const texts = Array.from(srLabels).map((el) => el.textContent);
      await expect(texts).toContain('Completed');
      await expect(texts).toContain('Current');
      await expect(texts).toContain('Upcoming');
    });
  },
};

// ---------------------------------------------------------------------------
// 5. CompactMode
// ---------------------------------------------------------------------------

export const CompactMode: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <Timeline items={orderTracking} compact aria-label="Order tracking" />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Compact mode reduces node size to h-8 w-8 and tightens vertical spacing. Ideal for sidebars or inline status panels.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders compact timeline as a list', async () => {
      const list = canvas.getByRole('list', { name: /order tracking/i });
      await expect(list).toBeInTheDocument();
    });

    await step('Displays all order stages', async () => {
      await expect(canvas.getByText('Order Placed')).toBeVisible();
      await expect(canvas.getByText('Shipped')).toBeVisible();
      await expect(canvas.getByText('Out for Delivery')).toBeVisible();
      await expect(canvas.getByText('Delivered')).toBeVisible();
    });

    await step('Compact nodes use h-8 w-8 sizing', async () => {
      // The first aria-hidden node should have the compact size classes
      const firstNode = canvasElement.querySelector('[aria-hidden="true"]');
      await expect(firstNode).toHaveClass('h-8', 'w-8');
    });
  },
};

// ---------------------------------------------------------------------------
// 6. CardsMode
// ---------------------------------------------------------------------------

export const CardsMode: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Timeline items={changelog} cards aria-label="Changelog" />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Cards mode wraps each item's content in a bordered card container, great for changelogs or feature announcements.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders cards timeline as a list', async () => {
      const list = canvas.getByRole('list', { name: /changelog/i });
      await expect(list).toBeInTheDocument();
    });

    await step('Renders four items', async () => {
      const items = canvas.getAllByRole('listitem');
      await expect(items).toHaveLength(4);
    });

    await step('Displays all changelog entries', async () => {
      await expect(canvas.getByText('v2.5.0 — Dashboard Redesign')).toBeVisible();
      await expect(canvas.getByText('v2.4.2 — Bug Fixes')).toBeVisible();
      await expect(canvas.getByText('v2.4.0 — Timeline Component')).toBeVisible();
      await expect(canvas.getByText('v2.3.0 — Initial Release')).toBeVisible();
    });

    await step('Card wrappers are rendered with border and shadow', async () => {
      // Each item's content wrapper should have rounded-lg border bg-card shadow-sm
      const firstCard = canvasElement.querySelector('.rounded-lg.border.bg-card.shadow-sm');
      await expect(firstCard).toBeInTheDocument();
    });
  },
};

// ---------------------------------------------------------------------------
// 7. CompactCards — combined compact + cards
// ---------------------------------------------------------------------------

export const CompactCards: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Timeline items={orderTracking} compact cards aria-label="Order tracking compact cards" />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Compact and cards props combined — smaller nodes with card wrappers for a dense yet structured look.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders items with compact nodes and card wrappers', async () => {
      const items = canvas.getAllByRole('listitem');
      await expect(items).toHaveLength(4);
    });

    await step('Compact node sizing (h-8 w-8) is applied', async () => {
      const firstNode = canvasElement.querySelector('[aria-hidden="true"]');
      await expect(firstNode).toHaveClass('h-8', 'w-8');
    });

    await step('Card wrappers are still rendered', async () => {
      const firstCard = canvasElement.querySelector('.rounded-lg.border.bg-card.shadow-sm');
      await expect(firstCard).toBeInTheDocument();
    });
  },
};

// ---------------------------------------------------------------------------
// 8. AlternatingCards — alternating + cards
// ---------------------------------------------------------------------------

export const AlternatingCards: Story = {
  render: () => (
    <div className="w-full" style={{ minWidth: '560px' }}>
      <Timeline
        items={projectMilestones}
        variant="alternating"
        cards
        aria-label="Project milestones with cards"
      />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Alternating layout combined with cards for a symmetrical, publication-style timeline.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders alternating cards timeline', async () => {
      const list = canvas.getByRole('list', { name: /project milestones with cards/i });
      await expect(list).toBeInTheDocument();
    });

    await step('Displays all milestone titles', async () => {
      await expect(canvas.getByText('Project Kickoff')).toBeVisible();
      await expect(canvas.getByText('Alpha Release')).toBeVisible();
      await expect(canvas.getByText('Beta Testing')).toBeVisible();
      await expect(canvas.getByText('Public Launch')).toBeVisible();
    });

    await step('Card wrappers are present in alternating layout', async () => {
      const cards = canvasElement.querySelectorAll('.rounded-lg.border.bg-card.shadow-sm');
      // 4 items, each gets a card wrapper
      await expect(cards.length).toBeGreaterThanOrEqual(4);
    });
  },
};

// ---------------------------------------------------------------------------
// 9. CustomIcons — demonstrates the icon slot with initials avatars
// ---------------------------------------------------------------------------

function InitialsAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className={`flex h-full w-full items-center justify-center rounded-full text-xs font-bold text-white ${color}`}
    >
      {initials}
    </span>
  );
}

const activityLogItems: TimelineItem[] = [
  {
    icon: <InitialsAvatar initials="SC" color="bg-blue-600" />,
    title: 'Sara commented on your pull request',
    description: '"Looks good! Just one question about the error handling..."',
    date: '2 min ago',
    status: 'current',
  },
  {
    icon: <InitialsAvatar initials="AM" color="bg-orange-600" />,
    title: 'Ahmed merged branch feature/auth',
    description: 'Pull request #47 was merged into main',
    date: '1 hour ago',
    status: 'complete',
  },
  {
    icon: <InitialsAvatar initials="LM" color="bg-emerald-800" />,
    title: 'Layla assigned you to issue #52',
    description: 'Fix pagination on the dashboard table',
    date: '3 hours ago',
    status: 'complete',
  },
  {
    icon: <InitialsAvatar initials="OA" color="bg-violet-700" />,
    title: 'Omar deployed v2.4.1 to production',
    date: 'Yesterday',
    status: 'complete',
  },
];

export const CustomIcons: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <Timeline items={activityLogItems} aria-label="Activity log" />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'The icon slot accepts any React node. Here initials avatars replace the default status icons.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders activity log timeline', async () => {
      const list = canvas.getByRole('list', { name: /activity log/i });
      await expect(list).toBeInTheDocument();
    });

    await step('Displays all activity entries', async () => {
      await expect(canvas.getByText('Sara commented on your pull request')).toBeVisible();
      await expect(canvas.getByText('Ahmed merged branch feature/auth')).toBeVisible();
      await expect(canvas.getByText('Layla assigned you to issue #52')).toBeVisible();
      await expect(canvas.getByText('Omar deployed v2.4.1 to production')).toBeVisible();
    });

    await step('Custom initials are rendered inside nodes', async () => {
      await expect(canvas.getByText('SC')).toBeInTheDocument();
      await expect(canvas.getByText('AM')).toBeInTheDocument();
      await expect(canvas.getByText('LM')).toBeInTheDocument();
      await expect(canvas.getByText('OA')).toBeInTheDocument();
    });
  },
};

// ---------------------------------------------------------------------------
// 10. WithDates — all items have dates
// ---------------------------------------------------------------------------

export const WithDates: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <Timeline items={projectMilestones} aria-label="Timeline with dates" />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All items include dates displayed above the title in a muted style.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All four dates are visible', async () => {
      await expect(canvas.getByText('Jan 15, 2026')).toBeVisible();
      await expect(canvas.getByText('Feb 28, 2026')).toBeVisible();
      await expect(canvas.getByText('Mar 13, 2026')).toBeVisible();
      await expect(canvas.getByText('Apr 15, 2026')).toBeVisible();
    });
  },
};

// ---------------------------------------------------------------------------
// 11. WithoutDates — no date fields provided
// ---------------------------------------------------------------------------

const noDatesItems: TimelineItem[] = [
  {
    icon: <Star className="h-5 w-5" weight="fill" />,
    title: 'Feature request filed',
    description: 'User submitted a request for dark mode.',
    status: 'complete',
  },
  {
    icon: <ChatCircle className="h-5 w-5" weight="fill" />,
    title: 'In discussion',
    description: 'Engineering team is evaluating the request.',
    status: 'current',
  },
  {
    icon: <GearSix className="h-5 w-5" />,
    title: 'Implementation',
    description: 'Scheduled for the next sprint.',
    status: 'upcoming',
  },
];

export const WithoutDates: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Timeline items={noDatesItems} aria-label="Feature request tracking" />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Items without dates — the layout adapts gracefully, showing only title and description.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all items without date elements', async () => {
      await expect(canvas.getByText('Feature request filed')).toBeVisible();
      await expect(canvas.getByText('In discussion')).toBeVisible();
      await expect(canvas.getByText('Implementation')).toBeVisible();
    });
  },
};

// ---------------------------------------------------------------------------
// 12. SingleItem — edge case: no connecting line rendered
// ---------------------------------------------------------------------------

export const SingleItem: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Timeline
        items={[
          {
            icon: <CheckCircle className="h-5 w-5" weight="fill" />,
            title: 'Completed',
            description: 'The only event in this timeline.',
            date: 'Mar 13, 2026',
            status: 'complete',
          },
        ]}
        aria-label="Single item"
      />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Edge case: a single-item timeline renders without a connecting line below the node.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders exactly one list item', async () => {
      const items = canvas.getAllByRole('listitem');
      await expect(items).toHaveLength(1);
    });

    await step('Shows the correct title and description', async () => {
      await expect(canvas.getByText('Completed')).toBeVisible();
      await expect(canvas.getByText('The only event in this timeline.')).toBeVisible();
    });

    await step('Single item has no connecting line (only one aria-hidden element)', async () => {
      // Non-last items have: node (aria-hidden) + line (aria-hidden) = 2 elements.
      // The only item is also the last, so only the node element appears.
      const item = canvas.getAllByRole('listitem')[0];
      const ariaHiddenEls = item.querySelectorAll('[aria-hidden="true"]');
      await expect(ariaHiddenEls).toHaveLength(1);
    });
  },
};

// ---------------------------------------------------------------------------
// 13. LastItemNoLine — multi-item list: last item must have no line
// ---------------------------------------------------------------------------

export const LastItemNoLine: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Timeline items={orderTracking} aria-label="Order tracking line check" />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Verifies that non-last items have a connecting line (2 aria-hidden elements) and the last item does not (1 aria-hidden element).',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Non-last items have a connecting line', async () => {
      const items = canvas.getAllByRole('listitem');
      // First item is not the last: expect node + line = 2 aria-hidden elements
      const firstItemAriaHidden = items[0].querySelectorAll('[aria-hidden="true"]');
      await expect(firstItemAriaHidden.length).toBeGreaterThanOrEqual(2);
    });

    await step('Last item has no connecting line', async () => {
      const items = canvas.getAllByRole('listitem');
      const lastItem = items[items.length - 1];
      const lastItemAriaHidden = lastItem.querySelectorAll('[aria-hidden="true"]');
      // Only the node icon wrapper — no line div
      await expect(lastItemAriaHidden).toHaveLength(1);
    });
  },
};

// ---------------------------------------------------------------------------
// 14. ManyItems — stress test with 8 entries
// ---------------------------------------------------------------------------

const manyItems: TimelineItem[] = [
  { title: 'Step 1', description: 'First step completed.', date: 'Jan 1', status: 'complete' },
  { title: 'Step 2', description: 'Second step completed.', date: 'Jan 5', status: 'complete' },
  { title: 'Step 3', description: 'Third step completed.', date: 'Jan 10', status: 'complete' },
  { title: 'Step 4', description: 'Fourth step completed.', date: 'Jan 15', status: 'complete' },
  { title: 'Step 5', description: 'Currently in progress.', date: 'Jan 20', status: 'current' },
  { title: 'Step 6', description: 'Scheduled next.', status: 'upcoming' },
  { title: 'Step 7', description: 'Later in the queue.', status: 'upcoming' },
  { title: 'Step 8', description: 'Final step.', status: 'upcoming' },
];

export const ManyItems: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <Timeline items={manyItems} aria-label="Long timeline" />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Eight items to verify that connecting lines, spacing, and status transitions all scale correctly.',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all eight items', async () => {
      const items = canvas.getAllByRole('listitem');
      await expect(items).toHaveLength(8);
    });
  },
};

// ---------------------------------------------------------------------------
// AllVariants showcase — visual only, no play function
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-12 items-start">
      <div className="w-72">
        <p className="text-sm font-medium text-muted-foreground mb-4">Default</p>
        <Timeline items={orderTracking} aria-label="default variant" />
      </div>
      <div className="w-72">
        <p className="text-sm font-medium text-muted-foreground mb-4">Compact</p>
        <Timeline items={orderTracking} compact aria-label="compact variant" />
      </div>
      <div className="w-72">
        <p className="text-sm font-medium text-muted-foreground mb-4">With Cards</p>
        <Timeline items={orderTracking} cards aria-label="cards variant" />
      </div>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Visual comparison of Default, Compact, and Cards variants side by side.',
      },
    },
  },
};
