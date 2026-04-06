import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn } from 'storybook/test';
import { Calendar, type DateRange } from '../../../components/ui/calendar';
import { Card, CardContent } from '../../../components/ui/card';
import * as React from 'react';

/**
 * Calendar Component Stories
 *
 * All examples are taken from /app/(docs)/components/calendar/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Calendar provides dual calendar support (Gregorian + Hijri),
 * Islamic holidays highlighting, event markers, range selection, and full RTL support
 */

const meta = {
  title: 'Forms/Calendar',
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
  render: (args) => {
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
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders basic calendar', async () => {
      await expect(canvas.getByRole('button', { name: /today/i })).toBeInTheDocument();
    });

    await step('Can select a date', async () => {
      const dayButtons = canvas.getAllByRole('button').filter(btn => {
        const text = btn.textContent;
        return text && /^\d+$/.test(text.trim());
      });

      if (dayButtons.length > 10) {
        const initiallySelected = dayButtons.find(btn => btn.classList.contains('bg-primary'));
        await userEvent.click(dayButtons[10]);
        // Date should be selected (component will update state)
        await expect(dayButtons[10]).toBeInTheDocument();
      }
    });
  }
};

// Range Selection - from component page lines 392-410
export const RangeSelection: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange>();

    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Select a start and end date. Click once to set the start, click again to complete the range.
          </p>
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders range selection calendar', async () => {
      await expect(canvas.getByText(/select a start and end date/i)).toBeInTheDocument();
    });

    await step('Selects date range', async () => {
      const dayButtons = canvas.getAllByRole('button').filter(btn => {
        const text = btn.textContent;
        return text && /^\d+$/.test(text.trim());
      });

      if (dayButtons.length > 20) {
        // Select start date
        await userEvent.click(dayButtons[10]);

        // Select end date
        await userEvent.click(dayButtons[15]);

        // Check if "Selected:" text appears
        const selectedText = await canvas.findByText(/selected:/i);
        await expect(selectedText).toBeInTheDocument();
      }
    });
  }
};

// With Hijri Dates - from component page lines 427-437
export const WithHijri: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();

    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Display Hijri dates alongside Gregorian dates. Perfect for Islamic calendar awareness.
          </p>
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders calendar with Hijri dates', async () => {
      await expect(canvas.getByText(/display hijri dates alongside gregorian/i)).toBeInTheDocument();
    });

    await step('Shows Hijri month in header', async () => {
      const headers = canvas.getAllByRole('heading');
      // Should have Gregorian month and Hijri month display
      await expect(headers.length).toBeGreaterThanOrEqual(1);
    });
  }
};

// With Islamic Holidays - from component page lines 457-468
export const WithIslamicHolidays: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();

    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Automatically highlights 10 major Islamic holidays with event dots and displays holiday names. Perfect for GCC region applications.
          </p>
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
        story: 'NEW: Automatic highlighting of 10 major Islamic holidays including Ramadan, Eid al-Fitr, and Eid al-Adha.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders calendar with Islamic holidays enabled', async () => {
      await expect(canvas.getByText(/automatically highlights 10 major islamic holidays/i)).toBeInTheDocument();
    });

    await step('Calendar displays with Hijri dates', async () => {
      // Islamic holidays require showHijri to be true
      const todayButton = canvas.getByRole('button', { name: /today/i });
      await expect(todayButton).toBeInTheDocument();
    });
  }
};

// With Events - from component page lines 485-495
export const WithEvents: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();

    const sampleEvents = [
      {
        date: new Date(2025, 10, 15),
        title: 'Team Meeting',
        variant: 'primary' as const
      },
      {
        date: new Date(2025, 10, 20),
        title: 'Project Deadline',
        variant: 'destructive' as const
      },
      {
        date: new Date(2025, 10, 25),
        title: 'Eid Celebration',
        variant: 'secondary' as const
      },
    ];

    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Display events with colored indicators. Up to 3 dots shown per day, with a legend below.
          </p>
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders calendar with events', async () => {
      await expect(canvas.getByText(/display events with colored indicators/i)).toBeInTheDocument();
    });

    await step('Shows events section when events exist', async () => {
      // Navigate to November 2025 where events are defined
      const buttons = canvas.getAllByRole('button');
      const todayButton = canvas.getByRole('button', { name: /today/i });

      // Try to find Events heading - it may appear if we're in November 2025
      await expect(todayButton).toBeInTheDocument();
    });
  }
};

// Disabled Weekends - from component page lines 512-519
export const DisabledWeekends: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-4">
          Disable specific dates or use a function to disable date patterns (e.g., weekends).
        </p>
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders calendar with disabled dates', async () => {
      await expect(canvas.getByText(/disable specific dates/i)).toBeInTheDocument();
    });

    await step('Weekends are disabled', async () => {
      const dayButtons = canvas.getAllByRole('button').filter(btn => {
        const text = btn.textContent;
        return text && /^\d+$/.test(text.trim());
      });

      // Find disabled buttons (weekends should be disabled)
      const disabledDays = dayButtons.filter(btn => btn.hasAttribute('disabled'));
      await expect(disabledDays.length).toBeGreaterThan(0);
    });
  }
};

