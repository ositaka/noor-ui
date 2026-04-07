import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { PrayerTimes, type Prayer } from '../../../components/ui/prayer-times';

/**
 * Prayer Times Component Stories
 *
 * All examples are taken from /app/(docs)/components/prayer-times/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Prayer Times displays Islamic prayer times with countdown and location.
 * Features: 4 variants (default, compact, detailed, notification), bilingual support, RTL-ready.
 */

const meta = {
  title: 'GCC-Specific/Prayer Times',
  component: PrayerTimes,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    prayers: { control: false },
    nextPrayer: { control: 'text' },
    countdown: { control: 'text' },
    location: { control: 'text' },
    locationAr: { control: 'text' },
    date: { control: 'text' },
    dateAr: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'detailed', 'notification']
    },
    onDismiss: { control: false },
    onPlayAdhan: { control: false },
    showPlayAdhan: { control: 'boolean' }
  }
} satisfies Meta<typeof PrayerTimes>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample prayer data
const samplePrayers: Prayer[] = [
  { name: 'Fajr', nameAr: 'الفجر', time: '04:45' },
  { name: 'Dhuhr', nameAr: 'الظهر', time: '12:15' },
  { name: 'Asr', nameAr: 'العصر', time: '15:30' },
  { name: 'Maghrib', nameAr: 'المغرب', time: '18:05' },
  { name: 'Isha', nameAr: 'العشاء', time: '19:35' },
];

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    prayers: samplePrayers,
    nextPrayer: 'Dhuhr',
    countdown: '2:30:15',
    location: 'Riyadh',
    locationAr: 'الرياض',
    date: 'November 6, 2025',
    dateAr: '٥ جمادى الأولى ١٤٤٧'
  },
  render: (args) => (
    <div className="max-w-2xl w-full">
      <PrayerTimes {...args} />
    </div>
  ),
  parameters: {
    ar: {
      args: {
        nextPrayer: 'الظهر',
        location: 'الرياض',
        date: '٥ جمادى الأولى ١٤٤٧'
      }
    }
  }
};

// Default Variant - from component page lines 137-145
export const DefaultVariant: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
      <PrayerTimes
        prayers={samplePrayers}
        nextPrayer="Asr"
        countdown="1:45:30"
        location="Dubai"
        locationAr="دبي"
        date="November 6, 2025"
        dateAr="٥ جمادى الأولى ١٤٤٧"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Default prayer times display with next prayer and countdown.'
      }
    }
  }
};

// Compact Variant - from component page lines 174-180
export const CompactVariant: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
      <PrayerTimes
        prayers={samplePrayers}
        nextPrayer="Maghrib"
        variant="compact"
        location="Mecca"
        locationAr="مكة المكرمة"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Compact variant with minimal spacing for sidebars.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders compact variant', async () => {
      await expect(canvas.getByText('Prayer Times')).toBeInTheDocument();
      await expect(canvas.getByText('Mecca')).toBeInTheDocument();
    });

    await step('Shows all prayer times in compact layout', async () => {
      await expect(canvas.getByText('Fajr')).toBeInTheDocument();
      await expect(canvas.getByText('Maghrib')).toBeInTheDocument();
      await expect(canvas.getByText('04:45')).toBeInTheDocument();
    });

    await step('Highlights Maghrib as next prayer', async () => {
      await expect(canvas.getByText('Next')).toBeInTheDocument();
    });
  }
};

// Detailed Variant - from component page lines 207-216
export const DetailedVariant: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
      <PrayerTimes
        prayers={samplePrayers}
        nextPrayer="Isha"
        countdown="0:45:12"
        variant="detailed"
        location="Jeddah"
        locationAr="جدة"
        date="November 6, 2025"
        dateAr="٥ جمادى الأولى ١٤٤٧"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Detailed variant with extra spacing and enhanced visuals.'
      }
    }
  }
};

// Without Countdown - from component page lines 246-251
export const WithoutCountdown: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
      <PrayerTimes
        prayers={samplePrayers}
        location="Doha"
        locationAr="الدوحة"
        date="November 6, 2025"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Prayer times without countdown or next prayer highlight.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders without countdown section', async () => {
      await expect(canvas.getByText('Prayer Times')).toBeInTheDocument();
      await expect(canvas.getByText('Doha')).toBeInTheDocument();
      await expect(canvas.queryByText('Next Prayer')).not.toBeInTheDocument();
    });

    await step('Shows all prayer times without highlight', async () => {
      await expect(canvas.getByText('Fajr')).toBeInTheDocument();
      await expect(canvas.getByText('Isha')).toBeInTheDocument();
      await expect(canvas.queryByText('Next')).not.toBeInTheDocument();
    });
  }
};

// Notification Variant - from component page lines 277-286
export const NotificationVariant: Story = {
  args: {
    prayers: samplePrayers,
    nextPrayer: 'Maghrib',
    variant: 'notification',
    location: 'Riyadh',
    locationAr: 'الرياض',
    showPlayAdhan: true,
    onPlayAdhan: fn(),
    onDismiss: fn()
  },
  render: (args) => (
    <div className="max-w-md w-full">
      <PrayerTimes {...args} />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Notification variant for prayer time alerts with adhan controls.'
      }
    },
    ar: {
      args: {
        nextPrayer: 'المغرب',
        location: 'الرياض'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders notification variant with prayer time alert', async () => {
      await expect(canvas.getByText('Prayer Time')).toBeInTheDocument();
      await expect(canvas.getByText('Maghrib')).toBeInTheDocument();
      await expect(canvas.getByText('18:05')).toBeInTheDocument();
      await expect(canvas.getByText('Riyadh')).toBeInTheDocument();
    });

    await step('Shows action buttons', async () => {
      await expect(canvas.getByRole('button', { name: /play adhan/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
    });

    await step('Handles play adhan click', async () => {
      const playButton = canvas.getByRole('button', { name: /play adhan/i });
      await userEvent.click(playButton);
      await expect(args.onPlayAdhan).toHaveBeenCalledTimes(1);
    });

    await step('Handles dismiss click', async () => {
      const dismissButton = canvas.getByRole('button', { name: /dismiss/i });
      await userEvent.click(dismissButton);
      await expect(args.onDismiss).toHaveBeenCalledTimes(1);
    });

    await step('Has close icon button', async () => {
      const buttons = canvas.getAllByRole('button');
      // Close button is one of the buttons (icon only)
      await expect(buttons.length).toBeGreaterThanOrEqual(3);
    });
  }
};

