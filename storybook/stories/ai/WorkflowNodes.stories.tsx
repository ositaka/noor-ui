import type { Meta, StoryObj } from '@storybook/react';
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
} from '../../../components/ui/workflow-nodes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

/**
 * Workflow Nodes Component Stories
 *
 * Note: Workflow Nodes are pre-configured variants of WorkflowNode for specific use cases.
 * Features: Specialized node types (Trigger, Action, AI, Output), pre-configured icons,
 * RTL support, consistent styling.
 * Categories: Triggers (Webhook, Schedule), Actions (Code, Filter), AI (LLM, Embedding), Outputs (Save, Notify).
 */

const meta = {
  title: 'AI/Workflow Nodes',
  component: TriggerNode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TriggerNode>;

export default meta;
type Story = StoryObj<typeof meta>;

// All Trigger Nodes
export const TriggerNodes: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Trigger Nodes</CardTitle>
        <CardDescription>Starting points for workflows</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 p-6">
        <div>
          <TriggerNode
            id="1"
            data={{ label: 'Generic Trigger' }}
            type="trigger"
          />
        </div>
        <div>
          <WebhookTriggerNode
            id="2"
            data={{ label: 'Webhook Trigger', description: 'HTTP endpoint' }}
            type="webhook"
          />
        </div>
        <div>
          <ScheduleTriggerNode
            id="3"
            data={{ label: 'Schedule Trigger', description: 'Run on schedule' }}
            type="schedule"
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
};

// All Action Nodes
export const ActionNodes: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Action Nodes</CardTitle>
        <CardDescription>Processing and transformation steps</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 p-6">
        <div>
          <ActionNode
            id="1"
            data={{ label: 'Generic Action' }}
            type="action"
          />
        </div>
        <div>
          <CodeActionNode
            id="2"
            data={{ label: 'Run Code', description: 'Execute JavaScript' }}
            type="code"
          />
        </div>
        <div>
          <FilterNode
            id="3"
            data={{ label: 'Filter Data', description: 'Conditional logic' }}
            type="filter"
          />
        </div>
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

// All AI Nodes
export const AINodes: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>AI Nodes</CardTitle>
        <CardDescription>AI and LLM operations</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 p-6">
        <div>
          <AINode
            id="1"
            data={{ label: 'AI Processing' }}
            type="ai"
          />
        </div>
        <div>
          <LLMNode
            id="2"
            data={{ label: 'LLM Call', description: 'GPT-4 Turbo' }}
            type="llm"
          />
        </div>
        <div>
          <EmbeddingNode
            id="3"
            data={{ label: 'Create Embedding', description: 'text-embedding-3' }}
            type="embedding"
          />
        </div>
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

// All Output Nodes
export const OutputNodes: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Output Nodes</CardTitle>
        <CardDescription>End points and result handlers</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 p-6">
        <div>
          <OutputNode
            id="1"
            data={{ label: 'Send Output' }}
            type="output"
          />
        </div>
        <div>
          <SaveNode
            id="2"
            data={{ label: 'Save to Database', description: 'PostgreSQL' }}
            type="save"
          />
        </div>
        <div>
          <NotifyNode
            id="3"
            data={{ label: 'Send Notification', description: 'Email & Slack' }}
            type="notify"
          />
        </div>
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

