import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from '../../../components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import * as React from 'react';

/**
 *
 * Covers all four chart types: line, bar, area, donut.
 * Includes LTR (English) and RTL (Arabic) variants, size/thickness/color
 * overrides, sparkline style (no grid/axes), and a realistic dashboard.
 *
 */

const meta = {
  title: 'Data Display/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const quarterlySales = [
  { quarter: 'Q1', dubai: 128, riyadh: 95, doha: 64 },
  { quarter: 'Q2', dubai: 145, riyadh: 112, doha: 78 },
  { quarter: 'Q3', dubai: 162, riyadh: 130, doha: 85 },
  { quarter: 'Q4', dubai: 189, riyadh: 148, doha: 102 },
];

const quarterlySalesAr = [
  { quarter: 'الربع ١', dubai: 128, riyadh: 95, doha: 64 },
  { quarter: 'الربع ٢', dubai: 145, riyadh: 112, doha: 78 },
  { quarter: 'الربع ٣', dubai: 162, riyadh: 130, doha: 85 },
  { quarter: 'الربع ٤', dubai: 189, riyadh: 148, doha: 102 },
];

const departmentBudgets = [
  { dept: 'Eng', budget: 420 },
  { dept: 'Design', budget: 280 },
  { dept: 'Marketing', budget: 350 },
  { dept: 'Sales', budget: 310 },
  { dept: 'Support', budget: 190 },
];

const departmentBudgetsAr = [
  { dept: 'الهندسة', budget: 420 },
  { dept: 'التصميم', budget: 280 },
  { dept: 'التسويق', budget: 350 },
  { dept: 'المبيعات', budget: 310 },
  { dept: 'الدعم', budget: 190 },
];

const monthlyUsers = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1450 },
  { month: 'Mar', users: 1380 },
  { month: 'Apr', users: 1720 },
  { month: 'May', users: 1890 },
  { month: 'Jun', users: 2150 },
];

const monthlyUsersAr = [
  { month: 'يناير', users: 1200 },
  { month: 'فبراير', users: 1450 },
  { month: 'مارس', users: 1380 },
  { month: 'أبريل', users: 1720 },
  { month: 'مايو', users: 1890 },
  { month: 'يونيو', users: 2150 },
];

// ---------------------------------------------------------------------------
// 1. Default — Line chart with dual-series (Dubai vs Riyadh)
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <div className="w-[560px] space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">Quarterly Sales — Dubai vs Riyadh</h3>
      <Chart
        type="line"
        data={quarterlySales}
        categoryKey="quarter"
        valueKey={['dubai', 'riyadh']}
        aria-label="Quarterly sales comparison between Dubai and Riyadh"
      />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Default line chart showing dual-series sales data for Dubai and Riyadh across four quarters.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 2. BarChart — Department budgets
// ---------------------------------------------------------------------------

