import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { ReactFlow, ReactFlowProvider, Background } from '@xyflow/react';
import {
  TriggerNode,
  WebhookTriggerNode,
  ScheduleTriggerNode,
  ActionNode,
  CodeActionNode,
  FilterNode,
  AINode,
  LLMNode,
  EmbeddingNode,
  OutputNode,
  SaveNode,
  NotifyNode,
  workflowNodeTypes
} from '../../../components/ui/workflow-nodes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import '@xyflow/react/dist/style.css';

/**
 * Workflow Nodes Component Stories
 *
 * Note: Workflow Nodes are pre-configured variants of WorkflowNode for specific use cases.
 * Features: Specialized node types (Trigger, Action, AI, Output), pre-configured icons,
 * RTL support, consistent styling.
 * Categories: Triggers (Webhook, Schedule), Actions (Code, Filter), AI (LLM, Embedding), Outputs (Save, Notify).
 */

const meta = {
  title: 'Workflow & Automation/Workflow Nodes',
  component: TriggerNode,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs', '!test'] // Skip vitest - ReactFlow components have rendering issues in test environment
} satisfies Meta<typeof TriggerNode>;

export default meta;
type Story = StoryObj<typeof meta>;

// All Trigger Nodes
export const TriggerNodes: Story = {
  render: () => {
    const nodes = [
      { id: '1', type: 'trigger', position: { x: 0, y: 0 }, data: { label: 'Generic Trigger' } },
      { id: '2', type: 'webhook', position: { x: 260, y: 0 }, data: { label: 'Webhook Trigger', description: 'HTTP endpoint' } },
      { id: '3', type: 'schedule', position: { x: 520, y: 0 }, data: { label: 'Schedule Trigger', description: 'Run on schedule' } }
    ];

    return (
      <Card>
        <CardHeader>
          <CardTitle>Trigger Nodes</CardTitle>
          <CardDescription>Starting points for workflows</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ReactFlowProvider>
            <div style={{ height: '200px', width: '100%' }}>
              <ReactFlow
                nodes={nodes}
                nodeTypes={workflowNodeTypes}
                fitView
                minZoom={1}
                maxZoom={1}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                preventScrolling={false}
              >
                <Background />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </CardContent>
      </Card>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all trigger node types', async () => {
      await expect(canvas.getByText('Generic Trigger')).toBeInTheDocument();
      await expect(canvas.getByText('Webhook Trigger')).toBeInTheDocument();
      await expect(canvas.getByText('Schedule Trigger')).toBeInTheDocument();
    });

    await step('Displays node descriptions', async () => {
      await expect(canvas.getByText('HTTP endpoint')).toBeInTheDocument();
      await expect(canvas.getByText('Run on schedule')).toBeInTheDocument();
    });

    await step('Shows node type badges', async () => {
      await expect(canvas.getByText('Trigger')).toBeInTheDocument();
      await expect(canvas.getByText('Webhook')).toBeInTheDocument();
      await expect(canvas.getByText('Schedule')).toBeInTheDocument();
    });
  }
};

// All Action Nodes
export const ActionNodes: Story = {
  render: () => {
    const nodes = [
      { id: '1', type: 'action', position: { x: 0, y: 0 }, data: { label: 'Generic Action' } },
      { id: '2', type: 'code', position: { x: 260, y: 0 }, data: { label: 'Run Code', description: 'Execute JavaScript' } },
      { id: '3', type: 'filter', position: { x: 520, y: 0 }, data: { label: 'Filter Data', description: 'Conditional logic' } }
    ];

    return (
      <Card>
        <CardHeader>
          <CardTitle>Action Nodes</CardTitle>
          <CardDescription>Processing and transformation steps</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ReactFlowProvider>
            <div style={{ height: '200px', width: '100%' }}>
              <ReactFlow
                nodes={nodes}
                nodeTypes={workflowNodeTypes}
                fitView
                minZoom={1}
                maxZoom={1}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                preventScrolling={false}
              >
                <Background />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all action node types', async () => {
      await expect(canvas.getByText('Generic Action')).toBeInTheDocument();
      await expect(canvas.getByText('Run Code')).toBeInTheDocument();
      await expect(canvas.getByText('Filter Data')).toBeInTheDocument();
    });

    await step('Displays node descriptions', async () => {
      await expect(canvas.getByText('Execute JavaScript')).toBeInTheDocument();
      await expect(canvas.getByText('Conditional logic')).toBeInTheDocument();
    });

    await step('Shows node type badges', async () => {
      await expect(canvas.getByText('Action')).toBeInTheDocument();
      await expect(canvas.getByText('Code')).toBeInTheDocument();
      await expect(canvas.getByText('Filter')).toBeInTheDocument();
    });
  }
};

