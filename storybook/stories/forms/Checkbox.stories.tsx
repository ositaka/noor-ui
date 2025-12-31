import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../../components/ui/checkbox';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Separator } from '../../../components/ui/separator';
import * as React from 'react';

/**
 * Checkbox Component Stories
 *
 * All examples are taken from /app/(docs)/components/checkbox/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Checkbox supports checked, unchecked, and indeterminate states
 */

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
    id: 'default'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="default">Accept terms and conditions</Label>
    </div>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Demonstrates the indeterminate state (mixed) used for "Select All" functionality. When some but not all items are checked, the parent checkbox shows an indeterminate state.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled checkbox with external state management. The checkbox state can be toggled programmatically via a button.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Checkboxes in a form with name and value attributes for form submission. The last checkbox is required.'
      }
    }
  }
};

// RTL Example
export const RTLExample: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Checkbox id="rtl-terms" />
        <Label htmlFor="rtl-terms">أوافق على الشروط والأحكام</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="rtl-newsletter" />
        <Label htmlFor="rtl-newsletter">الاشتراك في النشرة الإخبارية</Label>
      </div>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Checkboxes with Arabic labels demonstrating RTL support. Checkbox and label maintain proper spacing and alignment. Automatically switches to RTL mode.'
      }
    }
  }
};

// RTL Indeterminate
export const RTLIndeterminate: Story = {
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
            id="all-rtl"
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
          <Label htmlFor="all-rtl" className="font-semibold">
            تحديد الكل
          </Label>
        </div>
        <Separator />
        <div className="space-y-2 ps-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="item1-rtl"
              checked={checkedItems.item1}
              onCheckedChange={(checked) =>
                setCheckedItems({ ...checkedItems, item1: checked === true })
              }
            />
            <Label htmlFor="item1-rtl">عنصر ١</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="item2-rtl"
              checked={checkedItems.item2}
              onCheckedChange={(checked) =>
                setCheckedItems({ ...checkedItems, item2: checked === true })
              }
            />
            <Label htmlFor="item2-rtl">عنصر ٢</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="item3-rtl"
              checked={checkedItems.item3}
              onCheckedChange={(checked) =>
                setCheckedItems({ ...checkedItems, item3: checked === true })
              }
            />
            <Label htmlFor="item3-rtl">عنصر ٣</Label>
          </div>
        </div>
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
        story: 'Indeterminate state with Arabic text in RTL mode. The "Select All" functionality works perfectly in RTL.'
      }
    }
  }
};

// RTL Disabled
export const RTLDisabled: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-rtl" disabled />
        <Label htmlFor="disabled-rtl">خانة اختيار معطلة</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-checked-rtl" disabled checked />
        <Label htmlFor="disabled-checked-rtl">معطلة ومحددة</Label>
      </div>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Disabled checkboxes with Arabic labels in RTL mode.'
      }
    }
  }
};

// RTL In Form
export const RTLInForm: Story = {
  render: () => (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('تم إرسال النموذج!');
      }}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox id="newsletter-rtl" name="newsletter" value="yes" />
          <Label htmlFor="newsletter-rtl">الاشتراك في النشرة الإخبارية</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="updates-rtl" name="updates" value="yes" />
          <Label htmlFor="updates-rtl">تلقي تحديثات المنتج</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="terms-rtl" name="terms" value="yes" required />
          <Label htmlFor="terms-rtl">
            أوافق على الشروط والأحكام{' '}
            <span className="text-destructive">*</span>
          </Label>
        </div>
      </div>
      <Button type="submit">إرسال</Button>
    </form>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Complete form with checkboxes in Arabic, demonstrating RTL support in form contexts.'
      }
    }
  }
};