export const BarChart: Story = {
  render: () => (
    <div className="w-[560px] space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">Department Budgets (USD thousands)</h3>
      <Chart
        type="bar"
        data={departmentBudgets}
        categoryKey="dept"
        valueKey="budget"
        colors={['var(--color-primary)']}
        aria-label="Department budget allocation bar chart"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Bar chart showing budget allocation across five departments.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 3. AreaChart — Monthly active users
// ---------------------------------------------------------------------------

export const AreaChart: Story = {
  render: () => (
    <div className="w-[560px] space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">Monthly Active Users</h3>
      <Chart
        type="area"
        data={monthlyUsers}
        categoryKey="month"
        valueKey="users"
        colors={['var(--color-info)']}
        aria-label="Monthly active users area chart"
      />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Area chart displaying monthly active user growth over six months.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 4. DonutChart — Three donuts side-by-side
// ---------------------------------------------------------------------------

export const DonutChart: Story = {
  render: () => (
    <div className="space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">Project Status Overview</h3>
      <div className="flex gap-8 items-center">
        <div className="flex flex-col items-center gap-2">
          <Chart
            type="donut"
            data={[]}
            value={73}
            innerLabel="73%"
            innerSubLabel="Completed"
            size="md"
            colors={['var(--color-success)']}
            aria-label="73% of tasks completed"
          />
          <span className="text-xs text-muted-foreground">Completed</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Chart
            type="donut"
            data={[]}
            value={45}
            innerLabel="45%"
            innerSubLabel="In Progress"
            size="md"
            colors={['var(--color-warning)']}
            aria-label="45% of tasks in progress"
          />
          <span className="text-xs text-muted-foreground">In Progress</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Chart
            type="donut"
            data={[]}
            value={92}
            innerLabel="92%"
            innerSubLabel="Target"
            size="md"
            colors={['var(--color-primary)']}
            aria-label="92% of target reached"
          />
          <span className="text-xs text-muted-foreground">Target</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Three donut charts side-by-side showing project status: 73% completed, 45% in progress, 92% target reached.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 5. MultiSeries — 3-series line chart with dash patterns
// ---------------------------------------------------------------------------

export const MultiSeries: Story = {
  render: () => (
    <div className="w-[600px] space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">Quarterly Sales — Dubai, Riyadh & Doha</h3>
      <Chart
        type="line"
        data={quarterlySales}
        categoryKey="quarter"
        valueKey={['dubai', 'riyadh', 'doha']}
        colors={['var(--color-primary)', 'var(--color-success)', 'var(--color-warning)']}
        size="lg"
        aria-label="Three-series quarterly sales comparison for Dubai, Riyadh, and Doha"
      />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Three-series line chart with automatic dash patterns for color-blind-friendly differentiation.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 6. SizeVariants — sm and lg side by side
// ---------------------------------------------------------------------------

export const SizeVariants: Story = {
  render: () => (
    <div className="w-[680px] space-y-6 p-4">
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Small (sm)</span>
        <Chart
          type="bar"
          data={departmentBudgets}
          categoryKey="dept"
          valueKey="budget"
          size="sm"
          colors={['var(--color-primary)']}
          aria-label="Small size department budgets bar chart"
        />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Large (lg)</span>
        <Chart
          type="bar"
          data={departmentBudgets}
          categoryKey="dept"
          valueKey="budget"
          size="lg"
          colors={['var(--color-primary)']}
          aria-label="Large size department budgets bar chart"
        />
      </div>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Demonstrates the sm and lg size variants of the bar chart.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 7. CustomColors — Chart with custom color overrides
// ---------------------------------------------------------------------------

export const CustomColors: Story = {
  render: () => (
    <div className="w-[560px] space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">Sales with Custom Colors</h3>
      <Chart
        type="line"
        data={quarterlySales}
        categoryKey="quarter"
        valueKey={['dubai', 'riyadh']}
        colors={['var(--color-destructive)', 'var(--color-info)']}
        aria-label="Sales chart with custom semantic color overrides"
      />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Line chart using explicit semantic color token overrides (destructive and info).',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 8. NoGrid — Sparkline style (grid/axes hidden)
// ---------------------------------------------------------------------------

export const NoGrid: Story = {
  render: () => (
    <div className="w-[400px] space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">Active Users Sparkline</h3>
      <Chart
        type="area"
        data={monthlyUsers}
        categoryKey="month"
        valueKey="users"
        showGrid={false}
        showXAxis={false}
        showYAxis={false}
        size="sm"
        colors={['var(--color-success)']}
        strokeWidth={2}
        aria-label="Monthly active users sparkline"
      />
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Area chart with all grid lines and axes hidden — ideal for inline sparklines inside cards.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 12. DonutThickness — thin, default, thick variants
// ---------------------------------------------------------------------------

export const DonutThickness: Story = {
  render: () => (
    <div className="space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">Donut Thickness Variants</h3>
      <div className="flex gap-8 items-center">
        <div className="flex flex-col items-center gap-2">
          <Chart
            type="donut"
            data={[]}
            value={68}
            innerLabel="68%"
            thickness="thin"
            size="md"
            colors={['var(--color-primary)']}
            aria-label="Thin donut at 68%"
          />
          <span className="text-xs text-muted-foreground">Thin</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Chart
            type="donut"
            data={[]}
            value={68}
            innerLabel="68%"
            thickness="default"
            size="md"
            colors={['var(--color-primary)']}
            aria-label="Default donut at 68%"
          />
          <span className="text-xs text-muted-foreground">Default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Chart
            type="donut"
            data={[]}
            value={68}
            innerLabel="68%"
            thickness="thick"
            size="md"
            colors={['var(--color-primary)']}
            aria-label="Thick donut at 68%"
          />
          <span className="text-xs text-muted-foreground">Thick</span>
        </div>
      </div>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Side-by-side comparison of the three donut arc thickness options: thin, default, and thick.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 13. FontSizeVariants — fontSize={11} vs fontSize={16}
// ---------------------------------------------------------------------------

export const FontSizeVariants: Story = {
  render: () => (
    <div className="w-[680px] space-y-6 p-4">
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Small font (11px)</span>
        <Chart
          type="line"
          data={monthlyUsers}
          categoryKey="month"
          valueKey="users"
          fontSize={11}
          colors={['var(--color-info)']}
          aria-label="Monthly users with small 11px axis font"
        />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Large font (16px)</span>
        <Chart
          type="line"
          data={monthlyUsers}
          categoryKey="month"
          valueKey="users"
          fontSize={16}
          colors={['var(--color-info)']}
          aria-label="Monthly users with large 16px axis font"
        />
      </div>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Demonstrates how the fontSize prop scales the axis tick labels — 11px for compact views, 16px for large displays.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Sample data — multi-segment donut
// ---------------------------------------------------------------------------

const spendingBreakdown = [
  { category: 'Housing', amount: 1850 },
  { category: 'Food & Dining', amount: 620 },
  { category: 'Transport', amount: 340 },
  { category: 'Healthcare', amount: 210 },
  { category: 'Entertainment', amount: 180 },
];

const spendingBreakdownAr = [
  { category: 'السكن', amount: 1850 },
  { category: 'الطعام والمطاعم', amount: 620 },
  { category: 'المواصلات', amount: 340 },
  { category: 'الرعاية الصحية', amount: 210 },
  { category: 'الترفيه', amount: 180 },
];

const appointmentTypes = [
  { type: 'General Checkup', count: 142 },
  { type: 'Specialist', count: 89 },
  { type: 'Dental', count: 56 },
  { type: 'Emergency', count: 31 },
];

// ---------------------------------------------------------------------------
// 15. MultiSegmentDonut — Spending breakdown (5 segments, thick, with labels)
// ---------------------------------------------------------------------------

export const MultiSegmentDonut: Story = {
  render: () => (
    <div className="space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">Monthly Spending Breakdown</h3>
      <div className="flex items-center gap-8">
        <Chart
          type="donut"
          data={spendingBreakdown}
          categoryKey="category"
          valueKey="amount"
          innerLabel="$3,200"
          innerSubLabel="Total spending"
          thickness="thick"
          size="md"
          aria-label="Monthly spending breakdown across 5 categories"
        />
        <div className="space-y-2">
          {spendingBreakdown.map((item, i) => {
            const colors = [
              'var(--color-primary)',
              'var(--color-secondary)',
              'var(--color-success)',
              'var(--color-warning)',
              'var(--color-info)',
            ];
            return (
              <div key={item.category} className="flex items-center gap-2 text-sm">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ background: colors[i] }}
                />
                <span className="text-foreground">{item.category}</span>
                <span className="text-muted-foreground ms-auto ps-4">${item.amount.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Multi-segment donut chart showing monthly spending across 5 categories with thick arc, center labels, and a legend.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 16. MultiSegmentDonutSmall — Same data at size="sm"
// ---------------------------------------------------------------------------

export const MultiSegmentDonutSmall: Story = {
  render: () => (
    <div className="space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">Spending Breakdown (Small)</h3>
      <div className="flex items-center gap-6">
        <Chart
          type="donut"
          data={spendingBreakdown}
          categoryKey="category"
          valueKey="amount"
          innerLabel="$3.2k"
          innerSubLabel="Total"
          thickness="thick"
          size="sm"
          aria-label="Monthly spending breakdown — small size variant"
        />
        <div className="space-y-1.5">
          {spendingBreakdown.map((item, i) => {
            const colorClasses = [
              'bg-primary',
              'bg-secondary',
              'bg-success',
              'bg-warning',
              'bg-info',
            ];
            return (
              <div key={item.category} className="flex items-center gap-2 text-xs">
                <span className={`inline-block h-2 w-2 rounded-full flex-shrink-0 ${colorClasses[i]}`} />
                <span className="text-foreground">{item.category}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ),

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Multi-segment donut at size="sm" — same spending data rendered compactly alongside a minimal legend.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 17. MultiSegmentDonutWithCustomColors — 4 appointment types, custom colors
// ---------------------------------------------------------------------------

export const MultiSegmentDonutWithCustomColors: Story = {
  render: () => (
    <div className="space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">Appointment Types — This Month</h3>
      <div className="flex items-center gap-8">
        <Chart
          type="donut"
          data={appointmentTypes}
          categoryKey="type"
          valueKey="count"
          innerLabel="318"
          innerSubLabel="Appointments"
          colors={[
            'var(--color-primary)',
            'var(--color-info)',
            'var(--color-success)',
            'var(--color-destructive)',
          ]}
          size="md"
          aria-label="Appointment type distribution for the current month"
        />
        <div className="space-y-2">
          {appointmentTypes.map((item, i) => {
            const colors = [
              'var(--color-primary)',
              'var(--color-info)',
              'var(--color-success)',
              'var(--color-destructive)',
            ];
            const pct = Math.round((item.count / 318) * 100);
            return (
              <div key={item.type} className="flex items-center gap-2 text-sm">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ background: colors[i] }}
                />
                <span className="text-foreground">{item.type}</span>
                <span className="text-muted-foreground ms-auto ps-4">{item.count} ({pct}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Multi-segment donut with 4 appointment type categories using explicit CSS variable color overrides (primary, info, success, destructive).',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 14. RealWorld_Dashboard — Multiple chart types together
// ---------------------------------------------------------------------------

export const RealWorld_Dashboard: Story = {
  render: () => (
    <div className="w-[860px] space-y-6 p-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Analytics Dashboard</h2>
        <p className="text-sm text-muted-foreground">Q4 Performance Overview</p>
      </div>

      {/* Top KPI row — three donut charts */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue Target</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-4">
            <Chart
              type="donut"
              data={[]}
              value={87}
              innerLabel="87%"
              innerSubLabel="of target"
              size="sm"
              colors={['var(--color-success)']}
              aria-label="87% of revenue target reached"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>User Growth</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-4">
            <Chart
              type="donut"
              data={[]}
              value={61}
              innerLabel="61%"
              innerSubLabel="of goal"
              size="sm"
              colors={['var(--color-primary)']}
              aria-label="61% of user growth goal reached"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>NPS Score</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-4">
            <Chart
              type="donut"
              data={[]}
              value={94}
              innerLabel="94%"
              innerSubLabel="satisfied"
              size="sm"
              colors={['var(--color-info)']}
              aria-label="94% customer satisfaction NPS"
            />
          </CardContent>
        </Card>
      </div>

      {/* Area chart — monthly users */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Active Users</CardTitle>
          <CardDescription>Growth trend over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart
            type="area"
            data={monthlyUsers}
            categoryKey="month"
            valueKey="users"
            size="md"
            colors={['var(--color-primary)']}
            aria-label="Monthly active users area chart"
          />
        </CardContent>
      </Card>

      {/* Bottom row — bar + line */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Department Budgets</CardTitle>
            <CardDescription>Allocation by team (USD thousands)</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="bar"
              data={departmentBudgets}
              categoryKey="dept"
              valueKey="budget"
              size="sm"
              colors={['var(--color-warning)']}
              aria-label="Department budget bar chart"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Sales</CardTitle>
            <CardDescription>Dubai vs Riyadh</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="line"
              data={quarterlySales}
              categoryKey="quarter"
              valueKey={['dubai', 'riyadh']}
              size="sm"
              colors={['var(--color-primary)', 'var(--color-success)']}
              aria-label="Quarterly sales line chart comparing Dubai and Riyadh"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        story: 'Realistic analytics dashboard combining donut KPI indicators, an area chart, a bar chart, and a line chart.',
      },
    },
  },
};
