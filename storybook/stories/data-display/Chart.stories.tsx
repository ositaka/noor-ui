import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from '../../../components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import * as React from 'react';
import { expect, within } from 'storybook/test';

/**
 * Chart Component Stories
 *
 * Covers all four chart types: line, bar, area, donut.
 * Includes LTR (English) and RTL (Arabic) variants, size/thickness/color
 * overrides, sparkline style (no grid/axes), and a realistic dashboard.
 */

const meta = {
  title: 'Data Display/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
  },
  tags: ['!autodocs'],
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Figure element has correct role and aria-label', async () => {
      const figure = canvas.getByRole('img');
      await expect(figure).toBeInTheDocument();
      await expect(figure).toHaveAttribute('aria-label', 'Quarterly sales comparison between Dubai and Riyadh');
    });

    await step('sr-only data table exists with correct column headers', async () => {
      const table = canvasElement.querySelector('table.sr-only');
      await expect(table).toBeInTheDocument();
      const tableScope = within(table as HTMLElement);
      // Column headers: categoryKey "quarter", then value keys "dubai" and "riyadh"
      await expect(tableScope.getByRole('columnheader', { name: 'quarter' })).toBeInTheDocument();
      await expect(tableScope.getByRole('columnheader', { name: 'dubai' })).toBeInTheDocument();
      await expect(tableScope.getByRole('columnheader', { name: 'riyadh' })).toBeInTheDocument();
    });

    await step('Data table contains expected number of rows', async () => {
      const table = canvasElement.querySelector('table.sr-only');
      const rows = (table as HTMLElement).querySelectorAll('tbody tr');
      // quarterlySales has 4 data points: Q1, Q2, Q3, Q4
      await expect(rows).toHaveLength(4);
    });
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Figure element has correct role and aria-label', async () => {
      const figure = canvas.getByRole('img');
      await expect(figure).toBeInTheDocument();
      await expect(figure).toHaveAttribute('aria-label', 'Department budget allocation bar chart');
    });

    await step('sr-only table has correct column headers', async () => {
      const table = canvasElement.querySelector('table.sr-only');
      await expect(table).toBeInTheDocument();
      const tableScope = within(table as HTMLElement);
      // Single value key "budget" plus category key "dept"
      await expect(tableScope.getByRole('columnheader', { name: 'dept' })).toBeInTheDocument();
      await expect(tableScope.getByRole('columnheader', { name: 'budget' })).toBeInTheDocument();
    });

    await step('All department names appear in the data table', async () => {
      const table = canvasElement.querySelector('table.sr-only');
      const tableScope = within(table as HTMLElement);
      // departmentBudgets has: Eng, Design, Marketing, Sales, Support
      await expect(tableScope.getByRole('rowheader', { name: 'Eng' })).toBeInTheDocument();
      await expect(tableScope.getByRole('rowheader', { name: 'Design' })).toBeInTheDocument();
      await expect(tableScope.getByRole('rowheader', { name: 'Marketing' })).toBeInTheDocument();
      await expect(tableScope.getByRole('rowheader', { name: 'Sales' })).toBeInTheDocument();
      await expect(tableScope.getByRole('rowheader', { name: 'Support' })).toBeInTheDocument();
    });
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Three figure elements exist with role="img"', async () => {
      const figures = canvas.getAllByRole('img');
      await expect(figures).toHaveLength(3);
      await expect(figures[0]).toHaveAttribute('aria-label', '73% of tasks completed');
      await expect(figures[1]).toHaveAttribute('aria-label', '45% of tasks in progress');
      await expect(figures[2]).toHaveAttribute('aria-label', '92% of target reached');
    });

    await step('Three sr-only summary elements exist with percentage values', async () => {
      // DonutDataSummary renders <div class="sr-only"> with the innerLabel as a <span>
      const srOnlyDivs = canvasElement.querySelectorAll('div.sr-only');
      await expect(srOnlyDivs).toHaveLength(3);
      await expect(srOnlyDivs[0].textContent).toContain('73%');
      await expect(srOnlyDivs[1].textContent).toContain('45%');
      await expect(srOnlyDivs[2].textContent).toContain('92%');
    });

    await step('Visible inner labels are aria-hidden', async () => {
      // The inner label overlay divs are aria-hidden="true" (not the sr-only ones)
      const ariaHiddenInners = canvasElement.querySelectorAll('[aria-hidden="true"]');
      await expect(ariaHiddenInners.length).toBeGreaterThan(0);
    });
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
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
// 9. RTLBarChart — Arabic bar chart
// ---------------------------------------------------------------------------

