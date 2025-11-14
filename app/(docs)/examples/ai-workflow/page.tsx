'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { WorkflowCanvas } from '@/components/ui/workflow-canvas'
import { WorkflowNode, type WorkflowNodeData } from '@/components/ui/workflow-node'
import { workflowNodeTypes } from '@/components/ui/workflow-nodes'
import { ModelSelector, defaultModels } from '@/components/ui/model-selector'
import { TokenCounter } from '@/components/ui/token-counter'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Play, RotateCcw, Settings, Sparkles, AlertCircle } from 'lucide-react'
import type { Node, Edge, NodeProps } from '@xyflow/react'

// Custom LLM Node with Model Selector
function CustomLLMNode({ data, selected, ...rest }: NodeProps<any>) {
  const [selectedModel, setSelectedModel] = React.useState('gpt-4')
  const nodeData = data as WorkflowNodeData

  return (
    <WorkflowNode
      {...rest}
      data={{
        ...nodeData,
        children: (
          <div className="space-y-2">
            <ModelSelector
              models={defaultModels}
              value={selectedModel}
              onValueChange={setSelectedModel}
              isRTL={nodeData.isRTL}
            />
          </div>
        ),
      }}
      selected={selected}
    />
  )
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'webhook',
    position: { x: 50, y: 100 },
    data: {
      label: 'User Input',
      labelAr: 'مدخلات المستخدم',
      description: 'Receives user prompt',
      descriptionAr: 'يستقبل موجه المستخدم',
      status: 'success',
    },
  },
  {
    id: '2',
    type: 'customLLM',
    position: { x: 350, y: 100 },
    data: {
      label: 'LLM Processing',
      labelAr: 'معالجة نموذج اللغة',
      description: 'Generate AI response',
      descriptionAr: 'توليد استجابة الذكاء الاصطناعي',
      status: 'inactive',
    },
  },
  {
    id: '3',
    type: 'code',
    position: { x: 700, y: 100 },
    data: {
      label: 'Post-Process',
      labelAr: 'معالجة لاحقة',
      description: 'Format and validate output',
      descriptionAr: 'تنسيق والتحقق من الإخراج',
      status: 'inactive',
    },
  },
  {
    id: '4',
    type: 'notify',
    position: { x: 1000, y: 100 },
    data: {
      label: 'Send Response',
      labelAr: 'إرسال الاستجابة',
      description: 'Return to user',
      descriptionAr: 'الرجوع إلى المستخدم',
      status: 'inactive',
    },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
]

