import type { Meta, StoryObj } from '@storybook/react';
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
  title: 'GCC/Hijri Date',
  component: HijriDate,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Hijri date without calendar icon.'
      }
    }
  }
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Default</h4>
        <HijriDate
          gregorianDate="November 6, 2025"
          hijriDate="5 Jumada al-Awwal 1447"
          hijriDateAr="٥ جمادى الأولى ١٤٤٧"
          showIcon
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Badge</h4>
        <HijriDate
          gregorianDate="Nov 6, 2025"
          hijriDate="5 Jumada I, 1447"
          hijriDateAr="٥ جمادى الأولى ١٤٤٧"
          variant="badge"
          showIcon
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Compact</h4>
        <HijriDate
          gregorianDate="Nov 6, 2025"
          hijriDate="5 Jumada I, 1447"
          hijriDateAr="٥ جمادى الأولى ١٤٤٧"
          variant="compact"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Detailed</h4>
        <HijriDate
          gregorianDate="November 6, 2025"
          gregorianDateAr="٦ نوفمبر ٢٠٢٥"
          hijriDate="5 Jumada al-Awwal 1447"
          hijriDateAr="٥ جمادى الأولى ١٤٤٧"
          variant="detailed"
          showIcon
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
        story: 'Showcase of all Hijri date variants.'
      }
    }
  }
};

// RTL Default
export const RTLDefault: Story = {
  render: () => (
    <HijriDate
      gregorianDate="November 6, 2025"
      gregorianDateAr="٦ نوفمبر ٢٠٢٥"
      hijriDate="5 Jumada al-Awwal 1447"
      hijriDateAr="٥ جمادى الأولى ١٤٤٧"
      showIcon
    />
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Hijri date in RTL with Arabic text.'
      }
    }
  }
};

// RTL Badge
export const RTLBadge: Story = {
  render: () => (
    <HijriDate
      gregorianDate="Nov 6, 2025"
      hijriDate="5 Jumada I, 1447"
      hijriDateAr="٥ جمادى الأولى ١٤٤٧"
      variant="badge"
      showIcon
    />
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Badge variant in RTL layout.'
      }
    }
  }
};

// RTL Compact
export const RTLCompact: Story = {
  render: () => (
    <div className="text-muted-foreground">
      نُشر في{' '}
      <HijriDate
        gregorianDate="Nov 6, 2025"
        hijriDate="5 Jumada I, 1447"
        hijriDateAr="٥ جمادى الأولى ١٤٤٧"
        variant="compact"
        className="text-foreground"
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
        story: 'Compact variant in RTL with Arabic inline text.'
      }
    }
  }
};

// RTL Detailed
export const RTLDetailed: Story = {
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
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Detailed variant in RTL with full Arabic dates.'
      }
    }
  }
};
