import type { Meta, StoryObj } from '@storybook/react';
import { HijriDate } from '../../../components/ui/hijri-date';

const meta = {
  title: 'Regional & Islamic/Hijri Date',
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
  }
};

