import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { HijriDate } from '../../../components/ui/hijri-date';

/**
 * Hijri Date Component Stories
 *
 * All examples are taken from /app/(docs)/components/hijri-date/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Hijri Date displays Gregorian and Islamic calendar dates.
 * Features: 4 variants (default, badge, compact, detailed), bilingual support, RTL-ready.
 */

const meta = {
  title: 'GCC-Specific/Hijri Date',
  component: HijriDate,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    gregorianDate: { control: 'text' },
    gregorianDateAr: { control: 'text' },
    hijriDate: { control: 'text' },
    hijriDateAr: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'badge', 'compact', 'detailed']
    },
    showIcon: { control: 'boolean' },
    className: { control: false }
  }
} satisfies Meta<typeof HijriDate>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    gregorianDate: 'November 6, 2025',
    gregorianDateAr: '٦ نوفمبر ٢٠٢٥',
    hijriDate: '5 Jumada al-Awwal 1447',
    hijriDateAr: '٥ جمادى الأولى ١٤٤٧',
    showIcon: true
  },
  parameters: {
    ar: {
      args: {
        gregorianDate: '٦ نوفمبر ٢٠٢٥',
        hijriDate: '٥ جمادى الأولى ١٤٤٧'
      }
    }
  },
};

// Default Variant - from component page lines 116-122
export const DefaultVariant: Story = {
  render: () => (
    <HijriDate
      gregorianDate="November 6, 2025"
      gregorianDateAr="٦ نوفمبر ٢٠٢٥"
      hijriDate="5 Jumada al-Awwal 1447"
      hijriDateAr="٥ جمادى الأولى ١٤٤٧"
      showIcon
    />
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Default Hijri date display with icon.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders default variant', async () => {
      await expect(canvas.getByText('November 6, 2025')).toBeInTheDocument();
      await expect(canvas.getByText('5 Jumada al-Awwal 1447')).toBeInTheDocument();
    });

    await step('Shows labels for default variant', async () => {
      await expect(canvas.getByText('Gregorian')).toBeInTheDocument();
      await expect(canvas.getByText('Hijri')).toBeInTheDocument();
    });

    await step('Shows calendar icon', async () => {
      const icon = canvasElement.querySelector('svg');
      await expect(icon).toBeInTheDocument();
    });
  }
};

// Badge Variant - from component page lines 149-155
export const BadgeVariant: Story = {
  render: () => (
    <HijriDate
      gregorianDate="Nov 6, 2025"
      hijriDate="5 Jumada I, 1447"
      hijriDateAr="٥ جمادى الأولى ١٤٤٧"
      variant="badge"
      showIcon
    />
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Badge variant for compact display.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders badge variant', async () => {
      await expect(canvas.getByText('Nov 6, 2025')).toBeInTheDocument();
      await expect(canvas.getByText('5 Jumada I, 1447')).toBeInTheDocument();
    });

    await step('Does not show labels in badge variant', async () => {
      expect(canvas.queryByText('Gregorian')).not.toBeInTheDocument();
      expect(canvas.queryByText('Hijri')).not.toBeInTheDocument();
    });

    await step('Shows separator bullet', async () => {
      await expect(canvas.getByText('•')).toBeInTheDocument();
    });

    await step('Shows calendar icon', async () => {
      const icon = canvasElement.querySelector('svg');
      await expect(icon).toBeInTheDocument();
    });
  }
};

// Compact Variant - from component page lines 184-190
export const CompactVariant: Story = {
  render: () => (
    <div className="text-muted-foreground">
      Published on{' '}
      <HijriDate
        gregorianDate="Nov 6, 2025"
        hijriDate="5 Jumada I, 1447"
        hijriDateAr="٥ جمادى الأولى ١٤٤٧"
        variant="compact"
        className="text-foreground"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Compact variant for inline text.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders compact variant inline with text', async () => {
      await expect(canvas.getByText('Published on')).toBeInTheDocument();
      await expect(canvas.getByText('Nov 6, 2025')).toBeInTheDocument();
      await expect(canvas.getByText('5 Jumada I, 1447')).toBeInTheDocument();
    });

    await step('Does not show labels in compact variant', async () => {
      expect(canvas.queryByText('Gregorian')).not.toBeInTheDocument();
      expect(canvas.queryByText('Hijri')).not.toBeInTheDocument();
    });

    await step('Shows separator bullet', async () => {
      await expect(canvas.getByText('•')).toBeInTheDocument();
    });

    await step('Does not show icon in compact variant', async () => {
      const icons = canvasElement.querySelectorAll('svg');
      expect(icons.length).toBe(0);
    });
  }
};

// Detailed Variant - from component page lines 221-228
export const DetailedVariant: Story = {
  render: () => (
    <HijriDate
      gregorianDate="November 6, 2025"
      gregorianDateAr="٦ نوفمبر ٢٠٢٥"
      hijriDate="5 Jumada al-Awwal 1447"
      hijriDateAr="٥ جمادى الأولى ١٤٤٧"
      variant="detailed"
      showIcon
    />
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Detailed variant with enhanced visuals.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders detailed variant', async () => {
      await expect(canvas.getByText('November 6, 2025')).toBeInTheDocument();
      await expect(canvas.getByText('5 Jumada al-Awwal 1447')).toBeInTheDocument();
    });

    await step('Shows labels for detailed variant', async () => {
      await expect(canvas.getByText('Gregorian')).toBeInTheDocument();
      await expect(canvas.getByText('Hijri')).toBeInTheDocument();
    });

    await step('Shows calendar icon', async () => {
      const icon = canvasElement.querySelector('svg');
      await expect(icon).toBeInTheDocument();
    });
  }
};

// Without Icon
export const WithoutIcon: Story = {
  render: () => (
    <HijriDate
      gregorianDate="November 6, 2025"
      gregorianDateAr="٦ نوفمبر ٢٠٢٥"
      hijriDate="5 Jumada al-Awwal 1447"
      hijriDateAr="٥ جمادى الأولى ١٤٤٧"
      showIcon={false}
    />
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Hijri date without calendar icon.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders without icon', async () => {
      await expect(canvas.getByText('November 6, 2025')).toBeInTheDocument();
      await expect(canvas.getByText('5 Jumada al-Awwal 1447')).toBeInTheDocument();
    });

    await step('Does not show calendar icon', async () => {
      const icons = canvasElement.querySelectorAll('svg');
      expect(icons.length).toBe(0);
    });
  }
};

