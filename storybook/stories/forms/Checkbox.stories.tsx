import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../../components/ui/checkbox';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Separator } from '../../../components/ui/separator';
import * as React from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onCheckedChange: {
      control: false
    }
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    id: 'default',
    onCheckedChange: fn()
  },
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;

    return (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="default">{t('Accept terms and conditions', 'أوافق على الشروط والأحكام')}</Label>
    </div>
    );
  },
};

// With Label - from component page lines 292-303
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing">Send me marketing emails</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="analytics" />
        <Label htmlFor="analytics">Share analytics data</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="social" />
        <Label htmlFor="social">Allow social media integration</Label>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All checkboxes render with labels', async () => {
      const checkboxes = canvas.getAllByRole('checkbox');
      await expect(checkboxes).toHaveLength(3);
      await expect(canvas.getByText('Send me marketing emails')).toBeInTheDocument();
      await expect(canvas.getByText('Share analytics data')).toBeInTheDocument();
      await expect(canvas.getByText('Allow social media integration')).toBeInTheDocument();
    });

    await step('Each checkbox can be toggled independently', async () => {
      const marketingCheckbox = canvas.getByLabelText('Send me marketing emails');
      const analyticsCheckbox = canvas.getByLabelText('Share analytics data');

      await userEvent.click(marketingCheckbox);
      await expect(marketingCheckbox).toBeChecked();
      await expect(analyticsCheckbox).not.toBeChecked();

      await userEvent.click(analyticsCheckbox);
      await expect(marketingCheckbox).toBeChecked();
      await expect(analyticsCheckbox).toBeChecked();
    });
  }
};

// Indeterminate State - from component page lines 316-368
export const IndeterminateState: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = React.useState({
      item1: false,
      item2: false,
      item3: false
    });

    const allChecked = Object.values(checkedItems).every(Boolean);
    const someChecked = Object.values(checkedItems).some(Boolean);
    const indeterminate = someChecked && !allChecked;

    return (
      <div className="space-y-3 w-64">
        <div className="flex items-center gap-2">
          <Checkbox
            id="all"
            checked={allChecked ? true : indeterminate ? 'indeterminate' : false}
            onCheckedChange={(checked) => {
              const newValue = checked === true;
              setCheckedItems({
                item1: newValue,
                item2: newValue,
                item3: newValue
              });
            }}
          />
          <Label htmlFor="all" className="font-semibold">
            Select All
          </Label>
        </div>
        <Separator />
        <div className="space-y-2 ps-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="item1"
              checked={checkedItems.item1}
              onCheckedChange={(checked) =>
                setCheckedItems({ ...checkedItems, item1: checked === true })
              }
            />
            <Label htmlFor="item1">Item 1</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="item2"
              checked={checkedItems.item2}
              onCheckedChange={(checked) =>
                setCheckedItems({ ...checkedItems, item2: checked === true })
              }
            />
            <Label htmlFor="item2">Item 2</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="item3"
              checked={checkedItems.item3}
              onCheckedChange={(checked) =>
                setCheckedItems({ ...checkedItems, item3: checked === true })
              }
            />
            <Label htmlFor="item3">Item 3</Label>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Demonstrates the indeterminate state (mixed) used for "Select All" functionality. When some but not all items are checked, the parent checkbox shows an indeterminate state.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial state - all unchecked', async () => {
      const selectAll = canvas.getByLabelText('Select All');
      const item1 = canvas.getByLabelText('Item 1');
      const item2 = canvas.getByLabelText('Item 2');
      const item3 = canvas.getByLabelText('Item 3');

      await expect(selectAll).not.toBeChecked();
      await expect(item1).not.toBeChecked();
      await expect(item2).not.toBeChecked();
      await expect(item3).not.toBeChecked();
      await expect(selectAll).toHaveAttribute('data-state', 'unchecked');
    });

    await step('Checking one item shows indeterminate state', async () => {
      const selectAll = canvas.getByLabelText('Select All');
      const item1 = canvas.getByLabelText('Item 1');

      await userEvent.click(item1);
      await expect(item1).toBeChecked();
      await expect(selectAll).toHaveAttribute('data-state', 'indeterminate');
    });

    await step('Checking all items removes indeterminate state', async () => {
      const selectAll = canvas.getByLabelText('Select All');
      const item2 = canvas.getByLabelText('Item 2');
      const item3 = canvas.getByLabelText('Item 3');

      await userEvent.click(item2);
      await userEvent.click(item3);
      await expect(selectAll).toBeChecked();
      await expect(selectAll).toHaveAttribute('data-state', 'checked');
    });

    await step('Select All checkbox toggles all items', async () => {
      const selectAll = canvas.getByLabelText('Select All');
      const item1 = canvas.getByLabelText('Item 1');
      const item2 = canvas.getByLabelText('Item 2');
      const item3 = canvas.getByLabelText('Item 3');

      await userEvent.click(selectAll);
      await expect(item1).not.toBeChecked();
      await expect(item2).not.toBeChecked();
      await expect(item3).not.toBeChecked();

      await userEvent.click(selectAll);
      await expect(item1).toBeChecked();
      await expect(item2).toBeChecked();
      await expect(item3).toBeChecked();
    });
  }
};

