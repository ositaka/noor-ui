import type { Meta, StoryObj } from '@storybook/react';
import { StatsCard } from '../../../components/ui/stats-card';
import { Card, CardContent } from '../../../components/ui/card';
import { Users, TrendingUp, DollarSign, ShoppingCart, Activity, CreditCard, Download, Package } from 'lucide-react';
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
        icon={<TrendingUp className="h-4 w-4" />}
        label="Revenue"
        value="$45,231"
        trend={8}
        trendLabel="from last month"
      />
      <StatsCard
        icon={<DollarSign className="h-4 w-4" />}
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
      disable: true,
      description: {
        story: 'Dashboard grid showing 4 stats cards with different metrics. Includes positive, negative, and no trend indicators.'
      }
    }
  }
};

// Positive Trend
export const PositiveTrend: Story = {
  render: () => (
    <div className="w-80">
      <StatsCard
        icon={<TrendingUp className="h-4 w-4" />}
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
      disable: true,
      description: {
        story: 'Stats card with positive trend (+8%). Trend is displayed in green.'
      }
    }
  }
};

// Negative Trend
export const NegativeTrend: Story = {
  render: () => (
    <div className="w-80">
      <StatsCard
        icon={<DollarSign className="h-4 w-4" />}
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
      disable: true,
      description: {
        story: 'Stats card with negative trend (-3%). Trend is displayed in red.'
      }
    }
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
      disable: true,
      description: {
        story: 'Stats card without trend indicator. Simple metric display.'
      }
    }
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
        icon={<Activity className="h-4 w-4" />}
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
      disable: true,
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
            icon={<TrendingUp className="h-4 w-4" />}
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
      disable: true,
      description: {
        story: 'Stats cards grouped inside a card container with a title.'
      }
    }
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
        icon={<TrendingUp className="h-4 w-4" />}
        label="الإيرادات"
        value="$45,231"
        trend={8}
        trendLabel="مقابل الشهر الماضي"
      />
      <StatsCard
        icon={<DollarSign className="h-4 w-4" />}
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
      disable: true,
      description: {
        story: 'Dashboard grid in RTL mode with Arabic labels. Layout flows right-to-left.'
      }
    }
  }
};

// RTL Positive Trend
export const RTLPositiveTrend: Story = {
  render: () => (
    <div className="w-80">
      <StatsCard
        icon={<TrendingUp className="h-4 w-4" />}
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
      disable: true,
      description: {
        story: 'Stats card with positive trend in RTL. Trend indicator works correctly in Arabic.'
      }
    }
  }
};

// RTL Negative Trend
export const RTLNegativeTrend: Story = {
  render: () => (
    <div className="w-80">
      <StatsCard
        icon={<DollarSign className="h-4 w-4" />}
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
      disable: true,
      description: {
        story: 'Stats card with negative trend in RTL. Red color for negative values works in both directions.'
      }
    }
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
            icon={<TrendingUp className="h-4 w-4" />}
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
      disable: true,
      description: {
        story: 'Stats cards in RTL inside a card container. All content flows right-to-left.'
      }
    }
  }
};
