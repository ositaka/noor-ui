import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, DateRangePicker, type DateRange } from '../../../components/ui/date-picker';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import * as React from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Advanced Forms & Inputs/Date Picker',
  component: DatePicker,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onDateChange: {
      control: false
    }
  }
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    placeholder: 'Pick a date',
    placeholderAr: 'اختر تاريخ',
    onDateChange: fn()
  },
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div className="w-full max-w-xs space-y-2">
        <Label className='me-4'>{t('Date of Birth', 'تاريخ الميلاد')}</Label>
        <DatePicker {...args} date={date} onDateChange={setDate} />
        <p className="text-sm text-muted-foreground">
          {date ? new Intl.DateTimeFormat(isRTL ? 'ar' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).format(date) : t('No date selected', 'لم يتم اختيار تاريخ')}
        </p>
      </div>
    );
  },
  parameters: {
    ar: {
      args: {
        placeholder: 'اختر تاريخ',
        placeholderAr: 'اختر تاريخ'
      }
    }
  }
};

// Basic Date Picker - from component page lines 287-296
export const BasicDatePicker: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const formatDate = (date: Date | undefined): string => {
      if (!date) return 'No date selected';
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    };

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label className='me-4'>Date of Birth</Label>
        <DatePicker
          date={date}
          onDateChange={setDate}
          placeholder="Pick a date"
          placeholderAr="اختر تاريخ"
        />
        <p className="text-sm text-muted-foreground">{formatDate(date)}</p>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders basic date picker', async () => {
      const button = canvas.getByRole('button');
      await expect(button).toBeInTheDocument();
      await expect(canvas.getByText('Date of Birth')).toBeInTheDocument();
    });

    await step('Displays formatted date', async () => {
      // Both button and <p> show the date, so use getAllByText
      const dateTexts = canvas.getAllByText(/january|february|march|april|may|june|july|august|september|october|november|december/i);
      await expect(dateTexts.length).toBeGreaterThan(0);
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic date picker with label and formatted date display.'
      }
    }
  }
};

// Date Range Picker - from component page lines 310-320
export const DateRangePicker_: Story = {
  render: () => {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7))
    });

    const formatDateRange = (range: DateRange | undefined): string => {
      if (!range?.from) return 'No range selected';
      const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      if (!range.to) return formatter.format(range.from);
      return `${formatter.format(range.from)} - ${formatter.format(range.to)}`;
    };

    return (
      <div className="w-full max-w-md mx-auto space-y-2">
        <Label className='me-4'>Booking Period</Label>
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          placeholder="Pick a date range"
          placeholderAr="اختر نطاق التاريخ"
        />
        <p className="text-sm text-muted-foreground">{formatDateRange(dateRange)}</p>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders date range picker', async () => {
      const button = canvas.getByRole('button');
      await expect(button).toBeInTheDocument();
      await expect(canvas.getByText('Booking Period')).toBeInTheDocument();
    });

    await step('Displays formatted date range', async () => {
      // Multiple elements may contain "-", use getAllByText
      const rangeTexts = canvas.getAllByText(/-/);
      await expect(rangeTexts.length).toBeGreaterThan(0);
    });

    await step('Opens calendar on click', async () => {
      const button = canvas.getByRole('button');
      await userEvent.click(button);
      // Calendar renders in a portal - verify it opened by checking for "Today" button
      const body = within(document.body);
      await expect(body.getByRole('button', { name: /today/i })).toBeInTheDocument();
      // Close the calendar
      await userEvent.keyboard('{Escape}');
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Date range picker for selecting start and end dates.'
      }
    }
  }
};

// With Constraints - from component page lines 335-349
export const WithConstraints: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    const formatDate = (date: Date | undefined): string => {
      if (!date) return 'No date selected';
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    };

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label className='me-4'>Appointment Date</Label>
        <DatePicker
          date={date}
          onDateChange={setDate}
          minDate={today}
          maxDate={nextMonth}
          placeholder="Select within next month"
          placeholderAr="اختر خلال الشهر القادم"
        />
        <p className="text-xs text-muted-foreground">
          Available from {formatDate(today)} to {formatDate(nextMonth)}
        </p>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with constraints', async () => {
      const button = canvas.getByRole('button', { name: /select within next month/i });
      await expect(button).toBeInTheDocument();
      await expect(canvas.getByText(/available from/i)).toBeInTheDocument();
    });

    await step('Opens calendar with constraints', async () => {
      const button = canvas.getByRole('button', { name: /select within next month/i });
      await userEvent.click(button);
      const body = within(document.body);
      // Verify calendar opened by checking for "Today" button
      await expect(body.getByRole('button', { name: /today/i })).toBeInTheDocument();
      // Close the calendar
      await userEvent.keyboard('{Escape}');
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Date picker with min and max date constraints. Only dates within the next month are selectable.'
      }
    }
  }
};

