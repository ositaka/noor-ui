'use client'

import * as React from 'react'
import Link from 'next/link'
import { WorkflowCanvas } from '@/components/ui/workflow-canvas'
import { WorkflowNode, type WorkflowNodeData } from '@/components/ui/workflow-node'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Zap, Cpu, FileOutput, AlertCircle } from 'lucide-react'
import { type Node, type Edge } from '@xyflow/react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getWorkflowCanvasProps = (componentT: any): PropDefinition[] => [
  {
    name: 'initialNodes',
    type: 'Node[]',
    default: '[]',
    required: false,
    description: componentT.props.initialNodes,
  },
  {
    name: 'initialEdges',
    type: 'Edge[]',
    default: '[]',
    required: false,
    description: componentT.props.initialEdges,
  },
  {
    name: 'nodeTypes',
    type: 'Record<string, React.ComponentType<any>>',
    required: false,
    description: componentT.props.nodeTypes,
  },
  {
    name: 'onNodesChange',
    type: 'OnNodesChange',
    required: false,
    description: componentT.props.onNodesChange,
  },
  {
    name: 'onEdgesChange',
    type: 'OnEdgesChange',
    required: false,
    description: componentT.props.onEdgesChange,
  },
  {
    name: 'onConnect',
    type: 'OnConnect',
    required: false,
    description: componentT.props.onConnect,
  },
  {
    name: 'readOnly',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.readOnly,
  },
  {
    name: 'showMiniMap',
    type: 'boolean',
    default: 'true',
    required: false,
    description: componentT.props.showMiniMap,
  },
  {
    name: 'showControls',
    type: 'boolean',
    default: 'true',
    required: false,
    description: componentT.props.showControls,
  },
  {
    name: 'showBackground',
    type: 'boolean',
    default: 'true',
    required: false,
    description: componentT.props.showBackground,
  },
  {
    name: 'backgroundVariant',
    type: "'dots' | 'lines' | 'cross'",
    default: "'dots'",
    required: false,
    description: componentT.props.backgroundVariant,
  },
  {
    name: 'isRTL',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.isRTL,
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: componentT.props.className,
  },
  {
    name: 'fitViewOptions',
    type: 'FitViewOptions',
    default: '{ padding: 0.2 }',
    required: false,
    description: componentT.props.fitViewOptions,
  },
  {
    name: 'defaultEdgeOptions',
    type: 'DefaultEdgeOptions',
    default: "{ animated: false, type: 'smoothstep' }",
    required: false,
    description: componentT.props.defaultEdgeOptions,
  },
]

const installCode = `npm install noorui-rtl @xyflow/react`

const basicUsageCode = `import { WorkflowCanvas } from 'noorui-rtl'
import { WorkflowNode } from 'noorui-rtl'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const nodes = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 100, y: 100 },
    data: { label: 'Start' }
  }
]

const nodeTypes = {
  workflowNode: WorkflowNode
}

<WorkflowCanvas
  initialNodes={nodes}
  nodeTypes={nodeTypes}
/>`

const simpleWorkflowCode = `const nodes = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 50, y: 100 },
    data: {
      label: 'Trigger',
      description: 'When email received',
      type: 'trigger',
      icon: Zap
    }
  },
  {
    id: '2',
    type: 'workflowNode',
    position: { x: 350, y: 100 },
    data: {
      label: 'AI Process',
      description: 'Analyze content',
      type: 'AI',
      icon: Cpu
    }
  },
  {
    id: '3',
    type: 'workflowNode',
    position: { x: 650, y: 100 },
    data: {
      label: 'Output',
      description: 'Send to Slack',
      type: 'action',
      icon: FileOutput
    }
  }
]

const edges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' }
]

<WorkflowCanvas
  initialNodes={nodes}
  initialEdges={edges}
  nodeTypes={{ workflowNode: WorkflowNode }}
/>`

const readOnlyCode = `<WorkflowCanvas
  initialNodes={nodes}
  initialEdges={edges}
  nodeTypes={{ workflowNode: WorkflowNode }}
  readOnly={true}
/>`

const withoutMinimapCode = `<WorkflowCanvas
  initialNodes={nodes}
  initialEdges={edges}
  nodeTypes={{ workflowNode: WorkflowNode }}
  showMiniMap={false}
  showControls={false}
/>`

const customHandlersCode = `const handleNodesChange = (changes: NodeChange[]) => {
  console.log('Nodes changed:', changes)
  // Handle node changes
}

const handleConnect = (connection: Connection) => {
  console.log('Connected:', connection)
  // Handle new connection
}

<WorkflowCanvas
  initialNodes={nodes}
  initialEdges={edges}
  nodeTypes={{ workflowNode: WorkflowNode }}
  onNodesChange={handleNodesChange}
  onConnect={handleConnect}
/>`

const rtlCode = `<WorkflowCanvas
  initialNodes={nodes}
  initialEdges={edges}
  nodeTypes={{ workflowNode: WorkflowNode }}
  isRTL={true}
/>`

// Example nodes for preview
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

