import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { StatsCard } from '../../../components/ui/stats-card';
import { Card, CardContent } from '../../../components/ui/card';
import { Users, TrendUp, CurrencyDollar, ShoppingCart, Pulse, CreditCard, Download, Package } from '@phosphor-icons/react';
import * as React from 'react';

/**
 * StatsCard Component Stories
 *
 * All examples are taken from /app/(docs)/components/stats-card/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: StatsCard displays dashboard metrics with optional trend indicators.
 * Features: Icon display, value formatting, positive/negative trends with colors.
 */

const meta = {
  title: 'Data Display/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    icon: {
      control: false
    },
    label: {
      control: { type: 'text' }
    },
    value: {
      control: { type: 'text' }
    },
    trend: {
      control: { type: 'number' }
    },
    trendLabel: {
      control: { type: 'text' }
    },
    className: {
      control: { type: 'text' }
    }
  }
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    icon: <Users className="h-4 w-4" />,
    label: 'Total Users',
    value: '2,543',
    trend: 12,
    trendLabel: 'from last month'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="w-80">
      <StatsCard {...args} />
    </div>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders stats card correctly', async () => {
      await expect(canvas.getByText('Total Users')).toBeInTheDocument();
      await expect(canvas.getByText('Total Users')).toBeVisible();
      await expect(canvas.getByText('2,543')).toBeInTheDocument();
      await expect(canvas.getByText('2,543')).toBeVisible();
    });

    await step('Displays positive trend indicator', async () => {
      await expect(canvas.getByText('+12%')).toBeInTheDocument();
      await expect(canvas.getByText('from last month')).toBeInTheDocument();
    });

    await step('Contains icon element', async () => {
      const svg = canvasElement.querySelector('svg');
      await expect(svg).toBeInTheDocument();
    });
  }
};

// Dashboard Grid - from component page lines 111-139
export const DashboardGrid: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        icon={<Users className="h-4 w-4" />}
        label="Total Users"
        value="2,543"
        trend={12}
        trendLabel="from last month"
      />
      <StatsCard
        icon={<TrendUp className="h-4 w-4" />}
        label="Revenue"
        value="$45,231"
        trend={8}
        trendLabel="from last month"
      />
      <StatsCard
        icon={<CurrencyDollar className="h-4 w-4" />}
        label="Sales"
        value="$12,234"
        trend={-3}
        trendLabel="from last month"
      />
      <StatsCard
        icon={<ShoppingCart className="h-4 w-4" />}
        label="Active Orders"
        value="573"
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
        story: 'Dashboard grid showing 4 stats cards with different metrics. Includes positive, negative, and no trend indicators.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all four stat cards', async () => {
      await expect(canvas.getByText('Total Users')).toBeInTheDocument();
      await expect(canvas.getByText('Revenue')).toBeInTheDocument();
      await expect(canvas.getByText('Sales')).toBeInTheDocument();
      await expect(canvas.getByText('Active Orders')).toBeInTheDocument();
    });

    await step('Displays all values correctly', async () => {
      await expect(canvas.getByText('2,543')).toBeInTheDocument();
      await expect(canvas.getByText('$45,231')).toBeInTheDocument();
      await expect(canvas.getByText('$12,234')).toBeInTheDocument();
      await expect(canvas.getByText('573')).toBeInTheDocument();
    });

    await step('Shows positive trends correctly', async () => {
      await expect(canvas.getByText('+12%')).toBeInTheDocument();
      await expect(canvas.getByText('+8%')).toBeInTheDocument();
    });

    await step('Shows negative trend correctly', async () => {
      await expect(canvas.getByText('-3%')).toBeInTheDocument();
    });
  }
};

// Positive Trend
export const PositiveTrend: Story = {
  render: () => (
    <div className="w-80">
      <StatsCard
        icon={<TrendUp className="h-4 w-4" />}
        label="Revenue"
        value="$45,231"
        trend={8}
        trendLabel="from last month"
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
        story: 'Stats card with positive trend (+8%). Trend is displayed in green.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders positive trend card', async () => {
      await expect(canvas.getByText('Revenue')).toBeInTheDocument();
      await expect(canvas.getByText('$45,231')).toBeInTheDocument();
    });

    await step('Displays positive trend with plus sign', async () => {
      await expect(canvas.getByText('+8%')).toBeInTheDocument();
      await expect(canvas.getByText('from last month')).toBeInTheDocument();
    });
  }
};

