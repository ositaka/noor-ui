import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowNode } from '../../../components/ui/workflow-node';
import { Card, CardContent } from '../../../components/ui/card';
import { Zap, Cpu, FileOutput, Mail, Settings, Database, AlertCircle } from 'lucide-react';

/**
 * Workflow Node Component Stories
 *
 * All examples are taken from /app/(docs)/components/workflow-node/page.tsx
 *
 * Note: WorkflowNode represents a task or action in a workflow.
 * Features: Different types, status indicators, icons, custom children, RTL support.
 */

const meta = {
  title: 'AI/Workflow Node',
  component: WorkflowNode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    labelAr: { control: 'text' },
    description: { control: 'text' },
    descriptionAr: { control: 'text' },
    type: { control: 'text' },
    typeAr: { control: 'text' },
    icon: { control: false },
    status: {
      control: { type: 'select' },
      options: ['active', 'inactive', 'error', 'success'],
    },
    isRTL: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof WorkflowNode>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - from code lines 94-101
export const Default: Story = {
  render: () => (
    <WorkflowNode
      data={{
        label: 'Email Trigger',
        description: 'When email received',
        type: 'trigger',
        icon: Zap,
      }}
    />
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
};

// Trigger Type - from code lines 118-123
export const TriggerType: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <WorkflowNode
          data={{
            label: 'Email Trigger',
            description: 'When email received',
            type: 'trigger',
            icon: Zap,
          }}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// AI Type - from code lines 127-134
export const AIType: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <WorkflowNode
          data={{
            label: 'AI Analysis',
            description: 'Analyze email content',
            type: 'AI',
            icon: Cpu,
          }}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Action Type - from code lines 138-145
export const ActionType: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <WorkflowNode
          data={{
            label: 'Send Output',
            description: 'Forward to Slack',
            type: 'action',
            icon: FileOutput,
          }}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Active Status - from code lines 153-160
export const ActiveStatus: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <WorkflowNode
          data={{
            label: 'Active Task',
            description: 'Currently running',
            status: 'active',
            icon: Zap,
          }}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Success Status - from code lines 164-171
export const SuccessStatus: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <WorkflowNode
          data={{
            label: 'Completed Task',
            description: 'Finished successfully',
            status: 'success',
            icon: Cpu,
          }}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Error Status - from code lines 175-182
export const ErrorStatus: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <WorkflowNode
          data={{
            label: 'Failed Task',
            description: 'Error occurred',
            status: 'error',
            icon: AlertCircle,
          }}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// RTL
export const RTL: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <WorkflowNode
          data={{
            label: 'Email Trigger',
            labelAr: 'مشغل البريد',
            description: 'When email received',
            descriptionAr: 'عند استلام بريد إلكتروني',
            type: 'trigger',
            typeAr: 'مشغل',
            icon: Zap,
            isRTL: true,
          }}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};