// All AI Nodes
export const AINodes: Story = {
  render: () => {
    const nodes = [
      { id: '1', type: 'ai', position: { x: 0, y: 0 }, data: { label: 'AI Processing' } },
      { id: '2', type: 'llm', position: { x: 260, y: 0 }, data: { label: 'LLM Call', description: 'GPT-4 Turbo' } },
      { id: '3', type: 'embedding', position: { x: 520, y: 0 }, data: { label: 'Create Embedding', description: 'text-embedding-3' } }
    ];

    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Nodes</CardTitle>
          <CardDescription>AI and LLM operations</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ReactFlowProvider>
            <div style={{ height: '200px', width: '100%' }}>
              <ReactFlow
                nodes={nodes}
                nodeTypes={workflowNodeTypes}
                fitView
                minZoom={1}
                maxZoom={1}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                preventScrolling={false}
              >
                <Background />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all AI node types', async () => {
      await expect(canvas.getByText('AI Processing')).toBeInTheDocument();
      await expect(canvas.getByText('LLM Call')).toBeInTheDocument();
      await expect(canvas.getByText('Create Embedding')).toBeInTheDocument();
    });

    await step('Displays node descriptions', async () => {
      await expect(canvas.getByText('GPT-4 Turbo')).toBeInTheDocument();
      await expect(canvas.getByText('text-embedding-3')).toBeInTheDocument();
    });

    await step('Shows node type badges', async () => {
      await expect(canvas.getByText('AI')).toBeInTheDocument();
      await expect(canvas.getByText('LLM')).toBeInTheDocument();
      await expect(canvas.getByText('Embedding')).toBeInTheDocument();
    });
  }
};

// All Output Nodes
export const OutputNodes: Story = {
  render: () => {
    const nodes = [
      { id: '1', type: 'output', position: { x: 0, y: 0 }, data: { label: 'Send Output' } },
      { id: '2', type: 'save', position: { x: 260, y: 0 }, data: { label: 'Save to Database', description: 'PostgreSQL' } },
      { id: '3', type: 'notify', position: { x: 520, y: 0 }, data: { label: 'Send Notification', description: 'Email & Slack' } }
    ];

    return (
      <Card>
        <CardHeader>
          <CardTitle>Output Nodes</CardTitle>
          <CardDescription>End points and result handlers</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ReactFlowProvider>
            <div style={{ height: '200px', width: '100%' }}>
              <ReactFlow
                nodes={nodes}
                nodeTypes={workflowNodeTypes}
                fitView
                minZoom={1}
                maxZoom={1}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                preventScrolling={false}
              >
                <Background />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all output node types', async () => {
      await expect(canvas.getByText('Send Output')).toBeInTheDocument();
      await expect(canvas.getByText('Save to Database')).toBeInTheDocument();
      await expect(canvas.getByText('Send Notification')).toBeInTheDocument();
    });

    await step('Displays node descriptions', async () => {
      await expect(canvas.getByText('PostgreSQL')).toBeInTheDocument();
      await expect(canvas.getByText('Email & Slack')).toBeInTheDocument();
    });

    await step('Shows node type badges', async () => {
      await expect(canvas.getByText('Output')).toBeInTheDocument();
      await expect(canvas.getByText('Save')).toBeInTheDocument();
      await expect(canvas.getByText('Notify')).toBeInTheDocument();
    });
  }
};

// All Node Types
export const AllNodeTypes: Story = {
  render: () => {
    const nodes = [
      // Triggers
      { id: 't1', type: 'trigger', position: { x: 0, y: 0 }, data: { label: 'Trigger' } },
      { id: 't2', type: 'webhook', position: { x: 260, y: 0 }, data: { label: 'Webhook' } },
      { id: 't3', type: 'schedule', position: { x: 520, y: 0 }, data: { label: 'Schedule' } },
      // Actions
      { id: 'a1', type: 'action', position: { x: 0, y: 150 }, data: { label: 'Action' } },
      { id: 'a2', type: 'code', position: { x: 260, y: 150 }, data: { label: 'Code' } },
      { id: 'a3', type: 'filter', position: { x: 520, y: 150 }, data: { label: 'Filter' } },
      // AI Operations
      { id: 'ai1', type: 'ai', position: { x: 0, y: 300 }, data: { label: 'AI' } },
      { id: 'ai2', type: 'llm', position: { x: 260, y: 300 }, data: { label: 'LLM' } },
      { id: 'ai3', type: 'embedding', position: { x: 520, y: 300 }, data: { label: 'Embedding' } },
      // Outputs
      { id: 'o1', type: 'output', position: { x: 0, y: 450 }, data: { label: 'Output' } },
      { id: 'o2', type: 'save', position: { x: 260, y: 450 }, data: { label: 'Save' } },
      { id: 'o3', type: 'notify', position: { x: 520, y: 450 }, data: { label: 'Notify' } }
    ];

    return (
      <Card>
        <CardHeader>
          <CardTitle>All Workflow Node Types</CardTitle>
          <CardDescription>Complete collection of specialized nodes</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ReactFlowProvider>
            <div style={{ height: '650px', width: '100%' }}>
              <ReactFlow
                nodes={nodes}
                nodeTypes={workflowNodeTypes}
                fitView
                minZoom={1}
                maxZoom={1}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                preventScrolling={false}
              >
                <Background />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true }
  }
};

