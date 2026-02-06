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
  title: 'GCC/Prayer Times',
  component: PrayerTimes,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="max-w-2xl w-full">
      <PrayerTimes {...args} />
    </div>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Notification variant for prayer time alerts with adhan controls.'
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

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      <div>
        <h4 className="text-sm font-medium mb-3">Default</h4>
        <PrayerTimes
          prayers={samplePrayers}
          nextPrayer="Dhuhr"
          countdown="2:30:15"
          location="Riyadh"
          locationAr="الرياض"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Compact</h4>
        <PrayerTimes
          prayers={samplePrayers}
          nextPrayer="Asr"
          variant="compact"
          location="Mecca"
          locationAr="مكة المكرمة"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Detailed</h4>
        <PrayerTimes
          prayers={samplePrayers}
          nextPrayer="Maghrib"
          countdown="3:15:45"
          variant="detailed"
          location="Jeddah"
          locationAr="جدة"
          date="November 6, 2025"
          dateAr="٥ جمادى الأولى ١٤٤٧"
        />
      </div>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase of all prayer times variants.'
      }
    }
  }
};

// RTL Default
export const RTLDefault: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
      <PrayerTimes
        prayers={samplePrayers}
        nextPrayer="الظهر"
        countdown="2:30:15"
        location="Riyadh"
        locationAr="الرياض"
        date="November 6, 2025"
        dateAr="٥ جمادى الأولى ١٤٤٧"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Prayer times in RTL with Arabic text and proper alignment.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context with Arabic text', async () => {
      await expect(canvas.getByText('مواقيت الصلاة')).toBeInTheDocument();
      await expect(canvas.getByText('الرياض')).toBeInTheDocument();
      await expect(canvas.getByText('٥ جمادى الأولى ١٤٤٧')).toBeInTheDocument();
    });

    await step('Shows Arabic prayer names', async () => {
      await expect(canvas.getByText('الفجر')).toBeInTheDocument();
      await expect(canvas.getByText('الظهر')).toBeInTheDocument();
      await expect(canvas.getByText('العصر')).toBeInTheDocument();
      await expect(canvas.getByText('المغرب')).toBeInTheDocument();
      await expect(canvas.getByText('العشاء')).toBeInTheDocument();
    });

    await step('Shows next prayer countdown in RTL', async () => {
      await expect(canvas.getByText('الصلاة القادمة')).toBeInTheDocument();
      await expect(canvas.getByText('2:30:15')).toBeInTheDocument();
    });
  }
};

// RTL Compact
export const RTLCompact: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
      <PrayerTimes
        prayers={samplePrayers}
        nextPrayer="المغرب"
        variant="compact"
        location="Mecca"
        locationAr="مكة المكرمة"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Compact variant in RTL layout.'
      }
    }
  }
};

// RTL Detailed
export const RTLDetailed: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
      <PrayerTimes
        prayers={samplePrayers}
        nextPrayer="العشاء"
        countdown="0:45:12"
        variant="detailed"
        location="Jeddah"
        locationAr="جدة"
        date="November 6, 2025"
        dateAr="٥ جمادى الأولى ١٤٤٧"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Detailed variant in RTL with full Arabic support.'
      }
    }
  }
};

// RTL Notification
export const RTLNotification: Story = {
  args: {
    prayers: samplePrayers,
    nextPrayer: 'المغرب',
    variant: 'notification',
    location: 'Riyadh',
    locationAr: 'الرياض',
    showPlayAdhan: true,
    onPlayAdhan: fn(),
    onDismiss: fn()
  },
  render: (args) => (
    <div className="max-w-md w-80">
      <PrayerTimes {...args} />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Notification variant in RTL for adhan alerts.'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders notification in RTL with Arabic text', async () => {
      await expect(canvas.getByText('حان وقت الصلاة')).toBeInTheDocument();
      await expect(canvas.getByText('المغرب')).toBeInTheDocument();
      await expect(canvas.getByText('الرياض')).toBeInTheDocument();
    });

    await step('Shows Arabic action buttons', async () => {
      await expect(canvas.getByRole('button', { name: /تشغيل الأذان/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /إغلاق/i })).toBeInTheDocument();
    });

    await step('Handles interactions in RTL', async () => {
      const playButton = canvas.getByRole('button', { name: /تشغيل الأذان/i });
      await userEvent.click(playButton);
      await expect(args.onPlayAdhan).toHaveBeenCalledTimes(1);
    });
  }
};