// Negative Trend
export const NegativeTrend: Story = {
  render: () => (
    <div className="w-80">
      <StatsCard
        icon={<CurrencyDollar className="h-4 w-4" />}
        label="Sales"
        value="$12,234"
        trend={-3}
        trendLabel="from last month"
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
        story: 'Stats card with negative trend (-3%). Trend is displayed in red.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders negative trend card', async () => {
      await expect(canvas.getByText('Sales')).toBeInTheDocument();
      await expect(canvas.getByText('$12,234')).toBeInTheDocument();
    });

    await step('Displays negative trend with minus sign', async () => {
      await expect(canvas.getByText('-3%')).toBeInTheDocument();
      await expect(canvas.getByText('from last month')).toBeInTheDocument();
    });
  }
};

// Without Trend
export const WithoutTrend: Story = {
  render: () => (
    <div className="w-80">
      <StatsCard
        icon={<ShoppingCart className="h-4 w-4" />}
        label="Active Orders"
        value="573"
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
        story: 'Stats card without trend indicator. Simple metric display.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders card without trend', async () => {
      await expect(canvas.getByText('Active Orders')).toBeInTheDocument();
      await expect(canvas.getByText('573')).toBeInTheDocument();
    });

    await step('Verifies no trend indicator present', async () => {
      const text = canvasElement.textContent || '';
      await expect(text).not.toContain('%');
    });
  }
};

// All Metrics
export const AllMetrics: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        icon={<Users className="h-4 w-4" />}
        label="Total Users"
        value="2,543"
        trend={12}
        trendLabel="vs last month"
      />
      <StatsCard
        icon={<Pulse className="h-4 w-4" />}
        label="Active Sessions"
        value="1,324"
        trend={5}
        trendLabel="vs last week"
      />
      <StatsCard
        icon={<CreditCard className="h-4 w-4" />}
        label="Subscriptions"
        value="892"
        trend={-2}
        trendLabel="vs last month"
      />
      <StatsCard
        icon={<Download className="h-4 w-4" />}
        label="Downloads"
        value="8,547"
        trend={18}
        trendLabel="vs last month"
      />
      <StatsCard
        icon={<Package className="h-4 w-4" />}
        label="Total Products"
        value="342"
      />
      <StatsCard
        icon={<ShoppingCart className="h-4 w-4" />}
        label="Cart Conversions"
        value="68%"
        trend={4}
        trendLabel="vs last month"
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
        story: 'Comprehensive dashboard showing various metrics with different icons and trends.'
      }
    }
  }
};

// In Card Container
export const InCardContainer: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Dashboard Overview</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            icon={<Users className="h-4 w-4" />}
            label="Total Users"
            value="2,543"
            trend={12}
            trendLabel="from last month"
          />
          <StatsCard
            icon={<TrendUp className="h-4 w-4" />}
            label="Revenue"
            value="$45,231"
            trend={8}
            trendLabel="from last month"
          />
          <StatsCard
            icon={<ShoppingCart className="h-4 w-4" />}
            label="Active Orders"
            value="573"
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Stats cards grouped inside a card container with a title.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders container with heading', async () => {
      await expect(canvas.getByText('Dashboard Overview')).toBeInTheDocument();
    });

    await step('Renders all stats cards in container', async () => {
      await expect(canvas.getByText('Total Users')).toBeInTheDocument();
      await expect(canvas.getByText('Revenue')).toBeInTheDocument();
      await expect(canvas.getByText('Active Orders')).toBeInTheDocument();
    });

    await step('Displays values and trends', async () => {
      await expect(canvas.getByText('2,543')).toBeInTheDocument();
      await expect(canvas.getByText('$45,231')).toBeInTheDocument();
      await expect(canvas.getByText('573')).toBeInTheDocument();
      await expect(canvas.getByText('+12%')).toBeInTheDocument();
      await expect(canvas.getByText('+8%')).toBeInTheDocument();
    });
  }
};