// Disabled Dates - from component page lines 365-377
export const DisabledDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    // Disabled dates (weekends for demo)
    const disabledDates = React.useMemo(() => {
      const dates: Date[] = [];
      const start = new Date();
      for (let i = 0; i < 30; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        if (d.getDay() === 0 || d.getDay() === 6) {
          dates.push(d);
        }
      }
      return dates;
    }, []);

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label className='me-4'>Working Day</Label>
        <DatePicker
          date={date}
          onDateChange={setDate}
          disabledDates={disabledDates}
          placeholder="Select a weekday"
          placeholderAr="اختر يوم عمل"
        />
        <p className="text-xs text-muted-foreground">
          Weekends are disabled
        </p>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with disabled dates', async () => {
      const button = canvas.getByRole('button');
      await expect(button).toBeInTheDocument();
      await expect(canvas.getByText('Weekends are disabled')).toBeInTheDocument();
    });

    await step('Opens calendar with disabled dates', async () => {
      const button = canvas.getByRole('button');
      await userEvent.click(button);
      const body = within(document.body);
      // Verify calendar opened by checking for "Today" button
      await expect(body.getByRole('button', { name: /today/i })).toBeInTheDocument();
      // Close the calendar
      await userEvent.keyboard('{Escape}');
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Date picker with specific dates disabled. Weekends are not selectable in this example.'
      }
    }
  }
};

// Real World Example - from component page lines 391-442
export const RealWorldExample: Story = {
  render: () => {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
    const today = new Date();

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Hotel Room Booking</CardTitle>
          <CardDescription>
            Select check-in and check-out dates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className='me-4'>Stay Period</Label>
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              minDate={today}
              placeholder="Select dates"
              placeholderAr="اختر التواريخ"
            />
          </div>

          {dateRange?.from && dateRange?.to && (
            <>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  Number of nights:
                </span>
                <span className="font-semibold">
                  {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Price per night:
                </span>
                <span className="font-semibold">
                  $150
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                  Total:
                </span>
                <span className="text-2xl font-bold text-primary">
                  ${(Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) * 150).toLocaleString('en-US')}
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders hotel booking card', async () => {
      await expect(canvas.getByText('Hotel Room Booking')).toBeInTheDocument();
      await expect(canvas.getByText('Select check-in and check-out dates')).toBeInTheDocument();
      await expect(canvas.getByText('Stay Period')).toBeInTheDocument();
    });

    await step('Date range picker is functional', async () => {
      const button = canvas.getByRole('button', { name: /select dates/i });
      await expect(button).toBeInTheDocument();
      await userEvent.click(button);
      const body = within(document.body);
      // Verify calendar opened by checking for "Today" button
      await expect(body.getByRole('button', { name: /today/i })).toBeInTheDocument();
      // Close the calendar
      await userEvent.keyboard('{Escape}');
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Hotel booking example with date range selection and price calculation.'
      }
    }
  }
};

// Disabled State
export const DisabledState: Story = {
  render: () => (
    <div className="w-full max-w-xs mx-auto space-y-4">
      <div className="space-y-2">
        <Label className='me-4'>Enabled Date Picker</Label>
        <DatePicker
          date={new Date()}
          placeholder="Pick a date"
          placeholderAr="اختر تاريخ"
        />
      </div>

      <div className="space-y-2">
        <Label className='me-4'>Disabled Date Picker</Label>
        <DatePicker
          date={new Date()}
          placeholder="Pick a date"
          placeholderAr="اختر تاريخ"
          disabled
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders both enabled and disabled states', async () => {
      const buttons = canvas.getAllByRole('button');
      await expect(buttons).toHaveLength(2);
      await expect(canvas.getByText('Enabled Date Picker')).toBeInTheDocument();
      await expect(canvas.getByText('Disabled Date Picker')).toBeInTheDocument();
    });

    await step('Disabled date picker is disabled', async () => {
      const buttons = canvas.getAllByRole('button');
      const disabledButton = buttons[1];
      await expect(disabledButton).toBeDisabled();
    });

    await step('Enabled date picker is not disabled', async () => {
      const buttons = canvas.getAllByRole('button');
      const enabledButton = buttons[0];
      await expect(enabledButton).not.toBeDisabled();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Disabled date picker state.'
      }
    }
  }
};