// All Node Types
export const AllNodeTypes: Story = {
  render: () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Workflow Node Types</CardTitle>
          <CardDescription>Complete collection of specialized nodes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Triggers</h3>
            <div className="flex flex-wrap gap-3">
              <TriggerNode id="t1" data={{ label: 'Trigger' }} type="trigger" />
              <WebhookTriggerNode id="t2" data={{ label: 'Webhook' }} type="webhook" />
              <ScheduleTriggerNode id="t3" data={{ label: 'Schedule' }} type="schedule" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Actions</h3>
            <div className="flex flex-wrap gap-3">
              <ActionNode id="a1" data={{ label: 'Action' }} type="action" />
              <CodeActionNode id="a2" data={{ label: 'Code' }} type="code" />
              <FilterNode id="a3" data={{ label: 'Filter' }} type="filter" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">AI Operations</h3>
            <div className="flex flex-wrap gap-3">
              <AINode id="ai1" data={{ label: 'AI' }} type="ai" />
              <LLMNode id="ai2" data={{ label: 'LLM' }} type="llm" />
              <EmbeddingNode id="ai3" data={{ label: 'Embedding' }} type="embedding" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Outputs</h3>
            <div className="flex flex-wrap gap-3">
              <OutputNode id="o1" data={{ label: 'Output' }} type="output" />
              <SaveNode id="o2" data={{ label: 'Save' }} type="save" />
              <NotifyNode id="o3" data={{ label: 'Notify' }} type="notify" />
            </div>
          </div>
        </CardContent>
      </Card>
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
    },
  },
};

// With Status Indicators
export const WithStatus: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Node Status</CardTitle>
        <CardDescription>Nodes with different status states</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 p-6">
        <div>
          <LLMNode
            id="1"
            data={{ label: 'Processing', description: 'Running...', status: 'active' }}
            type="llm"
          />
        </div>
        <div>
          <SaveNode
            id="2"
            data={{ label: 'Completed', description: 'Data saved', status: 'success' }}
            type="save"
          />
        </div>
        <div>
          <FilterNode
            id="3"
            data={{ label: 'Failed', description: 'Invalid condition', status: 'error' }}
            type="filter"
          />
        </div>
        <div>
          <WebhookTriggerNode
            id="4"
            data={{ label: 'Inactive', description: 'Not configured', status: 'inactive' }}
            type="webhook"
          />
        </div>
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

// Workflow Example
export const WorkflowExample: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>AI Workflow</CardTitle>
        <CardDescription>Example AI processing pipeline</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-4">
          <WebhookTriggerNode
            id="1"
            data={{ label: 'API Request', description: 'Receive data' }}
            type="webhook"
          />
          <span className="text-muted-foreground">→</span>
          <FilterNode
            id="2"
            data={{ label: 'Validate Input', description: 'Check required fields' }}
            type="filter"
          />
        </div>
        <div className="flex items-center gap-4 ms-12">
          <span className="text-muted-foreground">→</span>
          <LLMNode
            id="3"
            data={{ label: 'AI Analysis', description: 'GPT-4 processing' }}
            type="llm"
          />
          <span className="text-muted-foreground">→</span>
          <SaveNode
            id="4"
            data={{ label: 'Store Results', description: 'Database' }}
            type="save"
          />
        </div>
        <div className="flex items-center gap-4 ms-24">
          <span className="text-muted-foreground">→</span>
          <NotifyNode
            id="5"
            data={{ label: 'Send Alert', description: 'Email notification' }}
            type="notify"
          />
        </div>
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
      <CardHeader>
        <CardTitle>عقد سير العمل</CardTitle>
        <CardDescription>أنواع مختلفة من عقد سير العمل</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 p-6">
        <div>
          <WebhookTriggerNode
            id="1"
            data={{
              label: 'Webhook Trigger',
              labelAr: 'مشغل ويب هوك',
              description: 'HTTP endpoint',
              descriptionAr: 'نقطة نهاية HTTP',
              isRTL: true,
            }}
            type="webhook"
          />
        </div>
        <div>
          <LLMNode
            id="2"
            data={{
              label: 'LLM Call',
              labelAr: 'استدعاء نموذج لغوي',
              description: 'GPT-4',
              descriptionAr: 'GPT-4',
              isRTL: true,
            }}
            type="llm"
          />
        </div>
        <div>
          <SaveNode
            id="3"
            data={{
              label: 'Save Data',
              labelAr: 'حفظ البيانات',
              description: 'Database',
              descriptionAr: 'قاعدة البيانات',
              isRTL: true,
            }}
            type="save"
          />
        </div>
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