// RTL Example - Dashboard Grid
export const RTLExample: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        icon={<Users className="h-4 w-4" />}
        label="إجمالي المستخدمين"
        value="2,543"
        trend={12}
        trendLabel="مقابل الشهر الماضي"
      />
      <StatsCard
        icon={<TrendUp className="h-4 w-4" />}
        label="الإيرادات"
        value="$45,231"
        trend={8}
        trendLabel="مقابل الشهر الماضي"
      />
      <StatsCard
        icon={<CurrencyDollar className="h-4 w-4" />}
        label="المبيعات"
        value="$12,234"
        trend={-3}
        trendLabel="مقابل الشهر الماضي"
      />
      <StatsCard
        icon={<ShoppingCart className="h-4 w-4" />}
        label="الطلبات النشطة"
        value="573"
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
        story: 'Dashboard grid in RTL mode with Arabic labels. Layout flows right-to-left.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      await expect(canvas.getByText('إجمالي المستخدمين')).toBeInTheDocument();
      await expect(canvas.getByText('الإيرادات')).toBeInTheDocument();
      await expect(canvas.getByText('المبيعات')).toBeInTheDocument();
      await expect(canvas.getByText('الطلبات النشطة')).toBeInTheDocument();
    });

    await step('Displays Arabic trend labels', async () => {
      const trendLabels = canvas.getAllByText('مقابل الشهر الماضي');
      await expect(trendLabels.length).toBe(3);
    });
  }
};

// RTL Positive Trend
export const RTLPositiveTrend: Story = {
  render: () => (
    <div className="w-80">
      <StatsCard
        icon={<TrendUp className="h-4 w-4" />}
        label="الإيرادات"
        value="$45,231"
        trend={8}
        trendLabel="مقابل الشهر الماضي"
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
        story: 'Stats card with positive trend in RTL. Trend indicator works correctly in Arabic.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders RTL positive trend card', async () => {
      await expect(canvas.getByText('الإيرادات')).toBeInTheDocument();
      await expect(canvas.getByText('$45,231')).toBeInTheDocument();
    });

    await step('Displays positive trend in RTL', async () => {
      await expect(canvas.getByText('+8%')).toBeInTheDocument();
      await expect(canvas.getByText('مقابل الشهر الماضي')).toBeInTheDocument();
    });
  }
};

// RTL Negative Trend
export const RTLNegativeTrend: Story = {
  render: () => (
    <div className="w-80">
      <StatsCard
        icon={<CurrencyDollar className="h-4 w-4" />}
        label="المبيعات"
        value="$12,234"
        trend={-3}
        trendLabel="مقابل الشهر الماضي"
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
        story: 'Stats card with negative trend in RTL. Red color for negative values works in both directions.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders RTL negative trend card', async () => {
      await expect(canvas.getByText('المبيعات')).toBeInTheDocument();
      await expect(canvas.getByText('$12,234')).toBeInTheDocument();
    });

    await step('Displays negative trend in RTL', async () => {
      await expect(canvas.getByText('-3%')).toBeInTheDocument();
      await expect(canvas.getByText('مقابل الشهر الماضي')).toBeInTheDocument();
    });
  }
};

// RTL In Card Container
export const RTLInCardContainer: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">نظرة عامة على لوحة المعلومات</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            icon={<Users className="h-4 w-4" />}
            label="إجمالي المستخدمين"
            value="2,543"
            trend={12}
            trendLabel="مقابل الشهر الماضي"
          />
          <StatsCard
            icon={<TrendUp className="h-4 w-4" />}
            label="الإيرادات"
            value="$45,231"
            trend={8}
            trendLabel="مقابل الشهر الماضي"
          />
          <StatsCard
            icon={<ShoppingCart className="h-4 w-4" />}
            label="الطلبات النشطة"
            value="573"
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Stats cards in RTL inside a card container. All content flows right-to-left.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders RTL container with Arabic heading', async () => {
      await expect(canvas.getByText('نظرة عامة على لوحة المعلومات')).toBeInTheDocument();
    });

    await step('Renders all RTL stats cards in container', async () => {
      await expect(canvas.getByText('إجمالي المستخدمين')).toBeInTheDocument();
      await expect(canvas.getByText('الإيرادات')).toBeInTheDocument();
      await expect(canvas.getByText('الطلبات النشطة')).toBeInTheDocument();
    });

    await step('Displays Arabic values and trends', async () => {
      await expect(canvas.getByText('2,543')).toBeInTheDocument();
      await expect(canvas.getByText('$45,231')).toBeInTheDocument();
      await expect(canvas.getByText('573')).toBeInTheDocument();
      await expect(canvas.getByText('+12%')).toBeInTheDocument();
      await expect(canvas.getByText('+8%')).toBeInTheDocument();
    });
  }
};
