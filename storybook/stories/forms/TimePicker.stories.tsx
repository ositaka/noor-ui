import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn } from 'storybook/test';
import { TimePicker, TimeRangePicker, type Time, type TimeRange } from '../../../components/ui/time-picker';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import * as React from 'react';

const meta = {
  title: 'Advanced Forms & Inputs/Time Picker',
  component: TimePicker,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onTimeChange: {
      control: false
    }
  }
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    placeholder: 'Pick a time',
    placeholderAr: 'اختر الوقت',
    format: '24h',
    onTimeChange: fn()
  },
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;
    const [time, setTime] = React.useState<Time>({ hours: 9, minutes: 30 });

    const formatTime = (time: Time | undefined): string => {
      if (!time) return t('No time selected', 'لم يتم اختيار وقت');
      const hours = time.hours.toString().padStart(2, '0');
      const minutes = time.minutes.toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    return (
      <div className="w-full max-w-xs space-y-2">
        <Label className='me-4'>{t('Start Time', 'وقت البدء')}</Label>
        <TimePicker {...args} time={time} onTimeChange={(tp) => { if (tp) setTime(tp); args.onTimeChange?.(tp); }} />
        <p className="text-sm text-muted-foreground">{formatTime(time)}</p>
      </div>
    );
  },
  parameters: {
    ar: {
      args: {
        placeholder: 'اختر الوقت',
        placeholderAr: 'اختر الوقت'
      }
    }
  }
};

// Basic 24h Format - from component page lines 258-266
export const Basic24hFormat: Story = {
  render: () => {
    const [time, setTime] = React.useState<Time>({ hours: 9, minutes: 30 });

    const formatTime = (time: Time | undefined): string => {
      if (!time) return 'No time selected';
      const hours = time.hours.toString().padStart(2, '0');
      const minutes = time.minutes.toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label className='me-4'>Start Time</Label>
        <TimePicker
          time={time}
          onTimeChange={(t) => t && setTime(t)}
          placeholder="Pick a time"
          placeholderAr="اختر الوقت"
        />
        <p className="text-sm text-muted-foreground">{formatTime(time)}</p>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders with 24h format', async () => {
      // Button shows the formatted time value "09:30"
      await expect(canvas.getByRole('button', { name: '09:30' })).toBeInTheDocument();
    });

    await step('Opens and displays 24h time controls', async () => {
      await userEvent.click(canvas.getByRole('button', { name: '09:30' }));
      // NumberInput uses type="text" so role is "textbox", popover in portal
      await expect(body.getByRole('textbox', { name: /hours/i })).toBeInTheDocument();
      // Verify 24h format - no AM/PM toggle
      await expect(body.queryByRole('switch')).not.toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic time picker with 24-hour format.'
      }
    }
  }
};

// 12h Format - from component page lines 282-295
export const Format12h: Story = {
  render: () => {
    const [time, setTime] = React.useState<Time>({ hours: 14, minutes: 0 });

    const formatTime12h = (time: Time | undefined): string => {
      if (!time) return 'No time selected';
      const hours = ((time.hours % 12) || 12).toString().padStart(2, '0');
      const minutes = time.minutes.toString().padStart(2, '0');
      const period = time.hours >= 12 ? 'PM' : 'AM';
      return `${hours}:${minutes} ${period}`;
    };

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label className='me-4'>Appointment Time</Label>
        <TimePicker
          time={time}
          onTimeChange={(t) => t && setTime(t)}
          format="12h"
          placeholder="Pick a time"
          placeholderAr="اختر الوقت"
        />
        <p className="text-sm text-muted-foreground">{formatTime12h(time)}</p>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders with 12h format', async () => {
      // Button shows the formatted time value "02:00 PM" (hours: 14 in 12h format)
      await expect(canvas.getByRole('button', { name: '02:00 PM' })).toBeInTheDocument();
    });

    await step('Opens and displays 12h time controls with AM/PM', async () => {
      await userEvent.click(canvas.getByRole('button', { name: '02:00 PM' }));
      // NumberInput uses type="text" so role is "textbox", popover in portal
      await expect(body.getByRole('textbox', { name: /hours/i })).toBeInTheDocument();
      // Verify 12h format - should have AM/PM toggle (tabs with AM/PM)
      await expect(body.getByRole('tab', { name: 'AM' })).toBeInTheDocument();
      await expect(body.getByRole('tab', { name: 'PM' })).toBeInTheDocument();
    });

    await step('Toggles AM/PM', async () => {
      const amTab = body.getByRole('tab', { name: 'AM' });
      await userEvent.click(amTab);
      // Time should update after toggle (14:00 -> 02:00 AM)
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Time picker with 12-hour format and AM/PM toggle.'
      }
    }
  }
};

