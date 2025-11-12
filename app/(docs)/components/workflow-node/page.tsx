'use client'

import * as React from 'react'
import Link from 'next/link'
import { WorkflowCanvas } from '@/components/ui/workflow-canvas'
import { WorkflowNode, type WorkflowNodeData } from '@/components/ui/workflow-node'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Zap, Cpu, FileOutput, Mail } from 'lucide-react'
import { type Node, type Edge } from '@xyflow/react'

const workflowNodeProps: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'Node label/title',
  },
  {
    name: 'labelAr',
    type: 'string',
    required: false,
    description: 'Node label in Arabic (for RTL)',
  },
  {
    name: 'description',
    type: 'string',
    required: false,
    description: 'Node description text',
  },
  {
    name: 'descriptionAr',
    type: 'string',
    required: false,
    description: 'Node description in Arabic (for RTL)',
  },
  {
    name: 'type',
    type: 'string',
    required: false,
    description: 'Node type/category (shown as badge)',
  },
  {
    name: 'typeAr',
    type: 'string',
    required: false,
    description: 'Node type in Arabic (for RTL)',
  },
  {
    name: 'icon',
    type: 'LucideIcon',
    required: false,
    description: 'Icon component to display',
  },
  {
    name: 'status',
    type: "'active' | 'inactive' | 'error' | 'success'",
    required: false,
    description: 'Badge status indicator color',
  },
  {
    name: 'isRTL',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Whether text direction is RTL',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    required: false,
    description: 'Custom content to render inside the node',
  },
]

const installCode = `npm install @noorui/components @xyflow/react lucide-react`

const basicUsageCode = `import { WorkflowNode } from '@/components/ui/workflow-node'
import { WorkflowCanvas } from '@/components/ui/workflow-canvas'
import { Zap } from 'lucide-react'

const nodes = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 100, y: 100 },
    data: {
      label: 'Email Trigger',
      description: 'When email received',
      type: 'trigger',
      icon: Zap
    }
  }
]

const nodeTypes = {
  workflowNode: WorkflowNode
}

<WorkflowCanvas
  initialNodes={nodes}
  nodeTypes={nodeTypes}
/>`

const differentTypesCode = `const nodes = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 50, y: 50 },
    data: {
      label: 'Email Trigger',
      description: 'When email received',
      type: 'trigger',
      icon: Zap
    }
  },
  {
    id: '2',
    type: 'workflowNode',
    position: { x: 350, y: 50 },
    data: {
      label: 'AI Analysis',
      description: 'Analyze email content',
      type: 'AI',
      icon: Cpu
    }
  },
  {
    id: '3',
    type: 'workflowNode',
    position: { x: 650, y: 50 },
    data: {
      label: 'Send Output',
      description: 'Forward to Slack',
      type: 'action',
      icon: FileOutput
    }
  }
]`

const withStatusCode = `const nodes = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 50, y: 50 },
    data: {
      label: 'Active Task',
      description: 'Currently running',
      status: 'active',
      icon: Zap
    }
  },
  {
    id: '2',
    type: 'workflowNode',
    position: { x: 350, y: 50 },
    data: {
      label: 'Completed Task',
      description: 'Finished successfully',
      status: 'success',
      icon: Cpu
    }
  },
  {
    id: '3',
    type: 'workflowNode',
    position: { x: 650, y: 50 },
    data: {
      label: 'Failed Task',
      description: 'Error occurred',
      status: 'error',
      icon: FileOutput
    }
  }
]`

const withChildrenCode = `const nodes = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 100, y: 100 },
    data: {
      label: 'Email Filter',
      description: 'Filter incoming emails',
      type: 'filter',
      icon: Mail,
      children: (
        <div className="text-xs space-y-1">
          <div className="font-medium">Conditions:</div>
          <div className="text-muted-foreground">
            • From: team@company.com<br />
            • Subject contains: "urgent"
          </div>
        </div>
      )
    }
  }
]`

const rtlCode = `const nodes = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 100, y: 100 },
    data: {
      label: 'Email Trigger',
      labelAr: 'محفز البريد الإلكتروني',
      description: 'When email received',
      descriptionAr: 'عند استلام البريد',
      type: 'trigger',
      typeAr: 'محفز',
      icon: Zap,
      isRTL: true
    }
  }
]

<WorkflowCanvas
  initialNodes={nodes}
  nodeTypes={{ workflowNode: WorkflowNode }}
  isRTL={true}
/>`

// Example nodes for previews
const nodeTypes = {
  workflowNode: WorkflowNode,
}

const previewNodes: Node[] = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 50, y: 100 },
    data: {
      label: 'Trigger',
      description: 'When email received',
      type: 'trigger',
      icon: Zap,
      status: 'active',
    },
  },
  {
    id: '2',
    type: 'workflowNode',
    position: { x: 350, y: 100 },
    data: {
      label: 'AI Process',
      description: 'Analyze content',
      type: 'AI',
      icon: Cpu,
      status: 'success',
    },
  },
  {
    id: '3',
    type: 'workflowNode',
    position: { x: 650, y: 100 },
    data: {
      label: 'Output',
      description: 'Send to Slack',
      type: 'action',
      icon: FileOutput,
    },
  },
]

const previewEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
]

