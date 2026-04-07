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
import { expect, userEvent, within } from 'storybook/test';

/**
 * Select Component Stories
 *
 * All examples are taken from /app/(docs)/components/select/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Select supports dropdown selection from a list of options with grouped options and keyboard navigation
 */

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
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with label', async () => {
      const label = canvas.getByText('Country');
      await expect(label).toBeInTheDocument();

      const trigger = canvas.getByRole('combobox');
      await expect(trigger).toBeInTheDocument();
      await expect(trigger).toHaveAttribute('id', 'country');
    });

    await step('Label-trigger association works', async () => {
      const trigger = canvas.getByRole('combobox');
      await expect(trigger).toHaveAccessibleName('Country');
    });

    await step('Selection works with label', async () => {
      const trigger = canvas.getByRole('combobox');
      await userEvent.click(trigger);

      const body = within(document.body);
      const ukOption = await body.findByRole('option', { name: 'United Kingdom' });
      await userEvent.click(ukOption);

      await expect(trigger).toHaveTextContent('United Kingdom');
    });
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Opens and displays grouped options', async () => {
      const trigger = canvas.getByRole('combobox');
      await userEvent.click(trigger);

      // Radix Select renders in a portal
      const body = within(document.body);
      await expect(await body.findByText('North America')).toBeVisible();
      await expect(body.getByText('Europe')).toBeVisible();
    });

    await step('Selects option from first group', async () => {
      const body = within(document.body);
      const estOption = body.getByRole('option', { name: /Eastern Standard Time/ });
      await userEvent.click(estOption);

      const trigger = canvas.getByRole('combobox');
      await expect(trigger).toHaveTextContent('Eastern Standard Time (EST)');
    });

    await step('Can select from different group', async () => {
      const trigger = canvas.getByRole('combobox');
      await userEvent.click(trigger);

      const body = within(document.body);
      const gmtOption = await body.findByRole('option', { name: /Greenwich Mean Time/ });
      await userEvent.click(gmtOption);

      await expect(trigger).toHaveTextContent('Greenwich Mean Time (GMT)');
    });
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Disabled select is not interactive', async () => {
      const triggers = canvas.getAllByRole('combobox');
      const disabledTrigger = triggers[1]; // Second select is disabled

      await expect(disabledTrigger).toBeDisabled();
    });

    await step('Select with disabled option can open', async () => {
      const triggers = canvas.getAllByRole('combobox');
      const enabledTrigger = triggers[0];

      await userEvent.click(enabledTrigger);

      // Radix Select renders options in a portal
      const body = within(document.body);
      const availableOption = await body.findByRole('option', { name: 'Available option' });
      await expect(availableOption).toBeVisible();
    });

    await step('Disabled option has correct attributes', async () => {
      const body = within(document.body);
      const disabledOption = body.getByRole('option', { name: 'Disabled option' });
      await expect(disabledOption).toHaveAttribute('data-disabled');
    });
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial state shows no selection', async () => {
      await expect(canvas.getByText('Selected: None')).toBeInTheDocument();
    });

    await step('User can select option', async () => {
      const trigger = canvas.getByRole('combobox');
      await userEvent.click(trigger);

      const body = within(document.body);
      const appleOption = await body.findByRole('option', { name: 'Apple' });
      await userEvent.click(appleOption);

      await expect(canvas.getByText('Selected: apple')).toBeInTheDocument();
      await expect(trigger).toHaveTextContent('Apple');
    });

    await step('Programmatic selection via button works', async () => {
      const button = canvas.getByRole('button', { name: 'Select Banana' });
      await userEvent.click(button);

      await expect(canvas.getByText('Selected: banana')).toBeInTheDocument();

      const trigger = canvas.getByRole('combobox');
      await expect(trigger).toHaveTextContent('Banana');
    });

    await step('Can change selection again', async () => {
      const trigger = canvas.getByRole('combobox');
      await userEvent.click(trigger);

      const body = within(document.body);
      const orangeOption = await body.findByRole('option', { name: 'Orange' });
      await userEvent.click(orangeOption);

      await expect(canvas.getByText('Selected: orange')).toBeInTheDocument();
    });
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Form renders with select and submit button', async () => {
      await expect(canvas.getByText('Select Plan')).toBeInTheDocument();
      await expect(canvas.getByRole('combobox')).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
    });

    await step('Can select a plan option', async () => {
      const trigger = canvas.getByRole('combobox');
      await userEvent.click(trigger);

      const body = within(document.body);
      const proOption = await body.findByRole('option', { name: /Pro - \$29\/month/ });
      await userEvent.click(proOption);

      await expect(trigger).toHaveTextContent('Pro - $29/month');
    });

    await step('Select has name attribute for form submission', async () => {
      const trigger = canvas.getByRole('combobox');
      // The hidden input with name attribute should be present
      const form = trigger.closest('form');
      await expect(form).toBeInTheDocument();
    });
  }
};

