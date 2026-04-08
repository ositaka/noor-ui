import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { StatsCard } from '../../../components/ui/stats-card';
import { Card, CardContent } from '../../../components/ui/card';
import { Users, TrendUp, CurrencyDollar, ShoppingCart, Pulse, CreditCard, Download, Package } from '@phosphor-icons/react';
import * as React from 'react';

const meta = {
  title: 'Data Display/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
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
  render: (args, { globals }) => {
    return (
    <div className="w-80">
      <StatsCard {...args} />
    </div>
    );
  },
  parameters: {
    ar: {
      args: {
        label: 'إجمالي المستخدمين',
        value: '٢٬٥٤٣',
        trendLabel: 'مقابل الشهر الماضي'
      }
    }
  },
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