const statusNodes: Node[] = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 50, y: 50 },
    data: {
      label: 'Active',
      description: 'Currently running',
      status: 'active',
      icon: Zap,
    },
  },
  {
    id: '2',
    type: 'workflowNode',
    position: { x: 350, y: 50 },
    data: {
      label: 'Success',
      description: 'Completed',
      status: 'success',
      icon: Cpu,
    },
  },
  {
    id: '3',
    type: 'workflowNode',
    position: { x: 650, y: 50 },
    data: {
      label: 'Error',
      description: 'Failed',
      status: 'error',
      icon: FileOutput,
    },
  },
  {
    id: '4',
    type: 'workflowNode',
    position: { x: 350, y: 200 },
    data: {
      label: 'Inactive',
      description: 'Not running',
      status: 'inactive',
      icon: Mail,
    },
  },
]

const childrenNode: Node[] = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 200, y: 100 },
    data: {
      label: 'Email Filter',
      description: 'Filter incoming emails',
      type: 'filter',
      icon: Mail,
      children: (
        <div className="text-xs space-y-1">
          <div className="font-medium">Conditions:</div>
          <div className="text-muted-foreground">
            • From: team@company.com<br />
            • Subject contains: &quot;urgent&quot;
          </div>
        </div>
      ),
    },
  },
]

export default function WorkflowNodePage() {
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                Components
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Workflow Node</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Workflow Node</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Base node component for workflows with handles, status indicators, icons, and badges. Automatically adjusts handle positions for RTL.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div style={{ height: '300px', width: '100%' }}>
                <WorkflowCanvas
                  initialNodes={previewNodes}
                  initialEdges={previewEdges}
                  nodeTypes={nodeTypes}
                  showMiniMap={false}
                  showControls={false}
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* Different Types */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Different Node Types</h3>
              <Card>
                <CardContent className="p-6">
                  <div style={{ height: '250px', width: '100%' }}>
                    <WorkflowCanvas
                      initialNodes={previewNodes}
                      nodeTypes={nodeTypes}
                      showMiniMap={false}
                      showControls={false}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={differentTypesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Status */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Status Indicators</h3>
              <Card>
                <CardContent className="p-6">
                  <div style={{ height: '350px', width: '100%' }}>
                    <WorkflowCanvas
                      initialNodes={statusNodes}
                      nodeTypes={nodeTypes}
                      showMiniMap={false}
                      showControls={false}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withStatusCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Children Content */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Custom Content</h3>
              <Card>
                <CardContent className="p-6">
                  <div style={{ height: '300px', width: '100%' }}>
                    <WorkflowCanvas
                      initialNodes={childrenNode}
                      nodeTypes={nodeTypes}
                      showMiniMap={false}
                      showControls={false}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withChildrenCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> These props are passed via the <code className="bg-background px-1 rounded">data</code> property of each node object in the WorkflowCanvas.
            </p>
          </div>
          <PropsTable props={workflowNodeProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: Focus the node</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Arrow Keys</kbd>: Move the selected node</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Delete</kbd>: Delete the selected node</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Screen Reader</h3>
                <p className="text-muted-foreground">
                  Each node is announced with its label, description, and type. Status indicators are
                  included in the accessible name when present.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Visual Feedback</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Selected nodes show a focus ring</li>
                  <li>Status indicators use distinct colors (blue, green, red, gray)</li>
                  <li>Error and success states have colored borders</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Considerations</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Workflow nodes automatically adjust handle positions for RTL layouts. Input handles appear
                on the right, output handles on the left. Set <code className="bg-muted px-1 rounded">isRTL</code> in node data and use Arabic label/description variants.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr" style={{ height: '250px' }}>
                    <WorkflowCanvas
                      initialNodes={[
                        {
                          id: '1',
                          type: 'workflowNode',
                          position: { x: 50, y: 50 },
                          data: {
                            label: 'Email Trigger',
                            description: 'When email received',
                            type: 'trigger',
                            icon: Zap,
                            status: 'active',
                          },
                        },
                        {
                          id: '2',
                          type: 'workflowNode',
                          position: { x: 350, y: 50 },
                          data: {
                            label: 'Process',
                            description: 'Handle message',
                            type: 'action',
                            icon: Cpu,
                          },
                        },
                      ]}
                      initialEdges={[{ id: 'e1-2', source: '1', target: '2' }]}
                      nodeTypes={nodeTypes}
                      showMiniMap={false}
                      showControls={false}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl" style={{ height: '250px' }}>
                    <WorkflowCanvas
                      initialNodes={[
                        {
                          id: '1',
                          type: 'workflowNode',
                          position: { x: 50, y: 50 },
                          data: {
                            label: 'Email Trigger',
                            labelAr: 'محفز البريد',
                            description: 'When email received',
                            descriptionAr: 'عند استلام البريد',
                            type: 'trigger',
                            typeAr: 'محفز',
                            icon: Zap,
                            status: 'active',
                            isRTL: true,
                          },
                        },
                        {
                          id: '2',
                          type: 'workflowNode',
                          position: { x: 350, y: 50 },
                          data: {
                            label: 'Process',
                            labelAr: 'معالجة',
                            description: 'Handle message',
                            descriptionAr: 'معالجة الرسالة',
                            type: 'action',
                            typeAr: 'إجراء',
                            icon: Cpu,
                            isRTL: true,
                          },
                        },
                      ]}
                      initialEdges={[{ id: 'e1-2', source: '1', target: '2' }]}
                      nodeTypes={nodeTypes}
                      showMiniMap={false}
                      showControls={false}
                      isRTL={true}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <Link href="/components/workflow-canvas" className="font-medium hover:underline">
                  Workflow Canvas
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Canvas container for workflow nodes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/card" className="font-medium hover:underline">
                  Card
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Base container component
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/badge" className="font-medium hover:underline">
                  Badge
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Status and type indicators
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