// Disabled - from component page lines 380-387
export const Disabled: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled">Disabled checkbox</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-checked" disabled checked />
        <Label htmlFor="disabled-checked">Disabled and checked</Label>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Disabled checkboxes are in correct state', async () => {
      const disabledCheckbox = canvas.getByLabelText('Disabled checkbox');
      const disabledChecked = canvas.getByLabelText('Disabled and checked');

      await expect(disabledCheckbox).toBeDisabled();
      await expect(disabledCheckbox).not.toBeChecked();
      await expect(disabledChecked).toBeDisabled();
      await expect(disabledChecked).toBeChecked();
    });
  }
};

// Controlled - from component page lines 400-415
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={(value) => setChecked(value === true)}
          />
          <Label htmlFor="controlled">Controlled checkbox</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          Status: {checked ? 'Checked' : 'Unchecked'}
        </p>
        <Button size="sm" onClick={() => setChecked(!checked)}>
          Toggle
        </Button>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled checkbox with external state management. The checkbox state can be toggled programmatically via a button.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial state shows unchecked', async () => {
      const checkbox = canvas.getByLabelText('Controlled checkbox');
      await expect(checkbox).not.toBeChecked();
      await expect(canvas.getByText('Status: Unchecked')).toBeInTheDocument();
    });

    await step('Direct checkbox click updates state', async () => {
      const checkbox = canvas.getByLabelText('Controlled checkbox');
      await userEvent.click(checkbox);
      await expect(checkbox).toBeChecked();
      await expect(canvas.getByText('Status: Checked')).toBeInTheDocument();
    });

    await step('Button toggles checkbox programmatically', async () => {
      const checkbox = canvas.getByLabelText('Controlled checkbox');
      const toggleButton = canvas.getByRole('button', { name: 'Toggle' });

      await userEvent.click(toggleButton);
      await expect(checkbox).not.toBeChecked();
      await expect(canvas.getByText('Status: Unchecked')).toBeInTheDocument();

      await userEvent.click(toggleButton);
      await expect(checkbox).toBeChecked();
      await expect(canvas.getByText('Status: Checked')).toBeInTheDocument();
    });
  }
};

// In Form - from component page lines 436-451
export const InForm: Story = {
  render: () => (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox id="newsletter" name="newsletter" value="yes" />
          <Label htmlFor="newsletter">Subscribe to newsletter</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="updates" name="updates" value="yes" />
          <Label htmlFor="updates">Receive product updates</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="form-terms" name="terms" value="yes" required />
          <Label htmlFor="form-terms">
            I agree to the terms and conditions{' '}
            <span className="text-destructive">*</span>
          </Label>
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Checkboxes in a form with name and value attributes for form submission. The last checkbox is required.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Form renders with all checkboxes', async () => {
      const newsletter = canvas.getByLabelText('Subscribe to newsletter');
      const updates = canvas.getByLabelText('Receive product updates');
      const terms = canvas.getByLabelText(/I agree to the terms and conditions/);

      await expect(newsletter).toBeInTheDocument();
      await expect(updates).toBeInTheDocument();
      await expect(terms).toBeInTheDocument();
      await expect(terms).toBeRequired();
    });

    await step('Checkboxes can be checked in form context', async () => {
      const newsletter = canvas.getByLabelText('Subscribe to newsletter');
      const terms = canvas.getByLabelText(/I agree to the terms and conditions/);

      await userEvent.click(newsletter);
      await expect(newsletter).toBeChecked();

      await userEvent.click(terms);
      await expect(terms).toBeChecked();
    });

    await step('Form has proper attributes for submission', async () => {
      // Radix Checkbox stores name/value on hidden inputs, not on the button element
      const form = canvasElement.querySelector('form')!;
      const newsletterInput = form.querySelector('input[name="newsletter"]');
      const updatesInput = form.querySelector('input[name="updates"]');
      const termsInput = form.querySelector('input[name="terms"]');

      await expect(newsletterInput).toBeInTheDocument();
      await expect(newsletterInput).toHaveAttribute('value', 'yes');
      await expect(updatesInput).toBeInTheDocument();
      await expect(termsInput).toBeInTheDocument();
    });
  }
};

