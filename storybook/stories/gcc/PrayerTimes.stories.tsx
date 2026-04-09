import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { PrayerTimes, type Prayer } from '../../../components/ui/prayer-times';

const meta = {
  title: 'Regional & Islamic/Prayer Times',
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
  render: (args, { globals }) => {
    return (
    <div className="max-w-2xl w-full">
      <PrayerTimes {...args} />
    </div>
    );
  },
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
  }
};

