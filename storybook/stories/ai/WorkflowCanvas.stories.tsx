import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowCanvas } from '../../../components/ui/workflow-canvas';
import { WorkflowNode } from '../../../components/ui/workflow-node';
import { Zap, Cpu, FileOutput, Mail, Database } from 'lucide-react';

/**
 * Workflow Canvas Component Stories
 *
 * All examples are taken from /app/(docs)/components/workflow-canvas/page.tsx
 *
 * Note: WorkflowCanvas provides a visual workflow editor.
 * Features: Drag-and-drop nodes, connections, minimap, controls, backgrounds, RTL support.
 */

const nodeTypes = {
  workflowNode: WorkflowNode
};

const meta = {
  title: 'AI/Workflow Canvas',
  component: WorkflowCanvas,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['!autodocs'],
  argTypes: {
    initialNodes: { control: false },
    initialEdges: { control: false },
    nodeTypes: { control: false },
    onNodesChange: { control: false },
    onEdgesChange: { control: false },
    onConnect: { control: false },
    readOnly: { control: 'boolean' },
    showMiniMap: { control: 'boolean' },
    showControls: { control: 'boolean' },
    showBackground: { control: 'boolean' },
    backgroundVariant: {
      control: { type: 'select' },
      options: ['dots', 'lines', 'cross']
    },
    isRTL: { control: 'boolean' },
    className: { control: 'text' }
  }
} satisfies Meta<typeof WorkflowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  render: () => {
    const nodes = [
      {
        id: '1',
        type: 'workflowNode',
        position: { x: 100, y: 100 },
        data: { label: 'Start', icon: Zap }
      },
    ];

    return (
      <div className="w-full h-screen border rounded-lg overflow-hidden">
        <WorkflowCanvas initialNodes={nodes} nodeTypes={nodeTypes} />
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  }
};

// Simple Workflow - from code lines 146-173
export const SimpleWorkflow: Story = {
  render: () => {
    const nodes = [
      {
        id: '1',
        type: 'workflowNode',
        position: { x: 50, y: 100 },
        data: { label: 'Email Received', description: 'Trigger', type: 'trigger', icon: Mail }
      },
      {
        id: '2',
        type: 'workflowNode',
        position: { x: 350, y: 100 },
        data: { label: 'AI Analysis', description: 'Process', type: 'AI', icon: Cpu }
      },
      {
        id: '3',
        type: 'workflowNode',
        position: { x: 650, y: 100 },
        data: { label: 'Send to Slack', description: 'Action', type: 'action', icon: FileOutput }
      },
    ];

    const edges = [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
    ];

    return (
      <div className="w-full h-screen border rounded-lg overflow-hidden">
        <WorkflowCanvas initialNodes={nodes} initialEdges={edges} nodeTypes={nodeTypes} />
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Complex Workflow
export const ComplexWorkflow: Story = {
  render: () => {
    const nodes = [
      {
        id: '1',
        type: 'workflowNode',
        position: { x: 50, y: 50 },
        data: { label: 'Start', icon: Zap }
      },
      {
        id: '2',
        type: 'workflowNode',
        position: { x: 350, y: 50 },
        data: { label: 'Process Data', icon: Cpu }
      },
      {
        id: '3',
        type: 'workflowNode',
        position: { x: 650, y: 50 },
        data: { label: 'Save to DB', icon: Database }
      },
      {
        id: '4',
        type: 'workflowNode',
        position: { x: 350, y: 250 },
        data: { label: 'Send Email', icon: Mail }
      },
    ];

    const edges = [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
    ];

    return (
      <div className="w-full h-screen border rounded-lg overflow-hidden">
        <WorkflowCanvas initialNodes={nodes} initialEdges={edges} nodeTypes={nodeTypes} />
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Without Minimap
export const WithoutMinimap: Story = {
  render: () => {
    const nodes = [
      {
        id: '1',
        type: 'workflowNode',
        position: { x: 100, y: 100 },
        data: { label: 'Start', icon: Zap }
      },
      {
        id: '2',
        type: 'workflowNode',
        position: { x: 400, y: 100 },
        data: { label: 'Process', icon: Cpu }
      },
    ];

    const edges = [{ id: 'e1-2', source: '1', target: '2' }];

    return (
      <div className="w-full h-screen border rounded-lg overflow-hidden">
        <WorkflowCanvas
          initialNodes={nodes}
          initialEdges={edges}
          nodeTypes={nodeTypes}
          showMiniMap={false}
        />
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Read Only
export const ReadOnly: Story = {
  render: () => {
    const nodes = [
      {
        id: '1',
        type: 'workflowNode',
        position: { x: 100, y: 100 },
        data: { label: 'Email Trigger', icon: Mail }
      },
      {
        id: '2',
        type: 'workflowNode',
        position: { x: 400, y: 100 },
        data: { label: 'AI Analysis', icon: Cpu }
      },
    ];

    const edges = [{ id: 'e1-2', source: '1', target: '2' }];

    return (
      <div className="w-full h-screen border rounded-lg overflow-hidden">
        <WorkflowCanvas
          initialNodes={nodes}
          initialEdges={edges}
          nodeTypes={nodeTypes}
          readOnly
        />
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Lines Background
export const LinesBackground: Story = {
  render: () => {
    const nodes = [
      {
        id: '1',
        type: 'workflowNode',
        position: { x: 100, y: 100 },
        data: { label: 'Start', icon: Zap }
      },
      {
        id: '2',
        type: 'workflowNode',
        position: { x: 400, y: 100 },
        data: { label: 'Process', icon: Cpu }
      },
    ];

    const edges = [{ id: 'e1-2', source: '1', target: '2' }];

    return (
      <div className="w-full h-screen border rounded-lg overflow-hidden">
        <WorkflowCanvas
          initialNodes={nodes}
          initialEdges={edges}
          nodeTypes={nodeTypes}
          backgroundVariant="lines"
        />
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Empty Canvas
export const EmptyCanvas: Story = {
  render: () => (
    <div className="w-full h-screen border rounded-lg overflow-hidden">
      <WorkflowCanvas initialNodes={[]} nodeTypes={nodeTypes} />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Empty workflow canvas ready for adding nodes.'
      }
    }
  }
};

// RTL
export const RTL: Story = {
  render: () => {
    const nodes = [
      {
        id: '1',
        type: 'workflowNode',
        position: { x: 50, y: 100 },
        data: {
          label: 'Email Trigger',
          labelAr: 'مشغل البريد',
          description: 'Trigger',
          descriptionAr: 'مشغل',
          icon: Mail,
          isRTL: true
        }
      },
      {
        id: '2',
        type: 'workflowNode',
        position: { x: 350, y: 100 },
        data: {
          label: 'AI Analysis',
          labelAr: 'تحليل الذكاء الاصطناعي',
          description: 'Process',
          descriptionAr: 'معالجة',
          icon: Cpu,
          isRTL: true
        }
      },
    ];

    const edges = [{ id: 'e1-2', source: '1', target: '2' }];

    return (
      <div className="w-full h-screen border rounded-lg overflow-hidden">
        <WorkflowCanvas
          initialNodes={nodes}
          initialEdges={edges}
          nodeTypes={nodeTypes}
          isRTL
        />
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true }
  }
};
