'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { WorkflowCanvas } from '@/components/ui/workflow-canvas'
import { workflowNodeTypes } from '@/components/ui/workflow-nodes'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Play, RotateCcw } from 'lucide-react'
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
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples" className="hover:text-foreground transition-colors">
                {isRTL ? 'الأمثلة' : 'Examples'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">
              {isRTL ? 'سير عمل بسيط' : 'Basic Workflow'}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {isRTL ? 'سير عمل بسيط' : 'Basic Workflow'}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                {isRTL
                  ? 'مثال بسيط على أداة بناء سير العمل مع إمكانية السحب والإفلات والاتصالات.'
                  : 'A simple workflow builder example with drag-and-drop and connections.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleRun}
                disabled={isRunning}
              >
                <Play className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                {isRTL ? 'تشغيل' : 'Run'}
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                {isRTL ? 'إعادة تعيين' : 'Reset'}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              {isRTL ? 'سحب وإفلات' : 'Drag & Drop'}
            </Badge>
            <Badge variant="secondary">
              {isRTL ? 'اتصالات' : 'Connections'}
            </Badge>
            <Badge variant="secondary">
              {isRTL ? 'دعم RTL' : 'RTL Support'}
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
            {isRTL ? 'كيفية الاستخدام' : 'How to Use'}
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <strong>{isRTL ? 'السحب:' : 'Drag:'}</strong>{' '}
              {isRTL
                ? 'اسحب العقد لإعادة ترتيب سير العمل'
                : 'Drag nodes to rearrange the workflow'}
            </li>
            <li>
              <strong>{isRTL ? 'الاتصال:' : 'Connect:'}</strong>{' '}
              {isRTL
                ? 'اسحب من نقطة الإخراج إلى نقطة الإدخال لإنشاء اتصالات'
                : 'Drag from output handle to input handle to create connections'}
            </li>
            <li>
              <strong>{isRTL ? 'التشغيل:' : 'Run:'}</strong>{' '}
              {isRTL
                ? 'انقر على "تشغيل" لمحاكاة تنفيذ سير العمل'
                : 'Click "Run" to simulate workflow execution'}
            </li>
            <li>
              <strong>{isRTL ? 'التكبير:' : 'Zoom:'}</strong>{' '}
              {isRTL
                ? 'استخدم عجلة الماوس أو عناصر التحكم للتكبير/التصغير'
                : 'Use mouse wheel or controls to zoom in/out'}
            </li>
          </ul>
        </Card>

        {/* Related Examples */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            {isRTL ? 'أمثلة ذات صلة' : 'Related Examples'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/examples/ai-workflow">
              <Card className="p-4 hover:border-primary transition-colors">
                <h3 className="font-semibold mb-2">
                  {isRTL ? 'سير عمل الذكاء الاصطناعي' : 'AI Workflow'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'أداة بناء سير عمل بالذكاء الاصطناعي مع نماذج LLM'
                    : 'AI-powered workflow builder with LLM models'}
                </p>
              </Card>
            </Link>
            <Link href="/examples/ai-playground">
              <Card className="p-4 hover:border-primary transition-colors">
                <h3 className="font-semibold mb-2">
                  {isRTL ? 'ملعب الذكاء الاصطناعي' : 'AI Playground'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'ملعب متقدم للذكاء الاصطناعي مع عناصر تحكم النموذج'
                    : 'Advanced AI playground with model controls'}
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