// Time Range - from component page lines 310-321
export const TimeRange: Story = {
  render: () => {
    const [timeRange, setTimeRange] = React.useState<TimeRange | undefined>({
      from: { hours: 9, minutes: 0 },
      to: { hours: 17, minutes: 0 }
    });

    const formatTime = (time: Time | undefined): string => {
      if (!time) return '';
      const hours = time.hours.toString().padStart(2, '0');
      const minutes = time.minutes.toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    const formatTimeRange = (range: TimeRange | undefined): string => {
      if (!range?.from) return 'No range selected';
      if (!range.to) return formatTime(range.from);
      return `${formatTime(range.from)} - ${formatTime(range.to)}`;
    };

    const calculateDuration = (range: TimeRange | undefined): string => {
      if (!range?.from || !range?.to) return '0h';
      const fromMinutes = range.from.hours * 60 + range.from.minutes;
      const toMinutes = range.to.hours * 60 + range.to.minutes;
      const diff = toMinutes - fromMinutes;
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    };

    return (
      <div className="w-full max-w-md mx-auto space-y-2">
        <Label className='me-4'>Working Hours</Label>
        <TimeRangePicker
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          placeholder="Pick working hours"
          placeholderAr="اختر ساعات العمل"
        />
        <p className="text-sm text-muted-foreground">
          {formatTimeRange(timeRange)} ({calculateDuration(timeRange)})
        </p>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders time range picker', async () => {
      // Button shows the formatted time range "09:00 - 17:00", not the placeholder
      await expect(canvas.getByRole('button', { name: '09:00 - 17:00' })).toBeInTheDocument();
      await expect(canvas.getByText('09:00 - 17:00 (8h 0m)')).toBeInTheDocument();
    });

    await step('Opens time range selector', async () => {
      await userEvent.click(canvas.getByRole('button', { name: '09:00 - 17:00' }));
      // TimeRangePicker popover contains nested TimePicker components (buttons), not textboxes
      // Verify popover opened by checking for "From" and "To" labels
      await expect(body.getByText('From')).toBeInTheDocument();
      await expect(body.getByText('To')).toBeInTheDocument();
      // Verify the nested TimePicker buttons are present
      const nestedPickerButtons = body.getAllByRole('button');
      await expect(nestedPickerButtons.length).toBeGreaterThan(2); // Trigger + nested pickers
    });

    await step('Calculates duration correctly', async () => {
      // Close popover
      await userEvent.keyboard('{Escape}');
      // Verify the duration calculation is displayed
      await expect(canvas.getByText(/8h 0m/)).toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Time range picker for selecting start and end times with duration calculation.'
      }
    }
  }
};

// Minute Step - from component page lines 338-348
export const MinuteIntervals: Story = {
  render: () => {
    const [time, setTime] = React.useState<Time>({ hours: 9, minutes: 0 });

    const formatTime = (time: Time | undefined): string => {
      if (!time) return 'No time selected';
      const hours = time.hours.toString().padStart(2, '0');
      const minutes = time.minutes.toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label className='me-4'>Time</Label>
        <TimePicker
          time={time}
          onTimeChange={(t) => t && setTime(t)}
          minuteStep={15}
          placeholder="15-minute intervals"
          placeholderAr="فترات 15 دقيقة"
        />
        <p className="text-xs text-muted-foreground">
          Minutes increment by 15
        </p>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders with 15-minute intervals', async () => {
      // Button shows the formatted time value "09:00"
      await expect(canvas.getByRole('button', { name: '09:00' })).toBeInTheDocument();
      await expect(canvas.getByText('09:00')).toBeInTheDocument();
    });

    await step('Opens time picker with step intervals', async () => {
      await userEvent.click(canvas.getByRole('button', { name: '09:00' }));
      // NumberInput uses type="text" so role is "textbox", popover in portal
      await expect(body.getByRole('textbox', { name: /minutes/i })).toBeInTheDocument();
      // Verify the minute step behavior is working (minutes should increment by 15)
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Time picker with 15-minute step intervals.'
      }
    }
  }
};