// With Status Indicators
export const WithStatus: Story = {
  render: () => {
    const nodes = [
      { id: '1', type: 'llm', position: { x: 0, y: 0 }, data: { label: 'Processing', description: 'Running...', status: 'active' } },
      { id: '2', type: 'save', position: { x: 260, y: 0 }, data: { label: 'Completed', description: 'Data saved', status: 'success' } },
      { id: '3', type: 'filter', position: { x: 520, y: 0 }, data: { label: 'Failed', description: 'Invalid condition', status: 'error' } },
      { id: '4', type: 'webhook', position: { x: 780, y: 0 }, data: { label: 'Inactive', description: 'Not configured', status: 'inactive' } }
    ];

    return (
      <Card>
        <CardHeader>
          <CardTitle>Node Status</CardTitle>
          <CardDescription>Nodes with different status states</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ReactFlowProvider>
            <div style={{ height: '200px', width: '100%' }}>
              <ReactFlow
                nodes={nodes}
                nodeTypes={workflowNodeTypes}
                fitView
                minZoom={1}
                maxZoom={1}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                preventScrolling={false}
              >
                <Background />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders nodes with different status states', async () => {
      await expect(canvas.getByText('Processing')).toBeInTheDocument();
      await expect(canvas.getByText('Completed')).toBeInTheDocument();
      await expect(canvas.getByText('Failed')).toBeInTheDocument();
      await expect(canvas.getByText('Inactive')).toBeInTheDocument();
    });

    await step('Displays status-specific descriptions', async () => {
      await expect(canvas.getByText('Running...')).toBeInTheDocument();
      await expect(canvas.getByText('Data saved')).toBeInTheDocument();
      await expect(canvas.getByText('Invalid condition')).toBeInTheDocument();
      await expect(canvas.getByText('Not configured')).toBeInTheDocument();
    });

    await step('Shows appropriate node types', async () => {
      await expect(canvas.getByText('LLM')).toBeInTheDocument();
      await expect(canvas.getByText('Save')).toBeInTheDocument();
      await expect(canvas.getByText('Filter')).toBeInTheDocument();
      await expect(canvas.getByText('Webhook')).toBeInTheDocument();
    });
  }
};

// Workflow Example
export const WorkflowExample: Story = {
  render: () => {
    const nodes = [
      { id: '1', type: 'webhook', position: { x: 0, y: 0 }, data: { label: 'API Request', description: 'Receive data' } },
      { id: '2', type: 'filter', position: { x: 260, y: 0 }, data: { label: 'Validate Input', description: 'Check required fields' } },
      { id: '3', type: 'llm', position: { x: 520, y: 0 }, data: { label: 'AI Analysis', description: 'GPT-4 processing' } },
      { id: '4', type: 'save', position: { x: 780, y: 0 }, data: { label: 'Store Results', description: 'Database' } },
      { id: '5', type: 'notify', position: { x: 1040, y: 0 }, data: { label: 'Send Alert', description: 'Email notification' } }
    ];

    const edges = [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e2-3', source: '2', target: '3', animated: true },
      { id: 'e3-4', source: '3', target: '4', animated: true },
      { id: 'e4-5', source: '4', target: '5', animated: true }
    ];

    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Workflow</CardTitle>
          <CardDescription>Example AI processing pipeline</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ReactFlowProvider>
            <div style={{ height: '200px', width: '100%' }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={workflowNodeTypes}
                fitView
                minZoom={0.8}
                maxZoom={0.8}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                preventScrolling={false}
              >
                <Background />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders complete workflow pipeline', async () => {
      await expect(canvas.getByText('API Request')).toBeInTheDocument();
      await expect(canvas.getByText('Validate Input')).toBeInTheDocument();
      await expect(canvas.getByText('AI Analysis')).toBeInTheDocument();
      await expect(canvas.getByText('Store Results')).toBeInTheDocument();
      await expect(canvas.getByText('Send Alert')).toBeInTheDocument();
    });

    await step('Shows all node descriptions', async () => {
      await expect(canvas.getByText('Receive data')).toBeInTheDocument();
      await expect(canvas.getByText('Check required fields')).toBeInTheDocument();
      await expect(canvas.getByText('GPT-4 processing')).toBeInTheDocument();
      await expect(canvas.getByText('Database')).toBeInTheDocument();
      await expect(canvas.getByText('Email notification')).toBeInTheDocument();
    });

    await step('Shows node type badges', async () => {
      await expect(canvas.getByText('Webhook')).toBeInTheDocument();
      await expect(canvas.getByText('Filter')).toBeInTheDocument();
      await expect(canvas.getByText('LLM')).toBeInTheDocument();
      await expect(canvas.getByText('Save')).toBeInTheDocument();
      await expect(canvas.getByText('Notify')).toBeInTheDocument();
    });
  }
};