export const RTLBarChart: Story = {
  render: () => (
    <div className="w-[560px] space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">ميزانيات الأقسام (بالآلاف)</h3>
      <Chart
        type="bar"
        data={departmentBudgetsAr}
        categoryKey="dept"
        valueKey="budget"
        colors={['var(--color-primary)']}
        direction="rtl"
        locale="ar"
        aria-label="مخطط أعمدة لميزانيات الأقسام"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Figure exists with Arabic aria-label', async () => {
      const figure = canvas.getByRole('img');
      await expect(figure).toBeInTheDocument();
      await expect(figure).toHaveAttribute('aria-label', 'مخطط أعمدة لميزانيات الأقسام');
    });

    await step('sr-only table contains Arabic department names', async () => {
      const table = canvasElement.querySelector('table.sr-only');
      await expect(table).toBeInTheDocument();
      const tableScope = within(table as HTMLElement);
      // departmentBudgetsAr uses Arabic dept names
      await expect(tableScope.getByRole('rowheader', { name: 'الهندسة' })).toBeInTheDocument();
      await expect(tableScope.getByRole('rowheader', { name: 'التصميم' })).toBeInTheDocument();
      await expect(tableScope.getByRole('rowheader', { name: 'التسويق' })).toBeInTheDocument();
      await expect(tableScope.getByRole('rowheader', { name: 'المبيعات' })).toBeInTheDocument();
      await expect(tableScope.getByRole('rowheader', { name: 'الدعم' })).toBeInTheDocument();
    });

    await step('Data values use Arabic-Indic numerals in the table', async () => {
      const table = canvasElement.querySelector('table.sr-only');
      await expect(table).toBeInTheDocument();
      // locale="ar" with numberingSystem: 'arab' formats 420 as ٤٢٠
      // Check that at least one table cell contains Arabic-Indic digits (٠-٩ range: U+0660–U+0669)
      const cells = (table as HTMLElement).querySelectorAll('td');
      const hasArabicNumerals = Array.from(cells).some((cell) =>
        /[\u0660-\u0669]/.test(cell.textContent ?? '')
      );
      await expect(hasArabicNumerals).toBe(true);
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Bar chart in Arabic with RTL axis layout and Eastern Arabic numerals on the Y axis.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 10. RTLLineChart — Arabic line chart with RTL
// ---------------------------------------------------------------------------

export const RTLLineChart: Story = {
  render: () => (
    <div className="w-[560px] space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">المبيعات الفصلية — دبي مقابل الرياض</h3>
      <Chart
        type="line"
        data={quarterlySalesAr}
        categoryKey="quarter"
        valueKey={['dubai', 'riyadh']}
        colors={['var(--color-primary)', 'var(--color-success)']}
        direction="rtl"
        locale="ar"
        aria-label="مخطط خطي للمبيعات الفصلية لدبي والرياض"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Line chart in Arabic with RTL reversed X axis and the Y axis positioned on the right.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// 11. RTLDonut — Arabic donut charts in RTL
// ---------------------------------------------------------------------------

export const RTLDonut: Story = {
  render: () => (
    <div className="space-y-3 p-4">
      <h3 className="text-sm font-semibold text-foreground">نظرة عامة على حالة المشروع</h3>
      <div className="flex gap-8 items-center">
        <div className="flex flex-col items-center gap-2">
          <Chart
            type="donut"
            data={[]}
            value={73}
            innerLabel="٧٣٪"
            innerSubLabel="مكتمل"
            size="md"
            colors={['var(--color-success)']}
            direction="rtl"
            locale="ar"
            aria-label="٧٣٪ من المهام مكتملة"
          />
          <span className="text-xs text-muted-foreground">مكتمل</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Chart
            type="donut"
            data={[]}
            value={45}
            innerLabel="٤٥٪"
            innerSubLabel="قيد التنفيذ"
            size="md"
            colors={['var(--color-warning)']}
            direction="rtl"
            locale="ar"
            aria-label="٤٥٪ من المهام قيد التنفيذ"
          />
          <span className="text-xs text-muted-foreground">قيد التنفيذ</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Chart
            type="donut"
            data={[]}
            value={92}
            innerLabel="٩٢٪"
            innerSubLabel="الهدف"
            size="md"
            colors={['var(--color-primary)']}
            direction="rtl"
            locale="ar"
            aria-label="٩٢٪ من الهدف تم تحقيقه"
          />
          <span className="text-xs text-muted-foreground">الهدف</span>
        </div>
      </div>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Three donut charts in Arabic with RTL mirroring and Eastern Arabic numerals in the center labels.',
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All 6 chart figures exist (3 donuts, 1 area, 1 bar, 1 line)', async () => {
      // 3 donut KPI charts + area + bar + line = 6 figures total
      const figures = canvas.getAllByRole('img');
      await expect(figures).toHaveLength(6);
    });

    await step('Each chart figure has a proper aria-label', async () => {
      const figures = canvas.getAllByRole('img');
      // Every figure must have a non-empty aria-label attribute
      for (const figure of figures) {
        const label = figure.getAttribute('aria-label');
        await expect(label).toBeTruthy();
        await expect((label as string).length).toBeGreaterThan(0);
      }
      // Verify the specific labels for the 3 donut KPI charts
      await expect(figures[0]).toHaveAttribute('aria-label', '87% of revenue target reached');
      await expect(figures[1]).toHaveAttribute('aria-label', '61% of user growth goal reached');
      await expect(figures[2]).toHaveAttribute('aria-label', '94% customer satisfaction NPS');
      // And the line/bar/area charts
      await expect(figures[3]).toHaveAttribute('aria-label', 'Monthly active users area chart');
      await expect(figures[4]).toHaveAttribute('aria-label', 'Department budget bar chart');
      await expect(figures[5]).toHaveAttribute('aria-label', 'Quarterly sales line chart comparing Dubai and Riyadh');
    });

    await step('sr-only tables exist for area, bar, and line charts', async () => {
      // The 3 line/bar/area charts each produce a <table class="sr-only">
      const tables = canvasElement.querySelectorAll('table.sr-only');
      await expect(tables).toHaveLength(3);

      // Area chart table — categoryKey "month", valueKey "users"
      const areaTable = within(tables[0] as HTMLElement);
      await expect(areaTable.getByRole('columnheader', { name: 'month' })).toBeInTheDocument();
      await expect(areaTable.getByRole('columnheader', { name: 'users' })).toBeInTheDocument();

      // Bar chart table — categoryKey "dept", valueKey "budget"
      const barTable = within(tables[1] as HTMLElement);
      await expect(barTable.getByRole('columnheader', { name: 'dept' })).toBeInTheDocument();
      await expect(barTable.getByRole('columnheader', { name: 'budget' })).toBeInTheDocument();

      // Line chart table — categoryKey "quarter", valueKeys "dubai" and "riyadh"
      const lineTable = within(tables[2] as HTMLElement);
      await expect(lineTable.getByRole('columnheader', { name: 'quarter' })).toBeInTheDocument();
      await expect(lineTable.getByRole('columnheader', { name: 'dubai' })).toBeInTheDocument();
      await expect(lineTable.getByRole('columnheader', { name: 'riyadh' })).toBeInTheDocument();
    });
  },
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
