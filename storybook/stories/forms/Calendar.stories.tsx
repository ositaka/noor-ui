import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Calendar, type DateRange } from '../../../components/ui/calendar';
import { Card, CardContent } from '../../../components/ui/card';
import * as React from 'react';

/**
 *
 *
 * Islamic holidays highlighting, event markers, range selection, and full RTL support
 *
 */

const meta = {
  title: 'GCC-Specific/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onSelect: {
      control: false
    },
    mode: {
      control: { type: 'select' },
      options: ['single', 'range']
    },
    showHijri: {
      control: { type: 'boolean' }
    },
    showIslamicHolidays: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: false
    },
    events: {
      control: false
    },
    getHijriDate: {
      control: false
    }
  }
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    mode: 'single',
    showHijri: false,
    showIslamicHolidays: false,
    onSelect: fn()
  },
  render: (args, { globals }) => {
    const [selected, setSelected] = React.useState<Date>();

    return (
      <div className="max-w-md">
        <Calendar
          {...args}
          selected={selected}
          onSelect={(date) => {
            args.onSelect?.(date);
            if (date instanceof Date || date === undefined) {
              setSelected(date);
            }
          }}
        />
      </div>
    );
  },
};

// Basic Calendar - from component page lines 286-294
export const BasicCalendar: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();

    return (
      <div className="max-w-md mx-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            if (date instanceof Date || date === undefined) {
              setDate(date);
            }
          }}
        />
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic single date selection calendar with month navigation and "Today" button.'
      }
    }
  }
};

// Range Selection - from component page lines 392-410
export const RangeSelection: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange>();

    return (
      <Card>
        <CardContent className="p-6">
<div className="max-w-md mx-auto">
            <Calendar
              mode="range"
              selectedRange={range}
              onSelect={(date) => {
                if (date && 'from' in date) {
                  setRange(date as DateRange);
                } else if (date === undefined) {
                  setRange(undefined);
                }
              }}
            />
          </div>
          {range?.from && (
            <div className="mt-4 text-sm text-center">
              <span className="font-medium">Selected: </span>
              {range.from.toLocaleDateString()}
              {range.to && ` - ${range.to.toLocaleDateString()}`}
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Date range selection with visual feedback. Click to set start date, click again to set end date.'
      }
    }
  }
};

// With Hijri Dates - from component page lines 427-437
export const WithHijri: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();

    return (
      <Card>
        <CardContent className="p-6">
<div className="max-w-md mx-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                if (date instanceof Date || date === undefined) {
                  setDate(date);
                }
              }}
              showHijri={true}
            />
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Dual calendar display showing both Gregorian and Hijri dates simultaneously.'
      }
    }
  }
};

// With Islamic Holidays - from component page lines 457-468
export const WithIslamicHolidays: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();

    return (
      <div dir="rtl" lang="ar">
        <Card>
          <CardContent className="p-6">
            <div className="max-w-md mx-auto">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  if (date instanceof Date || date === undefined) {
                    setDate(date);
                  }
                }}
                showHijri={true}
                showIslamicHolidays={true}
                locale="ar"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'NEW: Automatic highlighting of 10 major Islamic holidays including Ramadan, Eid al-Fitr, and Eid al-Adha.'
      }
    }
  },
};

// With Events - from component page lines 485-495
export const WithEvents: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();

    // Generate recurring events from 2025 to 2040
    const sampleEvents: Array<{ date: Date; title: string; variant: 'primary' | 'destructive' | 'secondary' }> = [];
    for (let year = 2025; year <= 2040; year++) {
      // Team meetings — 1st and 15th of every month
      for (let month = 0; month < 12; month++) {
        sampleEvents.push({ date: new Date(year, month, 1), title: 'Team Meeting', variant: 'primary' });
        sampleEvents.push({ date: new Date(year, month, 15), title: 'Team Meeting', variant: 'primary' });
      }
      // Project deadlines — quarterly
      sampleEvents.push({ date: new Date(year, 2, 31), title: 'Q1 Deadline', variant: 'destructive' });
      sampleEvents.push({ date: new Date(year, 5, 30), title: 'Q2 Deadline', variant: 'destructive' });
      sampleEvents.push({ date: new Date(year, 8, 30), title: 'Q3 Deadline', variant: 'destructive' });
      sampleEvents.push({ date: new Date(year, 11, 31), title: 'Q4 Deadline', variant: 'destructive' });
      // Celebrations
      sampleEvents.push({ date: new Date(year, 0, 1), title: 'New Year', variant: 'secondary' });
      sampleEvents.push({ date: new Date(year, 11, 2), title: 'National Day', variant: 'secondary' });
    }

    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-md mx-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                if (date instanceof Date || date === undefined) {
                  setDate(date);
                }
              }}
              events={sampleEvents}
            />
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Calendar with custom event markers showing color-coded indicators and event legend.'
      }
    }
  },
};

// Disabled Weekends - from component page lines 512-519
export const DisabledWeekends: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
<div className="max-w-md mx-auto">
          <Calendar
            mode="single"
            disabled={(date) => {
              const day = date.getDay();
              return day === 0 || day === 6; // Disable weekends
            }}
          />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Calendar with weekends disabled using a function. Weekends cannot be selected.'
      }
    }
  },
};