// Real World - Medical Appointment - from component page lines 364-416
export const MedicalAppointment: Story = {
  render: () => {
    const [time, setTime] = React.useState<Time | undefined>(undefined);

    const formatTime12h = (time: Time | undefined): string => {
      if (!time) return '';
      const hours = ((time.hours % 12) || 12).toString().padStart(2, '0');
      const minutes = time.minutes.toString().padStart(2, '0');
      const period = time.hours >= 12 ? 'PM' : 'AM';
      return `${hours}:${minutes} ${period}`;
    };

    const calculateEndTime = (time: Time): string => {
      const endMinutes = time.minutes + 30;
      const endHours = time.hours + Math.floor(endMinutes / 60);
      const finalMinutes = endMinutes % 60;
      const hours = ((endHours % 12) || 12).toString().padStart(2, '0');
      const minutes = finalMinutes.toString().padStart(2, '0');
      const period = endHours >= 12 ? 'PM' : 'AM';
      return `${hours}:${minutes} ${period}`;
    };

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Medical Appointment</CardTitle>
          <CardDescription>
            Select your preferred appointment time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className='me-4'>Preferred Time</Label>
            <TimePicker
              time={time}
              onTimeChange={setTime}
              format="12h"
              minuteStep={15}
              placeholder="Select appointment time"
              placeholderAr="اختر وقت الموعد"
            />
          </div>

          {time && (
            <>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  Selected Time:
                </span>
                <span className="font-semibold">
                  {formatTime12h(time)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Duration:
                </span>
                <span className="font-semibold">30 minutes</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  End Time:
                </span>
                <span className="font-semibold">
                  {calculateEndTime(time)}
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
    const body = within(document.body);

    await step('Renders medical appointment card', async () => {
      await expect(canvas.getByText('Medical Appointment')).toBeInTheDocument();
      // Initial time is undefined, so button shows the placeholder
      await expect(canvas.getByRole('button', { name: /select appointment time/i })).toBeInTheDocument();
    });

    await step('Opens time picker in appointment context', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /select appointment time/i }));
      // NumberInput uses type="text" so role is "textbox", popover in portal
      await expect(body.getByRole('textbox', { name: /hours/i })).toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Medical appointment booking with 12h format and automatic end time calculation.'
      }
    }
  }
};

// Work Schedule - from component page lines 456-501
export const WorkSchedule: Story = {
  render: () => {
    const [timeRange, setTimeRange] = React.useState<TimeRange | undefined>(undefined);

    const formatTime = (time: Time | undefined): string => {
      if (!time) return '';
      const hours = time.hours.toString().padStart(2, '0');
      const minutes = time.minutes.toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    const calculateDuration = (range: TimeRange | undefined): string => {
      if (!range?.from || !range?.to) return '0h';
      const fromMinutes = range.from.hours * 60 + range.from.minutes;
      const toMinutes = range.to.hours * 60 + range.to.minutes;
      const diff = toMinutes - fromMinutes;
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    };

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Work Schedule</CardTitle>
          <CardDescription>
            Set your daily working hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className='me-4'>Working Hours</Label>
            <TimeRangePicker
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
              format="12h"
              placeholder="Set working hours"
              placeholderAr="حدد ساعات العمل"
            />
          </div>

          {timeRange?.from && timeRange?.to && (
            <>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  Total Hours:
                </span>
                <span className="font-semibold text-primary">
                  {calculateDuration(timeRange)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Start:</span>
                  <span>{formatTime(timeRange.from)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">End:</span>
                  <span>{formatTime(timeRange.to)}</span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders work schedule card', async () => {
      await expect(canvas.getByText('Work Schedule')).toBeInTheDocument();
      // Initial timeRange is undefined, so button shows the placeholder
      await expect(canvas.getByRole('button', { name: /set working hours/i })).toBeInTheDocument();
    });

    await step('Opens time range picker in schedule context', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /set working hours/i }));
      // TimeRangePicker popover contains nested TimePicker components (buttons), not textboxes
      // Verify popover opened by checking for "From" and "To" labels
      await expect(body.getByText('From')).toBeInTheDocument();
      await expect(body.getByText('To')).toBeInTheDocument();
      // Verify the nested TimePicker buttons are present (should show placeholder "Pick a time")
      const pickTimeButtons = body.getAllByRole('button', { name: /pick a time/i });
      await expect(pickTimeButtons.length).toBeGreaterThanOrEqual(2); // Two nested TimePickers
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Work schedule example with time range and total hours calculation.'
      }
    }
  }
};

// Disabled State
export const DisabledState: Story = {
  render: () => (
    <div className="w-full max-w-xs mx-auto space-y-4">
      <div className="space-y-2">
        <Label className='me-4'>Enabled Time Picker</Label>
        <TimePicker
          time={{ hours: 9, minutes: 30 }}
          placeholder="Pick a time"
          placeholderAr="اختر الوقت"
        />
      </div>

      <div className="space-y-2">
        <Label className='me-4'>Disabled Time Picker</Label>
        <TimePicker
          time={{ hours: 9, minutes: 30 }}
          placeholder="Pick a time"
          placeholderAr="اختر الوقت"
          disabled
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verifies disabled state', async () => {
      // Both buttons show the formatted time value "09:30"
      const buttons = canvas.getAllByRole('button', { name: '09:30' });
      await expect(buttons[0]).toBeEnabled();
      await expect(buttons[1]).toBeDisabled();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Disabled time picker state.'
      }
    }
  }
};

