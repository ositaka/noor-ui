'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { content } from '@/lib/i18n'
import { WorkflowCanvas } from '@/components/ui/workflow-canvas'
import { workflowNodeTypes } from '@/components/ui/workflow-nodes'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Play, RotateCcw, AlertCircle } from 'lucide-react'
import type { Node, Edge } from '@xyflow/react'

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'webhook',
    position: { x: 100, y: 100 },
    data: {
      label: 'Webhook Trigger',
      labelAr: 'مشغل ويب هوك',
      description: 'Receives incoming HTTP requests',
      descriptionAr: 'يستقبل طلبات HTTP الواردة',
      status: 'success',
    },
  },
  {
    id: '2',
    type: 'code',
    position: { x: 400, y: 100 },
    data: {
      label: 'Process Data',
      labelAr: 'معالجة البيانات',
      description: 'Transform and validate data',
      descriptionAr: 'تحويل والتحقق من البيانات',
      status: 'active',
    },
  },
  {
    id: '3',
    type: 'save',
    position: { x: 700, y: 100 },
    data: {
      label: 'Save to Database',
      labelAr: 'حفظ في قاعدة البيانات',
      description: 'Store processed data',
      descriptionAr: 'تخزين البيانات المعالجة',
      status: 'inactive',
    },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
]

export default function BasicWorkflowPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'
  const t = content[locale]

  const [nodes, setNodes] = React.useState<Node[]>(
    initialNodes.map((node) => ({
      ...node,
      data: { ...node.data, isRTL },
    }))
  )
  const [edges, setEdges] = React.useState<Edge[]>(initialEdges)
  const [isRunning, setIsRunning] = React.useState(false)

  // Update nodes when direction changes
  React.useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        data: { ...node.data, isRTL },
      }))
    )
  }, [isRTL])

  const handleReset = () => {
    setNodes(
      initialNodes.map((node) => ({
        ...node,
        data: { ...node.data, isRTL, status: 'inactive' },
      }))
    )
    setEdges(initialEdges)
    setIsRunning(false)
  }

  const handleRun = () => {
    setIsRunning(true)

    // Simulate workflow execution
    const runStep = (nodeId: string, delay: number) => {
      setTimeout(() => {
        setNodes((prevNodes) =>
          prevNodes.map((node) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, status: 'active' } }
              : node
          )
        )

        setTimeout(() => {
          setNodes((prevNodes) =>
            prevNodes.map((node) =>
              node.id === nodeId
                ? { ...node, data: { ...node.data, status: 'success' } }
                : node
            )
          )
        }, 1000)
      }, delay)
    }

    // Execute nodes in sequence
    runStep('1', 0)
    runStep('2', 1500)
    runStep('3', 3000)

    setTimeout(() => {
      setIsRunning(false)
    }, 4500)
  }

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <div className="flex items-center justify-between gap-4">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/examples" className="hover:text-foreground transition-colors">
                  {t.nav.examples}
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">
                {t.workflowBasicPage.breadcrumb.basicWorkflow}
              </li>
            </ol>
            <DirectionToggle />
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold tracking-tight">
                  {t.workflowBasicPage.title}
                </h1>
                <Badge variant="secondary" className="flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3" />
                  {t.workflowBasicPage.workInProgress}
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl">
                {t.workflowBasicPage.description}
              </p>
              <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-3xl">
                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>{t.workflowBasicPage.note}</strong> {t.workflowBasicPage.noteText}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleRun}
                disabled={isRunning}
              >
                <Play className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                {t.workflowBasicPage.run}
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                {t.workflowBasicPage.reset}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              {t.workflowBasicPage.badges.dragAndDrop}
            </Badge>
            <Badge variant="secondary">
              {t.workflowBasicPage.badges.connections}
            </Badge>
            <Badge variant="secondary">
              {t.workflowBasicPage.badges.rtlSupport}
            </Badge>
          </div>
        </div>

        {/* Workflow Canvas */}
        <div className="h-[600px] mb-8">
          <WorkflowCanvas
            initialNodes={nodes}
            initialEdges={edges}
            nodeTypes={workflowNodeTypes}
            isRTL={isRTL}
            showMiniMap
            showControls
            showBackground
          />
        </div>

        {/* Instructions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {t.workflowBasicPage.howToUse.title}
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <strong>{t.workflowBasicPage.howToUse.drag}</strong>{' '}
              {t.workflowBasicPage.howToUse.dragDesc}
            </li>
            <li>
              <strong>{t.workflowBasicPage.howToUse.connect}</strong>{' '}
              {t.workflowBasicPage.howToUse.connectDesc}
            </li>
            <li>
              <strong>{t.workflowBasicPage.howToUse.runTitle}</strong>{' '}
              {t.workflowBasicPage.howToUse.runDesc}
            </li>
            <li>
              <strong>{t.workflowBasicPage.howToUse.zoom}</strong>{' '}
              {t.workflowBasicPage.howToUse.zoomDesc}
            </li>
          </ul>
        </Card>

        {/* Related Examples */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            {t.workflowBasicPage.relatedExamples.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/examples/ai-workflow">
              <Card className="p-4 hover:border-primary transition-colors">
                <h3 className="font-semibold mb-2">
                  {t.workflowBasicPage.relatedExamples.aiWorkflow}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.workflowBasicPage.relatedExamples.aiWorkflowDesc}
                </p>
              </Card>
            </Link>
            <Link href="/examples/ai-playground">
              <Card className="p-4 hover:border-primary transition-colors">
                <h3 className="font-semibold mb-2">
                  {t.workflowBasicPage.relatedExamples.aiPlayground}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.workflowBasicPage.relatedExamples.aiPlaygroundDesc}
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
