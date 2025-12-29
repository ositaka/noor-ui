import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker, TimeRangePicker, type Time, type TimeRange } from '../../../components/ui/time-picker';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import * as React from 'react';

/**
 * Time Picker Component Stories
 *
 * All examples are taken from /app/(docs)/components/time-picker/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: TimePicker supports 12h/24h formats and time ranges with RTL support
 */

const meta = {
  title: 'Forms/Time Picker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onTimeChange: {
      control: false,
    },
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    placeholder: 'Pick a time',
    placeholderAr: 'اختر الوقت',
    format: '24h',
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  render: (args) => {
    const [time, setTime] = React.useState<Time>({ hours: 9, minutes: 30 });

    const formatTime = (time: Time | undefined): string => {
      if (!time) return 'No time selected';
      const hours = time.hours.toString().padStart(2, '0');
      const minutes = time.minutes.toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    return (
      <div className="w-full max-w-xs space-y-2">
        <Label>Start Time</Label>
        <TimePicker {...args} time={time} onTimeChange={(t) => t && setTime(t)} />
        <p className="text-sm text-muted-foreground">{formatTime(time)}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      story: {
        inline: false,
      },
    },
  },
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
        <Label>Start Time</Label>
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Basic time picker with 24-hour format.',
      },
    },
  },
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
        <Label>Appointment Time</Label>
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Time picker with 12-hour format and AM/PM toggle.',
      },
    },
  },
};

// Time Range - from component page lines 310-321
export const TimeRange: Story = {
  render: () => {
    const [timeRange, setTimeRange] = React.useState<TimeRange | undefined>({
      from: { hours: 9, minutes: 0 },
      to: { hours: 17, minutes: 0 },
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
        <Label>Working Hours</Label>
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Time range picker for selecting start and end times with duration calculation.',
      },
    },
  },
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
        <Label>Time</Label>
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Time picker with 15-minute step intervals.',
      },
    },
  },
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
            <Label>Preferred Time</Label>
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Medical appointment booking with 12h format and automatic end time calculation.',
      },
    },
  },
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
            <Label>Working Hours</Label>
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Work schedule example with time range and total hours calculation.',
      },
    },
  },
};

// Disabled State
export const DisabledState: Story = {
  render: () => (
    <div className="w-full max-w-xs mx-auto space-y-4">
      <div className="space-y-2">
        <Label>Enabled Time Picker</Label>
        <TimePicker
          time={{ hours: 9, minutes: 30 }}
          placeholder="Pick a time"
          placeholderAr="اختر الوقت"
        />
      </div>

      <div className="space-y-2">
        <Label>Disabled Time Picker</Label>
        <TimePicker
          time={{ hours: 9, minutes: 30 }}
          placeholder="Pick a time"
          placeholderAr="اختر الوقت"
          disabled
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
      disable: true,
      description: {
        story: 'Disabled time picker state.',
      },
    },
  },
};

// RTL Example
export const RTLExample: Story = {
  render: () => {
    const [time, setTime] = React.useState<Time>({ hours: 9, minutes: 30 });

    const formatTime = (time: Time | undefined): string => {
      if (!time) return 'لم يتم اختيار وقت';
      const hours = time.hours.toString().padStart(2, '0');
      const minutes = time.minutes.toString().padStart(2, '0');
      return `${minutes}:${hours}`;
    };

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label>وقت البدء</Label>
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
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Time picker with Arabic labels in RTL mode.',
      },
    },
  },
};

// RTL 12h Format
export const RTL12hFormat: Story = {
  render: () => {
    const [time, setTime] = React.useState<Time>({ hours: 14, minutes: 0 });

    const formatTime12h = (time: Time | undefined): string => {
      if (!time) return 'لم يتم اختيار وقت';
      const hours = ((time.hours % 12) || 12).toString().padStart(2, '0');
      const minutes = time.minutes.toString().padStart(2, '0');
      const period = time.hours >= 12 ? 'م' : 'ص';
      return `${period} ${minutes}:${hours}`;
    };

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label>وقت الموعد</Label>
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
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Time picker with 12-hour format in Arabic, showing proper RTL AM/PM (ص/م) formatting.',
      },
    },
  },
};

// RTL Medical Appointment
export const RTLMedicalAppointment: Story = {
  render: () => {
    const [time, setTime] = React.useState<Time | undefined>(undefined);

    const formatTime12h = (time: Time | undefined): string => {
      if (!time) return '';
      const hours = ((time.hours % 12) || 12).toString().padStart(2, '0');
      const minutes = time.minutes.toString().padStart(2, '0');
      const period = time.hours >= 12 ? 'م' : 'ص';
      return `${period} ${minutes}:${hours}`;
    };

    const calculateEndTime = (time: Time): string => {
      const endMinutes = time.minutes + 30;
      const endHours = time.hours + Math.floor(endMinutes / 60);
      const finalMinutes = endMinutes % 60;
      const hours = ((endHours % 12) || 12).toString().padStart(2, '0');
      const minutes = finalMinutes.toString().padStart(2, '0');
      const period = endHours >= 12 ? 'م' : 'ص';
      return `${period} ${minutes}:${hours}`;
    };

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>موعد طبي</CardTitle>
          <CardDescription>
            اختر وقت الموعد المفضل لديك
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>الوقت المفضل</Label>
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
                  الوقت المحدد:
                </span>
                <span className="font-semibold">
                  {formatTime12h(time)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  المدة:
                </span>
                <span className="font-semibold">30 دقيقة</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  وقت الانتهاء:
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
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Complete medical appointment example in Arabic with RTL support and proper time formatting.',
      },
    },
  },
};
