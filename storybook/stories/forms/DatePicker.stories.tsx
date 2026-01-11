import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, DateRangePicker, type DateRange } from '../../../components/ui/date-picker';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import * as React from 'react';

/**
 * Date Picker Component Stories
 *
 * All examples are taken from /app/(docs)/components/date-picker/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: DatePicker supports single date and range selection with RTL support
 */

const meta = {
  title: 'Forms/Date Picker',
  component: DatePicker,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
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
    placeholderAr: 'اختر تاريخ'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div className="w-full max-w-xs space-y-2">
        <Label className='me-4'>Date of Birth</Label>
        <DatePicker {...args} date={date} onDateChange={setDate} />
        <p className="text-sm text-muted-foreground">
          {date ? new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).format(date) : 'No date selected'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      story: {
        inline: false
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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

// RTL Example
export const RTLExample: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const formatDate = (date: Date | undefined): string => {
      if (!date) return 'لم يتم اختيار تاريخ';
      return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    };

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label className='me-4'>تاريخ الميلاد</Label>
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
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Date picker with Arabic labels in RTL mode.'
      }
    }
  }
};

// RTL Date Range Picker
export const RTLDateRangePicker: Story = {
  render: () => {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7))
    });

    const formatDateRange = (range: DateRange | undefined): string => {
      if (!range?.from) return 'لم يتم اختيار نطاق';
      const formatter = new Intl.DateTimeFormat('ar-SA', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      if (!range.to) return formatter.format(range.from);
      return `${formatter.format(range.from)} – ${formatter.format(range.to)}`;
    };

    return (
      <div className="w-full max-w-md mx-auto space-y-2">
        <Label className='me-4'>فترة الحجز</Label>
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
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Date range picker in Arabic with RTL support.'
      }
    }
  }
};

// RTL With Constraints
export const RTLWithConstraints: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    const formatDate = (date: Date | undefined): string => {
      if (!date) return 'لم يتم اختيار تاريخ';
      return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    };

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label className='me-4'>موعد الاجتماع</Label>
        <DatePicker
          date={date}
          onDateChange={setDate}
          minDate={today}
          maxDate={nextMonth}
          placeholder="Select within next month"
          placeholderAr="اختر خلال الشهر القادم"
        />
        <p className="text-xs text-muted-foreground">
          متاح من {formatDate(today)} إلى {formatDate(nextMonth)}
        </p>
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Date picker with constraints in Arabic, showing proper RTL date formatting.'
      }
    }
  }
};

// RTL Real World Example
export const RTLRealWorldExample: Story = {
  render: () => {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
    const today = new Date();

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>حجز غرفة فندق</CardTitle>
          <CardDescription>
            اختر تواريخ تسجيل الوصول والمغادرة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className='me-4'>فترة الإقامة</Label>
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
                  عدد الليالي:
                </span>
                <span className="font-semibold">
                  {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  سعر الليلة:
                </span>
                <span className="font-semibold">
                  ٣٥٠ ر.س
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                  الإجمالي:
                </span>
                <span className="text-2xl font-bold text-primary">
                  {(Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) * 350).toLocaleString('ar-SA')} ر.س
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Complete hotel booking example in Arabic with RTL support and proper number formatting.'
      }
    }
  }
};
