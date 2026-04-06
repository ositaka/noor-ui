import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowNode } from '../../../components/ui/workflow-node';
import { Card, CardContent } from '../../../components/ui/card';
import { Lightning, Cpu, FileArrowDown, WarningCircle } from '@phosphor-icons/react';

/**
 * Workflow Node Component Stories
 *
 * All examples are taken from /app/(docs)/components/workflow-node/page.tsx
 *
 * Note: WorkflowNode represents a task or action in a workflow.
 * Features: Different types, status indicators, icons, custom children, RTL support.
 *
 * Important: WorkflowNode is designed to work within ReactFlow context.
 * In these stories, we render it standalone for visual testing only.
 * Play functions are not included because the component requires ReactFlow's
 * zustand provider which is not available in isolation.
 */

const meta = {
  title: 'AI/Workflow Node',
  component: WorkflowNode,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs', '!test'], // Skip vitest - requires ReactFlow context
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
      options: ['active', 'inactive', 'error', 'success']
    },
    isRTL: { control: 'boolean' },
    children: { control: false }
  }
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
        icon: Lightning
      }}
    />
  )
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
            icon: Lightning
          }}
        />
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true }
  }
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
            icon: Cpu
          }}
        />
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true }
  }
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
            icon: FileArrowDown
          }}
        />
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true }
  }
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
            icon: Lightning
          }}
        />
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true }
  }
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
            icon: Cpu
          }}
        />
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true }
  }
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
            icon: WarningCircle
          }}
        />
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true }
  }
};
