import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import * as React from 'react';

const meta = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onValueChange: {
      control: false
    }
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    defaultValue: 'option1'
  },
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;
    const dir = isRTL ? 'rtl' as const : 'ltr' as const;

    return (
    <Select {...args} dir={dir}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t('Select option', 'اختر خياراً')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">{t('Option 1', 'الخيار الأول')}</SelectItem>
        <SelectItem value="option2">{t('Option 2', 'الخيار الثاني')}</SelectItem>
        <SelectItem value="option3">{t('Option 3', 'الخيار الثالث')}</SelectItem>
      </SelectContent>
    </Select>
    );
  },
};

// With Label - from component page lines 305-320
export const WithLabel: Story = {
  render: () => (
    <div className="max-w-xs space-y-2">
      <Label htmlFor="country">Country</Label>
      <Select>
        <SelectTrigger className="w-[200px]" id="country">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="au">Australia</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="fr">France</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};

// Grouped Options - from component page lines 333-352
export const GroupedOptions: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Select with grouped options using SelectGroup and SelectLabel. Perfect for organizing many options into categories.'
      }
    }
  }
};

// Disabled State - from component page lines 365-390
export const DisabledState: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select with disabled option</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available option</SelectItem>
            <SelectItem value="disabled" disabled>
              Disabled option
            </SelectItem>
            <SelectItem value="another">Another option</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Disabled select</Label>
        <Select disabled>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Disabled select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};

// Controlled - from component page lines 404-421
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className="space-y-4">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Selected: {value || 'None'}
        </p>
        <Button size="sm" onClick={() => setValue('banana')}>
          Select Banana
        </Button>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled select with external state management. The selection can be changed programmatically via a button.'
      }
    }
  }
};

// In Form - from component page lines 434-456
export const InForm: Story = {
  render: () => (
    <form
      className="max-w-xs space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="plan">Select Plan</Label>
        <Select name="plan" required>
          <SelectTrigger className="w-[200px]" id="plan">
            <SelectValue placeholder="Choose a plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free - $0/month</SelectItem>
            <SelectItem value="starter">Starter - $9/month</SelectItem>
            <SelectItem value="pro">Pro - $29/month</SelectItem>
            <SelectItem value="enterprise">Enterprise - Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Continue</Button>
    </form>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Select in a form with the name attribute for form submission.'
      }
    }
  }
};