const nodeTypes = {
  workflowNode: WorkflowNode,
}

export default function WorkflowCanvasPage() {
  const { direction, locale } = useDirection()
  const t = content[locale] || content.en
  const workflowCanvasT = (content[locale]?.workflowCanvasComponent || content.en.workflowCanvasComponent) as any

  const workflowCanvasProps = getWorkflowCanvasProps(workflowCanvasT)

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{workflowCanvasT.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">Workflow Canvas</h1>
            <Badge variant="secondary" className="flex items-center gap-1.5">
              <AlertCircle className="h-3 w-3" />
              {t.componentPage.workInProgress}
            </Badge>
          </div>
          <div className="space-y-3">
            <p className="text-xl text-muted-foreground max-w-3xl">
            {workflowCanvasT.description}
          </p>
            <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-3xl">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>{t.componentPage.wipNote}</strong> {t.componentPage.wipNoteText}
              </p>
            </div>
          </div>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{workflowCanvasT.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div style={{ height: '400px', width: '100%' }}>
                <WorkflowCanvas
                  initialNodes={previewNodes}
                  initialEdges={previewEdges}
                  nodeTypes={nodeTypes}
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{workflowCanvasT.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{workflowCanvasT.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{workflowCanvasT.examples.title}</h2>

          <div className="space-y-8">
            {/* Simple Workflow */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Simple Workflow</h3>
              <Card>
                <CardContent className="p-6">
                  <div style={{ height: '400px', width: '100%' }}>
                    <WorkflowCanvas
                      initialNodes={previewNodes}
                      initialEdges={previewEdges}
                      nodeTypes={nodeTypes}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={simpleWorkflowCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Read-only Mode */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Read-only Mode</h3>
              <Card>
                <CardContent className="p-6">
                  <div style={{ height: '400px', width: '100%' }}>
                    <WorkflowCanvas
                      initialNodes={previewNodes}
                      initialEdges={previewEdges}
                      nodeTypes={nodeTypes}
                      readOnly={true}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={readOnlyCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Without Minimap/Controls */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Without Minimap/Controls</h3>
              <Card>
                <CardContent className="p-6">
                  <div style={{ height: '400px', width: '100%' }}>
                    <WorkflowCanvas
                      initialNodes={previewNodes}
                      initialEdges={previewEdges}
                      nodeTypes={nodeTypes}
                      showMiniMap={false}
                      showControls={false}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withoutMinimapCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Custom Handlers */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Custom Event Handlers</h3>
              <CodeBlock code={customHandlersCode} language="tsx" />
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.props}</h2>
          <PropsTable props={workflowCanvasProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Arrow Keys</kbd>: Pan the canvas when a node is not selected</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">+</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-muted">-</kbd>: Zoom in/out</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Delete</kbd>: Delete selected nodes or edges</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Ctrl/Cmd + A</kbd>: Select all nodes</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Mouse Interactions</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Click and drag nodes to move them</li>
                  <li>Click handles to create connections</li>
                  <li>Scroll to zoom in/out</li>
                  <li>Click and drag canvas to pan</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Screen Reader</h3>
                <p className="text-muted-foreground">
                  The canvas provides semantic structure for nodes and connections. Each node is focusable
                  and announces its type and label to screen readers.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.rtlSupport}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                The workflow canvas automatically adjusts for RTL layouts. Node connections flow from
                right to left, and handle positions are mirrored appropriately.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentPage.rtlDemo.ltr}</h4>
                  <div dir="ltr" style={{ height: '300px' }}>
                    <WorkflowCanvas
                      initialNodes={[
                        {
                          id: '1',
                          type: 'workflowNode',
                          position: { x: 50, y: 100 },
                          data: { label: 'Start', icon: Zap },
                        },
                        {
                          id: '2',
                          type: 'workflowNode',
                          position: { x: 300, y: 100 },
                          data: { label: 'End', icon: FileOutput },
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
                  <h4 className="font-semibold text-sm">{t.componentPage.rtlDemo.rtl}</h4>
                  <div dir="rtl" style={{ height: '300px' }}>
                    <WorkflowCanvas
                      initialNodes={[
                        {
                          id: '1',
                          type: 'workflowNode',
                          position: { x: 50, y: 100 },
                          data: { label: 'بداية', labelAr: 'بداية', icon: Zap, isRTL: true },
                        },
                        {
                          id: '2',
                          type: 'workflowNode',
                          position: { x: 300, y: 100 },
                          data: { label: 'نهاية', labelAr: 'نهاية', icon: FileOutput, isRTL: true },
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{workflowCanvasT.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <Link href="/components/workflow-node" className="font-medium hover:underline">
                  {content[locale]?.workflowNodeComponent?.title || content.en.workflowNodeComponent.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {workflowCanvasT.related.workflowNode}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/card" className="font-medium hover:underline">
                  {t.componentNames?.['card'] || 'Card'}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {workflowCanvasT.related.card}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/badge" className="font-medium hover:underline">
                  {t.componentNames?.['badge'] || 'Badge'}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {workflowCanvasT.related.badge}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