export default function AIWorkflowPage() {
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
  const [inputTokens, setInputTokens] = React.useState(0)
  const [outputTokens, setOutputTokens] = React.useState(0)

  // Custom node types with LLM integration
  const customNodeTypes = {
    ...workflowNodeTypes,
    customLLM: CustomLLMNode,
  }

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
        data: { ...node.data, isRTL, status: node.id === '1' ? 'success' : 'inactive' },
      }))
    )
    setEdges(initialEdges)
    setIsRunning(false)
    setInputTokens(0)
    setOutputTokens(0)
  }

  const handleRun = () => {
    setIsRunning(true)

    // Reset tokens
    setInputTokens(0)
    setOutputTokens(0)

    // Simulate workflow execution with token counting
    const runStep = (nodeId: string, delay: number, tokens?: { input?: number; output?: number }) => {
      setTimeout(() => {
        setNodes((prevNodes) =>
          prevNodes.map((node) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, status: 'active' } }
              : node
          )
        )

        // Add tokens during LLM step
        if (tokens) {
          if (tokens.input) setInputTokens((prev) => prev + tokens.input!)
          if (tokens.output) setOutputTokens((prev) => prev + tokens.output!)
        }

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
    runStep('2', 1500, { input: 125, output: 432 }) // LLM step with tokens
    runStep('3', 3500)
    runStep('4', 5000)

    setTimeout(() => {
      setIsRunning(false)
    }, 6500)
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
              {isRTL ? 'سير عمل الذكاء الاصطناعي' : 'AI Workflow'}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold tracking-tight">
                  {isRTL ? 'سير عمل الذكاء الاصطناعي' : 'AI Workflow'}
                </h1>
                <Badge variant="secondary" className="flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3" />
                  {isRTL ? 'قيد التطوير' : 'Work in Progress'}
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl">
                {isRTL
                  ? 'أداة بناء سير العمل مع تكامل LLM وتتبع الرموز ومحددات النماذج.'
                  : 'Workflow builder with LLM integration, token tracking, and model selectors.'}
              </p>
              <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-3xl">
                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>{isRTL ? 'ملاحظة:' : 'Note:'}</strong> {isRTL ? 'هذا المثال قيد التطوير حاليًا. قد لا تعمل بعض الميزات كما هو متوقع. نحن نعمل بنشاط على التحسينات وسنقوم بتحديث الوثائق بمجرد أن تصبح مستقرة.' : 'This example is currently under development. Some features may not work as expected. We\'re actively working on improvements and will update the documentation once stable.'}
                </p>
              </div>
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
              <Sparkles className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
              {isRTL ? 'نماذج LLM' : 'LLM Models'}
            </Badge>
            <Badge variant="secondary">
              {isRTL ? 'تتبع الرموز' : 'Token Tracking'}
            </Badge>
            <Badge variant="secondary">
              {isRTL ? 'تكامل الذكاء الاصطناعي' : 'AI Integration'}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Workflow Canvas */}
          <div className="h-[600px]">
            <WorkflowCanvas
              initialNodes={nodes}
              initialEdges={edges}
              nodeTypes={customNodeTypes}
              isRTL={isRTL}
              showMiniMap
              showControls
              showBackground
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Token Counter */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">
                  {isRTL ? 'استخدام الرموز' : 'Token Usage'}
                </h3>
              </div>
              <TokenCounter
                inputTokens={inputTokens}
                outputTokens={outputTokens}
                maxTokens={100000}
                inputCostPer1K={0.03}
                outputCostPer1K={0.06}
                showCost
                showBreakdown
                isRTL={isRTL}
              />
            </Card>

            {/* Workflow Info */}
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">
                {isRTL ? 'معلومات سير العمل' : 'Workflow Info'}
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {isRTL ? 'العقد:' : 'Nodes:'}
                  </span>
                  <span className="font-medium">{nodes.length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {isRTL ? 'الاتصالات:' : 'Connections:'}
                  </span>
                  <span className="font-medium">{edges.length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {isRTL ? 'الحالة:' : 'Status:'}
                  </span>
                  <Badge variant={isRunning ? 'default' : 'secondary'} className="text-xs">
                    {isRunning ? (isRTL ? 'قيد التشغيل' : 'Running') : (isRTL ? 'جاهز' : 'Ready')}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Features */}
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">
                {isRTL ? 'الميزات' : 'Features'}
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>✓ {isRTL ? 'اختيار نموذج LLM' : 'LLM model selection'}</li>
                <li>✓ {isRTL ? 'تتبع الرموز في الوقت الفعلي' : 'Real-time token tracking'}</li>
                <li>✓ {isRTL ? 'تقدير التكلفة' : 'Cost estimation'}</li>
                <li>✓ {isRTL ? 'محاكاة التنفيذ' : 'Execution simulation'}</li>
                <li>✓ {isRTL ? 'دعم RTL كامل' : 'Full RTL support'}</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="p-6 mt-8">
          <h2 className="text-lg font-semibold mb-4">
            {isRTL ? 'كيف يعمل' : 'How It Works'}
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <div>
              <strong>{isRTL ? '١. مدخلات المستخدم:' : '1. User Input:'}</strong>{' '}
              {isRTL
                ? 'يستقبل سير العمل موجه المستخدم عبر webhook'
                : 'The workflow receives a user prompt via webhook'}
            </div>
            <div>
              <strong>{isRTL ? '٢. معالجة LLM:' : '2. LLM Processing:'}</strong>{' '}
              {isRTL
                ? 'يتم إرسال الموجه إلى النموذج المحدد (GPT-4، Claude، إلخ)'
                : 'The prompt is sent to the selected model (GPT-4, Claude, etc.)'}
            </div>
            <div>
              <strong>{isRTL ? '٣. المعالجة اللاحقة:' : '3. Post-Processing:'}</strong>{' '}
              {isRTL
                ? 'يتم تنسيق الاستجابة والتحقق من صحتها'
                : 'The response is formatted and validated'}
            </div>
            <div>
              <strong>{isRTL ? '٤. إرسال الاستجابة:' : '4. Send Response:'}</strong>{' '}
              {isRTL
                ? 'يتم إرجاع الاستجابة النهائية إلى المستخدم'
                : 'The final response is returned to the user'}
            </div>
          </div>
        </Card>

        {/* Related Examples */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            {isRTL ? 'أمثلة ذات صلة' : 'Related Examples'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/examples/workflow-basic">
              <Card className="p-4 hover:border-primary transition-colors">
                <h3 className="font-semibold mb-2">
                  {isRTL ? 'سير عمل بسيط' : 'Basic Workflow'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'مثال بسيط على أداة بناء سير العمل'
                    : 'Simple workflow builder example'}
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
